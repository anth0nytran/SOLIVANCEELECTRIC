import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { reviews, reviewStats } from '../reviews';
import { Stars } from './Stars';
import { LineBreak } from './LineBreak';

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
  /** 'photo' = Houston oak-lined street behind a navy wash (default). */
  backdrop?: 'navy' | 'photo';
}

export function ReviewsSection({
  limit = 6,
  stepNumber = '03',
  eyebrow = '03 — What clients say',
  heading = (
    <>
      Real reviews from <LineBreak className="hidden sm:block" />
      Google and Thumbtack.
    </>
  ),
  backdrop = 'photo',
  footerCopy = 'Honest reviews from real jobs — panel upgrades, generator installs, EV chargers, emergency call-outs across Greater Houston.',
}: ReviewsSectionProps) {
  const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';
  const featured = reviews.slice(0, limit);

  return (
    <section id="reviews" className={`num-host relative isolate scroll-mt-20 py-16 sm:py-24 overflow-hidden ${backdrop === 'photo' ? 'bg-[#0b0d10]' : 'bg-[var(--onestop-navy-deep)]'}`}>
      {backdrop === 'photo' && (
        // `absolute!` beats the global `.num-host > *` rule, which would make this relative and zero-height
        <div className="absolute! inset-0 z-0!" aria-hidden>
          <Image src="/photos_new/reviews-houston-oaks.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_80%]" />
          {/* neutral gradient only: darker behind the heading, lighter mid-section so the street shows */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/65" />
        </div>
      )}
      {stepNumber && backdrop !== 'photo' ? (
        <span className="num-anchor num-anchor--dark top-6 -left-6 sm:top-10 sm:-left-10" aria-hidden>{stepNumber}</span>
      ) : null}
      {backdrop !== 'photo' && (
      <div className="beam-layer bar-rack bar-rack--dark top-20 right-6 sm:right-12 hidden lg:grid" aria-hidden>
        <span /><span /><span /><span /><span />
      </div>
      )}
      {backdrop !== 'photo' && <div className="beam-layer bottom-0 right-0 w-1 h-[70%] bg-[var(--onestop-red)] opacity-30 hidden md:block" aria-hidden />}
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
            <div className="glass inline-flex items-center gap-3 rounded-xl px-4 py-3">
              <Stars count={5} size="h-4 w-4" />
              <div className="leading-tight">
                <div className="text-white font-extrabold text-lg tabular-nums font-[family-name:var(--font-app-mono)]">
                  {reviewStats.average.toFixed(1)}
                </div>
                <div className="text-[0.75rem] text-white/75 font-semibold">
                  {reviewStats.count} verified reviews
                </div>
              </div>
            </div>
            <div className="text-[0.78rem] text-white/70">
              {reviewStats.googleCount} Google · {reviewStats.thumbtackCount} Thumbtack
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <figure
              key={r.id}
              className="glass glass-hover flex flex-col rounded-2xl p-6 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <Stars count={r.stars} size="h-3.5 w-3.5" />
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--onestop-gold)] font-[family-name:var(--font-app-mono)]">
                  {r.source}
                </span>
              </div>
              <blockquote className="flex-1 text-[0.95rem] leading-[1.7] text-white/90">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-white/15 flex items-center justify-between">
                <div className="text-[0.82rem] font-bold text-white">{r.author}</div>
                <div className="text-[0.72rem] text-white/70">
                  {formatDate(r.date)}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t border-white/10">
          <p className="text-[0.9rem] text-white/80 leading-relaxed max-w-md text-center sm:text-left">
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
