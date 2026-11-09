import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

// Every path on the generator pages points at the sizing lead magnet.
// Organic visitors go to the public calculator; ads keep using /lp/generator-sizing.
export const SIZING_HREF = '/generator-size-calculator';

/** Full-width band: the main push on /generators. */
export function SizingBand() {
  return (
    <section className="border-b border-slate-200 bg-[var(--onestop-navy-deep)]" data-analytics-source="generator-sizing-band">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-9 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#F5B301]">
            <Zap className="h-4 w-4" /> Free 20-second estimate
          </div>
          <h2 className="mt-2 text-[1.6rem] font-bold leading-tight text-white sm:text-[2rem]">Not sure what size generator you need?</h2>
          <p className="mt-1.5 text-[1rem] text-white/75">Answer 2 quick questions. See which generators fit your home. It’s free.</p>
        </div>
        <Link
          href={SIZING_HREF}
          className="inline-flex h-14 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-8 text-[1.05rem] font-bold text-white hover:bg-[#e55f15] md:w-auto"
        >
          Find My Generator Size <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

/** Small inline nudge for product cards / detail pages. */
export function SizingNudge({ className = '' }: { className?: string }) {
  return (
    <Link href={SIZING_HREF} className={`inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-[var(--onestop-red)] hover:underline ${className}`}>
      <Zap className="h-4 w-4" /> Not sure this is the right size? Find out in 20 seconds <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
