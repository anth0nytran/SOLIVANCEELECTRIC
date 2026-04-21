import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { reviews, reviewStats } from '../reviews';
import { Stars } from './Stars';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

export interface ReviewsSectionProps {
  /** How many reviews to render. Defaults to 6. */
  limit?: number;
  /** Numeric anchor shown top-left. Defaults to "03". */
  stepNumber?: string;
  /** Eyebrow copy. */
  eyebrow?: string;
  /** Heading. */
  heading?: React.ReactNode;
  /** Optional footer line. */
  footerCopy?: string;
}

export function ReviewsSection({
  limit = 6,
  stepNumber = '03',
  eyebrow = '03 — What clients say',
  heading = (
    <>
      Real reviews from <br className="hidden sm:block" />
      Google and Thumbtack.
    </>
  ),
  footerCopy = 'Honest reviews from real jobs — panel upgrades, generator installs, EV chargers, emergency call-outs across Greater Houston.',
}: ReviewsSectionProps) {
  const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';
  const featured = reviews.slice(0, limit);

  return (
    <section id="reviews" className="num-host scroll-mt-20 bg-[var(--onestop-navy-deep)] py-16 sm:py-24 overflow-hidden">
      {stepNumber ? (
        <span className="num-anchor num-anchor--dark top-6 -left-6 sm:top-10 sm:-left-10" aria-hidden>{stepNumber}</span>
      ) : null}
      <div className="beam-layer bar-rack bar-rack--dark top-20 right-6 sm:right-12 hidden lg:grid" aria-hidden>
        <span /><span /><span /><span /><span />
      </div>
      <div className="beam-layer bottom-0 right-0 w-1 h-[70%] bg-[var(--onestop-red)] opacity-30 hidden md:block" aria-hidden />
      <div className={shell}>
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14 items-end mb-10 sm:mb-14">
          <div>
            <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-gold)]">
              <span className="h-px w-6 bg-[var(--onestop-gold)]" />
              {eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-[-0.03em] leading-[1.05]">
              {heading}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end lg:text-right">
            <div className="inline-flex items-center gap-3 rounded-md bg-white/5 ring-1 ring-white/10 px-4 py-3">
              <Stars count={5} size="h-4 w-4" />
              <div className="leading-tight">
                <div className="text-white font-extrabold text-lg tabular-nums font-[family-name:var(--font-app-mono)]">
                  {reviewStats.average.toFixed(1)}
                </div>
                <div className="text-[0.68rem] uppercase tracking-[0.14em] text-white/55 font-semibold">
                  {reviewStats.count} verified reviews
                </div>
              </div>
            </div>
            <div className="text-[0.68rem] uppercase tracking-[0.14em] text-white/45 font-[family-name:var(--font-app-mono)]">
              {reviewStats.googleCount} Google · {reviewStats.thumbtackCount} Thumbtack
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <figure
              key={r.id}
              className="flex flex-col rounded-md bg-white/[0.04] ring-1 ring-white/10 p-6 sm:p-7 hover:bg-white/[0.06] hover:ring-white/20 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <Stars count={r.stars} size="h-3.5 w-3.5" />
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--onestop-gold)] font-[family-name:var(--font-app-mono)]">
                  {r.source}
                </span>
              </div>
              <blockquote className="flex-1 text-[0.92rem] leading-[1.7] text-white/80">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
                <div className="text-[0.82rem] font-bold text-white">{r.author}</div>
                <div className="text-[0.68rem] uppercase tracking-[0.12em] text-white/45 font-[family-name:var(--font-app-mono)]">
                  {formatDate(r.date)}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t border-white/10">
          <p className="text-[0.88rem] text-white/55 leading-relaxed max-w-md text-center sm:text-left">
            {footerCopy}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/reviews"
              className="btn-ghost-dark inline-flex items-center justify-center gap-2 h-11 px-6 text-[0.74rem] font-bold uppercase tracking-[0.14em] text-white rounded-md"
            >
              Read all {reviewStats.count} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/contact"
              className="btn-solid inline-flex items-center justify-center gap-2 bg-[var(--onestop-red)] h-11 px-6 text-[0.74rem] font-bold uppercase tracking-[0.14em] text-white rounded-md hover:bg-[#e55f15]"
            >
              Get a Free Quote <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
