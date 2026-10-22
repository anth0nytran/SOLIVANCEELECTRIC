import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '../config';
import { CarePlanPicker } from '../components/CarePlanPicker';
import { getCarePlan } from '../carePlans';

export const metadata: Metadata = {
  title: 'Solivance Care Plans — Basic, Plus & Commercial',
  description: `Solivance Care Plans from ${siteConfig.businessName}, a licensed Texas electrical contractor (${siteConfig.license.label}). Choose Basic, Plus, or Commercial.`,
  alternates: { canonical: '/care-plans' },
};

export default async function CarePlansPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const initial = getCarePlan((await searchParams).plan)?.id;

  return (
    <>
      <section className="page-hero">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-5 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.18em]">
            <ol className="flex flex-wrap items-center gap-2 text-white/55">
              <li><Link href="/" className="hover:text-[var(--onestop-gold)] transition-colors">Home</Link></li>
              <li aria-hidden className="text-white/25">/</li>
              <li className="text-white font-semibold">Care Plans</li>
            </ol>
          </nav>
          <h1 className="h-display text-white max-w-3xl">Solivance Care Plans</h1>
          <p className="mt-5 text-[0.98rem] sm:text-base text-white/80 leading-[1.7] max-w-2xl">
            Three plans: Basic, Plus, and Commercial. Pick the one that fits and we&apos;ll walk you through it.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <CarePlanPicker initial={initial} />
          <p className="mt-6 text-center text-[0.85rem] text-slate-500">
            {siteConfig.businessName} · {siteConfig.license.label} · {siteConfig.address.full}
          </p>
        </div>
      </section>
    </>
  );
}
