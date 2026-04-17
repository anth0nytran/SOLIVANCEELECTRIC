'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  Check,
  Zap,
  PlugZap,
  Lightbulb,
  Battery,
  Warehouse as WarehouseIcon,
  Cable,
  Home as HomeIcon,
} from 'lucide-react';
import { siteConfig, type ServiceItem } from '../config';
import { serviceContent, type ServiceIcon } from './serviceContent';

const iconMap: Record<ServiceIcon, typeof Zap> = {
  panel: Zap,
  generator: Battery,
  lighting: Lightbulb,
  ev: PlugZap,
  warehouse: WarehouseIcon,
  pedestal: Cable,
  'mobile-home': HomeIcon,
};

export default function ServicesPageClient({
  services,
  faqs,
}: {
  services: ServiceItem[];
  faqs: { q: string; a: string }[];
}) {
  return (
    <>
      {/* ═══ COMPACT HERO ═══ */}
      <section className="bg-[var(--onestop-navy-deep)] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 text-[0.72rem] text-white/50">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white">Services</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[var(--onestop-gold)]/15 text-[var(--onestop-gold)] px-3 py-1 rounded-sm text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-5">
            Seven services &middot; one crew
          </div>

          <h1 className="text-[2.4rem] sm:text-[3.2rem] lg:text-[3.75rem] font-extrabold text-white leading-[1.02] tracking-[-0.025em] max-w-3xl">
            Commercial Electrical Services
          </h1>
          <p className="mt-4 max-w-2xl text-[1rem] sm:text-[1.05rem] leading-[1.6] text-white/65">
            Ten years of commercial electrical work across Houston, Cypress, Katy and Memorial. Permits pulled, utility coordinated, inspection passed on the first walk.
          </p>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="mb-10">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--onestop-red)] mb-3">
              Full catalog
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold text-[var(--onestop-navy-deep)] leading-[1.15] tracking-[-0.02em]">
              Every service we offer.
            </h2>
            <p className="mt-3 text-[0.95rem] text-slate-600 max-w-2xl leading-[1.65]">
              Click any service for pricing, process, and the honest breakdown. Free inspections and fixed-fee quotes on every job.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const content = serviceContent[service.slug];
              const Icon = content ? iconMap[content.icon] : Zap;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col rounded-md overflow-hidden bg-white border border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Image area (no photos yet — clean navy with icon) */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-[var(--onestop-navy-deep)] to-[var(--onestop-navy)] flex items-center justify-center">
                    <Icon className="h-16 w-16 text-[var(--onestop-gold)]/80" strokeWidth={1.2} />
                    <div className="absolute top-3 left-3 bg-[var(--onestop-gold)] text-[var(--onestop-navy-deep)] px-2.5 py-1 rounded-sm text-[0.65rem] font-extrabold uppercase tracking-[0.12em]">
                      Commercial
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex-1 flex flex-col p-6">
                    <h3 className="text-[1.15rem] font-bold text-[var(--onestop-navy-deep)] leading-tight mb-3 group-hover:text-[var(--onestop-red)] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[0.88rem] text-slate-600 leading-[1.6] mb-4">
                      {service.summary}
                    </p>

                    <ul className="space-y-2 mb-6 flex-1">
                      {service.details.slice(0, 3).map((d) => (
                        <li key={d} className="flex items-start gap-2 text-[0.82rem] text-slate-600 leading-[1.5]">
                          <Check className="h-3.5 w-3.5 text-[var(--onestop-red)] mt-0.5 shrink-0" strokeWidth={3} />
                          <span className="line-clamp-1">{d}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--onestop-red)] group-hover:underline">
                        See {service.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[var(--onestop-red)] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FAQ — simple ═══ */}
      <section className="bg-slate-50 py-14 sm:py-20 border-t border-slate-200">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <div className="text-center mb-8">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--onestop-red)] mb-3">
              Common questions
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold text-[var(--onestop-navy-deep)] leading-[1.15] tracking-[-0.02em]">
              Frequently asked questions
            </h2>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white rounded-md">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="group" open={i === 0}>
                <summary className="flex cursor-pointer items-start justify-between gap-4 px-6 py-4 text-[0.95rem] font-semibold text-[var(--onestop-navy-deep)]">
                  <span className="leading-snug">{faq.q}</span>
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-base text-[var(--onestop-red)] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-4 text-[0.92rem] leading-[1.7] text-slate-600">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="bg-[var(--onestop-navy-deep)] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 text-center">
          <div className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--onestop-gold)] mb-3">
            Free estimate
          </div>
          <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold text-white leading-[1.15] tracking-[-0.015em]">
            Need an honest assessment?
          </h2>
          <p className="mt-3 text-[0.95rem] text-white/60 max-w-lg mx-auto leading-relaxed">
            No pressure tactics, no walk-in closing. Request a free on-site walk and fair price for any service.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--onestop-red)] h-11 px-6 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-white rounded-md hover:bg-[#e55f15] transition-colors"
            >
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${siteConfig.cleanPhone}`}
              className="inline-flex items-center gap-2 border border-white/20 h-11 px-6 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-white/90 rounded-md hover:bg-white/[0.06] transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-[family-name:var(--font-app-mono)] tracking-normal normal-case text-[0.8rem]">{siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
