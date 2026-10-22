'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { siteConfig } from '../config';
import { carePlans, type CarePlanId } from '../carePlans';
import { trackMarketingEvent } from './MarketingAnalytics';
import { Pending } from './Pending';

// Three-option selector. The cards are a radio group; the bar under them
// carries the chosen plan into the contact form (/contact?plan=…).
export function CarePlanPicker({ initial = 'plus' }: { initial?: CarePlanId }) {
  const [selected, setSelected] = useState<CarePlanId>(initial);
  const plan = carePlans.find((p) => p.id === selected)!;

  return (
    <div>
      <fieldset>
        <legend className="sr-only">Choose a care plan</legend>
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          {carePlans.map((p) => {
            const active = p.id === selected;
            return (
              <label
                key={p.id}
                className={`relative flex cursor-pointer flex-col rounded-xl bg-white p-5 sm:p-6 transition-all duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--onestop-navy)] ${
                  active
                    ? 'ring-2 ring-[var(--onestop-navy-deep)] shadow-[0_18px_40px_-18px_rgba(15,40,71,0.35)]'
                    : 'ring-1 ring-slate-200 hover:ring-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="care-plan"
                  value={p.id}
                  checked={active}
                  onChange={() => {
                    setSelected(p.id);
                    trackMarketingEvent('Care Plan Select', { plan: p.id });
                  }}
                  className="sr-only"
                />
                {p.popular && (
                  <span className="absolute -top-3 left-5 rounded-full bg-[var(--onestop-red)] px-3 py-1 text-[0.75rem] font-bold text-white">Most popular</span>
                )}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.85rem] font-semibold text-slate-500">Care Plan</p>
                    <h3 className="mt-0.5 text-[1.7rem] font-bold leading-tight tracking-[-0.02em] text-[var(--onestop-navy-deep)]">{p.name}</h3>
                  </div>
                  <span
                    aria-hidden
                    className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                      active ? 'bg-[var(--onestop-navy-deep)] text-white' : 'ring-1 ring-slate-300 text-transparent'
                    }`}
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                </div>

                <div className="mt-2">{p.forWho ? <p className="text-[0.98rem] leading-snug text-slate-600">{p.forWho}</p> : <Pending>Who it&apos;s for</Pending>}</div>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  {p.price ? (
                    <p className="text-[2.1rem] font-bold leading-none tracking-[-0.02em] text-[var(--onestop-navy-deep)]">
                      {p.price}
                      {p.period && <span className="ml-1.5 text-[0.95rem] font-semibold tracking-normal text-slate-500">{p.period}</span>}
                    </p>
                  ) : (
                    <Pending>Price</Pending>
                  )}
                </div>

                {p.features.length ? (
                  <ul className="mt-5 grid gap-3">
                    {p.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2.5 text-[0.98rem] leading-snug text-slate-700">
                        <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#1F7A4D]" strokeWidth={2.5} aria-hidden />
                        <span className="flex-1">{f.text}</span>
                        {f.value && <span className="shrink-0 text-[0.85rem] text-slate-400">{f.value} value</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-5">
                    <Pending>What&apos;s included</Pending>
                  </div>
                )}

                {p.totalValue && (
                  <p className="mt-5 rounded-lg bg-slate-50 px-4 py-3 text-[0.95rem] text-slate-600">
                    Total value: <span className="font-bold text-[var(--onestop-navy-deep)]">{p.totalValue}</span>
                  </p>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-col gap-3 rounded-xl bg-[var(--onestop-navy-deep)] p-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-[1rem] text-white/75" aria-live="polite">
          You picked: <span className="font-bold text-white">{plan.name}</span>
        </p>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <a
            href={`tel:${siteConfig.cleanPhone}`}
            className="btn-ghost-dark inline-flex h-12 items-center justify-center gap-2 rounded-md px-5 text-[0.88rem] font-bold text-white"
          >
            <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
          </a>
          <Link
            href={`/contact?plan=${plan.id}#form`}
            onClick={() => trackMarketingEvent('Care Plan CTA', { plan: plan.id })}
            className="btn-solid inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-6 text-[0.95rem] font-bold text-white hover:bg-[#e55f15]"
          >
            Start my {plan.name} plan <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
