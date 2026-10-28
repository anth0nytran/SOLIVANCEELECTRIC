// Answer options shared by the parking-lot lighting landing page form and
// /api/panel-lead (offer: 'lighting'). Timelines reuse the panel list so the
// GHL timeline dropdown and hot/nurture routing work the same way.

export const LIGHTING_CONCERNS = [
  'Lights out or not working',
  'Pole damaged or leaning',
  'Upgrade old lights to LED',
  'The lot is too dark',
  'New lights or poles',
];

// Repairs map to "Something isn't working right" in the CRM; the rest are quotes.
export const LIGHTING_REPAIR_CONCERNS = ['Lights out or not working', 'Pole damaged or leaning'];

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
