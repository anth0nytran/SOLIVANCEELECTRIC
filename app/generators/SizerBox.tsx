import Link from 'next/link';
import { ArrowRight, Home, Lightbulb, Zap } from 'lucide-react';

// "Find your size in 20 seconds" box for blog posts and service pages. Plain links
// (crawlable), each carrying the answer into the calculator so it skips that step.
export const CALC_HREF = '/generator-size-calculator';

export function SizerBox({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Link href={CALC_HREF} className="not-prose my-6 flex items-center justify-between gap-3 rounded-xl border border-[#F3C9AE] bg-[#FFF7F2] px-4 py-3 text-[0.95rem] font-semibold text-[var(--onestop-navy-deep)] hover:border-[var(--onestop-red)]">
        <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-[var(--onestop-red)]" /> Not sure what size you need? Use our free Houston generator size calculator</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </Link>
    );
  }
  const opt = 'flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-semibold text-[var(--onestop-navy-deep)] hover:border-[var(--onestop-red)]';
  return (
    <aside className="not-prose my-10 rounded-2xl bg-[var(--onestop-navy-deep)] p-5 text-white sm:p-7">
      <p className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[#FDBA74]"><Zap className="h-4 w-4" /> Free Houston generator size calculator</p>
      <p className="mt-2 text-[1.35rem] font-bold leading-tight">What size generator does your home need?</p>
      <p className="mt-1 text-[0.95rem] text-white/75">Tap one to start. See which generators fit your home, with prices, in 20 seconds.</p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <Link href={`${CALC_HREF}?goal=essentials`} className={opt}><Lightbulb className="h-5 w-5 text-[var(--onestop-red)]" /> Just the essentials</Link>
        <Link href={`${CALC_HREF}?goal=whole`} className={opt}><Home className="h-5 w-5 text-[var(--onestop-red)]" /> My whole home, AC included</Link>
      </div>
    </aside>
  );
}
