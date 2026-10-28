// Answer options shared by the parking-lot lighting landing page form and
// /api/panel-lead (offer: 'lighting').

export const LIGHTING_CONCERNS = [
  'Lights out or not working',
  'Pole damaged or leaning',
  'Upgrade old lights to LED',
  'The lot is too dark',
  'New lights or poles',
];

// Repairs map to "Something isn't working right" in the CRM; the rest are quotes.
export const LIGHTING_REPAIR_CONCERNS = ['Lights out or not working', 'Pole damaged or leaning'];

// Nothing past 30 days: longer horizons are price shoppers. The GHL Timeline
// dropdown has no exact match for two of these, so they're mapped to its
// existing options when the lead is pushed (see GHL_TIMELINE).
export const LIGHTING_TIMELINES = ['As soon as possible', 'Within 2 weeks', 'Within 30 days', 'Just price shopping'];

export const GHL_TIMELINE: Record<string, string> = {
  'Within 2 weeks': 'Within 1–2 weeks',
  'Just price shopping': 'Just Gathering Information',
};

// Single-light repairs are welcome (Solivance has a minimum job charge).
export const LIGHT_COUNTS = ['Just 1 light', '2–5 lights', '6–20 lights', '21–50 lights', 'More than 50', 'Not sure'];

// "Your role": every lighting lead is commercial. decisionMaker feeds the GHL
// Yes/No field; roles where we can't tell from one tap leave it blank.
export const LIGHTING_ROLES = [
  { label: 'Property or facility manager', decisionMaker: 'Yes', commercial: true },
  { label: 'Property owner', decisionMaker: 'Yes', commercial: true },
  { label: 'Business owner or tenant', decisionMaker: '', commercial: true },
  { label: 'Contractor or developer', decisionMaker: '', commercial: true },
] as const;

export const getLightingRole = (label: string) => LIGHTING_ROLES.find((r) => r.label === label);
