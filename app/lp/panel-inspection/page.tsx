import type { Metadata } from 'next';
import Image from 'next/image';
import { BadgeCheck, CheckCircle2, Phone, Star } from 'lucide-react';
import { siteConfig } from '../../config';
import { reviews } from '../../reviews';
import { PanelLeadForm } from './PanelLeadForm';
import { CallLink } from './CallLink';

export const metadata: Metadata = {
  title: 'Free Electrical Panel Safety Check in Houston',
  description:
    'Old breaker box? A licensed Houston electrician checks your panel free and tells you straight if it is safe. Written quote only if you need work.',
  alternates: { canonical: '/lp/panel-inspection' },
};

// Built to one job: get the free safety check booked.
// Headline → offer → proof → one button. Nothing else.

// Real Google reviews that mention panel work.
const PANEL_REVIEWS = ['tonya-n', 'yeny-v']
  .map((id) => reviews.find((r) => r.id === id))
  .filter((r): r is (typeof reviews)[number] => !!r);

const YOU_GET = [
  'A licensed electrician checks your panel for heat damage, loose wires and worn breakers',
  'We check for problem brands like Federal Pacific and Zinsco',
  'A straight answer: safe, needs a repair, or needs replacing',
  'A written quote — only if you actually need work',
];

const SIGNS = [
  'Breakers trip when the AC kicks on',
  'Lights flicker or dim',
  'Home built before 2000, panel never replaced',
  'Insurance or an inspector asked about your panel',
];

const FAQS = [
  { q: 'Is it really free?', a: 'Yes. No charge, no obligation. If your panel is fine, we’ll tell you and you owe nothing.' },
  { q: 'Should I open my panel to look?', a: 'No — please don’t. Just tell us what you’ve noticed. Our licensed electrician does the hands-on part.' },
  { q: 'If I need a new panel, who handles the permit?', a: 'We do — the permit, the city inspection, and coordinating the power shut-off with the utility.' },
  { q: 'Will a new panel raise my electric bill?', a: 'No. A panel upgrade by itself doesn’t raise your bill. It makes your home safer.' },
];

const Stars = () => (
  <span className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-[var(--onestop-star)] text-[var(--onestop-star)]" />
    ))}
  </span>
);

const ctaBtn =
  'inline-flex w-full items-center justify-center rounded-md bg-[var(--onestop-red)] px-6 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-md hover:brightness-95 sm:w-auto';

export default function PanelInspectionPage() {
  return (
    <div className="bg-white pb-20 text-slate-900 sm:pb-0">
      {/* Logo + phone. No menu — one page, one offer. */}
      <div className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Image src="/logo/logo_horzontial.svg" alt="Solivance Electric" width={170} height={40} priority className="h-9 w-auto" />
          <CallLink location="header" className="flex items-center gap-2 rounded-md bg-[var(--onestop-navy-deep)] px-3 py-2 text-sm font-bold text-white sm:text-base">
            <Phone className="h-4 w-4" /> {siteConfig.phone}
          </CallLink>
        </div>
      </div>

      {/* 1. Headline + form. On phones the form sits right under the headline. */}
      <section className="bg-[var(--onestop-navy-deep)] text-white">
        <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-5 px-4 py-6 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-orange-200 sm:text-xs">
              <BadgeCheck className="h-4 w-4" /> Licensed &amp; insured · {siteConfig.license.label}
            </p>
            <h1 className="text-[1.85rem] font-extrabold leading-tight sm:text-5xl">
              Old Breaker Box? Get a <span className="text-[var(--onestop-red)]">Free Panel Safety Check.</span>
            </h1>
            <p className="mt-3 text-lg text-white/85">A licensed Houston electrician tells you straight if it’s safe. No pressure. No cost.</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-white/85">
              <Stars /> <strong className="text-white">{siteConfig.rating.toFixed(1)}</strong> on Google · {siteConfig.yearsInBusiness}+ years in Houston
            </p>
          </div>
          <PanelLeadForm />
        </div>
      </section>

      {/* 2. The offer, stacked. */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl">What you get — free</h2>
        <ul className="mt-5 grid gap-3 text-lg">
          {YOU_GET.map((t) => (
            <li key={t} className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--onestop-red)]" /> {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-lg border-2 border-dashed border-[var(--onestop-red)] p-5 text-center">
          <p className="text-3xl font-extrabold text-[var(--onestop-navy-deep)]">Your cost: $0</p>
          <p className="mt-1 text-slate-600">Other companies charge for this. If your panel is fine, we’ll tell you.</p>
        </div>
      </section>

      {/* 3. Who it's for. */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl">Sound familiar?</h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {SIGNS.map((t) => (
              <li key={t} className="rounded-lg border border-slate-200 bg-white p-4 font-semibold">{t}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-600">Smell burning or hear buzzing? Don’t wait — call {siteConfig.phone} now.</p>
        </div>
      </section>

      {/* 4. Proof. */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl">Houston homeowners trust us</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {PANEL_REVIEWS.map((r) => (
            <figure key={r.id} className="rounded-lg border border-slate-200 p-5">
              <Stars />
              <blockquote className="mt-3 text-slate-700">“{r.quote}”</blockquote>
              <figcaption className="mt-3 text-sm font-bold">
                {r.author} <span className="font-normal text-slate-500">· {r.source} review</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 5. Objections. */}
      <section className="mx-auto max-w-3xl px-4 pb-12">
        <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl">Questions</h2>
        <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold">
                {f.q}
                <span className="text-xl text-[var(--onestop-red)] group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 6. One button. */}
      <section className="bg-[var(--onestop-navy-deep)] px-4 py-12 text-center text-white">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Find out if your panel is safe.</h2>
        <p className="mt-2 text-white/80">Free. No obligation. Takes a minute.</p>
        <div className="mx-auto mt-6 max-w-sm sm:max-w-none">
          <a href="#form" className={ctaBtn}>Get My Free Safety Check</a>
        </div>
      </section>

      {/* License + required TDLR consumer notice. */}
      <footer className="bg-slate-50 text-xs text-slate-600">
        <div className="mx-auto max-w-6xl space-y-1.5 px-4 py-6">
          <p>
            <strong>{siteConfig.businessName}</strong> · {siteConfig.address.full} · {siteConfig.license.label}
          </p>
          <p>
            Regulated by the {siteConfig.regulator.name}, {siteConfig.regulator.address}, {siteConfig.regulator.phones.join(' / ')},{' '}
            <a href={siteConfig.regulator.url} className="underline">tdlr.texas.gov</a>.
          </p>
          <p>
            <a href="/privacy" className="underline">Privacy Policy</a> · <a href="/terms" className="underline">Terms</a>
          </p>
        </div>
      </footer>

      {/* Phone: sticky call + form buttons. */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-2 sm:hidden">
        <CallLink location="sticky_mobile" className="flex items-center justify-center gap-2 rounded-md bg-[var(--onestop-navy-deep)] py-3 font-bold text-white">
          <Phone className="h-4 w-4" /> Call Now
        </CallLink>
        <a href="#form" className="flex items-center justify-center rounded-md bg-[var(--onestop-red)] py-3 font-bold text-white">
          Free Check
        </a>
      </div>
    </div>
  );
}
