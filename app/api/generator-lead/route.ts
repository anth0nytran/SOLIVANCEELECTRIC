import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { kvDel, kvGet, kvMode, kvSet, kvSetNX } from '../../lib/kv';
import { pushGeneratorLead, updateGeneratorDetails } from '../../lib/ghlGenerator';
import { describeAnswers, estimate, parseAnswers, type EstimateResult } from '../../generators/estimator';

export const runtime = 'nodejs';

// Generator size estimator on /generators. Two calls, same submission ID:
//   step 'lead'    — first name, phone, ZIP + the two quick answers. Creates the lead,
//                    fires the generator workflow once, returns the size range.
//   step 'details' — optional "make it exact" answers. Updates the same contact and
//                    returns a refined range. Never fires the workflow again.
// The server recomputes the estimate from the answers; it never trusts a result or
// model list sent by the browser.
//
// Idempotency (same pattern as /api/panel-lead):
//   gen:sub:{id}     SET NX lock per submission; replays get the stored receipt back.
//   gen:phone:{sha}  same phone within 24h = repeat: note only, no workflow, no conversion.

const SUBMISSION_TTL = 60 * 60 * 24 * 7;
const REPEAT_WINDOW = 60 * 60 * 24;
const STALE_PROCESSING_MS = 45_000;
const IP_LIMIT = 6;
const IP_WINDOW = 60 * 60;
const MAX_DETAIL_UPDATES = 5;
const TEST_KEY = 'FrvXkbm3FYyQ'; // same test key as the landing pages: ?test=<key>

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type SubmissionRecord = {
  state: 'processing' | 'done';
  startedAt: number;
  contactId?: string;
  conversionEligible?: boolean;
  repeat?: boolean;
  detailUpdates?: number;
};

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const log = (event: string, data: Record<string, unknown>) =>
  console.info(JSON.stringify({ event, ...data, at: new Date().toISOString() }));

// What the browser gets back: the result without internal fields.
const publicResult = (r: EstimateResult) => ({
  tier: r.tier,
  range: r.range,
  headline: r.headline,
  explanation: r.explanation,
  modelIds: r.models.map((m) => m.model),
  checkOnSite: r.checkOnSite,
});

const summaryFor = (answers: ReturnType<typeof describeAnswers>, r: EstimateResult) =>
  [`Estimate: ${r.range}`, ...answers, `Check on site: ${r.checkOnSite.slice(0, 4).join('; ')}`].join('\n');

const noteFor = (title: string, id: string, answers: string[], r: EstimateResult, extra: string[] = []) =>
  [
    title,
    `Submission ID: ${id}`,
    `Estimator rules: ${r.version}`,
    `Preliminary range: ${r.range} (${r.tier})`,
    `Models shown: ${r.models.map((m) => m.name).join(', ')}`,
    ...answers,
    `Check on site: ${r.checkOnSite.join('; ')}`,
    'Preliminary only: exact size confirmed by a licensed electrician on site.',
    ...extra,
  ].join('\n');

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  const submissionId = str(data.submissionId, 64);
  if (!UUID.test(submissionId)) {
    return NextResponse.json({ ok: false, error: 'Please refresh and try again.' }, { status: 400 });
  }
  const answers = parseAnswers((data.answers || {}) as Record<string, unknown>);
  if (!answers) return NextResponse.json({ ok: false, error: 'Please answer the two questions first.' }, { status: 400 });
  const result = estimate(answers);
  const subKey = `gen:sub:${submissionId}`;

  // ── Step 2: optional details on an existing lead ──
  if (data.step === 'details') {
    const rec = JSON.parse((await kvGet(subKey)) || 'null') as SubmissionRecord | null;
    if (!rec || rec.state !== 'done' || !rec.contactId) {
      // No lead on file (or store down): still show the refined range, just don't write.
      return NextResponse.json({ ok: true, saved: false, result: publicResult(result) });
    }
    if ((rec.detailUpdates || 0) >= MAX_DETAIL_UPDATES) {
      return NextResponse.json({ ok: true, saved: false, result: publicResult(result) });
    }
    // Site-walk request: a day within the next 3 weeks + a time window.
    const day = str(data.preferredDay, 10);
    const window = ['Morning (8am–12pm)', 'Afternoon (12pm–5pm)'].includes(str(data.timeWindow)) ? str(data.timeWindow) : '';
    const dayOk = /^\d{4}-\d{2}-\d{2}$/.test(day) && Math.abs(new Date(`${day}T12:00:00Z`).getTime() - Date.now()) < 22 * 864e5;
    const appointment = dayOk
      ? `${new Date(`${day}T12:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' })}${window ? ` - ${window}` : ''}`
      : undefined;
    const lines = [...describeAnswers(answers), ...(appointment ? [`Site walk requested: ${appointment}`] : [])];
    try {
      await updateGeneratorDetails(
        rec.contactId,
        summaryFor(lines, result),
        noteFor(appointment ? 'Generator estimator: SITE WALK REQUESTED' : 'Generator estimator: more details added', submissionId, lines, result),
        appointment
      );
      await kvSet(subKey, JSON.stringify({ ...rec, detailUpdates: (rec.detailUpdates || 0) + 1 }), SUBMISSION_TTL);
      log('generator_lead.details', { submissionId, tier: result.tier, siteWalk: !!appointment });
      return NextResponse.json({ ok: true, saved: true, siteWalk: !!appointment, result: publicResult(result) });
    } catch (err) {
      log('generator_lead.details_failed', { submissionId, error: (err as Error).message });
      return NextResponse.json({ ok: true, saved: false, result: publicResult(result) });
    }
  }

  // ── Step 1: the lead ──
  const test = str(data.testKey, 40) === TEST_KEY;
  const startedAt = Number(str(data._ts, 20));
  const ipKey = `gen:ip:${createHash('sha256').update(req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown').digest('hex')}`;
  const ipCount = kvMode() === 'unavailable' ? 0 : Number((await kvGet(ipKey)) || 0);
  const spamReason =
    (str(data.company_url) && 'honeypot') ||
    ((!startedAt || Date.now() - startedAt < 2500) && 'too_fast') ||
    (/https?:\/\/|www\./i.test(str(data.name)) && 'links') ||
    (!test && ipCount >= IP_LIMIT && 'ip_flood');
  if (spamReason) {
    log('generator_lead.spam_dropped', { submissionId, reason: spamReason });
    // Bots get a normal-looking answer and nothing is recorded.
    return NextResponse.json({ ok: true, submissionId, conversionEligible: false, result: publicResult(result) });
  }
  if (!test && kvMode() !== 'unavailable') await kvSet(ipKey, String(ipCount + 1), IP_WINDOW);

  const name = str(data.name, 60);
  const phone10 = str(data.phone, 30).replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  const phone = phone10.length === 10 ? `(${phone10.slice(0, 3)}) ${phone10.slice(3, 6)}-${phone10.slice(6)}` : phone10;
  const zipCode = str(data.zipCode, 10);
  const problems = [
    !/^[\p{L}\s\-'.]{2,60}$/u.test(name) && 'your first name',
    !/^[2-9]\d{2}[2-9]\d{6}$/.test(phone10) && 'a valid 10-digit phone number',
    !/^\d{5}$/.test(zipCode) && 'a 5-digit ZIP code',
  ].filter(Boolean);
  if (problems.length) return NextResponse.json({ ok: false, error: `Please add ${problems.join(', ')}.` }, { status: 400 });

  const lines = describeAnswers(answers);
  const lead = {
    submissionId,
    name,
    phone,
    zipCode,
    smsOptIn: data.smsConsent === true,
    summary: summaryFor(lines, result),
    note: '',
    page: str(data.page, 300),
    gclid: str(data.gclid, 200) || undefined,
    utmSource: str(data.utm_source, 100) || undefined,
    utmMedium: str(data.utm_medium, 100) || undefined,
    utmCampaign: str(data.utm_campaign, 150) || undefined,
    utmTerm: str(data.utm_term, 150) || undefined,
    utmContent: str(data.utm_content, 150) || undefined,
  };
  const noteExtra = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `ZIP: ${zipCode}`,
    `SMS consent: ${lead.smsOptIn ? 'YES, opted in to texts' : 'No (not checked)'}`,
    lead.page ? `Page: ${lead.page}` : '',
  ].filter(Boolean);

  // Store down: still deliver the lead (it matters more than dedupe), never a conversion.
  if (kvMode() === 'unavailable') {
    try {
      lead.note = noteFor('New generator estimator lead', submissionId, lines, result, noteExtra);
      await pushGeneratorLead(lead, { repeat: false, test });
      return NextResponse.json({ ok: true, submissionId, conversionEligible: false, result: publicResult(result) });
    } catch (err) {
      log('generator_lead.ghl_failed', { submissionId, error: (err as Error).message });
      return NextResponse.json({ ok: false, error: 'We could not send that. Please call us.' }, { status: 502 });
    }
  }

  const won = await kvSetNX(subKey, JSON.stringify({ state: 'processing', startedAt: Date.now() }), SUBMISSION_TTL);
  if (!won) {
    const existing = JSON.parse((await kvGet(subKey)) || 'null') as SubmissionRecord | null;
    if (existing?.state === 'done') {
      log('generator_lead.replayed', { submissionId });
      return NextResponse.json({ ok: true, submissionId, conversionEligible: !!existing.conversionEligible, replayed: true, result: publicResult(result) });
    }
    if (existing && Date.now() - existing.startedAt < STALE_PROCESSING_MS) {
      return NextResponse.json({ ok: false, retry: true, error: 'Still sending…' }, { status: 409 });
    }
    await kvSet(subKey, JSON.stringify({ state: 'processing', startedAt: Date.now() }), SUBMISSION_TTL);
  }

  const phoneKey = `gen:phone:${createHash('sha256').update(phone10).digest('hex')}`;
  const firstForPhone = test ? false : await kvSetNX(phoneKey, submissionId, REPEAT_WINDOW);
  const repeat = !test && !firstForPhone && (await kvGet(phoneKey)) !== submissionId;

  try {
    lead.note = noteFor(repeat ? 'REPEAT generator estimator request (same phone within 24h, no new workflow)' : 'New generator estimator lead', submissionId, lines, result, noteExtra);
    const { contactId, warnings } = await pushGeneratorLead(lead, { repeat, test });
    const rec: SubmissionRecord = { state: 'done', startedAt: Date.now(), contactId, conversionEligible: !repeat && !test, repeat };
    await kvSet(subKey, JSON.stringify(rec), SUBMISSION_TTL);
    log('generator_lead.accepted', { submissionId, contactId, repeat, test, tier: result.tier, warnings });
    return NextResponse.json({ ok: true, submissionId, conversionEligible: rec.conversionEligible, result: publicResult(result) });
  } catch (err) {
    await kvDel(subKey);
    if (firstForPhone) await kvDel(phoneKey);
    log('generator_lead.ghl_failed', { submissionId, error: (err as Error).message });
    return NextResponse.json({ ok: false, error: 'We could not send that. Please try again or call us.' }, { status: 502 });
  }
}
