import Link from 'next/link';
import { ArrowRight, BadgeDollarSign } from 'lucide-react';
import { brands, financing } from '../lib/brands';
import { BrandLogo } from './BrandLogo';

/** Synchrony logo on a white chip so it reads on light and dark backgrounds. */
export function SynchronyLogo({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const h = size === 'md' ? 'h-6' : 'h-4';
  return (
    <span className={`inline-flex shrink-0 items-center rounded-md bg-white ${size === 'md' ? 'px-3 py-2' : 'px-2 py-1'} shadow-[inset_0_0_0_1px_rgba(15,40,71,0.10)]`}>
      <BrandLogo
        src={brands.synchrony.logo}
        name="Synchrony"
        className={h}
        fallbackClassName={`${size === 'md' ? 'text-base' : 'text-[0.78rem]'} text-[#3b3b3b]`}
      />
    </span>
  );
}

/**
 * Financing line that sits INSIDE an existing CTA block (under the buttons),
 * so financing reads as part of the call to action, not another stacked bar.
 */
export function FinancingNote({
  tone = 'dark',
  align = 'center',
  className = '',
}: {
  tone?: 'dark' | 'light';
  align?: 'center' | 'left';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <div
      className={`mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center ${align === 'center' ? 'items-center justify-center text-center sm:text-left' : 'items-start'} ${className}`}
    >
      <SynchronyLogo />
      <p className={`text-[0.82rem] leading-snug ${dark ? 'text-white/75' : 'text-slate-600'}`}>
        <Link
          href="/financing"
          className={`font-bold underline decoration-1 underline-offset-[3px] ${dark ? 'text-white decoration-white/40 hover:decoration-[var(--onestop-gold)]' : 'text-[var(--onestop-navy-deep)] decoration-slate-300 hover:decoration-[var(--onestop-red)]'}`}
        >
          Financing available
        </Link>{' '}
        through Synchrony. {financing.sub}{' '}
        <span className={dark ? 'text-white/50' : 'text-slate-400'}>{financing.disclaimer}</span>
      </p>
    </div>
  );
}

/** Boxed callout for sidebars. */
export function FinancingCard({ context }: { context?: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[var(--onestop-red)]">
          <BadgeDollarSign className="h-3.5 w-3.5" aria-hidden /> Financing
        </span>
        <SynchronyLogo />
      </div>
      <p className="mt-3 text-[0.92rem] font-bold leading-snug text-[var(--onestop-navy-deep)]">
        {context ? `${context}: financing available through Synchrony.` : `${financing.headline}.`}
      </p>
      <p className="mt-1 text-[0.82rem] text-slate-600">{financing.sub}</p>
      <Link href="/financing" className="mt-3 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-[var(--onestop-red)] hover:underline">
        How financing works <ArrowRight className="h-3.5 w-3.5" />
      </Link>
      <p className="mt-2 text-[0.68rem] text-slate-400">{financing.disclaimer}</p>
    </div>
  );
}

/** Light inline line for under a hero CTA on a dark hero. */
export function FinancingInline({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <p className={`mt-3 flex items-start gap-2 text-[0.78rem] leading-snug ${tone === 'dark' ? 'text-white/75' : 'text-slate-600'}`}>
      <BadgeDollarSign className="mt-px h-4 w-4 shrink-0 text-[var(--onestop-gold)]" aria-hidden />
      <span>
        <Link href="/financing" className={`font-bold underline underline-offset-2 ${tone === 'dark' ? 'text-white' : 'text-[var(--onestop-navy-deep)]'}`}>
          Financing available
        </Link>{' '}
        through Synchrony. {financing.sub} {financing.disclaimer}
      </span>
    </p>
  );
}

/** Thin tag for the top of quote forms. */
export function FormFinancingTag() {
  return (
    <Link
      href="/financing"
      className="flex items-center justify-between gap-3 rounded-md border border-[var(--onestop-red)]/20 bg-[#fff7f1] px-3 py-2 text-[0.78rem] text-slate-700 transition-colors hover:border-[var(--onestop-red)]/50"
    >
      <span className="flex items-center gap-2">
        <BadgeDollarSign className="h-4 w-4 shrink-0 text-[var(--onestop-red)]" aria-hidden />
        <span>
          <span className="font-bold text-[var(--onestop-navy-deep)]">Financing available</span>
          <span className="hidden sm:inline"> · ask about monthly options</span>
        </span>
      </span>
      <span className="shrink-0 whitespace-nowrap text-[0.7rem] text-slate-500">via Synchrony</span>
    </Link>
  );
}
