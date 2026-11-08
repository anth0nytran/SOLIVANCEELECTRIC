// GoHighLevel push for the generator size estimator on /generators.
//
// These are the warmest leads on the site, so they get their own lane:
//   - tag `generator-estimator`: the workflow trigger. It is removed and re-added once
//     per NEW request, so a returning homeowner's new request fires the workflow again
//     ("Tag Added" only fires when the tag is newly added) and a retry never does.
//   - an opportunity in the "Generator Installations" pipeline (found by name; falls back
//     to the Sales Pipeline if that pipeline doesn't exist yet).
//   - Message field = the alert body (answers + size range), Service Needed = Generator.

import { splitName, toE164 } from './ghl';

const GHL_BASE = 'https://services.leadconnectorhq.com';
export const GENERATOR_TAG = 'generator-estimator';
export const GENERATOR_SOURCE = 'Website - Generator Estimator';
const TEST_TAG = 'test-lead';
const PIPELINE_NAME = 'Generator Installations';
const FALLBACK_PIPELINE_ID = 'tY4vvw6LBoZDIibPngCk'; // Sales Pipeline
const FALLBACK_STAGE_ID = 'f5b10d79-0187-4be5-acc9-ba3ce0b57c57'; // New Lead

const FIELD_IDS = {
  serviceNeeded: 'Bqm6oHVz8myNq5uXyn43',
  projectType: 'Jv2usWFYTbihlkCxMf4l',
  zipCode: '4I6XGl22zlzOU5sgiE4i',
  message: 'XlZbSoBMpPd89AEYmAmE',
  appointmentRequest: 'kba8DFcovh8wycuh5F66',
  leadSource: 'MmMEKATsFF8LbqTsNJGG',
  formType: 'EoalxjgavysuRSe8HTxa',
  smsConsent: 'pORpro8NYWXiZRYxpYoA',
  smsConsentSource: 'zDEftj3GYVkPHBxoJmBE',
  gclid: 'w93IITsh2ZPonKe94B1e',
  utmSource: 'vJzor0Iox7dreMtEeI8G',
  utmMedium: 'tsjEYQJwtOZpNhjabX8v',
  utmCampaign: 'GQezlM8Y0Gi4amGjK7YH',
  utmTerm: 'yWQkv5zKofQ2n9K8lfqF',
  utmContent: '2oLutWuONV1Ao7bbsSX5',
} as const;

export type GeneratorLead = {
  submissionId: string;
  name: string;
  phone: string;
  zipCode: string;
  smsOptIn: boolean;
  /** Short alert body: answers + estimate, one per line. */
  summary: string;
  /** Full note for the contact timeline. */
  note: string;
  page?: string;
  gclid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

type Field = { id: string; field_value: string };
const fields = (pairs: [string, string | undefined][]): Field[] =>
  pairs.filter(([, v]) => v).map(([id, v]) => ({ id, field_value: v as string }));

async function ghl(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, body?: unknown): Promise<Record<string, unknown>> {
  const res = await fetch(`${GHL_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_TOKEN || process.env.GHL_API_KEY}`,
      Version: process.env.GHL_API_VERSION || '2021-07-28',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
  });
  const json = ((await res.json().catch(() => null)) || {}) as Record<string, unknown>;
  if (!res.ok) throw new Error(`GHL ${method} ${path} ${res.status}: ${String(json.message || 'error')}`);
  return json;
}

let pipelineCache: { pipelineId: string; stageId: string; at: number } | null = null;

async function generatorPipeline(locationId: string) {
  if (pipelineCache && Date.now() - pipelineCache.at < 10 * 60_000) return pipelineCache;
  try {
    const json = await ghl('GET', `/opportunities/pipelines?locationId=${locationId}`);
    const list = (json.pipelines || []) as { id: string; name: string; stages?: { id: string; name: string; position?: number }[] }[];
    const p = list.find((x) => x.name.trim().toLowerCase() === PIPELINE_NAME.toLowerCase());
    const first = p?.stages?.slice().sort((x, y) => (x.position ?? 0) - (y.position ?? 0))[0];
    pipelineCache = p && first
      ? { pipelineId: p.id, stageId: first.id, at: Date.now() }
      : { pipelineId: FALLBACK_PIPELINE_ID, stageId: FALLBACK_STAGE_ID, at: Date.now() };
  } catch {
    pipelineCache = { pipelineId: FALLBACK_PIPELINE_ID, stageId: FALLBACK_STAGE_ID, at: Date.now() };
  }
  return pipelineCache;
}

const mocked = () => (process.env.NODE_ENV !== 'production' ? process.env.GHL_MOCK : undefined);

function configured() {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId || !(process.env.GHL_API_TOKEN || process.env.GHL_API_KEY)) {
    throw new Error('GHL is not configured (GHL_API_TOKEN / GHL_LOCATION_ID).');
  }
  return locationId;
}

/**
 * New request: upsert contact, fire the workflow tag, open the opportunity.
 * Repeat (same phone within 24h): update + note only, no tag, no opportunity.
 */
export async function pushGeneratorLead(lead: GeneratorLead, opts: { repeat: boolean; test?: boolean }) {
  const mock = mocked();
  if (mock) {
    console.info(JSON.stringify({ event: 'ghl_mock.generator_write', submissionId: lead.submissionId, repeat: opts.repeat }));
    if (mock === 'fail') throw new Error('GHL mock failure');
    return { contactId: `mock-${lead.submissionId.slice(0, 8)}`, warnings: [] as string[] };
  }
  const locationId = configured();
  const { firstName, lastName } = splitName(lead.name);
  const source = opts.test ? `${GENERATOR_SOURCE} (TEST)` : GENERATOR_SOURCE;

  const upsert = await ghl('POST', '/contacts/upsert', {
    locationId,
    firstName,
    lastName,
    name: lead.name,
    phone: toE164(lead.phone),
    postalCode: lead.zipCode,
    source,
    // No `tags` key on the upsert: it could overwrite a returning contact's tags.
    // Tags go through the add-tags endpoint below.
    customFields: fields([
      [FIELD_IDS.serviceNeeded, 'Generator Installation'],
      [FIELD_IDS.projectType, 'Adding a standby generator'],
      [FIELD_IDS.zipCode, lead.zipCode],
      [FIELD_IDS.message, lead.summary],
      [FIELD_IDS.leadSource, lead.gclid ? 'Google' : 'Website Form'],
      [FIELD_IDS.formType, 'Generator Estimator'],
      [FIELD_IDS.smsConsent, lead.smsOptIn ? 'Yes' : 'No'],
      [FIELD_IDS.smsConsentSource, lead.page],
      [FIELD_IDS.gclid, lead.gclid],
      [FIELD_IDS.utmSource, lead.utmSource],
      [FIELD_IDS.utmMedium, lead.utmMedium],
      [FIELD_IDS.utmCampaign, lead.utmCampaign],
      [FIELD_IDS.utmTerm, lead.utmTerm],
      [FIELD_IDS.utmContent, lead.utmContent],
    ]),
  });
  const contact = upsert.contact as { id?: string } | undefined;
  const contactId = contact?.id || (upsert.id as string | undefined);
  if (!contactId) throw new Error('GHL upsert returned no contact id.');

  const warnings: string[] = [];
  if (opts.test) await ghl('POST', `/contacts/${contactId}/tags`, { tags: [TEST_TAG] }).catch(() => undefined);
  await ghl('POST', `/contacts/${contactId}/notes`, { body: lead.note }).catch((e) => warnings.push(`note: ${(e as Error).message}`));

  if (!opts.repeat) {
    // Remove-then-add so "Tag Added" fires for a returning contact's new request.
    await ghl('DELETE', `/contacts/${contactId}/tags`, { tags: [GENERATOR_TAG] }).catch(() => undefined);
    // Not caught: without this tag Josh never gets the alert, so a failure fails the
    // request and the browser retries it with the same submission ID.
    await ghl('POST', `/contacts/${contactId}/tags`, { tags: [GENERATOR_TAG] });
    const { pipelineId, stageId } = await generatorPipeline(locationId);
    await ghl('POST', '/opportunities/upsert', {
      locationId,
      contactId,
      pipelineId,
      pipelineStageId: stageId,
      name: `${lead.name} - Generator (Estimator)`,
      status: 'open',
      source,
    }).catch((e) => warnings.push(`opportunity: ${(e as Error).message}`));
  }
  return { contactId, warnings };
}

/**
 * Result-page answers after the lead: refined size + the site-walk day they picked.
 * Updates the alert field and Appointment Request, adds a note. Does not re-fire the
 * lead workflow (a separate "Appointment Request changed" trigger can alert on it).
 */
export async function updateGeneratorDetails(contactId: string, summary: string, note: string, appointmentRequest?: string) {
  if (mocked()) {
    console.info(JSON.stringify({ event: 'ghl_mock.generator_details', contactId, appointmentRequest }));
    return;
  }
  configured();
  await ghl('PUT', `/contacts/${contactId}`, {
    customFields: fields([
      [FIELD_IDS.message, summary],
      [FIELD_IDS.appointmentRequest, appointmentRequest],
    ]),
  });
  await ghl('POST', `/contacts/${contactId}/notes`, { body: note }).catch(() => undefined);
}
