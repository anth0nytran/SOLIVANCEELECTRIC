// Solivance Care Plans, as printed on the client's membership flyer
// ("Solivance Care Plan Membership Flyer.png"). Keep this in step with that
// flyer: prices, inclusions and fine print come from it word for word.

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
      '10% off eligible repair items',
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
    features: ['Thermal-imaging panel scan each year', 'Surge protector check', '15% off eligible repair items'],
  },
  {
    id: 'commercial',
    name: 'Commercial',
    forWho: 'Business / Multi-site',
    price: '$649',
    period: '/ year per site',
    monthly: 'or $59 / month per site (12-month term)',
    features: [
      '2 site inspections per year with report',
      'Emergency / exit light test (up to 20 fixtures per visit)',
      '10% off eligible repair items',
      'Priority dispatch',
    ],
  },
];

export const carePlanFinePrint =
  'Member discount applies to eligible flat-rate repair items; it does not apply to panel or service upgrades, troubleshooting minimum, hourly labor, or items quoted on site. Annual plans: inspection can be scheduled right away. Monthly plans: first inspection after the 6th payment. All other benefits start immediately. 12-month term, renews automatically; cancel anytime per the Membership Agreement.';

// Value sent as the contact form's "service", so the GHL lead says which plan.
export const carePlanService = (plan: CarePlan) => `Care Plan: ${plan.name}`;

export const getCarePlan = (id: string | null | undefined) => carePlans.find((p) => p.id === id);
