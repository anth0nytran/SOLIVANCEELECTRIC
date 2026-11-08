// Generator size estimator: the rules. Pure and deterministic, so the browser and the
// server compute the same answer and the server never trusts a result sent to it.
//
// This is a product-discovery tool, not a load calculation. It only ever returns a
// RANGE of models from the real catalog, and every result says a licensed electrician
// confirms the size on site. It never says "you need a 22 kW".
//
// DRAFT RULES: Josh must approve the tiers below before this page goes live.
// Change a tier here and the result, the CRM note, and the alert all follow.

import { products, type Product } from './products';

export const ESTIMATOR_VERSION = '2026-11-08-draft';

// ── Questions ──────────────────────────────────────────────────────────────

export const GOALS = [
  { id: 'essentials', label: 'Just the essentials', hint: 'Lights, fridge, outlets, Wi-Fi' },
  { id: 'whole', label: 'My whole home', hint: 'AC included, like nothing happened' },
] as const;

export const AC_COUNTS = [
  { id: '0', label: 'None' },
  { id: '1', label: '1' },
  { id: '2', label: '2' },
  { id: '3+', label: '3 or more' },
  { id: 'unsure', label: 'Not sure' },
] as const;

export const HOME_SIZES = [
  { id: 'under-2000', label: 'Under 2,000 sq ft' },
  { id: '2000-3500', label: '2,000–3,500 sq ft' },
  { id: '3500-5000', label: '3,500–5,000 sq ft' },
  { id: '5000+', label: 'Over 5,000 sq ft' },
  { id: 'unsure', label: 'Not sure' },
] as const;

export const BIG_LOADS = [
  { id: 'water-heater', label: 'Electric water heater' },
  { id: 'stove', label: 'Electric stove / oven' },
  { id: 'dryer', label: 'Electric dryer' },
  { id: 'pool', label: 'Pool or spa' },
  { id: 'ev', label: 'EV charger' },
  { id: 'well', label: 'Well pump' },
  { id: 'electric-heat', label: 'Electric heat' },
] as const;

export const FUELS = [
  { id: 'ng', label: 'Natural gas' },
  { id: 'lp', label: 'Propane' },
  { id: 'unsure', label: 'Not sure' },
] as const;

export const TIMELINES = ['As soon as possible', 'Within 30 days', '1–3 months', 'Just researching'] as const;

type Id<T extends readonly { id: string }[]> = T[number]['id'];
export type Goal = Id<typeof GOALS>;
export type AcCount = Id<typeof AC_COUNTS>;
export type HomeSize = Id<typeof HOME_SIZES>;
export type BigLoad = Id<typeof BIG_LOADS>;
export type Fuel = Id<typeof FUELS>;

export interface EstimatorAnswers {
  goal: Goal;
  ac: AcCount;
  /** The rest are optional "make it exact" answers given after the lead is captured. */
  homeSize?: HomeSize;
  loads?: BigLoad[];
  fuel?: Fuel;
  timeline?: string;
}

// ── Rules ──────────────────────────────────────────────────────────────────

export type Tier = 'essentials' | 'whole' | 'large' | 'specialist';

const TIER_MODELS: Record<Tier, string[]> = {
  essentials: ['040746', '040757'], // PP13, PP18+
  whole: ['040757', '040787', '040807'], // PP18+, PP22+, PP26+
  large: ['040787', '040807'], // PP22+, PP26+
  specialist: ['076880', '076830', '076850', '076860'], // Fortress 30 / 35 / 48 / 60
};

export interface EstimateResult {
  version: string;
  tier: Tier;
  /** e.g. "18–26 kW" (fuel-aware). */
  range: string;
  headline: string;
  explanation: string;
  models: Product[];
  /** The model shown as "our pick for your home": a starting point, confirmed on site.
   *  None for the specialist tier (that one needs a real load calc first). */
  topPick?: Product;
  /** True whenever something is unknown or the load is complex. Almost always true. */
  reviewNeeded: boolean;
  /** Things Josh should check on site, in plain words. */
  checkOnSite: string[];
}

const pick = (ids: readonly string[], value: unknown) => (typeof value === 'string' && ids.includes(value) ? value : undefined);

/** Normalize untrusted input (from the browser or a request body). */
export function parseAnswers(raw: Record<string, unknown>): EstimatorAnswers | null {
  const goal = pick(GOALS.map((g) => g.id), raw.goal) as Goal | undefined;
  const ac = pick(AC_COUNTS.map((a) => a.id), raw.ac) as AcCount | undefined;
  if (!goal || !ac) return null;
  const loadIds = BIG_LOADS.map((l) => l.id) as string[];
  const loads = Array.isArray(raw.loads) ? (raw.loads.filter((l) => loadIds.includes(l as string)) as BigLoad[]) : undefined;
  return {
    goal,
    ac,
    homeSize: pick(HOME_SIZES.map((h) => h.id), raw.homeSize) as HomeSize | undefined,
    loads: loads ? Array.from(new Set(loads)) : undefined,
    fuel: pick(FUELS.map((f) => f.id), raw.fuel) as Fuel | undefined,
    timeline: pick(TIMELINES, raw.timeline),
  };
}

/** "13 / 11.5 kW" -> { lp: 13, ng: 11.5 }; "30 kW" -> { lp: 30, ng: 30 } */
function ratings(p: Product) {
  const [lp, ng] = (p.kw || '').replace(' kW', '').split('/').map((s) => parseFloat(s));
  return { lp, ng: Number.isFinite(ng) ? ng : lp };
}

const kw = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(1));

function fuelRange(models: Product[], fuel?: Fuel): string {
  const vals = models.flatMap((m) => {
    const r = ratings(m);
    return fuel === 'ng' ? [r.ng] : fuel === 'lp' ? [r.lp] : [r.lp, r.ng];
  });
  const lo = Math.min(...vals);
  const hi = Math.max(...vals);
  const suffix = fuel === 'ng' ? ' on natural gas' : fuel === 'lp' ? ' on propane' : '';
  return `${kw(lo)}–${kw(hi)} kW${suffix}`;
}

export function estimate(a: EstimatorAnswers): EstimateResult {
  const loads = a.loads ?? [];
  const has = (l: BigLoad) => loads.includes(l);
  const checkOnSite: string[] = [];

  // Tier: the most demanding rule that matches wins.
  let tier: Tier;
  if (a.ac === '3+' || a.homeSize === '5000+' || has('electric-heat') || (has('ev') && has('pool'))) {
    tier = 'specialist';
  } else if (a.ac === '2' || a.homeSize === '3500-5000' || loads.length >= 2) {
    tier = 'large';
  } else if (a.goal === 'essentials' && (a.ac === '0' || a.ac === '1') && loads.length === 0) {
    tier = 'essentials';
  } else {
    // Whole home, or anything with a "Not sure" that keeps us from going smaller.
    tier = 'whole';
  }

  // What still needs a real look. Unknowns are never treated as zero load.
  if (a.ac === 'unsure') checkOnSite.push('How many AC units you have and their size');
  else if (a.ac !== '0') checkOnSite.push(`Your AC size and starting load (${a.ac === '1' ? '1 unit' : `${a.ac} units`})`);
  if (!a.homeSize || a.homeSize === 'unsure') checkOnSite.push('Home size');
  if (a.loads === undefined) checkOnSite.push('Large electric items (water heater, stove, pool, EV charger)');
  for (const l of loads) checkOnSite.push(BIG_LOADS.find((b) => b.id === l)!.label);
  if (!a.fuel || a.fuel === 'unsure') checkOnSite.push('Fuel: natural gas or propane');
  else checkOnSite.push(a.fuel === 'ng' ? 'Gas meter and line size for the generator' : 'Propane tank size and placement');
  checkOnSite.push('Your electrical panel and transfer switch');

  const models = TIER_MODELS[tier].map((id) => products.find((p) => p.model === id)!).filter(Boolean);
  const range = fuelRange(models, a.fuel);
  const reviewNeeded = true; // Always: no automatic final recommendation.

  const copy: Record<Tier, { headline: string; explanation: string }> = {
    essentials: {
      headline: `Homes like yours usually start around ${range}.`,
      explanation:
        'For the basics, a small generator is often enough. We come out for free and check your home to be sure.',
    },
    whole: {
      headline: `Homes like yours usually start around ${range}.`,
      explanation:
        'Your AC is the biggest thing a generator has to run. We come out for free, check your AC and big appliances, and find the right size.',
    },
    large: {
      headline: `Your home likely needs the larger end: ${range}.`,
      explanation:
        'Two AC units or lots of big appliances need a bigger generator. We come out for free and check your home. Sometimes we can keep the size down and save you money.',
    },
    specialist: {
      headline: 'Your home needs a closer look from an electrician.',
      explanation:
        'Your home has a lot to power. We need to see it to size it right, and the visit is free. Big homes like yours often need one of these.',
    },
  };

  // Starting pick inside the range (DRAFT, Josh to approve with the tiers).
  const pickId: Record<Tier, string | undefined> = {
    essentials: a.ac === '0' ? '040746' : '040757', // PP13 with no AC, else PP18+
    whole: '040787', // PP22+: middle of 18–26, headroom for one AC + a big appliance
    large: '040807', // PP26+
    specialist: undefined,
  };
  const topPick = models.find((m) => m.model === pickId[tier]);

  return { version: ESTIMATOR_VERSION, tier, range, ...copy[tier], models, topPick, reviewNeeded, checkOnSite };
}

/** Plain-text answers for the CRM note and the alert. */
export function describeAnswers(a: EstimatorAnswers): string[] {
  const label = <T extends readonly { id: string; label: string }[]>(list: T, id?: string) => list.find((x) => x.id === id)?.label;
  return [
    `Backup: ${label(GOALS, a.goal)}`,
    `AC units: ${label(AC_COUNTS, a.ac)}`,
    a.homeSize ? `Home size: ${label(HOME_SIZES, a.homeSize)}` : '',
    a.loads ? `Big electric items: ${a.loads.length ? a.loads.map((l) => label(BIG_LOADS, l)).join(', ') : 'None'}` : '',
    a.fuel ? `Fuel: ${label(FUELS, a.fuel)}` : '',
    a.timeline ? `Timeline: ${a.timeline}` : '',
  ].filter(Boolean);
}
