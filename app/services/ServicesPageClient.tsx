'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  Hammer,
  Store,
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
  'home-build': Hammer,
  retail: Store,
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
      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos_new/subhero-services.jpg"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2847]/95 via-[#0f2847]/80 to-[#0f2847]/55" />
        </div>
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-5 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.18em]">
            <ol className="flex items-center gap-2 text-white/55">
              <li><Link href="/" className="hover:text-[var(--onestop-gold)] transition-colors">Home</Link></li>
              <li aria-hidden className="text-white/25">/</li>
              <li className="text-white font-semibold">Services</li>
            </ol>
          </nav>

          <div className="mb-4 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.24em] text-[var(--onestop-gold)]">
            <span className="h-px w-6 bg-[var(--onestop-gold)]" />
            Full Catalog · One Crew
          </div>

          <h1 className="h-display text-white max-w-3xl">
            Commercial Electrical Services
          </h1>
          <p className="mt-5 max-w-2xl text-[0.98rem] sm:text-base text-white/80 leading-[1.7]">
            Ten years of commercial and residential electrical work across Southwest Houston, the Heights, Bellaire, and the Memorial Villages — based at 13035 S Post Oak Rd Suite I, 77045. Permits pulled, utility coordinated, inspection passed on the first walk.
          </p>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <section className="num-host bg-white py-14 sm:py-20 overflow-hidden">
        <div className="beam-layer beam-diagonal beam-diagonal--orange -top-24 -right-48 hidden md:block" aria-hidden />
        <div className="beam-layer top-20 left-8 hidden lg:block" aria-hidden>
          <div className="beam-vertical beam-vertical--accent" style={{ height: '140px' }} />
        </div>
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
              const photoSrc = service.media.find((m) => m.type === 'image')?.src;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col rounded-md overflow-hidden bg-white ring-1 ring-slate-200 hover:ring-[var(--onestop-navy-deep)]/25 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_1px_0_rgba(15,40,71,0.04),0_1px_2px_rgba(15,40,71,0.04)] hover:shadow-[0_1px_0_rgba(15,40,71,0.06),0_12px_28px_-10px_rgba(15,40,71,0.22)]"
                >
                  {/* Service photo */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--onestop-navy-deep)]">
                    {photoSrc ? (
                      <Image
                        src={photoSrc}
                        alt={service.title}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--onestop-navy-deep)] to-[var(--onestop-navy)] flex items-center justify-center">
                        <Icon className="h-16 w-16 text-[var(--onestop-gold)]/80" strokeWidth={1.2} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
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
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              href="/contact"
              className="btn-solid inline-flex items-center justify-center gap-2 bg-[var(--onestop-red)] h-12 px-7 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white rounded-md hover:bg-[#e55f15]"
            >
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${siteConfig.cleanPhone}`}
              className="btn-ghost-dark inline-flex items-center justify-center gap-2 h-12 px-7 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white rounded-md"
            >
              <Phone className="h-4 w-4" />
              <span className="font-[family-name:var(--font-app-mono)] tracking-normal normal-case text-[0.82rem]">{siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
