import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Check,
  Shield,
  Zap,
  PlugZap,
  Lightbulb,
  Battery,
  Warehouse as WarehouseIcon,
  Cable,
  Home as HomeIcon,
} from 'lucide-react';
import { siteConfig, serviceData } from '../../config';
import { serviceContent, getServiceContent, type ServiceIcon } from '../serviceContent';

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
  return Object.keys(serviceContent).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const content = getServiceContent(slug);
  const service = serviceData.find((s) => s.slug === slug);
  if (!content || !service) return { title: 'Service Not Found' };

  const title = `${service.title} in Greater Houston`;
  const description = content.heroLede;
  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.title} — Solivance Electric`,
      description,
      url: `${siteConfig.domain}/services/${slug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${service.title} — Solivance Electric` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} — Solivance Electric`,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getServiceContent(slug);
  const service = serviceData.find((s) => s.slug === slug);
  if (!content || !service) notFound();

  const Icon = iconMap[content.icon];
  const related = content.relatedSlugs
    .map((s) => serviceData.find((sv) => sv.slug === s))
    .filter(Boolean) as typeof serviceData;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.domain}/services` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${siteConfig.domain}/services/${slug}` },
    ],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: content.heroLede,
    provider: {
      '@type': 'ElectricalContractor',
      name: siteConfig.businessName,
      telephone: siteConfig.cleanPhone,
      url: siteConfig.domain,
    },
    areaServed: siteConfig.serviceAreas.map((a) => ({ '@type': 'City', name: a })),
    serviceType: service.title,
    url: `${siteConfig.domain}/services/${slug}`,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [content.cost, content.timeline, ...content.faqs].map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How ${service.title} work with Solivance Electric`,
    description: content.heroLede,
    step: content.process.map((p, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: p.title,
      text: p.detail,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      {/* ═══ COMPACT HERO ═══ */}
      <section className="bg-[var(--onestop-navy-deep)] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 text-[0.72rem] text-white/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white">{service.title}</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[var(--onestop-gold)]/15 text-[var(--onestop-gold)] px-3 py-1 rounded-sm text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-5">
            <Icon className="h-3 w-3" />
            Commercial &middot; Average {service.turnaround.split('·')[0].trim().toLowerCase()}
          </div>

          <h1 className="text-[2.4rem] sm:text-[3.2rem] lg:text-[3.75rem] font-extrabold text-white leading-[1.02] tracking-[-0.025em] max-w-4xl">
            {service.title}
          </h1>
          <p className="mt-4 text-[1rem] sm:text-[1.05rem] leading-[1.6] text-white/65 max-w-2xl">
            {content.heroLede}
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
            {/* ── LEFT: narrative ── */}
            <article className="min-w-0">
              <div className="font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.2em] text-[var(--onestop-red)] mb-3">
                About this service
              </div>
              <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold text-[var(--onestop-navy-deep)] leading-[1.15] tracking-[-0.02em] mb-6">
                {service.title} for Houston Area Buildings
              </h2>
              <div className="space-y-5 text-[1rem] leading-[1.75] text-slate-700">
                <p>{content.overview}</p>
                <p className="text-slate-600">{content.heroLede}</p>
              </div>

              {/* Materials / includes list */}
              <div className="mt-12">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--onestop-navy-deep)] mb-5">
                  What&apos;s included
                </h3>
                <ul className="space-y-3">
                  {service.details.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-[0.95rem] text-slate-700 leading-[1.55]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--onestop-red)]" strokeWidth={3} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How It Works */}
              <div className="mt-14">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--onestop-navy-deep)] mb-5">
                  How it works
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {content.process.slice(0, 3).map((step) => (
                    <div key={step.step} className="rounded-md bg-slate-50 p-5">
                      <div className="font-[family-name:var(--font-app-display)] text-[1.5rem] font-extrabold text-[var(--onestop-red)] leading-none tabular-nums mb-3">
                        {step.step}
                      </div>
                      <div className="text-[0.78rem] font-bold uppercase tracking-[0.1em] text-[var(--onestop-navy-deep)] mb-2">
                        {step.title}
                      </div>
                      <p className="text-[0.85rem] text-slate-600 leading-[1.55]">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost */}
              <div className="mt-14">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--onestop-navy-deep)] mb-3">
                  Pricing
                </h3>
                <p className="text-[1rem] leading-[1.75] text-slate-700">{content.cost.a}</p>
              </div>

              {/* Timeline */}
              <div className="mt-10">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--onestop-navy-deep)] mb-3">
                  Timeline
                </h3>
                <p className="text-[1rem] leading-[1.75] text-slate-700">{content.timeline.a}</p>
              </div>

              {/* Code notes */}
              <div className="mt-10">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--onestop-navy-deep)] mb-3">
                  Code &amp; permits
                </h3>
                <p className="text-[1rem] leading-[1.75] text-slate-700">{content.codeNotes.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {content.codeNotes.chips.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center rounded-sm bg-slate-100 px-2.5 py-1 text-[0.72rem] font-[family-name:var(--font-app-mono)] uppercase tracking-[0.08em] text-slate-600"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-14">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--onestop-navy-deep)] mb-5">
                  Frequently Asked Questions
                </h3>
                <div className="divide-y divide-slate-200 border-y border-slate-200">
                  {[content.cost, content.timeline, ...content.faqs].map((faq, i) => (
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

            {/* ── RIGHT: sticky overview sidebar ── */}
            <aside className="lg:sticky lg:top-28 h-fit space-y-4">
              {/* "Photo" placeholder card — navy gradient w/ icon */}
              <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-gradient-to-br from-[var(--onestop-navy-deep)] to-[var(--onestop-navy)] flex items-center justify-center">
                <Icon className="h-20 w-20 text-[var(--onestop-gold)]/80" strokeWidth={1.2} />
                <div className="absolute top-3 left-3 bg-[var(--onestop-gold)] text-[var(--onestop-navy-deep)] px-2.5 py-1 rounded-sm text-[0.65rem] font-extrabold uppercase tracking-[0.12em]">
                  Commercial
                </div>
              </div>

              {/* Overview meta card */}
              <div className="rounded-md bg-slate-50 p-5">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-500 mb-4">
                  Overview
                </div>
                <dl className="space-y-3 text-[0.9rem]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Coverage</dt>
                    <dd className="text-[var(--onestop-navy-deep)] font-semibold text-right">{siteConfig.serviceAreas.slice(0, 2).join(', ')} &amp; metro</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Typical range</dt>
                    <dd className="text-[var(--onestop-navy-deep)] font-semibold text-right font-[family-name:var(--font-app-mono)]">{content.cost.range}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Turnaround</dt>
                    <dd className="text-[var(--onestop-navy-deep)] font-semibold text-right">{service.turnaround.split('·')[0].trim()}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Code</dt>
                    <dd className="text-[var(--onestop-navy-deep)] font-semibold text-right">2023 NEC</dd>
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
                  Licensed electrician answers &middot; 24/7
                </div>
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══ OTHER SERVICES ═══ */}
      <section className="bg-slate-50 py-14 sm:py-20 border-t border-slate-200">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-[var(--onestop-navy-deep)] tracking-[-0.015em]">
              Other services we offer
            </h2>
            <Link href="/services" className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[var(--onestop-red)] hover:underline inline-flex items-center gap-1">
              View all seven <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((rel) => {
              const relContent = serviceContent[rel.slug];
              const RelIcon = relContent ? iconMap[relContent.icon] : Zap;
              return (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group flex items-start gap-4 rounded-md bg-white p-5 hover:shadow-md transition-shadow"
                >
                  <div className="rounded-sm bg-[var(--onestop-navy-deep)]/5 p-2 shrink-0">
                    <RelIcon className="h-5 w-5 text-[var(--onestop-navy-deep)]" strokeWidth={1.6} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[0.95rem] font-bold text-[var(--onestop-navy-deep)] leading-tight mb-1 group-hover:text-[var(--onestop-red)] transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-[0.82rem] text-slate-500 leading-[1.55] line-clamp-2">
                      {rel.summary.split('.')[0]}.
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="bg-[var(--onestop-navy-deep)] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 text-center">
          <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold text-white leading-[1.15] tracking-[-0.015em]">
            Ready to get started?
          </h2>
          <p className="mt-3 text-[0.95rem] text-white/60 max-w-lg mx-auto leading-relaxed">
            Free site walk. Fixed-fee quote in 24 hours. Permits pulled and inspections passed on the first walk.
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
