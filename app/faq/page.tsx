import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone, HelpCircle } from 'lucide-react';
import { siteConfig, serviceData } from '../config';
import { serviceContent } from '../services/serviceContent';
import { locationContent, locationOrder } from '../locations/locationContent';

export const metadata: Metadata = {
  title: 'FAQ — Commercial Electrical in Greater Houston',
  description:
    'Cost, timeline, code, permits, and site-specific questions about commercial electrical work in Houston, Cypress, Katy, and Memorial. Answered by Solivance Electric.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ — Solivance Electric',
    description:
      'Cost, timeline, code, and permitting questions for commercial electrical across Greater Houston.',
    url: `${siteConfig.domain}/faq`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Solivance Electric FAQ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Solivance Electric',
    description: 'Answers on cost, timeline, code, permits for commercial electrical in Greater Houston.',
    images: ['/og-image.jpg'],
  },
};

const shell = 'mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-10';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${siteConfig.domain}/faq` },
  ],
};

export default function FaqPage() {
  // Sections
  const general = siteConfig.faqs;

  const serviceSections = serviceData.map((s) => {
    const c = serviceContent[s.slug];
    return {
      slug: s.slug,
      heading: s.title,
      eyebrow: c?.eyebrowNumber ?? '',
      faqs: c ? [c.cost, c.timeline, ...c.faqs] : [],
    };
  });

  const locationSections = locationOrder
    .map((slug) => locationContent[slug])
    .filter(Boolean)
    .map((loc) => ({
      slug: loc.slug,
      heading: loc.fullName,
      eyebrow: loc.positionLine,
      faqs: loc.faqs,
    }));

  // Flatten for schema
  const allFaqs = [
    ...general,
    ...serviceSections.flatMap((s) => s.faqs),
    ...locationSections.flatMap((l) => l.faqs),
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ═══ COMPACT HERO ═══ */}
      <section className="bg-[var(--onestop-navy-deep)] py-12 sm:py-16">
        <div className={shell}>
          <nav aria-label="Breadcrumb" className="mb-5 text-[0.72rem] text-white/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white">FAQ</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[var(--onestop-gold)]/15 text-[var(--onestop-gold)] px-3 py-1 rounded-sm text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-5">
            <HelpCircle className="h-3 w-3" />
            Everything, one page
          </div>

          <h1 className="text-[2.4rem] sm:text-[3.2rem] lg:text-[3.75rem] font-extrabold text-white leading-[1.02] tracking-[-0.025em] max-w-3xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 max-w-2xl text-[1rem] sm:text-[1.05rem] leading-[1.6] text-white/65">
            The questions we get most often, organized by service and by city. Do not see yours?{' '}
            <a href={`tel:${siteConfig.cleanPhone}`} className="text-[var(--onestop-gold)] font-semibold hover:underline">{siteConfig.phone}</a>{' '}
            — a licensed electrician picks up any hour.
          </p>
        </div>
      </section>

      {/* ═══ QUICK NAV ═══ */}
      <section className="bg-white/90 backdrop-blur border-b border-slate-200 py-3 sm:py-4 sticky top-16 sm:top-[4.5rem] z-40">
        <div className={`${shell} overflow-x-auto no-scrollbar`}>
          <div className="flex flex-nowrap sm:flex-wrap gap-2 min-w-max sm:min-w-0">
            <a href="#general" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-[0.72rem] font-[family-name:var(--font-app-mono)] uppercase tracking-[0.14em] text-slate-600 hover:border-[var(--onestop-navy)] hover:text-[var(--onestop-navy-deep)] transition-colors">
              General
            </a>
            {serviceSections.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-[0.72rem] font-[family-name:var(--font-app-mono)] uppercase tracking-[0.14em] text-slate-600 hover:border-[var(--onestop-navy)] hover:text-[var(--onestop-navy-deep)] transition-colors"
              >
                {s.heading}
              </a>
            ))}
            {locationSections.map((l) => (
              <a
                key={l.slug}
                href={`#${l.slug}`}
                className="inline-flex items-center rounded-full border border-[var(--onestop-red)]/30 bg-[var(--onestop-red)]/[0.04] px-3.5 py-1.5 text-[0.72rem] font-[family-name:var(--font-app-mono)] uppercase tracking-[0.14em] text-[var(--onestop-red)] hover:bg-[var(--onestop-red)]/[0.08] transition-colors"
              >
                {l.heading}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GENERAL ═══ */}
      <section id="general" className="scroll-mt-[160px] bg-white py-14 sm:py-20">
        <div className={shell}>
          <div className="mb-8">
            <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
              <span className="h-px w-6 bg-[var(--onestop-gold)]" />
              00 — General
            </div>
            <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-[-0.025em] leading-[1.05] text-[var(--onestop-navy-deep)]">
              About Solivance Electric.
            </h2>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {general.map((faq, i) => (
              <details key={faq.q} className="group" open={i === 0}>
                <summary className="flex cursor-pointer items-start justify-between gap-4 py-5 sm:py-6 text-[0.95rem] font-semibold text-[var(--onestop-navy-deep)]">
                  <span className="leading-snug">{faq.q}</span>
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-lg text-[var(--onestop-red)] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="pb-5 sm:pb-6 text-[0.92rem] leading-[1.75] text-slate-600">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICE SECTIONS ═══ */}
      {serviceSections.map((section, idx) => (
        <section
          key={section.slug}
          id={section.slug}
          className={`scroll-mt-[160px] py-14 sm:py-20 border-t border-slate-200 ${idx % 2 === 0 ? 'bg-[var(--onestop-cream)]' : 'bg-white'}`}
        >
          <div className={shell}>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
                  <span className="h-px w-6 bg-[var(--onestop-gold)]" />
                  {section.eyebrow} — Service
                </div>
                <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-[-0.025em] leading-[1.05] text-[var(--onestop-navy-deep)]">
                  {section.heading}.
                </h2>
              </div>
              <Link
                href={`/services/${section.slug}`}
                className="text-sm font-semibold text-[var(--onestop-red)] hover:underline inline-flex items-center gap-1"
              >
                Full {section.heading} page <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {section.faqs.map((faq) => (
                <details key={faq.q} className="group">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 py-5 sm:py-6 text-[0.95rem] font-semibold text-[var(--onestop-navy-deep)]">
                    <span className="leading-snug">{faq.q}</span>
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-lg text-[var(--onestop-red)] transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <div className="pb-5 sm:pb-6 text-[0.92rem] leading-[1.75] text-slate-600">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ═══ LOCATION SECTIONS ═══ */}
      {locationSections.map((section) => (
        <section
          key={section.slug}
          id={section.slug}
          className="scroll-mt-[160px] py-14 sm:py-20 bg-white border-t border-slate-200"
        >
          <div className={shell}>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-red)]">
                  <span className="h-px w-6 bg-[var(--onestop-red)]" />
                  Service Area
                </div>
                <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-[-0.025em] leading-[1.05] text-[var(--onestop-navy-deep)]">
                  {section.heading}.
                </h2>
                <p className="mt-2 text-xs font-[family-name:var(--font-app-mono)] uppercase tracking-[0.18em] text-slate-400">
                  {section.eyebrow}
                </p>
              </div>
              <Link
                href={`/locations/${section.slug}`}
                className="text-sm font-semibold text-[var(--onestop-red)] hover:underline inline-flex items-center gap-1"
              >
                Full {section.heading} page <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {section.faqs.map((faq) => (
                <details key={faq.q} className="group">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 py-5 sm:py-6 text-[0.95rem] font-semibold text-[var(--onestop-navy-deep)]">
                    <span className="leading-snug">{faq.q}</span>
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-lg text-[var(--onestop-red)] transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <div className="pb-5 sm:pb-6 text-[0.92rem] leading-[1.75] text-slate-600">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="bg-slate-950 py-20 sm:py-24">
        <div className={shell}>
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-[var(--onestop-gold)]">
              <span className="h-px w-8 bg-[var(--onestop-gold)]" />
              Still curious?
            </div>
            <h2 className="text-[2rem] sm:text-[2.75rem] font-bold text-white leading-[1.05] tracking-[-0.025em] mb-5">
              Call the line.<br/>Get the answer.
            </h2>
            <p className="text-[0.95rem] sm:text-base text-white/55 max-w-lg leading-relaxed mb-8">
              A licensed electrician picks up the 24-hour line. If your question is not in the list above, it is one conversation away.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex items-center justify-center gap-2.5 bg-[var(--onestop-red)] h-12 sm:h-[52px] px-7 text-[0.75rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white rounded-md hover:bg-[#e55f15] transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="font-[family-name:var(--font-app-mono)] tracking-normal normal-case text-[0.82rem]">{siteConfig.phone}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 h-12 sm:h-[52px] px-7 text-[0.75rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/90 rounded-md hover:bg-white/[0.06] transition-colors"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
