'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { carePlans } from '../carePlans';

// Pages that already sell the plans (or are mid-conversion) skip the site-wide band.
const HIDE_BAND_ON = ['/', '/care-plans', '/contact'];

// Slim band that opens the footer on every other page. Same navy as the footer
// so the page steps down into one dark block instead of a grey strip on top.
export function CarePlanBand() {
  return (
    <section aria-labelledby="care-plan-band" className="bg-[var(--onestop-navy-deep)] text-white">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-white/10 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--onestop-red)]" aria-hidden>
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 id="care-plan-band" className="text-[1.3rem] font-bold leading-tight tracking-[-0.015em] sm:text-[1.5rem]">
                Solivance Care Plans
              </h2>
              <p className="mt-1 text-[0.93rem] text-white/65">
                Yearly inspection, priority scheduling, member pricing on repairs.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ul className="grid grid-cols-3 gap-2 sm:flex sm:gap-2.5">
              {carePlans.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/care-plans?plan=${p.id}`}
                    className="flex flex-col items-center rounded-lg px-1.5 py-2 ring-1 sm:px-3 ring-white/15 transition-colors hover:bg-white/5 hover:ring-white/40 sm:min-w-[6.5rem]"
                  >
                    <span className="whitespace-nowrap text-[0.66rem] font-semibold uppercase tracking-[0.04em] text-white/60 sm:text-[0.72rem] sm:tracking-[0.1em]">{p.name}</span>
                    <span className="whitespace-nowrap text-[0.95rem] font-extrabold tabular-nums sm:text-[1.05rem]">{p.price}<span className="text-[0.75rem] font-medium text-white/55">/yr</span></span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/care-plans"
              className="btn-solid inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-6 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#E55F15]"
            >
              Compare plans <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteCarePlanBand() {
  const pathname = usePathname();
  if (!pathname || HIDE_BAND_ON.includes(pathname) || pathname.startsWith('/lp')) return null;
  return <CarePlanBand />;
}

// Compact card for page sidebars.
export function CarePlanCard() {
  return (
    <Link
      href="/care-plans"
      className="group block rounded-md bg-white p-5 shadow-[inset_0_0_0_1px_rgba(15,40,71,0.08),0_1px_2px_rgba(15,40,71,0.04)] transition-shadow hover:shadow-[inset_0_0_0_1px_rgba(15,40,71,0.18),0_12px_28px_-10px_rgba(15,40,71,0.20)]"
    >
      <div className="flex items-center gap-2.5">
        <ShieldCheck className="h-4 w-4 text-[var(--onestop-red)]" aria-hidden />
        <p className="text-[0.95rem] font-bold text-[var(--onestop-navy-deep)]">Solivance Care Plans</p>
      </div>
      <p className="mt-1.5 text-[0.85rem] text-slate-600">{carePlans.map((p) => p.name).join(', ').replace(/, ([^,]*)$/, ', or $1')}.</p>
      <span className="mt-3 inline-flex items-center gap-1 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-[var(--onestop-red)]">
        Compare plans <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
