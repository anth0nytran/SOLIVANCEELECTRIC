import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '../config';
import { locationContent, locationOrder } from './locationContent';

export const metadata: Metadata = {
  title: 'Service Areas — Houston, Cypress, Katy, Memorial',
  description:
    'Solivance Electric works Houston, Cypress, Katy, and Memorial — plus the surrounding Harris and Fort Bend County metro. Licensed Texas electrical contractor. 24/7 emergency line.',
  alternates: { canonical: '/locations' },
  openGraph: {
    title: 'Service Areas — Solivance Electric',
    description:
      'Licensed commercial electrical across Greater Houston. Houston, Cypress, Katy, Memorial — plus surrounding metro.',
    url: `${siteConfig.domain}/locations`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Solivance Electric Service Areas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service Areas — Solivance Electric',
    description: 'Houston, Cypress, Katy, Memorial. Licensed Texas electrical contractor.',
    images: ['/og-image.jpg'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
    { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${siteConfig.domain}/locations` },
  ],
};

export default function LocationsIndexPage() {
  const locations = locationOrder.map((slug) => locationContent[slug]).filter(Boolean);
  const secondary = siteConfig.allServiceAreas.filter(
    (a) => !['Houston, TX', 'Cypress, TX', 'Katy, TX', 'Memorial, TX'].includes(a)
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-5 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.18em]">
            <ol className="flex flex-wrap items-center gap-2 text-white/55">
              <li><Link href="/" className="hover:text-[var(--onestop-gold)] transition-colors">Home</Link></li>
              <li aria-hidden className="text-white/25">/</li>
              <li className="text-white font-semibold">Service Areas</li>
            </ol>
          </nav>

          <div className="mb-4 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.24em] text-[var(--onestop-gold)]">
            <MapPin className="h-3.5 w-3.5" />
            Greater Houston Metro
          </div>

          <h1 className="h-display text-white max-w-4xl">
            Serving four home markets across Greater Houston.
          </h1>
          <p className="mt-5 max-w-2xl text-[0.98rem] sm:text-base text-white/80 leading-[1.7]">
            Houston, Cypress, Katy, and Memorial are the daily footprint. Harris and Fort Bend County permits are what we pull day-in, day-out. The surrounding metro is covered on a call.
          </p>
        </div>
      </section>

      {/* ═══ CITY CARD GRID ═══ */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="mb-10">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--onestop-red)] mb-3">
              Primary markets
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold text-[var(--onestop-navy-deep)] leading-[1.15] tracking-[-0.02em]">
              Where we work every week.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group flex flex-col rounded-md overflow-hidden bg-white ring-1 ring-slate-200 hover:ring-[var(--onestop-navy-deep)]/25 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_1px_0_rgba(15,40,71,0.04),0_1px_2px_rgba(15,40,71,0.04)] hover:shadow-[0_1px_0_rgba(15,40,71,0.06),0_12px_28px_-10px_rgba(15,40,71,0.22)]"
              >
                {/* City photo */}
                <div className="relative aspect-[16/7] overflow-hidden bg-[var(--onestop-navy-deep)]">
                  <Image
                    src={`/photos_new/${loc.slug}.jpg`}
                    alt={loc.fullName}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[var(--onestop-gold)] text-[var(--onestop-navy-deep)] px-2.5 py-1 rounded-sm text-[0.65rem] font-extrabold uppercase tracking-[0.12em]">
                    {loc.positionLine.split('·')[0].trim()}
                  </div>
                </div>

                <div className="flex-1 flex flex-col p-6 sm:p-7">
                  <h3 className="text-[1.5rem] font-bold text-[var(--onestop-navy-deep)] leading-tight mb-2 group-hover:text-[var(--onestop-red)] transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-[0.88rem] text-slate-600 leading-[1.6] mb-5 line-clamp-3">
                    {loc.heroLede}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {loc.zipCodes.slice(0, 4).map((z) => (
                      <span
                        key={z}
                        className="inline-flex items-center rounded-sm bg-slate-100 px-2 py-0.5 text-[0.68rem] font-[family-name:var(--font-app-mono)] text-slate-600"
                      >
                        {z}
                      </span>
                    ))}
                    {loc.zipCodes.length > 4 && (
                      <span className="inline-flex items-center rounded-sm bg-slate-100 px-2 py-0.5 text-[0.68rem] font-[family-name:var(--font-app-mono)] text-slate-400">
                        +{loc.zipCodes.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--onestop-red)] group-hover:underline">
                      View {loc.name} page
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[var(--onestop-red)] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECONDARY AREAS ═══ */}
      <section className="bg-slate-50 py-14 sm:py-16 border-t border-slate-200">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--onestop-red)] mb-3">
                Also covered
              </div>
              <h2 className="text-[1.5rem] sm:text-[1.85rem] font-bold text-[var(--onestop-navy-deep)] leading-[1.15] tracking-[-0.02em]">
                Surrounding Harris &amp; Fort Bend metro.
              </h2>
              <p className="mt-3 text-[0.92rem] text-slate-600 leading-[1.65]">
                Call if you are close — we probably cover it.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 self-center">
              {secondary.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 rounded-md bg-white px-3 py-2.5 text-[0.82rem] sm:text-[0.88rem] font-semibold text-[var(--onestop-navy-deep)] shadow-[inset_0_0_0_1px_rgba(15,40,71,0.08),0_1px_2px_rgba(15,40,71,0.04)]"
                >
                  <MapPin className="h-3.5 w-3.5 text-[var(--onestop-red)] shrink-0 opacity-60" />
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="bg-[var(--onestop-navy-deep)] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 text-center">
          <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold text-white leading-[1.15] tracking-[-0.015em]">
            Not sure we cover your address?
          </h2>
          <p className="mt-3 text-[0.95rem] text-white/60 max-w-lg mx-auto leading-relaxed">
            Call and find out in thirty seconds. A licensed electrician picks up any hour.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
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
