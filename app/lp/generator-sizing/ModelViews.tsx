'use client';

// In-funnel generator screens for /lp/generator-sizing, laid out like a store
// (grid of product cards, product page with a "buy box"), except the buy box books
// a free visit. Nothing here leaves the page. Copy is kept at a 3rd-grade level.

import { ArrowLeft, ArrowRight, CalendarCheck, Check, ChevronDown, FileCheck2, ShieldCheck, Star, Wrench } from 'lucide-react';
import { siteConfig } from '../../config';
import { reviews } from '../../reviews';
import { products, formatUsd, type Product } from '../../generators/products';
import { ProductImage } from '../../generators/ProductImage';
import { groupDetail, pairsWith, siblings, specRows } from '../../generators/details';
import { GoogleG, Stars } from '../_panel/Badges';

export const GENERATORS = products.filter((p) => p.group === 'powerprotect' || p.group === 'fortress');
export const byId = (id?: string) => GENERATORS.find((p) => p.model === id);

const cta =
  'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#E8590C] px-6 text-[1.05rem] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(232,89,12,0.7)] transition-colors hover:bg-[#CF4E0A]';
const ghost =
  'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#CDD3DA] bg-white px-5 text-[0.98rem] font-semibold text-[#0A1322] hover:border-[#0A1322]';
const card = 'rounded-2xl border border-[#E6E8EC] bg-white';
const h3 = 'text-[1.15rem] font-bold';

/** One plain line on what each model is for. Always "we check it", never a promise. */
function whatItIsFor(p: Product): string {
  if (p.model === '040746') return 'Runs the basics: lights, fridge, outlets, and Wi-Fi.';
  if (p.group === 'powerprotect') return 'Can run a whole home with one AC. We check your home to be sure.';
  return 'Made for big homes with 2 or 3 AC units. Runs long and strong in a summer outage.';
}

function ratings(p: Product) {
  const [lp, ng] = (p.kw || '').replace(' kW', '').split('/').map((s) => s.trim());
  return { lp, ng: ng || lp };
}

const kwLine = (p: Product) => {
  const r = ratings(p);
  return r.lp === r.ng ? `${r.lp} kW` : `${r.lp} kW propane · ${r.ng} kW natural gas`;
};

/** "About this item" bullets, from the catalog data only. */
function aboutBullets(p: Product): string[] {
  const r = ratings(p);
  const out = [
    p.group === 'fortress' ? `${r.lp} kW liquid-cooled engine, built for long outages` : `${r.lp} kW on propane, ${r.ng} kW on natural gas`,
    'Turns on by itself when the power goes out, and off when it comes back',
    'Runs on natural gas or propane',
  ];
  if (p.spec.includes('EnergyTrak')) out.push('EnergyTrak: check your generator from your phone');
  if (p.group === 'fortress') out.push('Block heater included for easy starts');
  if (p.warrantyYears) out.push(`${p.warrantyYears}-year Briggs & Stratton warranty`);
  return out;
}

const INSTALL_INCLUDES = [
  'We check your panel so we size it right',
  'We set the pad a safe distance from your home',
  'We run a gas line sized for it',
  'We wire in and label the transfer switch',
  'We pull the permit',
  'We walk the city check with the inspector',
  'We cut the power and test it live',
  'We register your warranty and set your first service date',
];

const QUOTE = reviews.find((r) => r.id === 'yeny-v');

// ── Product card (store grid) ─────────────────────────────────────────────

export function ProductCard({ p, onOpen, badge, tone = 'soft' }: { p: Product; onOpen: (id: string) => void; badge?: string; tone?: 'soft' | 'pick' }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(p.model)}
      className={`group flex h-full flex-col overflow-hidden text-left transition-shadow hover:shadow-[0_10px_28px_-14px_rgba(10,19,34,0.35)] ${card} ${tone === 'pick' ? 'ring-2 ring-[#E8590C]' : ''}`}
    >
      <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-[#F7F8FA] p-4">
        {badge && (
          <span className={`absolute left-3 top-3 z-10 rounded-md px-2 py-1 text-[0.7rem] font-semibold ${tone === 'pick' ? 'bg-[#E8590C] text-white' : 'bg-[#E8F3EC] text-[#1F7A4D]'}`}>{badge}</span>
        )}
        <ProductImage src={p.image} alt={`Briggs & Stratton ${p.name}`} className="h-full w-full" sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw" />
      </div>
      <div className="flex w-full flex-1 flex-col p-4">
        <p className="text-[0.75rem] font-medium text-[#5A6B7F]">Briggs &amp; Stratton</p>
        <p className="mt-0.5 text-[1rem] font-semibold leading-snug group-hover:underline">{p.name}</p>
        <p className="mt-1 text-[0.82rem] text-[#5A6B7F]">{kwLine(p)}</p>
        <div className="mt-auto pt-3">
          <p className="text-[1.25rem] font-bold tabular-nums leading-none">{formatUsd(p.map)}</p>
          <p className="mt-1 text-[0.72rem] text-[#5A6B7F]">Unit only · {p.warrantyYears}-yr warranty</p>
        </div>
      </div>
    </button>
  );
}

// ── Result page: the prize + the rest ─────────────────────────────────────

export function PickCards({ pick, others, onOpen, onAll }: { pick?: Product; others: Product[]; onOpen: (id: string) => void; onAll: () => void }) {
  return (
    <section>
      {pick && (
        <div className={`overflow-hidden ${card} ring-2 ring-[#E8590C]`}>
          <div className="flex items-center gap-2 bg-[#E8590C] px-4 py-2 text-[0.85rem] font-semibold text-white">
            <Star className="h-4 w-4 fill-white" /> Our pick for your home
          </div>
          <div className="grid gap-5 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:p-5">
            <button type="button" onClick={() => onOpen(pick.model)} className="flex aspect-[4/3] items-center justify-center rounded-xl bg-[#F7F8FA] p-4">
              <ProductImage src={pick.image} alt={`Briggs & Stratton ${pick.name}`} className="h-full w-full" sizes="(min-width: 640px) 320px, 90vw" />
            </button>
            <div className="flex flex-col">
              <p className="text-[0.8rem] font-medium text-[#5A6B7F]">Briggs &amp; Stratton</p>
              <p className="text-[1.4rem] font-bold leading-tight">{pick.name}</p>
              <p className="mt-1 text-[0.88rem] text-[#5A6B7F]">{kwLine(pick)}</p>
              <p className="mt-3 text-[1.6rem] font-bold tabular-nums leading-none">
                {formatUsd(pick.map)} <span className="text-[0.78rem] font-normal text-[#5A6B7F]">unit only</span>
              </p>
              <ul className="mt-3 grid gap-1.5">
                {aboutBullets(pick).slice(0, 3).map((t) => (
                  <li key={t} className="flex items-start gap-2 text-[0.9rem] text-[#334155]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1F7A4D]" /> {t}</li>
                ))}
              </ul>
              <button type="button" onClick={() => onOpen(pick.model)} className={`${ghost} mt-5`}>
                See full details <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {others.length > 0 && (
        <>
          <div className="mt-8 flex items-end justify-between gap-3">
            <h2 className={h3}>{pick ? 'Also a good fit' : 'Generators for your home'}</h2>
            <button type="button" onClick={onAll} className="text-[0.9rem] font-semibold text-[#B23F07] hover:underline">See all {GENERATORS.length}</button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {others.map((p) => (
              <ProductCard key={p.model} p={p} onOpen={onOpen} badge="Fits your home" />
            ))}
          </div>
        </>
      )}

      <button type="button" onClick={onAll} className={`${ghost} mt-4`}>
        See all {GENERATORS.length} generators <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-3 text-[0.78rem] leading-snug text-[#5A6B7F]">This is a best guess, not a final answer. We check your home to find the right size. Prices are for the unit only.</p>
    </section>
  );
}

// ── Nudge: gets stronger the deeper they go ───────────────────────────────

export function DepthNudge({ viewed, first, onBook }: { viewed: number; first: string; onBook: () => void }) {
  if (viewed < 2) return null;
  const strong = viewed >= 3;
  return (
    <div className={`flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 ${strong ? 'bg-[#0A1322] text-white' : 'bg-[#FFF1E8] text-[#0A1322]'}`}>
      <div>
        <p className="text-[1rem] font-semibold leading-snug">
          {strong ? `${first ? `${first}, you` : 'You'}'ve looked at ${viewed} generators. Let us tell you which one fits.` : 'Not sure which one? We’ll tell you. It’s free.'}
        </p>
        <p className={`mt-1 text-[0.88rem] ${strong ? 'text-white/75' : 'text-[#4A5A6C]'}`}>
          {strong ? 'The fastest way to know is a free visit. It takes 1 minute to book.' : 'We come to your home and check it for you.'}
        </p>
      </div>
      <button type="button" onClick={onBook} className={`${cta} min-h-12 shrink-0 text-[0.98rem] sm:w-auto`}>
        <CalendarCheck className="h-5 w-5" /> Book my free visit
      </button>
    </div>
  );
}

// ── Buy box: the store's "add to cart", ours books the visit ──────────────

function BuyBox({ p, onBook }: { p: Product; onBook: (id: string) => void }) {
  return (
    <div className={`${card} p-5`}>
      <p className="text-[1.8rem] font-bold tabular-nums leading-none">{formatUsd(p.map)}</p>
      <p className="mt-1 text-[0.8rem] text-[#5A6B7F]">Unit price. Install priced after your free visit.</p>
      <ul className="mt-4 grid gap-2.5 text-[0.9rem]">
        <li className="flex items-center gap-2.5"><Wrench className="h-4 w-4 shrink-0 text-[#1F7A4D]" /> We install it start to finish</li>
        <li className="flex items-center gap-2.5"><FileCheck2 className="h-4 w-4 shrink-0 text-[#1F7A4D]" /> Permit and city check included</li>
        <li className="flex items-center gap-2.5"><ShieldCheck className="h-4 w-4 shrink-0 text-[#1F7A4D]" /> Licensed {siteConfig.license.label}</li>
        <li className="flex items-center gap-2.5"><GoogleG className="h-4 w-4 shrink-0" /> {siteConfig.rating.toFixed(1)} stars on Google</li>
      </ul>
      <button type="button" onClick={() => onBook(p.model)} className={`${cta} mt-5`}>
        <CalendarCheck className="h-5 w-5" /> Book a free visit
      </button>
      <p className="mt-2 text-center text-[0.78rem] text-[#5A6B7F]">We check if it fits your home. No cost.</p>
      <p className="mt-4 rounded-xl bg-[#F7F8FA] p-3 text-[0.82rem] text-[#334155]"><b>Pay over time</b> with Synchrony financing.*</p>
    </div>
  );
}

// ── Product page (inside the funnel) ──────────────────────────────────────

export function ModelDetail({
  p,
  isPick,
  inRange,
  pickId,
  rangeIds,
  viewed,
  first,
  onBack,
  onBook,
  onAll,
  onOpen,
}: {
  p: Product;
  isPick: boolean;
  inRange: boolean;
  pickId?: string;
  rangeIds: string[];
  viewed: number;
  first: string;
  onBack: () => void;
  onBook: (id: string) => void;
  onAll: () => void;
  onOpen: (id: string) => void;
}) {
  const specs = specRows(p).filter((r) => !['Brand', 'Series', 'Unit price (MAP)'].includes(r.label));
  const compare = [p, ...siblings(p, 3)].sort((a, b) => a.map - b.map);
  const switches = pairsWith(p).filter((x) => x.group === 'bs-transfer');
  const badgeFor = (x: Product) => (x.model === pickId ? 'Our pick' : rangeIds.includes(x.model) ? 'Fits your home' : undefined);

  return (
    <div className="grid gap-8">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onBack} className="-ml-1 flex h-10 items-center gap-1 rounded-lg px-1 text-[0.95rem] font-semibold text-[#4A5A6C] hover:text-[#0A1322]">
          <ArrowLeft className="h-4 w-4" /> Back to my results
        </button>
        <button type="button" onClick={onAll} className="text-[0.9rem] font-semibold text-[#B23F07] hover:underline">All generators</button>
      </div>

      {/* Top: image · about this item · buy box */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_320px] lg:items-start">
        <div className={`${card} flex aspect-square items-center justify-center bg-[#F7F8FA] p-6 lg:sticky lg:top-24`}>
          <ProductImage src={p.image} alt={`Briggs & Stratton ${p.name}`} className="h-full w-full" sizes="(min-width: 1024px) 440px, 95vw" priority />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {isPick && <span className="rounded-md bg-[#E8590C] px-2 py-1 text-[0.75rem] font-semibold text-white">Our pick for you</span>}
            <span className={`rounded-md px-2 py-1 text-[0.75rem] font-semibold ${inRange ? 'bg-[#E8F3EC] text-[#1F7A4D]' : 'bg-[#F0F2F5] text-[#4A5A6C]'}`}>
              {inRange ? 'Fits your home' : 'Outside your size range'}
            </span>
          </div>
          <p className="mt-3 text-[0.85rem] font-medium text-[#5A6B7F]">Briggs &amp; Stratton · Model {p.model}</p>
          <h2 className="text-[1.7rem] font-bold leading-tight lg:text-[2rem]">{p.name} Standby Generator</h2>
          <p className="mt-1 text-[0.95rem] text-[#5A6B7F]">{kwLine(p)}</p>
          <div className="mt-3 flex items-center gap-2 text-[0.85rem] text-[#4A5A6C]">
            <Stars className="h-4 w-4" /> Solivance Electric: {siteConfig.rating.toFixed(1)} on Google
          </div>
          <hr className="my-5 border-[#E6E8EC]" />
          <p className="text-[1rem] leading-relaxed text-[#334155]">{whatItIsFor(p)}</p>
          <h3 className="mt-5 text-[1rem] font-bold">About this item</h3>
          <ul className="mt-2 grid gap-2">
            {aboutBullets(p).map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[0.95rem] text-[#334155]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1F7A4D]" /> {t}</li>
            ))}
          </ul>
        </div>

        <div className="lg:sticky lg:top-24">
          <BuyBox p={p} onBook={onBook} />
        </div>
      </section>

      <DepthNudge viewed={viewed} first={first} onBook={() => onBook(p.model)} />

      {/* Compare table */}
      <section>
        <h3 className={h3}>Compare with similar</h3>
        <div className={`${card} mt-3 overflow-x-auto`}>
          <table className="w-full min-w-[560px] text-left text-[0.88rem]">
            <thead>
              <tr className="border-b border-[#E6E8EC]">
                <th className="w-[130px] p-3" />
                {compare.map((x) => (
                  <th key={x.model} className={`p-3 align-top font-normal ${x.model === p.model ? 'bg-[#FFF7F2]' : ''}`}>
                    <button type="button" onClick={() => x.model !== p.model && onOpen(x.model)} className="block w-full text-left">
                      <span className="flex h-20 items-center justify-center rounded-lg bg-[#F7F8FA] p-2">
                        <ProductImage src={x.image} alt={x.name} className="h-full w-full" sizes="120px" />
                      </span>
                      <span className={`mt-2 block font-semibold ${x.model !== p.model ? 'hover:underline' : ''}`}>{x.name}</span>
                      {x.model === p.model ? (
                        <span className="text-[0.75rem] text-[#5A6B7F]">You’re looking at this</span>
                      ) : badgeFor(x) ? (
                        <span className="text-[0.75rem] font-semibold text-[#1F7A4D]">{badgeFor(x)}</span>
                      ) : null}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F3]">
              {[
                { l: 'Price (unit)', v: (x: Product) => <b className="tabular-nums">{formatUsd(x.map)}</b> },
                { l: 'On propane', v: (x: Product) => `${ratings(x).lp} kW` },
                { l: 'On natural gas', v: (x: Product) => `${ratings(x).ng} kW` },
                { l: 'Cooling', v: (x: Product) => (x.group === 'fortress' ? 'Liquid' : 'Air') },
                { l: 'Phone app', v: (x: Product) => (x.spec.includes('EnergyTrak') ? 'Yes' : 'Add-on') },
                { l: 'Warranty', v: (x: Product) => `${x.warrantyYears} years` },
              ].map((row) => (
                <tr key={row.l}>
                  <td className="p-3 text-[#5A6B7F]">{row.l}</td>
                  {compare.map((x) => (
                    <td key={x.model} className={`p-3 ${x.model === p.model ? 'bg-[#FFF7F2]' : ''}`}>{row.v(x)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <section className={`${card} p-5`}>
          <h3 className={h3}>What you get when we put it in</h3>
          <ul className="mt-3 grid gap-2.5">
            {INSTALL_INCLUDES.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[0.95rem]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F3EC] text-[#1F7A4D]"><Check className="h-3.5 w-3.5" /></span>
                {t}
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-6">
          <section className={`${card} p-5`}>
            <h3 className={h3}>About the {p.group === 'fortress' ? 'Fortress' : 'PowerProtect'} line</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-[#334155]">{groupDetail[p.group].overview}</p>
            <ul className="mt-3 grid gap-1.5">
              {groupDetail[p.group].bestFor.map((t) => (
                <li key={t} className="flex items-start gap-2 text-[0.92rem] text-[#334155]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1F7A4D]" /> {t}</li>
              ))}
            </ul>
          </section>
          {QUOTE && (
            <figure className={`${card} p-5`}>
              <div className="flex items-center gap-2"><Stars className="h-4 w-4" /><GoogleG className="h-4 w-4" /></div>
              <blockquote className="mt-2 text-[0.95rem] leading-relaxed text-[#334155]">“{QUOTE.quote.slice(0, QUOTE.quote.indexOf('.', 150) + 1)}”</blockquote>
              <figcaption className="mt-2 text-[0.85rem] font-semibold">{QUOTE.author}, Google review</figcaption>
            </figure>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <section className={`${card} p-5`}>
          <h3 className={h3}>Product details</h3>
          <dl className="mt-3 divide-y divide-[#EEF0F3]">
            {specs.map((r) => (
              <div key={r.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4 py-2.5 text-[0.9rem]">
                <dt className="text-[#5A6B7F]">{r.label}</dt>
                <dd className="font-medium">{r.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="grid content-start gap-6">
          <section className={`${card} p-5`}>
            <h3 className={h3}>It works with a transfer switch</h3>
            <p className="mt-1 text-[0.9rem] text-[#4A5A6C]">The switch flips your home to the generator when the power goes out. We pick the right one at your visit.</p>
            <ul className="mt-3 divide-y divide-[#EEF0F3]">
              {switches.map((x) => (
                <li key={x.model} className="flex justify-between gap-4 py-2.5 text-[0.9rem]">
                  <span>{x.name}</span>
                  <span className="font-semibold tabular-nums">{formatUsd(x.map)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${card} p-5`}>
            <h3 className={h3}>Questions people ask</h3>
            <div className="mt-2 divide-y divide-[#EEF0F3]">
              {[
                { q: `How much is the ${p.name}?`, a: `The unit is ${formatUsd(p.map)}. We give you one set price for the install after your free visit.` },
                { q: 'Can you put it in for me?', a: `Yes. We are a Briggs & Stratton dealer and licensed in Texas (${siteConfig.license.label}). We do the whole job, start to finish.` },
                { q: 'Can I pay over time?', a: 'Yes. Financing is through Synchrony, on the unit and the install. Ask at your visit.*' },
                { q: 'How do I know it’s the right size?', a: 'We come to your home and check your panel, AC, and big appliances. Then we tell you the right size. The visit is free.' },
              ].map((f) => (
                <details key={f.q} className="group py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[0.95rem] font-semibold">
                    {f.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-[#9AA5B1] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-[#4A5A6C]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="rounded-2xl bg-[#0A1322] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
        <div>
          <p className="text-[1.3rem] font-bold leading-tight">Want to know if the {p.name} fits your home?</p>
          <p className="mt-1 text-[0.95rem] text-white/75">We come out for free and tell you. No cost, no pressure.</p>
        </div>
        <button type="button" onClick={() => onBook(p.model)} className={`${cta} mt-4 shrink-0 sm:mt-0 sm:w-auto`}>
          <CalendarCheck className="h-5 w-5" /> Book my free visit
        </button>
      </section>
      <p className="text-center text-[0.75rem] text-[#5A6B7F]">*Subject to credit approval. Questions? Call {siteConfig.phone}.</p>
    </div>
  );
}

// ── All generators (store grid, inside the funnel) ────────────────────────

export function AllModels({
  pickId,
  rangeIds,
  viewed,
  first,
  onBack,
  onOpen,
  onBook,
}: {
  pickId?: string;
  rangeIds: string[];
  viewed: number;
  first: string;
  onBack: () => void;
  onOpen: (id: string) => void;
  onBook: () => void;
}) {
  const groups = [
    { title: 'PowerProtect', sub: 'Air-cooled · for most homes', items: GENERATORS.filter((p) => p.group === 'powerprotect') },
    { title: 'Fortress', sub: 'Liquid-cooled · for big homes', items: GENERATORS.filter((p) => p.group === 'fortress') },
  ];
  return (
    <div className="grid gap-8">
      <button type="button" onClick={onBack} className="-ml-1 flex h-10 w-fit items-center gap-1 rounded-lg px-1 text-[0.95rem] font-semibold text-[#4A5A6C] hover:text-[#0A1322]">
        <ArrowLeft className="h-4 w-4" /> Back to my results
      </button>
      <div>
        <h2 className="text-[1.7rem] font-bold leading-tight lg:text-[2rem]">All our generators</h2>
        <p className="mt-1 text-[0.95rem] text-[#4A5A6C]">Tap one to see the details. Green tags fit your home.</p>
      </div>
      <DepthNudge viewed={viewed} first={first} onBook={onBook} />
      {groups.map((g) => (
        <section key={g.title}>
          <div className="flex items-baseline gap-3 border-b border-[#E6E8EC] pb-2">
            <h3 className={h3}>{g.title}</h3>
            <span className="text-[0.88rem] text-[#5A6B7F]">{g.sub}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {g.items.map((p) => (
              <ProductCard
                key={p.model}
                p={p}
                onOpen={onOpen}
                tone={p.model === pickId ? 'pick' : 'soft'}
                badge={p.model === pickId ? 'Our pick' : rangeIds.includes(p.model) ? 'Fits your home' : undefined}
              />
            ))}
          </div>
        </section>
      ))}
      <section className="rounded-2xl bg-[#0A1322] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
        <div>
          <p className="text-[1.3rem] font-bold leading-tight">Not sure which one?</p>
          <p className="mt-1 text-[0.95rem] text-white/75">We come out for free and tell you the right size.</p>
        </div>
        <button type="button" onClick={onBook} className={`${cta} mt-4 shrink-0 sm:mt-0 sm:w-auto`}>
          <CalendarCheck className="h-5 w-5" /> Book my free visit
        </button>
      </section>
    </div>
  );
}
