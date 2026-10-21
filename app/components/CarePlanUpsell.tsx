'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { carePlans } from '../carePlans';

// Pages that already sell the plans (or are mid-conversion) skip the site-wide band.
const HIDE_BAND_ON = ['/', '/care-plans', '/contact'];

// Full-width band. Placed inline on the home page and, via SiteCarePlanBand,
// above the footer on every other page.
export function CarePlanBand() {
  return (
    <section aria-labelledby="care-plan-band" className="border-y border-slate-200 bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[var(--onestop-navy-deep)] text-white" aria-hidden>
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 id="care-plan-band" className="text-[1.35rem] font-bold leading-tight tracking-[-0.015em] text-[var(--onestop-navy-deep)] sm:text-[1.6rem]">
              Solivance Care Plans
            </h2>
            <p className="mt-1.5 text-[0.95rem] text-slate-600">Choose from three plans.</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {carePlans.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/care-plans?plan=${p.id}`}
                    className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-[0.85rem] font-semibold text-[var(--onestop-navy-deep)] ring-1 ring-slate-200 transition-colors hover:ring-[var(--onestop-navy-deep)]"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link
          href="/care-plans"
          className="btn-solid inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[var(--onestop-navy-deep)] px-6 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-[var(--onestop-red)]"
        >
          Compare plans <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
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
