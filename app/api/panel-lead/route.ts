import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { kvDel, kvGet, kvMode, kvSet, kvSetNX } from '../../lib/kv';
import { pushPanelLeadToGHL, type PanelLead } from '../../lib/ghlGoogle';
import { CONCERNS, TIMELINES } from '../../lib/panelOptions';

export const runtime = 'nodejs';

// Idempotency design (see /lp/panel-inspection):
//   pl:sub:{submissionId}  one record per logical submission. SET NX is the lock,
//                          so a double-click, retry or replayed request can never
//                          reach GHL twice; replays get the stored receipt back.
//   pl:phone:{sha256}      same phone within 24h = the same request (repeat):
//                          contact is updated + noted, but no new workflow run
//                          and no new conversion.
// Conversion eligibility is recorded here; the thank-you page claims it once
// via /api/panel-lead/claim.

const SUBMISSION_TTL = 60 * 60 * 24 * 7; // 7 days
const REPEAT_WINDOW = 60 * 60 * 24; // 24 hours
const STALE_PROCESSING_MS = 45_000; // a crashed attempt can be taken over after this

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type SubmissionRecord = {
  state: 'processing' | 'done';
  startedAt: number;
  conversionEligible?: boolean;
  repeat?: boolean;
};

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const log = (event: string, data: Record<string, unknown>) =>
  // Non-personal identifiers only — these lines are the audit trail for testing.
  console.info(JSON.stringify({ event, ...data, at: new Date().toISOString() }));

const receipt = (submissionId: string, rec: SubmissionRecord, replayed: boolean) =>
  NextResponse.json({
    ok: true,
    submissionId,
    conversionEligible: !!rec.conversionEligible,
    repeat: !!rec.repeat,
    replayed,
  });

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const submissionId = str(data.submissionId, 64);
  if (!UUID.test(submissionId)) {
    return NextResponse.json({ ok: false, error: 'Invalid submission. Please refresh and try again.' }, { status: 400 });
  }

  // Bots: pretend success, record nothing, never conversion-eligible.
  const startedAt = Number(str(data._ts, 20));
  if (str(data.company_url) || (startedAt && Date.now() - startedAt < 3000)) {
    log('panel_lead.spam_dropped', { submissionId });
    return NextResponse.json({ ok: true, submissionId, conversionEligible: false, repeat: false, replayed: false });
  }

  const name = str(data.name, 60);
  const phone = str(data.phone, 30);
  const address = str(data.address, 120);
  const zipCode = str(data.zipCode, 10);
  const concern = str(data.concern);
  const timeline = str(data.timeline);
  const decisionMaker = str(data.decisionMaker);
  const email = str(data.email, 120);
  const phoneDigits = phone.replace(/\D/g, '');

  const problems = [
    !/^[A-Za-z\s\-'.]{2,60}$/.test(name) && 'your name',
    !(phoneDigits.length === 10 || (phoneDigits.length === 11 && phoneDigits.startsWith('1'))) && 'a valid phone number',
    address.length < 4 && 'your street address',
    !/^\d{5}$/.test(zipCode) && 'a 5-digit ZIP code',
    !CONCERNS.includes(concern) && "what's going on with your panel",
    !TIMELINES.includes(timeline) && 'your timeline',
    !['Yes', 'No'].includes(decisionMaker) && 'whether you own the home',
    email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 'a valid email (or leave it blank)',
  ].filter(Boolean);
  if (problems.length) {
    return NextResponse.json({ ok: false, error: `Please add ${problems.join(', ')}.` }, { status: 400 });
  }

  const lead: PanelLead = {
    submissionId,
    name,
    phone,
    email: email || undefined,
    address,
    zipCode,
    concern,
    timeline,
    decisionMaker,
    smsOptIn: data.smsConsent === true,
    page: str(data.page, 300),
    gclid: str(data.gclid, 200) || undefined,
    gbraid: str(data.gbraid, 200) || undefined,
    wbraid: str(data.wbraid, 200) || undefined,
    utmSource: str(data.utm_source, 100) || undefined,
    utmMedium: str(data.utm_medium, 100) || undefined,
    utmCampaign: str(data.utm_campaign, 150) || undefined,
    utmTerm: str(data.utm_term, 150) || undefined,
    utmContent: str(data.utm_content, 150) || undefined,
    timestamp: new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date()),
  };
  const hasClickId = !!(lead.gclid || lead.gbraid || lead.wbraid);

  // Without the store we can't guarantee once-only, so the lead still goes to
  // GHL (the lead matters more than the tracking) but is never conversion-eligible.
  if (kvMode() === 'unavailable') {
    log('panel_lead.kv_unavailable', { submissionId });
    try {
      await pushPanelLeadToGHL(lead, { repeat: false });
      return NextResponse.json({ ok: true, submissionId, conversionEligible: false, repeat: false, replayed: false });
    } catch (err) {
      log('panel_lead.ghl_failed', { submissionId, error: (err as Error).message });
      return NextResponse.json({ ok: false, error: 'We could not send your request. Please call us.' }, { status: 502 });
    }
  }

  const subKey = `pl:sub:${submissionId}`;
  const won = await kvSetNX(subKey, JSON.stringify({ state: 'processing', startedAt: Date.now() }), SUBMISSION_TTL);
  if (!won) {
    const existing = JSON.parse((await kvGet(subKey)) || 'null') as SubmissionRecord | null;
    if (existing?.state === 'done') {
      log('panel_lead.replayed', { submissionId });
      return receipt(submissionId, existing, true);
    }
    if (existing && Date.now() - existing.startedAt < STALE_PROCESSING_MS) {
      log('panel_lead.in_flight', { submissionId });
      return NextResponse.json({ ok: false, retry: true, error: 'Still sending…' }, { status: 409 });
    }
    // Stale lock from a crashed attempt: take it over. GHL upserts on phone and
    // the trigger field holds the same value, so this cannot double-fire.
    log('panel_lead.stale_takeover', { submissionId });
    await kvSet(subKey, JSON.stringify({ state: 'processing', startedAt: Date.now() }), SUBMISSION_TTL);
  }

  const phoneKey = `pl:phone:${createHash('sha256').update(phoneDigits.slice(-10)).digest('hex')}`;
  const firstForPhone = await kvSetNX(phoneKey, submissionId, REPEAT_WINDOW);
  const repeat = !firstForPhone && (await kvGet(phoneKey)) !== submissionId;

  try {
    const { contactId, warnings } = await pushPanelLeadToGHL(lead, { repeat });
    const rec: SubmissionRecord = { state: 'done', startedAt: Date.now(), conversionEligible: !repeat, repeat };
    await kvSet(subKey, JSON.stringify(rec), SUBMISSION_TTL);
    log('panel_lead.accepted', { submissionId, contactId, repeat, hasClickId, warnings });
    return receipt(submissionId, rec, false);
  } catch (err) {
    // Release the locks so the browser's retry (same submission ID) can try again.
    await kvDel(subKey);
    if (firstForPhone) await kvDel(phoneKey);
    log('panel_lead.ghl_failed', { submissionId, error: (err as Error).message });
    return NextResponse.json(
      { ok: false, error: 'We could not send your request. Please try again or call us.' },
      { status: 502 }
    );
  }
}
