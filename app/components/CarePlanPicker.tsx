'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { siteConfig } from '../config';
import { carePlans, type CarePlanId } from '../carePlans';
import { trackMarketingEvent } from './MarketingAnalytics';

// The three plan cards, laid out like the membership flyer. The cards are a
// radio group; the bar under them carries the chosen plan into the contact
// form (/contact?plan=…).

const HEAD: Record<CarePlanId, string> = {
  basic: 'bg-[#DCE9F8] text-[#0B1F3F]',
  plus: 'bg-[#0B4EA2] text-white',
  commercial: 'bg-[#D7DEE7] text-[#0B1F3F]',
};
const SUB: Record<CarePlanId, string> = {
  basic: 'text-[#0B4EA2]',
  plus: 'text-white/85',
  commercial: 'text-[#0B4EA2]',
};

const Tick = () => (
  <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0B4EA2]" aria-hidden>
    <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
  </span>
);

export function CarePlanPicker({ initial = 'plus' }: { initial?: CarePlanId }) {
  const [selected, setSelected] = useState<CarePlanId>(initial);
  const plan = carePlans.find((p) => p.id === selected)!;

  return (
    <div>
      <fieldset>
        <legend className="sr-only">Choose a care plan</legend>
        <div className="grid gap-6 pt-3 lg:grid-cols-3 lg:gap-4">
          {carePlans.map((p) => {
            const active = p.id === selected;
            return (
              <label
                key={p.id}
                className={`relative flex cursor-pointer flex-col rounded-2xl bg-white transition-shadow duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-[#0B4EA2] ${
                  active
                    ? 'ring-[3px] ring-[#0B4EA2] shadow-[0_24px_50px_-24px_rgba(11,78,162,0.55)]'
                    : 'ring-1 ring-[#D5DCE5] shadow-[0_10px_30px_-20px_rgba(11,31,63,0.35)] hover:ring-[#9DB3CF]'
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
                  <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F9C74F] px-4 py-1 text-[0.78rem] font-extrabold uppercase tracking-[0.04em] text-[#0B1F3F]">
                    Most popular
                  </span>
                )}

                <div className={`rounded-t-2xl px-6 pb-4 pt-6 text-center ${HEAD[p.id]}`}>
                  <h3 className="font-[family-name:var(--font-app-display)] text-[1.9rem] font-extrabold uppercase leading-none">{p.name}</h3>
                  <p className={`mt-1.5 text-[1rem] font-medium ${SUB[p.id]}`}>{p.forWho}</p>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
                  <div className="text-center">
                    <p className="font-[family-name:var(--font-app-display)] text-[3.4rem] font-extrabold leading-none tracking-[-0.03em] text-[#0B1F3F] tabular-nums">{p.price}</p>
                    <p className="mt-2 text-[1.2rem] font-medium text-[#0B1F3F]">{p.period}</p>
                    <p className="mt-1.5 text-[0.92rem] text-[#4A5A70]">{p.monthly}</p>
                  </div>

                  <ul className="mt-6 grid gap-3.5 border-t border-[#E3E8EF] pt-6">
                    {p.includes && (
                      <li className="flex items-start gap-3 text-[1rem] font-bold leading-snug text-[#0B1F3F]">
                        <Tick />
                        Everything in {p.includes}
                      </li>
                    )}
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[1rem] leading-snug text-[#1F2D42]">
                        <Tick />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <span
                      aria-hidden
                      className={`flex h-11 items-center justify-center rounded-lg text-[0.95rem] font-bold transition-colors ${
                        active ? 'bg-[#0B4EA2] text-white' : 'bg-[#EEF3F9] text-[#0B4EA2]'
                      }`}
                    >
                      {active ? `${p.name} selected` : `Choose ${p.name}`}
                    </span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-[#0B1F3F] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-[1.02rem] text-white/75" aria-live="polite">
          You picked <span className="font-bold text-white">{plan.name}</span> · {plan.price} {plan.period}
        </p>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <a
            href={`tel:${siteConfig.cleanPhone}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
          </a>
          <Link
            href={`/contact?plan=${plan.id}#form`}
            onClick={() => trackMarketingEvent('Care Plan CTA', { plan: plan.id })}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#F26B1F] px-6 text-[0.98rem] font-bold text-white transition-colors hover:bg-[#E55F15]"
          >
            Join {plan.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
