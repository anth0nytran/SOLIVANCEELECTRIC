// GoHighLevel (LeadConnector) CRM integration.
//
// Every website form submission is upserted as a contact via the GHL API v2,
// tagged `website-form`, and given a note that captures every field from the
// form so nothing is lost even if custom fields aren't configured in the location.
//
// Configure via environment:
//   GHL_API_TOKEN         Private Integration token (Bearer). Required to enable.
//                         (GHL_API_KEY is also accepted as a fallback.)
//   GHL_LOCATION_ID       Sub-account / location ID. Required to enable.
//   GHL_API_VERSION       Optional. Defaults to 2021-07-28.
//   GHL_WEBSITE_LEAD_TAGS Optional. Comma-separated tags applied to the contact.
//                         Defaults to `website-form` when unset.
//
// If the API token or location ID is missing, the push is silently skipped so the
// form keeps working in local/dev and email delivery is never blocked.

const GHL_BASE = 'https://services.leadconnectorhq.com';

export type GhlLead = {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  zipCode?: string;
  company?: string;
  service?: string;
  preferredDate?: string;
  timeline?: string;
  urgency?: string;
  message?: string;
  smsOptIn: boolean;
  page?: string;
  site?: string;
  timestamp: string;
};

export type GhlResult =
  | { ok: true; skipped: true }
  | { ok: true; skipped: false; contactId: string; noteCreated: boolean }
  | { ok: false; error: string };

export const splitName = (full: string): { firstName: string; lastName: string } => {
  const parts = full.trim().split(/\s+/);
  if (parts.length <= 1) return { firstName: parts[0] || '', lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
};

export const toE164 = (phone?: string): string | undefined => {
  if (!phone) return undefined;
  if (phone.trim().startsWith('+')) return phone.replace(/[^\d+]/g, '');
  const digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return `+${digits}`;
};

// Solivance location custom field IDs. The internal SMS alert reads these
// ({{contact.service_needed}}, {{contact.project_address}}, ...), so the note
// alone isn't enough — without them the alert comes through blank.
const FIELD_IDS = {
  serviceNeeded: 'Bqm6oHVz8myNq5uXyn43',
  projectAddress: 'AmuRw3NqxKpl2J4ri2JL',
  zipCode: '4I6XGl22zlzOU5sgiE4i',
  message: 'XlZbSoBMpPd89AEYmAmE',
  appointmentRequest: 'kba8DFcovh8wycuh5F66',
  urgency: '1EQlm2J8qp7jALT2yHWj',
  leadSource: 'MmMEKATsFF8LbqTsNJGG',
  formType: 'EoalxjgavysuRSe8HTxa',
  smsConsent: 'pORpro8NYWXiZRYxpYoA',
  smsConsentSource: 'zDEftj3GYVkPHBxoJmBE',
} as const;

// Website service labels -> the CRM's "Service Needed" dropdown options.
const SERVICE_MAP: Record<string, string> = {
  'Panel Upgrades': 'Panel Upgrade / Replacement',
  'Generator Installs': 'Generator Installation',
  'Parking Lot Lighting': 'Lighting (LED / Parking Lot / Soffit)',
  'Soffit Lighting': 'Lighting (LED / Parking Lot / Soffit)',
  'EV Chargers': 'EV Charger Installation',
  'New Commercial Warehouses': 'New Construction / Build-Out',
  'New Home Builds (Single & Multi-Family)': 'New Construction / Build-Out',
  'New Commercial & Shopping Centers': 'New Construction / Build-Out',
  'RV Park Pedestals': 'RV Park / Mobile Home Hookup',
  'Mobile Home Connections': 'RV Park / Mobile Home Hookup',
};

// "2026-10-13" + "Morning (8am–12pm)" -> "Tue, Oct 13 - Morning (8am–12pm)"
const formatAppointment = (date?: string, window?: string): string => {
  let day = date || '';
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    day = new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', {
      timeZone: 'UTC',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }
  return [day, window].filter(Boolean).join(' - ');
};

const buildCustomFields = (lead: GhlLead) =>
  [
    { id: FIELD_IDS.serviceNeeded, value: lead.service ? SERVICE_MAP[lead.service] || 'Other' : '' },
    { id: FIELD_IDS.projectAddress, value: lead.address },
    { id: FIELD_IDS.zipCode, value: lead.zipCode },
    { id: FIELD_IDS.message, value: lead.message },
    { id: FIELD_IDS.appointmentRequest, value: formatAppointment(lead.preferredDate, lead.timeline) },
    { id: FIELD_IDS.urgency, value: lead.urgency },
    { id: FIELD_IDS.leadSource, value: 'Website Form' },
    { id: FIELD_IDS.formType, value: 'Website Estimate Form' },
    { id: FIELD_IDS.smsConsent, value: lead.smsOptIn ? 'Yes' : 'No' },
    { id: FIELD_IDS.smsConsentSource, value: lead.page },
  ]
    .filter((f) => f.value)
    .map((f) => ({ id: f.id, field_value: f.value }));

const buildNote = (lead: GhlLead): string =>
  [
    'New website form submission',
    `Submitted: ${lead.timestamp}`,
    lead.name ? `Name: ${lead.name}` : '',
    lead.phone ? `Phone: ${lead.phone}` : '',
    lead.email ? `Email: ${lead.email}` : '',
    lead.address ? `Address: ${lead.address}` : '',
    lead.zipCode ? `Zip Code: ${lead.zipCode}` : '',
    lead.company ? `Company: ${lead.company}` : '',
    lead.service ? `Service: ${lead.service}` : '',
    lead.preferredDate ? `Preferred Date: ${lead.preferredDate}` : '',
    lead.timeline ? `Time Window: ${lead.timeline}` : '',
    lead.urgency ? `Urgency: ${lead.urgency}` : '',
    `SMS Consent: ${lead.smsOptIn ? 'YES — opted in to SMS' : 'No (not checked)'}`,
    lead.page ? `Opt-in Source: ${lead.page}` : '',
    lead.site ? `Site: ${lead.site}` : '',
    `Message: ${lead.message || '(none)'}`,
  ]
    .filter(Boolean)
    .join('\n');

export async function pushLeadToGHL(lead: GhlLead): Promise<GhlResult> {
  const apiKey = process.env.GHL_API_TOKEN || process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  const version = process.env.GHL_API_VERSION || '2021-07-28';

  if (!apiKey || !locationId) {
    return { ok: true, skipped: true };
  }

  const configuredTags = (process.env.GHL_WEBSITE_LEAD_TAGS || 'website-form')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const tags = Array.from(new Set(configuredTags.length ? configuredTags : ['website-form']));

  const { firstName, lastName } = splitName(lead.name);

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Version: version,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const contactBody: Record<string, unknown> = {
    locationId,
    firstName,
    lastName,
    name: lead.name,
    tags,
    source: 'Website Form',
  };
  if (lead.email) contactBody.email = lead.email;
  const e164 = toE164(lead.phone);
  if (e164) contactBody.phone = e164;
  if (lead.address) contactBody.address1 = lead.address;
  if (lead.zipCode) contactBody.postalCode = lead.zipCode;
  if (lead.company) contactBody.companyName = lead.company;
  contactBody.customFields = buildCustomFields(lead);

  // Upsert dedupes on email/phone so repeat requests update the same contact
  // rather than creating duplicates.
  let contactId: string;
  try {
    const res = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify(contactBody),
    });
    const json = (await res.json().catch(() => null)) as
      | { contact?: { id?: string }; id?: string; message?: string }
      | null;
    if (!res.ok) {
      const msg = json?.message || `GHL upsert failed (${res.status})`;
      return { ok: false, error: msg };
    }
    contactId = json?.contact?.id || json?.id || '';
    if (!contactId) {
      return { ok: false, error: 'GHL upsert returned no contact id.' };
    }
  } catch (err) {
    return { ok: false, error: `GHL upsert error: ${(err as Error).message}` };
  }

  // Attach a note with the full submission so every field lands in the CRM,
  // independent of whether custom fields exist in the location.
  let noteCreated = false;
  try {
    const noteRes = await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ body: buildNote(lead) }),
    });
    noteCreated = noteRes.ok;
  } catch {
    // Contact is already created; a failed note shouldn't fail the push.
    noteCreated = false;
  }

  return { ok: true, skipped: false, contactId, noteCreated };
}
