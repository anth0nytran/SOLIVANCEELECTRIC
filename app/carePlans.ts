// Solivance Care Plans. Names are final; price and what's included are still
// to come from Josh. Leave a field null/empty until the real value is known —
// the UI shows "coming soon" in its place rather than a guess.

export type CarePlanId = 'basic' | 'plus' | 'commercial';

export type CarePlan = {
  id: CarePlanId;
  name: string;
  /** Who the plan is for, one short line. */
  forWho: string | null;
  /** Display price, e.g. "$29/mo". */
  price: string | null;
  features: string[];
};

export const carePlans: CarePlan[] = [
  { id: 'basic', name: 'Basic', forWho: null, price: null, features: [] },
  { id: 'plus', name: 'Plus', forWho: null, price: null, features: [] },
  { id: 'commercial', name: 'Commercial', forWho: null, price: null, features: [] },
];

// Value sent as the contact form's "service", so the GHL lead says which plan.
export const carePlanService = (plan: CarePlan) => `Care Plan: ${plan.name}`;

export const getCarePlan = (id: string | null | undefined) => carePlans.find((p) => p.id === id);
