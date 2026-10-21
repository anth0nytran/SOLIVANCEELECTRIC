import { NextResponse } from 'next/server';
import { kvGet, kvMode, kvSetNX } from '../../../lib/kv';

export const runtime = 'nodejs';

// The thank-you page asks here before pushing the Google Ads conversion event.
// Only an accepted, conversion-eligible submission can be claimed, and only once
// (SET NX). Refresh, back/forward, a second tab, or a hand-typed / guessed URL
// all get fire:false.

const CLAIM_TTL = 60 * 60 * 24 * 90; // matches Google's 90-day click window
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const result = (submissionId: string, fire: boolean, reason: string) => {
  console.info(JSON.stringify({ event: 'panel_lead.claim', submissionId, fire, reason, at: new Date().toISOString() }));
  return NextResponse.json({ fire, reason }, { headers: { 'Cache-Control': 'no-store' } });
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { submissionId?: unknown } | null;
  const submissionId = typeof body?.submissionId === 'string' ? body.submissionId : '';
  if (!UUID.test(submissionId)) return result('invalid', false, 'invalid_id');
  if (kvMode() === 'unavailable') return result(submissionId, false, 'kv_unavailable');

  const rec = JSON.parse((await kvGet(`pl:sub:${submissionId}`)) || 'null') as
    | { state?: string; conversionEligible?: boolean }
    | null;
  if (!rec) return result(submissionId, false, 'unknown_submission');
  if (rec.state !== 'done') return result(submissionId, false, 'not_accepted');
  if (!rec.conversionEligible) return result(submissionId, false, 'not_eligible');

  const first = await kvSetNX(`pl:conv:${submissionId}`, String(Date.now()), CLAIM_TTL);
  return result(submissionId, first, first ? 'claimed' : 'already_claimed');
}
