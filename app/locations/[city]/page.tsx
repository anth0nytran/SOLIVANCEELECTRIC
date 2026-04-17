import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  MapPin,
  Phone,
  Clock,
  Shield,
  Check,
  Zap,
  PlugZap,
  Lightbulb,
  Battery,
  Warehouse as WarehouseIcon,
  Cable,
  Home as HomeIcon,
  Building2,
} from 'lucide-react';
import { siteConfig, serviceData } from '../../config';
import { serviceContent, type ServiceIcon } from '../../services/serviceContent';
import { locationContent, getLocationContent } from '../locationContent';

const iconMap: Record<ServiceIcon, typeof Zap> = {
  panel: Zap,
  generator: Battery,
  lighting: Lightbulb,
  ev: PlugZap,
  warehouse: WarehouseIcon,
  pedestal: Cable,
  'mobile-home': HomeIcon,
};

export async function generateStaticParams() {
  return Object.keys(locationContent).map((city) => ({ city }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ city: string }> },
): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocationContent(city);
  if (!loc) return { title: 'Location Not Found' };
  const title = `Commercial Electrician in ${loc.fullName}`;
  const description = loc.heroLede;
  return {
    title,
    description,
    alternates: { canonical: `/locations/${city}` },
    openGraph: {
      title: `${title} | Solivance Electric`,
      description,
      url: `${siteConfig.domain}/locations/${city}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Solivance Electric`,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const loc = getLocationContent(city);
  if (!loc) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${siteConfig.domain}/locations` },
      { '@type': 'ListItem', position: 3, name: loc.fullName, item: `${siteConfig.domain}/locations/${city}` },
    ],
  };
  const placeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: loc.fullName,
    description: loc.heroLede,
    address: { '@type': 'PostalAddress', addressLocality: loc.name, addressRegion: 'TX', addressCountry: 'US' },
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: loc.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ═══ COMPACT HERO ═══ */}
      <section className="bg-[var(--onestop-navy-deep)] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 text-[0.72rem] text-white/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/locations" className="hover:text-white transition-colors">Service Areas</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white">{loc.fullName}</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[var(--onestop-gold)]/15 text-[var(--onestop-gold)] px-3 py-1 rounded-sm text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-5">
            <MapPin className="h-3 w-3" />
            {loc.positionLine}
          </div>

          <h1 className="text-[2.4rem] sm:text-[3.2rem] lg:text-[3.75rem] font-extrabold text-white leading-[1.02] tracking-[-0.025em] max-w-4xl">
            Commercial Electrician in {loc.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[1rem] sm:text-[1.05rem] leading-[1.6] text-white/65">
            {loc.heroLede}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--onestop-red)] h-11 px-5 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-white rounded-md hover:bg-[#e55f15] transition-colors"
            >
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${siteConfig.cleanPhone}`}
              className="inline-flex items-center gap-2 border border-white/20 h-11 px-5 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-white/90 rounded-md hover:bg-white/[0.06] transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-[family-name:var(--font-app-mono)] tracking-normal normal-case text-[0.8rem]">{siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT — narrative + sticky sidebar ═══ */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16">
            {/* ── LEFT: article ── */}
            <article className="min-w-0">
              <div className="font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.2em] text-[var(--onestop-red)] mb-3">
                About the service area
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold text-[var(--onestop-navy-deep)] leading-[1.15] tracking-[-0.02em] mb-6">
                Commercial electrical work in {loc.fullName}
              </h2>

              <div className="space-y-5 text-[1rem] leading-[1.75] text-slate-700">
                <p>{loc.description}</p>
              </div>

              {/* Neighborhoods */}
              <div className="mt-10">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--onestop-navy-deep)] mb-3">
                  Neighborhoods we serve
                </h3>
                <p className="text-[0.95rem] text-slate-700 leading-[1.75]">{loc.neighborhoods}</p>
              </div>

              {/* AHJ / permitting */}
              <div className="mt-10">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--onestop-navy-deep)] mb-3">
                  Permits &amp; inspections
                </h3>
                <p className="text-[1rem] text-slate-700 leading-[1.75]">{loc.ahjNotes}</p>
                <p className="mt-3 text-[0.95rem] text-slate-600 italic">
                  The permit is our scope. We file, meet the inspector, and hand you the passed tag.
                </p>
              </div>

              {/* Services available in this city */}
              <div className="mt-14">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--onestop-navy-deep)] mb-5">
                  Services available in {loc.name}
                </h3>
                <div className="divide-y divide-slate-200 border-y border-slate-200">
                  {serviceData.map((s) => {
                    const c = serviceContent[s.slug];
                    const Icon = c ? iconMap[c.icon] : Zap;
                    return (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group flex items-center justify-between gap-4 py-4 transition-all hover:pl-2"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <Icon className="h-5 w-5 text-slate-400 group-hover:text-[var(--onestop-red)] transition-colors shrink-0" strokeWidth={1.6} />
                          <span className="text-[0.98rem] font-semibold text-[var(--onestop-navy-deep)] group-hover:text-[var(--onestop-red)] transition-colors truncate">
                            {s.title}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[var(--onestop-red)] group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Recent projects */}
              <div className="mt-14">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--onestop-navy-deep)] mb-5">
                  Recent work in {loc.name}
                </h3>
                <p className="text-[0.9rem] text-slate-500 italic mb-5">
                  Anonymized by client request. Real projects, real timelines.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {loc.projects.map((p, i) => (
                    <div key={i} className="rounded-md bg-slate-50 p-5">
                      <div className="text-[0.7rem] font-[family-name:var(--font-app-mono)] uppercase tracking-[0.12em] text-[var(--onestop-red)] mb-2">
                        Project {String(i + 1).padStart(2, '0')}
                      </div>
                      <h4 className="text-[0.98rem] font-bold text-[var(--onestop-navy-deep)] leading-tight mb-3">
                        {p.scope}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.78rem] text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3 w-3" />
                          {p.building}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {p.days}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-14">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--onestop-navy-deep)] mb-5">
                  {loc.name} questions, answered
                </h3>
                <div className="divide-y divide-slate-200 border-y border-slate-200">
                  {loc.faqs.map((faq, i) => (
                    <details key={faq.q} className="group" open={i === 0}>
                      <summary className="flex cursor-pointer items-start justify-between gap-4 py-4 text-[0.95rem] font-semibold text-[var(--onestop-navy-deep)]">
                        <span className="leading-snug">{faq.q}</span>
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-base text-[var(--onestop-red)] transition-transform duration-200 group-open:rotate-45">+</span>
                      </summary>
                      <div className="pb-4 text-[0.92rem] leading-[1.7] text-slate-600">{faq.a}</div>
                    </details>
                  ))}
                </div>
              </div>
            </article>

            {/* ── RIGHT: sticky sidebar ── */}
            <aside className="lg:sticky lg:top-28 h-fit space-y-4">
              {/* City "photo" placeholder */}
              <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-gradient-to-br from-[var(--onestop-navy-deep)] to-[var(--onestop-navy)] flex items-center justify-center">
                <MapPin className="h-14 w-14 text-[var(--onestop-gold)]/80" strokeWidth={1.4} />
                <div className="absolute top-3 left-3 bg-[var(--onestop-gold)] text-[var(--onestop-navy-deep)] px-2.5 py-1 rounded-sm text-[0.65rem] font-extrabold uppercase tracking-[0.12em]">
                  {loc.name}
                </div>
              </div>

              {/* Overview meta */}
              <div className="rounded-md bg-slate-50 p-5">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-500 mb-4">
                  Overview
                </div>
                <dl className="space-y-3 text-[0.9rem]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Area</dt>
                    <dd className="text-[var(--onestop-navy-deep)] font-semibold text-right">{loc.fullName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">ZIPs</dt>
                    <dd className="text-[var(--onestop-navy-deep)] font-semibold text-right font-[family-name:var(--font-app-mono)]">{loc.zipCodes.length}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Services</dt>
                    <dd className="text-[var(--onestop-navy-deep)] font-semibold text-right">All 7 available</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Emergency</dt>
                    <dd className="text-[var(--onestop-navy-deep)] font-semibold text-right">24/7 line</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Consultation</dt>
                    <dd className="text-[var(--onestop-navy-deep)] font-semibold text-right">Free &amp; no obligation</dd>
                  </div>
                </dl>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center justify-center gap-2 w-full bg-[var(--onestop-red)] h-11 px-5 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-white rounded-md hover:bg-[#e55f15] transition-colors"
                >
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* ZIP chips */}
              <div className="rounded-md bg-slate-50 p-5">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-500 mb-3">
                  ZIP codes served
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {loc.zipCodes.map((z) => (
                    <span
                      key={z}
                      className="inline-flex items-center rounded-sm bg-white border border-slate-200 px-2.5 py-1 text-[0.72rem] font-[family-name:var(--font-app-mono)] text-slate-600"
                    >
                      {z}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call card */}
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="block rounded-md bg-[var(--onestop-navy-deep)] p-5 hover:bg-[var(--onestop-ink)] transition-colors"
              >
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/50 mb-1">
                  Call or text anytime
                </div>
                <div className="text-[1.35rem] font-extrabold text-white font-[family-name:var(--font-app-mono)]">
                  {siteConfig.phone}
                </div>
                <div className="mt-2 text-[0.78rem] text-[var(--onestop-gold)] font-semibold">
                  Licensed electrician &middot; 24/7
                </div>
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <section className="bg-slate-50 py-10 border-y border-slate-200">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-[var(--onestop-red)]" /> Licensed Texas Contractor</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--onestop-red)]" strokeWidth={3} /> 2023 NEC Compliant</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[var(--onestop-red)]" /> 24/7 Emergency Line</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--onestop-red)]" /> {loc.fullName}</span>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="bg-[var(--onestop-navy-deep)] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 text-center">
          <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold text-white leading-[1.15] tracking-[-0.015em]">
            Ready to start a project in {loc.name}?
          </h2>
          <p className="mt-3 text-[0.95rem] text-white/60 max-w-lg mx-auto leading-relaxed">
            Free site walk. Fixed-fee quote in 24 hours. Permits and inspection in our scope.
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
