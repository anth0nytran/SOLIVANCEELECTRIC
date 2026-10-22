// Solivance Care Plans. Names are final; everything else is waiting on Josh.
// Leave a field null/empty until the real value is known — the page shows a
// dashed "coming soon" slot in its place rather than a guess.

export type CarePlanId = 'basic' | 'plus' | 'commercial';

export type CarePlanFeature = {
  text: string;
  /** What this item would cost on its own, e.g. "$150". Builds the value stack. */
  value?: string;
};

export type CarePlan = {
  id: CarePlanId;
  name: string;
  /** Who the plan is for, one short line. */
  forWho: string | null;
  /** Display price, e.g. "$29". */
  price: string | null;
  /** e.g. "per month". */
  period: string | null;
  /** Total of the value stack, e.g. "$600". */
  totalValue: string | null;
  /** Shows a "Most popular" tag. */
  popular?: boolean;
  features: CarePlanFeature[];
};

export const carePlans: CarePlan[] = [
  { id: 'basic', name: 'Basic', forWho: null, price: null, period: null, totalValue: null, features: [] },
  { id: 'plus', name: 'Plus', forWho: null, price: null, period: null, totalValue: null, features: [] },
  { id: 'commercial', name: 'Commercial', forWho: null, price: null, period: null, totalValue: null, features: [] },
];

// Plan-wide terms. Each one feeds a section or an answer on /care-plans.
export const carePlanTerms: {
  /** What you get with any plan, short lines. Fills "With a care plan". */
  everyPlanIncludes: string[];
  /** The promise, in plain words. */
  guarantee: string | null;
  /** Can they cancel, and how. */
  cancellation: string | null;
} = {
  everyPlanIncludes: [],
  guarantee: null,
  cancellation: null,
};

// Value sent as the contact form's "service", so the GHL lead says which plan.
export const carePlanService = (plan: CarePlan) => `Care Plan: ${plan.name}`;

export const getCarePlan = (id: string | null | undefined) => carePlans.find((p) => p.id === id);
