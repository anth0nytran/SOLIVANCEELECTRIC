// GoHighLevel push for Google Ads panel-inspection leads (/lp/panel-inspection).
//
// Kept separate from the website-form sync in ./ghl.ts so Google leads stay
// independently attributable: own source, own tag, and their own workflow
// trigger (the "Google Submission ID" field changing — written once per real
// submission, so a returning homeowner's new request re-fires it but a retry
// of the same request never does).

import { splitName, toE164 } from './ghl';

const GHL_BASE = 'https://services.leadconnectorhq.com';
export const GOOGLE_SOURCE = 'Google Ads - Electrical Panels';
export const GOOGLE_TAG = 'google-ads-lead';

const SALES_PIPELINE_ID = 'tY4vvw6LBoZDIibPngCk';
const NEW_LEAD_STAGE_ID = 'f5b10d79-0187-4be5-acc9-ba3ce0b57c57';

const FIELD_IDS = {
  googleSubmissionId: '3xBCtWCnSZccUZSazVrp',
  gclid: 'w93IITsh2ZPonKe94B1e',
  gbraid: 's0IJ3i8bEwZTbNtDvY2U',
  wbraid: 'JmfBx7ajIjozComvVSXN',
  serviceNeeded: 'Bqm6oHVz8myNq5uXyn43',
  projectType: 'Jv2usWFYTbihlkCxMf4l',
  timeline: 'WB1NsOGMVeO6oMAFN60u',
  decisionMaker: 'J2S1FJC9ZEizIk3u7Bdh',
  projectAddress: 'AmuRw3NqxKpl2J4ri2JL',
  zipCode: '4I6XGl22zlzOU5sgiE4i',
  message: 'XlZbSoBMpPd89AEYmAmE',
  leadSource: 'MmMEKATsFF8LbqTsNJGG',
  formType: 'EoalxjgavysuRSe8HTxa',
  smsConsent: 'pORpro8NYWXiZRYxpYoA',
  smsConsentSource: 'zDEftj3GYVkPHBxoJmBE',
  utmSource: 'vJzor0Iox7dreMtEeI8G',
  utmMedium: 'tsjEYQJwtOZpNhjabX8v',
  utmCampaign: 'GQezlM8Y0Gi4amGjK7YH',
  utmTerm: 'yWQkv5zKofQ2n9K8lfqF',
  utmContent: '2oLutWuONV1Ao7bbsSX5',
} as const;

// Panel concern on the landing page -> CRM "Wants Evaluated" dropdown.
const PROJECT_TYPE_MAP: Record<string, string> = {
  'Breakers trip or lights flicker': "Something isn't working right",
};

export type PanelLead = {
  submissionId: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  zipCode: string;
  concern: string;
  timeline: string;
  decisionMaker: string;
  smsOptIn: boolean;
  page?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  timestamp: string;
};

type Field = { id: string; field_value: string };

const fields = (pairs: [string, string | undefined][]): Field[] =>
  pairs.filter(([, v]) => v).map(([id, v]) => ({ id, field_value: v as string }));

const buildNote = (lead: PanelLead, repeat: boolean): string =>
  [
    repeat ? 'REPEAT Google Ads panel request (same phone within 24h — no new workflow)' : 'New Google Ads panel inspection request',
    `Submitted: ${lead.timestamp}`,
    `Submission ID: ${lead.submissionId}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : '',
    `Address: ${lead.address} ${lead.zipCode}`,
    `Panel concern: ${lead.concern}`,
    `Timeline: ${lead.timeline}`,
    `Homeowner / decision maker: ${lead.decisionMaker}`,
    `SMS Consent: ${lead.smsOptIn ? 'YES — opted in to SMS' : 'No (not checked)'}`,
    lead.gclid ? 'Google click ID: captured' : lead.gbraid || lead.wbraid ? 'Google click ID: gbraid/wbraid captured' : 'Google click ID: none',
    lead.utmCampaign ? `Campaign: ${lead.utmCampaign}` : '',
    lead.utmTerm ? `Keyword: ${lead.utmTerm}` : '',
    lead.page ? `Page: ${lead.page}` : '',
  ]
    .filter(Boolean)
    .join('\n');

async function ghl(path: string, body: unknown): Promise<Record<string, unknown>> {
  const res = await fetch(`${GHL_BASE}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_TOKEN || process.env.GHL_API_KEY}`,
      Version: process.env.GHL_API_VERSION || '2021-07-28',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const json = ((await res.json().catch(() => null)) || {}) as Record<string, unknown>;
  if (!res.ok) throw new Error(`GHL ${path} ${res.status}: ${String(json.message || 'error')}`);
  return json;
}

/**
 * Upsert the contact (+ opportunity for a new request). For a repeat request the
 * contact is updated and noted, but the submission-ID field — the workflow
 * trigger — and the opportunity are left alone so no second SMS/call fires.
 */
export async function pushPanelLeadToGHL(lead: PanelLead, opts: { repeat: boolean }) {
  // Dev-only test double: GHL_MOCK=ok|fail, GHL_MOCK_DELAY_MS=n. Logs each
  // would-be GHL write so duplicate tests can count them without touching the CRM.
  const mock = process.env.NODE_ENV !== 'production' ? process.env.GHL_MOCK : undefined;
  if (mock) {
    await new Promise((r) => setTimeout(r, Number(process.env.GHL_MOCK_DELAY_MS || 0)));
    console.info(JSON.stringify({ event: 'ghl_mock.write', submissionId: lead.submissionId, repeat: opts.repeat, mode: mock }));
    if (mock === 'fail') throw new Error('GHL mock failure');
    return { contactId: `mock-${lead.submissionId.slice(0, 8)}`, warnings: [] as string[] };
  }

  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId || !(process.env.GHL_API_TOKEN || process.env.GHL_API_KEY)) {
    throw new Error('GHL is not configured (GHL_API_TOKEN / GHL_LOCATION_ID).');
  }

  const { firstName, lastName } = splitName(lead.name);
  const customFields = fields([
    [FIELD_IDS.serviceNeeded, 'Panel Upgrade / Replacement'],
    [FIELD_IDS.projectType, PROJECT_TYPE_MAP[lead.concern] || 'Upgrading my electrical panel'],
    [FIELD_IDS.timeline, lead.timeline],
    [FIELD_IDS.decisionMaker, lead.decisionMaker],
    [FIELD_IDS.projectAddress, lead.address],
    [FIELD_IDS.zipCode, lead.zipCode],
    [FIELD_IDS.message, `Panel concern: ${lead.concern}`],
    [FIELD_IDS.leadSource, 'Google'],
    [FIELD_IDS.formType, 'Google Ads Panel Landing Page'],
    [FIELD_IDS.smsConsent, lead.smsOptIn ? 'Yes' : 'No'],
    [FIELD_IDS.smsConsentSource, lead.page],
    [FIELD_IDS.gclid, lead.gclid],
    [FIELD_IDS.gbraid, lead.gbraid],
    [FIELD_IDS.wbraid, lead.wbraid],
    [FIELD_IDS.utmSource, lead.utmSource],
    [FIELD_IDS.utmMedium, lead.utmMedium],
    [FIELD_IDS.utmCampaign, lead.utmCampaign],
    [FIELD_IDS.utmTerm, lead.utmTerm],
    [FIELD_IDS.utmContent, lead.utmContent],
    // Written last and only for a new request: this is the workflow trigger.
    [FIELD_IDS.googleSubmissionId, opts.repeat ? undefined : lead.submissionId],
  ]);

  const contactBody: Record<string, unknown> = {
    locationId,
    firstName,
    lastName,
    name: lead.name,
    phone: toE164(lead.phone),
    address1: lead.address,
    postalCode: lead.zipCode,
    tags: [GOOGLE_TAG],
    source: GOOGLE_SOURCE,
    customFields,
  };
  if (lead.email) contactBody.email = lead.email;

  const upsert = await ghl('/contacts/upsert', contactBody);
  const contact = upsert.contact as { id?: string } | undefined;
  const contactId = contact?.id || (upsert.id as string | undefined);
  if (!contactId) throw new Error('GHL upsert returned no contact id.');

  // Note and opportunity are best-effort: the contact (and its workflow
  // trigger) already exists, so failing here must not fail the lead.
  const warnings: string[] = [];
  await ghl(`/contacts/${contactId}/notes`, { body: buildNote(lead, opts.repeat) }).catch((err) =>
    warnings.push(`note: ${(err as Error).message}`)
  );
  if (!opts.repeat) {
    await ghl('/opportunities/upsert', {
      locationId,
      contactId,
      pipelineId: SALES_PIPELINE_ID,
      pipelineStageId: NEW_LEAD_STAGE_ID,
      name: `${lead.name} - Panel Inspection (Google)`,
      status: 'open',
      source: GOOGLE_SOURCE,
    }).catch((err) => warnings.push(`opportunity: ${(err as Error).message}`));
  }

  return { contactId, warnings };
}
