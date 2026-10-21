'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { siteConfig } from '../config';
import { carePlans, type CarePlanId } from '../carePlans';
import { trackMarketingEvent } from './MarketingAnalytics';

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
                className={`relative flex cursor-pointer flex-col rounded-lg bg-white p-5 sm:p-6 transition-all duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--onestop-navy)] ${
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
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.8rem] font-semibold text-slate-500">Solivance Care Plan</p>
                    <h3 className="mt-0.5 text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-[var(--onestop-navy-deep)]">{p.name}</h3>
                  </div>
                  <span
                    aria-hidden
                    className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                      active ? 'bg-[var(--onestop-navy-deep)] text-white' : 'ring-1 ring-slate-300 text-transparent'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </div>

                {p.forWho && <p className="mt-2 text-[0.92rem] leading-snug text-slate-600">{p.forWho}</p>}

                <p className={`mt-5 border-t border-slate-100 pt-5 ${p.price ? 'text-[1.9rem] font-bold tracking-[-0.02em] text-[var(--onestop-navy-deep)]' : 'text-[0.95rem] font-semibold text-slate-400'}`}>
                  {p.price ?? 'Pricing coming soon'}
                </p>

                {p.features.length ? (
                  <ul className="mt-4 grid gap-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--onestop-red)]" strokeWidth={2.5} aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-[0.9rem] leading-snug text-slate-500">What&apos;s included will be listed here soon. Call and we&apos;ll walk you through it.</p>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-col gap-3 rounded-lg bg-[var(--onestop-navy-deep)] p-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-[0.95rem] text-white/75" aria-live="polite">
          Selected: <span className="font-bold text-white">{plan.name}</span>
        </p>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <a
            href={`tel:${siteConfig.cleanPhone}`}
            className="btn-ghost-dark inline-flex h-12 items-center justify-center gap-2 rounded-md px-5 text-[0.82rem] font-bold text-white"
          >
            <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
          </a>
          <Link
            href={`/contact?plan=${plan.id}#form`}
            onClick={() => trackMarketingEvent('Care Plan CTA', { plan: plan.id })}
            className="btn-solid inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-6 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#e55f15]"
          >
            Ask about {plan.name} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
