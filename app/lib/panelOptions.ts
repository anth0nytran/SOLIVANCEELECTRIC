// Answer options shared by the panel landing-page form and /api/panel-lead.
// Timelines match the Meta instant form exactly (en dashes included) so the
// GHL hot/nurture routing ("Timeline is not Within 1–3 months") works for both.

export const CONCERNS = [
  'Old or original panel (20+ years)',
  'Breakers trip or lights flicker',
  'Federal Pacific, Zinsco or unknown brand',
  'Adding AC, EV charger or an addition',
  'Insurance or home sale needs it',
];

export const TIMELINES = ['As soon as possible', 'Within 1–2 weeks', 'Within 30 days', 'Within 1–3 months'];

// "This is for…": one tap that tells us both the property type and whether the
// person can approve the work. decisionMaker feeds the existing GHL Yes/No
// field; commercial leads leave it blank (we can't tell from one tap) and get
// their own tag instead.
export const PROPERTY_TYPES = [
  { label: 'My home (I own it)', decisionMaker: 'Yes', commercial: false },
  { label: 'A home I rent', decisionMaker: 'No', commercial: false },
  { label: 'A rental property I own or manage', decisionMaker: 'Yes', commercial: false },
  { label: 'A business or commercial building', decisionMaker: '', commercial: true },
] as const;

export const getPropertyType = (label: string) => PROPERTY_TYPES.find((p) => p.label === label);
