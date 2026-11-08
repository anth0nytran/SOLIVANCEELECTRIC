'use client';

// In-funnel generator screens for /lp/generator-sizing. Nothing here leaves the page:
// every card opens a detail screen inside the funnel, and every screen ends in
// "book a free visit". Copy is kept at a 3rd-grade reading level on purpose.

import { ArrowLeft, ArrowRight, CalendarCheck, Check, ChevronDown, Star } from 'lucide-react';
import { siteConfig } from '../../config';
import { reviews } from '../../reviews';
import { products, formatUsd, type Product } from '../../generators/products';
import { ProductImage } from '../../generators/ProductImage';
import { groupDetail, pairsWith, siblings, specRows } from '../../generators/details';
import { Stars } from '../_panel/Badges';

export const GENERATORS = products.filter((p) => p.group === 'powerprotect' || p.group === 'fortress');
export const byId = (id?: string) => GENERATORS.find((p) => p.model === id);

const cta =
  'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#E8590C] px-6 text-[1.05rem] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(232,89,12,0.7)] transition-colors hover:bg-[#CF4E0A]';
const ghost =
  'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#CDD3DA] bg-white px-5 text-[0.98rem] font-semibold text-[#0A1322] hover:border-[#0A1322]';

/** One plain line on what each model is for. Always "we check it" — never a promise. */
function whatItIsFor(p: Product): string {
  if (p.model === '040746') return 'Runs the basics: lights, fridge, outlets, and Wi-Fi.';
  if (p.group === 'powerprotect') return 'Can run a whole home with one AC. We check your home to be sure.';
  return 'Made for big homes with 2 or 3 AC units. Runs long and strong in a summer outage.';
}

/** What the installed price covers (same list as the shop page, in plain words). */
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

const kwLine = (p: Product) => {
  const [lp, ng] = (p.kw || '').replace(' kW', '').split('/').map((s) => s.trim());
  return ng ? `${lp} kW on propane · ${ng} kW on natural gas` : `${lp} kW`;
};

const QUOTE = reviews.find((r) => r.id === 'yeny-v');

// ── Result page: the prize + the rest ─────────────────────────────────────

export function PickCards({
  pick,
  others,
  onOpen,
  onAll,
}: {
  pick?: Product;
  others: Product[];
  onOpen: (id: string) => void;
  onAll: () => void;
}) {
  return (
    <section>
      {pick && (
        <button type="button" onClick={() => onOpen(pick.model)} className="block w-full overflow-hidden rounded-3xl bg-white text-left shadow-[0_20px_50px_-24px_rgba(10,19,34,0.35)] ring-2 ring-[#E8590C]">
          <div className="flex items-center gap-2 bg-[#E8590C] px-4 py-2 text-[0.85rem] font-semibold text-white">
            <Star className="h-4 w-4 fill-white" /> Our pick for your home
          </div>
          <div className="p-4">
            <div className="flex h-44 items-center justify-center rounded-2xl bg-[#F5F6F8] p-3">
              <ProductImage src={pick.image} alt={`Briggs & Stratton ${pick.name}`} className="h-full w-full" sizes="(min-width: 640px) 560px, 90vw" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[1.25rem] font-bold leading-tight">{pick.name}</p>
                <p className="mt-1 text-[0.88rem] text-[#5A6B7F]">{kwLine(pick)}</p>
              </div>
              <p className="shrink-0 whitespace-nowrap text-right text-[1.2rem] font-bold tabular-nums">
                {formatUsd(pick.map)}
                <span className="block text-[0.72rem] font-normal text-[#5A6B7F]">unit only</span>
              </p>
            </div>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[#334155]">{whatItIsFor(pick)}</p>
            <span className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-[#F5F6F8] py-3 text-[0.95rem] font-semibold">
              See what you get <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </button>
      )}

      {others.length > 0 && (
        <>
          <p className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#B23F07]">{pick ? 'Also a good fit' : 'Generators for your home'}</p>
          <div className="mt-3 grid gap-3">
            {others.map((p) => (
              <ModelRow key={p.model} p={p} onOpen={onOpen} />
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

function ModelRow({ p, onOpen, badge }: { p: Product; onOpen: (id: string) => void; badge?: string }) {
  return (
    <button type="button" onClick={() => onOpen(p.model)} className="flex w-full items-center gap-4 rounded-2xl bg-white p-3 pr-4 text-left shadow-[0_1px_2px_rgba(10,19,34,0.06)] transition-shadow hover:shadow-[0_6px_18px_-8px_rgba(10,19,34,0.3)]">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#F5F6F8] p-2">
        <ProductImage src={p.image} alt={`Briggs & Stratton ${p.name}`} className="h-full w-full" sizes="80px" />
      </div>
      <div className="min-w-0 flex-1">
        {badge && <span className="mb-1 inline-block rounded-md bg-[#FFF1E8] px-2 py-0.5 text-[0.7rem] font-semibold text-[#B23F07]">{badge}</span>}
        <p className="text-[1rem] font-semibold leading-tight">{p.name}</p>
        <p className="mt-0.5 text-[0.82rem] text-[#5A6B7F]">{p.kw}</p>
        <p className="mt-1 text-[1rem] font-bold tabular-nums">{formatUsd(p.map)}</p>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-[#9AA5B1]" />
    </button>
  );
}

// ── Nudge: gets stronger the deeper they go ───────────────────────────────

export function DepthNudge({ viewed, first, onBook }: { viewed: number; first: string; onBook: () => void }) {
  if (viewed < 2) return null;
  const strong = viewed >= 3;
  return (
    <div className={`rounded-2xl p-4 ${strong ? 'bg-[#0A1322] text-white' : 'bg-[#FFF1E8] text-[#0A1322]'}`}>
      <p className="text-[1rem] font-semibold leading-snug">
        {strong
          ? `${first ? `${first}, you` : 'You'}'ve looked at ${viewed} generators. Let us tell you which one fits.`
          : 'Not sure which one? We’ll tell you. It’s free.'}
      </p>
      <p className={`mt-1 text-[0.88rem] ${strong ? 'text-white/75' : 'text-[#4A5A6C]'}`}>
        {strong ? 'The fastest way to know is a free visit. It takes 1 minute to book.' : 'We come to your home and check it for you.'}
      </p>
      <button type="button" onClick={onBook} className={`${cta} mt-3 min-h-12 text-[0.98rem]`}>
        <CalendarCheck className="h-5 w-5" /> Book my free visit
      </button>
    </div>
  );
}

// ── Detail screen (inside the funnel) ─────────────────────────────────────

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
  return (
    <div className="grid gap-6">
      <button type="button" onClick={onBack} className="-ml-1 flex h-10 w-fit items-center gap-1 rounded-lg px-1 text-[0.95rem] font-semibold text-[#4A5A6C] hover:text-[#0A1322]">
        <ArrowLeft className="h-4 w-4" /> Back to my results
      </button>

      <section className="overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
        <div className="flex h-60 items-center justify-center bg-[#F5F6F8] p-4">
          <ProductImage src={p.image} alt={`Briggs & Stratton ${p.name}`} className="h-full w-full" sizes="(min-width: 640px) 600px, 95vw" priority />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            {isPick && <span className="rounded-md bg-[#E8590C] px-2 py-1 text-[0.75rem] font-semibold text-white">Our pick for you</span>}
            {inRange ? (
              <span className="rounded-md bg-[#E8F3EC] px-2 py-1 text-[0.75rem] font-semibold text-[#1F7A4D]">In your size range</span>
            ) : (
              <span className="rounded-md bg-[#F5F6F8] px-2 py-1 text-[0.75rem] font-semibold text-[#4A5A6C]">Outside your size range</span>
            )}
          </div>
          <h2 className="mt-3 text-[1.6rem] font-bold leading-tight">Briggs &amp; Stratton {p.name}</h2>
          <p className="mt-1 text-[0.92rem] text-[#5A6B7F]">{kwLine(p)}</p>
          <p className="mt-3 text-[1.5rem] font-bold tabular-nums">
            {formatUsd(p.map)} <span className="text-[0.82rem] font-normal text-[#5A6B7F]">unit only · install priced after your free visit</span>
          </p>
          <p className="mt-3 text-[1rem] leading-relaxed text-[#334155]">{whatItIsFor(p)}</p>
          <button type="button" onClick={() => onBook(p.model)} className={`${cta} mt-5`}>
            <CalendarCheck className="h-5 w-5" /> See if this one fits my home
          </button>
          <p className="mt-2 text-center text-[0.8rem] text-[#5A6B7F]">Free visit · No cost · No pressure</p>
        </div>
      </section>

      <DepthNudge viewed={viewed} first={first} onBook={() => onBook(p.model)} />

      <section className="rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
        <h3 className="text-[1.1rem] font-bold">What you get when we put it in</h3>
        <ul className="mt-3 grid gap-2.5">
          {INSTALL_INCLUDES.map((t) => (
            <li key={t} className="flex items-start gap-2.5 text-[0.95rem]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F3EC] text-[#1F7A4D]"><Check className="h-3.5 w-3.5" /></span>
              {t}
            </li>
          ))}
          {p.warrantyYears && (
            <li className="flex items-start gap-2.5 text-[0.95rem]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F3EC] text-[#1F7A4D]"><Check className="h-3.5 w-3.5" /></span>
              {p.warrantyYears}-year warranty from Briggs &amp; Stratton
            </li>
          )}
        </ul>
        <p className="mt-4 rounded-xl bg-[#F5F6F8] p-3 text-[0.9rem]"><b>Pay over time.</b> Financing through Synchrony. Ask at your visit.*</p>
      </section>

      {QUOTE && (
        <figure className="rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
          <Stars className="h-4 w-4" />
          <blockquote className="mt-2 text-[0.95rem] leading-relaxed text-[#334155]">“{QUOTE.quote.slice(0, QUOTE.quote.indexOf('.', 150) + 1)}”</blockquote>
          <figcaption className="mt-2 text-[0.85rem] font-semibold">{QUOTE.author}, Google review</figcaption>
        </figure>
      )}

      <section className="rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
        <h3 className="text-[1.1rem] font-bold">About the {p.group === 'fortress' ? 'Fortress' : 'PowerProtect'} line</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-[#334155]">{groupDetail[p.group].overview}</p>
        <p className="mt-4 text-[0.9rem] font-semibold">Good for:</p>
        <ul className="mt-2 grid gap-1.5">
          {groupDetail[p.group].bestFor.map((t) => (
            <li key={t} className="flex items-start gap-2 text-[0.92rem] text-[#334155]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1F7A4D]" /> {t}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-[1.1rem] font-bold">Compare it</h3>
        <div className="mt-3 grid gap-3">
          {siblings(p, 3)
            .sort((a, b) => a.map - b.map)
            .map((x) => (
              <ModelRow key={x.model} p={x} onOpen={onOpen} badge={x.model === pickId ? 'Our pick for you' : rangeIds.includes(x.model) ? 'Fits your home' : undefined} />
            ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
        <h3 className="text-[1.1rem] font-bold">It works with a transfer switch</h3>
        <p className="mt-1 text-[0.9rem] text-[#4A5A6C]">The switch flips your home to the generator when the power goes out. We pick the right one for your home at the visit.</p>
        <ul className="mt-3 divide-y divide-[#EEF0F3]">
          {pairsWith(p)
            .filter((x) => x.group === 'bs-transfer')
            .map((x) => (
              <li key={x.model} className="flex justify-between gap-4 py-2.5 text-[0.9rem]">
                <span>{x.name}</span>
                <span className="font-semibold tabular-nums">{formatUsd(x.map)}</span>
              </li>
            ))}
        </ul>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
        <h3 className="text-[1.1rem] font-bold">Questions people ask</h3>
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

      <details className="group rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
        <summary className="flex cursor-pointer list-none items-center justify-between text-[1.05rem] font-bold">
          All the specs
          <ChevronDown className="h-5 w-5 text-[#9AA5B1] transition-transform group-open:rotate-180" />
        </summary>
        <dl className="mt-3 divide-y divide-[#EEF0F3]">
          {specs.map((r) => (
            <div key={r.label} className="flex justify-between gap-4 py-2.5 text-[0.9rem]">
              <dt className="text-[#5A6B7F]">{r.label}</dt>
              <dd className="text-right font-medium">{r.value}</dd>
            </div>
          ))}
        </dl>
      </details>

      <div className="grid gap-2">
        <button type="button" onClick={() => onBook(p.model)} className={cta}>
          <CalendarCheck className="h-5 w-5" /> Book my free visit
        </button>
        <button type="button" onClick={onAll} className={ghost}>Look at other generators</button>
      </div>
      <p className="text-center text-[0.75rem] text-[#5A6B7F]">*Subject to credit approval. Call {siteConfig.phone} with questions.</p>
    </div>
  );
}

// ── All generators (inside the funnel) ────────────────────────────────────

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
    { title: 'PowerProtect · for most homes', items: GENERATORS.filter((p) => p.group === 'powerprotect') },
    { title: 'Fortress · for big homes', items: GENERATORS.filter((p) => p.group === 'fortress') },
  ];
  return (
    <div className="grid gap-6">
      <button type="button" onClick={onBack} className="-ml-1 flex h-10 w-fit items-center gap-1 rounded-lg px-1 text-[0.95rem] font-semibold text-[#4A5A6C] hover:text-[#0A1322]">
        <ArrowLeft className="h-4 w-4" /> Back to my results
      </button>
      <div>
        <h2 className="text-[1.6rem] font-bold leading-tight">All our generators</h2>
        <p className="mt-1 text-[0.95rem] text-[#4A5A6C]">Tap one to learn more. The ones marked fit your home best.</p>
      </div>
      <DepthNudge viewed={viewed} first={first} onBook={onBook} />
      {groups.map((g) => (
        <section key={g.title}>
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#B23F07]">{g.title}</p>
          <div className="mt-3 grid gap-3">
            {g.items.map((p) => (
              <ModelRow key={p.model} p={p} onOpen={onOpen} badge={p.model === pickId ? 'Our pick for you' : rangeIds.includes(p.model) ? 'Fits your home' : undefined} />
            ))}
          </div>
        </section>
      ))}
      <button type="button" onClick={onBook} className={cta}>
        <CalendarCheck className="h-5 w-5" /> Not sure? Book a free visit
      </button>
    </div>
  );
}
