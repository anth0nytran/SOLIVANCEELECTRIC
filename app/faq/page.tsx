import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, HelpCircle } from 'lucide-react';
import { siteConfig, serviceData } from '../config';
import { serviceContent } from '../services/serviceContent';
import { locationContent, locationOrder } from '../locations/locationContent';

export const metadata: Metadata = {
  title: 'FAQ — Commercial Electrical in Greater Houston',
  description:
    'Cost, timeline, code, permits, and site-specific questions about commercial electrical work in Southwest Houston, the Heights, Bellaire, and the Memorial Villages. Answered by Solivance Electric.',
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
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['summary', '[data-speakable]'],
    },
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

      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos_new/subhero-faq.jpg"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2847]/95 via-[#0f2847]/80 to-[#0f2847]/55" />
        </div>
        <div className={`${shell} relative z-10`}>
          <nav aria-label="Breadcrumb" className="mb-5 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.18em]">
            <ol className="flex flex-wrap items-center gap-2 text-white/55">
              <li><Link href="/" className="hover:text-[var(--onestop-gold)] transition-colors">Home</Link></li>
              <li aria-hidden className="text-white/25">/</li>
              <li className="text-white font-semibold">FAQ</li>
            </ol>
          </nav>

          <div className="mb-4 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.24em] text-[var(--onestop-gold)]">
            <HelpCircle className="h-3.5 w-3.5" />
            Everything, One Page
          </div>

          <h1 className="h-display text-white max-w-3xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-5 max-w-2xl text-[0.98rem] sm:text-base text-white/80 leading-[1.7]">
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
      <section id="general" className="num-host scroll-mt-[160px] bg-white py-14 sm:py-20 overflow-hidden">
        <div className="beam-layer beam-diagonal -top-16 -right-48 hidden md:block" aria-hidden />
        <div className="beam-layer top-16 left-4 hidden lg:block" aria-hidden>
          <div className="beam-vertical beam-vertical--accent" style={{ height: '120px' }} />
        </div>
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
                className="btn-solid inline-flex items-center justify-center gap-2.5 bg-[var(--onestop-red)] h-12 sm:h-[52px] px-7 text-[0.75rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white rounded-md hover:bg-[#e55f15]"
              >
                <Phone className="h-4 w-4" />
                <span className="font-[family-name:var(--font-app-mono)] tracking-normal normal-case text-[0.82rem]">{siteConfig.phone}</span>
              </a>
              <Link
                href="/contact"
                className="btn-ghost-dark inline-flex items-center justify-center gap-2 h-12 sm:h-[52px] px-7 text-[0.75rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white rounded-md"
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
