import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '../config';
import { reviews, reviewStats } from '../reviews';
import { Stars } from '../components/Stars';

export const metadata: Metadata = {
  title: 'Customer Reviews',
  description: `${reviewStats.count} verified reviews from Google and Thumbtack. ${reviewStats.average.toFixed(1)}-star average for commercial electrical work across Greater Houston — panel upgrades, generator installs, EV chargers, 24hr emergency service.`,
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: `${reviewStats.average.toFixed(1)}★ from ${reviewStats.count} Houston clients — Solivance Electric`,
    description: 'Honest reviews from real commercial electrical jobs across Houston, Cypress, Katy and Memorial.',
    url: `${siteConfig.domain}/reviews`,
    images: ['/og-image.jpg'],
  },
};

export default function ReviewsPage() {
  const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
      { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${siteConfig.domain}/reviews` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="page-hero">
        <div className={`${shell} relative z-10`}>
          <nav aria-label="Breadcrumb" className="mb-5 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.18em]">
            <ol className="flex flex-wrap items-center gap-2 text-white/55">
              <li><Link href="/" className="hover:text-[var(--onestop-gold)] transition-colors">Home</Link></li>
              <li aria-hidden className="text-white/25">/</li>
              <li className="text-white font-semibold">Reviews</li>
            </ol>
          </nav>

          <div className="mb-4 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.24em] text-[var(--onestop-gold)]">
            <Stars count={5} size="h-3.5 w-3.5" />
            Verified Customer Reviews
          </div>

          <h1 className="h-display text-white max-w-4xl">
            {reviewStats.average.toFixed(1)}★ from {reviewStats.count} Houston-area clients.
          </h1>
          <p className="mt-5 max-w-2xl text-[0.98rem] sm:text-base text-white/80 leading-[1.7]">
            Panel upgrades, generator installs, EV chargers, emergency call-outs. Every review below is from a real finished job — {reviewStats.googleCount} pulled from Google, {reviewStats.thumbtackCount} from Thumbtack.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href={`tel:${siteConfig.cleanPhone}`} className="btn-solid inline-flex items-center justify-center gap-2 bg-[var(--onestop-red)] h-12 px-7 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white rounded-md hover:bg-[#e55f15]">
              <Phone className="h-4 w-4" /> {siteConfig.phone}
            </a>
            <Link href="/contact" className="btn-ghost-dark inline-flex items-center justify-center gap-2 h-12 px-7 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white rounded-md">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="bg-white border-b border-slate-200/70">
        <div className={`${shell} py-6`}>
          <div className="grid grid-cols-3 gap-y-4 md:divide-x md:divide-slate-200/70">
            <div className="px-3 sm:px-5 md:first:pl-0 text-center md:text-left">
              <div className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-slate-500 mb-1">Average Rating</div>
              <div className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] tabular-nums font-[family-name:var(--font-app-mono)]">{reviewStats.average.toFixed(1)} / 5</div>
            </div>
            <div className="px-3 sm:px-5 text-center md:text-left">
              <div className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-slate-500 mb-1">Reviews</div>
              <div className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] tabular-nums font-[family-name:var(--font-app-mono)]">{reviewStats.count}</div>
            </div>
            <div className="px-3 sm:px-5 text-center md:text-left">
              <div className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-slate-500 mb-1">Sources</div>
              <div className="text-2xl font-extrabold text-[var(--onestop-navy-deep)]">Google · Thumbtack</div>
            </div>
          </div>
        </div>
      </section>

      {/* Full review grid */}
      <section className="num-host bg-white py-14 sm:py-20 overflow-hidden">
        <div className="beam-layer beam-diagonal beam-diagonal--orange -top-24 -right-48 hidden md:block" aria-hidden />
        <div className="beam-layer top-20 left-8 hidden lg:block" aria-hidden>
          <div className="beam-vertical beam-vertical--accent" style={{ height: '140px' }} />
        </div>
        <div className={shell}>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure
                key={r.id}
                className="flex flex-col rounded-md bg-white p-6 sm:p-7 shadow-[inset_0_0_0_1px_rgba(15,40,71,0.08),0_1px_2px_rgba(15,40,71,0.04)]"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <Stars count={r.stars} size="h-3.5 w-3.5" />
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--onestop-red)] font-[family-name:var(--font-app-mono)]">
                    {r.source}
                  </span>
                </div>
                <blockquote className="flex-1 text-[0.92rem] leading-[1.7] text-slate-700">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                {r.scope && (
                  <div className="mt-4 text-[0.68rem] uppercase tracking-[0.1em] text-slate-400 font-[family-name:var(--font-app-mono)]">
                    {r.scope}
                  </div>
                )}
                <figcaption className="mt-5 pt-5 border-t border-slate-200 flex items-center justify-between">
                  <div className="text-[0.82rem] font-bold text-[var(--onestop-navy-deep)]">{r.author}</div>
                  <time className="text-[0.68rem] uppercase tracking-[0.1em] text-slate-400 font-[family-name:var(--font-app-mono)]" dateTime={r.date}>
                    {formatDate(r.date)}
                  </time>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[var(--onestop-navy-deep)] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 text-center">
          <h2 className="h-section text-white">Ready to join the list?</h2>
          <p className="mt-4 text-[0.95rem] text-white/70 max-w-lg mx-auto leading-[1.7]">
            Free site walk. Fixed-fee quote in 24 hours. Inspections passed on the first walk.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/contact" className="btn-solid inline-flex items-center justify-center gap-2 bg-[var(--onestop-red)] h-12 px-7 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white rounded-md hover:bg-[#e55f15]">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${siteConfig.cleanPhone}`} className="btn-ghost-dark inline-flex items-center justify-center gap-2 h-12 px-7 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white rounded-md">
              <Phone className="h-4 w-4" />
              <span className="font-[family-name:var(--font-app-mono)] tracking-normal normal-case text-[0.82rem]">{siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
