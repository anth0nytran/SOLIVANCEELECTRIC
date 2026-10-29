// Solivance Care Plans, as printed on the client's customer flyer
// (SE-CP-003 rev 1.4, printed 10/12/2026; data in Solivance_Care_Plan_LLM.csv).
// Keep this in step with that flyer: prices, inclusions and fine print come
// from it word for word.

export type CarePlanId = 'basic' | 'plus' | 'commercial';

export type CarePlan = {
  id: CarePlanId;
  name: string;
  /** Who the plan is for, e.g. "Residential". */
  forWho: string;
  price: string;
  period: string;
  /** The monthly option, shown under the price. */
  monthly: string;
  /** Plan this one builds on, shown as "Everything in …". */
  includes?: string;
  popular?: boolean;
  features: string[];
};

export const carePlans: CarePlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    forWho: 'Residential',
    price: '$199',
    period: '/ year',
    monthly: 'or $18.95 / month (12-month term)',
    features: [
      '1 whole-home safety inspection with written report',
      'Priority scheduling',
      '10% off repair items',
      'After-hours surcharge waived',
      'Member panel sticker',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    forWho: 'Residential',
    price: '$299',
    period: '/ year',
    monthly: 'or $27.95 / month (12-month term)',
    includes: 'Basic',
    popular: true,
    features: ['Thermal-imaging panel scan each year', '15% off repair items', 'Surge protector check'],
  },
  {
    id: 'commercial',
    name: 'Commercial',
    forWho: 'Business / Multi-site',
    price: '$1,495',
    period: '/ year per site',
    monthly: 'or $134.95 / month (12-month term)',
    features: [
      '2 site inspections per year with report',
      'Emergency / exit light test (up to 20 fixtures per visit)',
      '10% off repair items',
      'Priority dispatch',
    ],
  },
];

export const carePlanFinePrint =
  'Member discount applies to flat-rate repair items. Member discount does not apply to the troubleshooting minimum, hourly labor, panel or service upgrades, or items quoted on site. Annual plans: inspection can be scheduled right away. Monthly plans: first inspection after the 6th monthly payment. Monthly plans: all other benefits start immediately. Not a warranty or service contract. No free repairs. 12-month term. Renews automatically. Cancel anytime per the Membership Agreement. Card payments add 4.2%.';

// Value sent as the contact form's "service", so the GHL lead says which plan.
export const carePlanService = (plan: CarePlan) => `Care Plan: ${plan.name}`;

export const getCarePlan = (id: string | null | undefined) => carePlans.find((p) => p.id === id);
