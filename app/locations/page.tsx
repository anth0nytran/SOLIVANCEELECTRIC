import type { Metadata } from 'next';
import Link from 'next/link';
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

      {/* ═══ COMPACT HERO ═══ */}
      <section className="bg-[var(--onestop-navy-deep)] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 text-[0.72rem] text-white/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white">Service Areas</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[var(--onestop-gold)]/15 text-[var(--onestop-gold)] px-3 py-1 rounded-sm text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-5">
            <MapPin className="h-3 w-3" />
            Greater Houston metro
          </div>

          <h1 className="text-[2.4rem] sm:text-[3.2rem] lg:text-[3.75rem] font-extrabold text-white leading-[1.02] tracking-[-0.025em] max-w-4xl">
            Serving four home markets across Greater Houston.
          </h1>
          <p className="mt-4 max-w-2xl text-[1rem] sm:text-[1.05rem] leading-[1.6] text-white/65">
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
                className="group flex flex-col rounded-md overflow-hidden bg-white border border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Image area placeholder */}
                <div className="relative aspect-[16/7] bg-gradient-to-br from-[var(--onestop-navy-deep)] to-[var(--onestop-navy)] flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-[var(--onestop-gold)]/80" strokeWidth={1.3} />
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
                  className="flex items-center gap-2 rounded-md bg-white border border-slate-200 px-3 py-2.5 text-[0.88rem] font-semibold text-[var(--onestop-navy-deep)]"
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
