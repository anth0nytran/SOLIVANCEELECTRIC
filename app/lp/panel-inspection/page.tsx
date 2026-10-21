import type { Metadata } from 'next';
import Image from 'next/image';
import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Flame,
  Home,
  Phone,
  ShieldCheck,
  Star,
  Zap,
} from 'lucide-react';
import { siteConfig } from '../../config';
import { reviews } from '../../reviews';
import { PanelLeadForm } from './PanelLeadForm';
import { CallLink } from './CallLink';

export const metadata: Metadata = {
  title: 'Free Electrical Panel Safety Check in Houston',
  description:
    'Old breaker box? A licensed Houston electrician checks your panel free, tells you straight if it is safe, and gives a written quote only if you need one.',
  alternates: { canonical: '/lp/panel-inspection' },
};

// Real Google reviews that mention panel work.
const PANEL_REVIEWS = ['yeny-v', 'tonya-n', 'joe-l']
  .map((id) => reviews.find((r) => r.id === id))
  .filter((r): r is (typeof reviews)[number] => !!r);

const SIGNS = [
  { icon: Zap, text: 'Breakers trip when the AC, dryer or microwave kicks on' },
  { icon: AlertTriangle, text: 'Lights dim or flicker when something big turns on' },
  { icon: Home, text: 'Your home was built before 2000 and the panel was never replaced' },
  { icon: ShieldCheck, text: 'Federal Pacific (Stab-Lok), Zinsco or a brand you don’t recognize' },
  { icon: FileText, text: 'Your insurance company or a home inspector asked about your panel' },
  { icon: Flame, text: 'A burning smell, buzzing, or a panel that feels warm — call us now' },
];

const INCLUDED = [
  'Licensed electrician looks over your breakers, wiring connections and main for heat damage or wear',
  'Brand check for panels with known problems (Federal Pacific, Zinsco and others)',
  'Capacity check: can your panel handle your AC, appliances — and an EV charger or addition later?',
  'Straight answer on the spot: safe as-is, needs a repair, or needs replacing',
  'Written, itemized quote — only if you actually need work',
];

const STEPS = [
  { title: 'Tell us what’s going on', text: 'Three quick taps and your address. Takes about a minute.' },
  { title: 'We call you back', text: 'Our team calls to set a time that works for you.' },
  { title: 'Free safety check', text: 'A licensed electrician checks your panel and gives you a straight answer.' },
];

const FAQS = [
  {
    q: 'Is the safety check really free?',
    a: 'Yes. No charge and no obligation. If your panel is fine, we’ll tell you that and you owe nothing.',
  },
  {
    q: 'Should I open my panel to check it myself?',
    a: 'No. Please don’t take the cover off. Just tell us what you’ve noticed — tripping, flickering, the age of the house — and our licensed electrician will do the hands-on part.',
  },
  {
    q: 'Are Federal Pacific and Zinsco panels dangerous?',
    a: 'Both brands have well-documented histories of breakers that may not trip when they should. If you have one, it’s worth having a licensed electrician look at it. We’ll check yours and tell you honestly what we find.',
  },
  {
    q: 'If I need a new panel, who handles the permit?',
    a: 'We do. A panel replacement in Houston needs a permit and an inspection, and the utility has to disconnect and reconnect power. We coordinate it so you don’t have to.',
  },
  {
    q: 'How long will my power be off?',
    a: 'For a standard panel replacement, power is usually off for part of one day. We’ll give you a clear timeline before any work starts.',
  },
  {
    q: 'Will a new panel raise my electric bill?',
    a: 'No. A panel upgrade by itself doesn’t increase your bill — it makes your system safer and lets it handle what you already run.',
  },
];

const ctaBtn =
  'inline-flex items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-6 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-md hover:brightness-95';

export default function PanelInspectionPage() {
  return (
    <div className="bg-white pb-20 text-slate-900 sm:pb-0">
      {/* Top bar: logo + phone only. No navigation — one page, one offer. */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Image src="/logo/logo_horzontial.svg" alt="Solivance Electric" width={170} height={40} priority className="h-9 w-auto" />
          <CallLink location="header" className="flex items-center gap-2 rounded-md bg-[var(--onestop-navy-deep)] px-3 py-2 text-sm font-bold text-white sm:text-base">
            <Phone className="h-4 w-4" /> {siteConfig.phone}
          </CallLink>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[var(--onestop-navy-deep)] text-white">
        {/* Mobile order: headline → form → details. Desktop: copy left, form right. */}
        <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-5 px-4 py-5 sm:py-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-orange-200 sm:text-xs">
              <BadgeCheck className="h-4 w-4" /> Licensed &amp; insured · {siteConfig.license.label}
            </p>
            <h1 className="text-[1.75rem] font-extrabold leading-tight sm:text-5xl">
              Old Breaker Box? Get a <span className="text-[var(--onestop-red)]">Free Panel Safety Check</span> in Houston.
            </h1>
            <p className="mt-2 flex items-center gap-1 text-sm text-white/85 lg:hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[var(--onestop-star)] text-[var(--onestop-star)]" />
              ))}
              <strong className="ml-1 text-white">{siteConfig.rating.toFixed(1)}</strong> on Google · {siteConfig.yearsInBusiness}+ yrs in Houston
            </p>
          </div>
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <PanelLeadForm />
          </div>
          <div className="lg:col-start-1 lg:row-start-2">
            <p className="max-w-xl text-lg text-white/85">
              Panels from the 90s and older weren’t built for today’s AC, appliances and EVs. A licensed electrician checks yours, tells you
              straight if it’s safe — and gives you a written quote only if you actually need work.
            </p>
            <ul className="mt-5 grid gap-2 text-white/90">
              {['Free, no-obligation safety check', 'Real answer on the spot — no pressure, no upsell', 'Permit, inspection & utility coordination handled if you need a new panel'].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--onestop-red)]" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 hidden flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80 lg:flex">
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[var(--onestop-star)] text-[var(--onestop-star)]" />
                ))}
                <strong className="ml-1 text-white">{siteConfig.rating.toFixed(1)}</strong> on Google
              </span>
              <span>{siteConfig.yearsInBusiness}+ years in Houston</span>
              <span>Licensed &amp; insured</span>
            </div>
          </div>
        </div>
      </section>

      {/* Signs — what they can notice without touching the panel */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl">Is your panel from the 90s or older? Watch for these signs.</h2>
        <p className="mt-2 text-slate-600">Don’t open your panel to look. Just notice what’s happening around the house — we’ll handle the hands-on part.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3 rounded-lg border border-slate-200 p-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--onestop-red)]" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-slate-700">
          Recognize even one? <a href="#form" className="font-bold text-[var(--onestop-red)] underline">Get your free safety check →</a>
        </p>
      </section>

      {/* Value stack */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl">What your free panel safety check includes</h2>
            <ul className="mt-5 grid gap-3">
              {INCLUDED.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--onestop-navy)]" /> <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg border-2 border-dashed border-[var(--onestop-red)] bg-white p-4">
              <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Your cost</p>
              <p className="text-3xl font-extrabold text-[var(--onestop-navy-deep)]">$0 — no obligation</p>
              <p className="mt-1 text-sm text-slate-600">Many companies charge for a panel inspection. Ours is free, and if your panel is fine, we’ll tell you.</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/photos_new_pass2/panel-upgrades.jpg" alt="Solivance electrician working on an electrical panel" fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl">What Houston homeowners say</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {PANEL_REVIEWS.map((r) => (
            <figure key={r.id} className="rounded-lg border border-slate-200 p-5">
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[var(--onestop-star)] text-[var(--onestop-star)]" />
                ))}
              </div>
              <blockquote className="mt-3 text-slate-700">“{r.quote}”</blockquote>
              <figcaption className="mt-3 text-sm font-bold text-slate-900">
                {r.author} <span className="font-normal text-slate-500">· {r.source} review</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[var(--onestop-navy-deep)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-extrabold sm:text-3xl">How it works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-lg bg-white/5 p-5">
                <span className="text-3xl font-extrabold text-[var(--onestop-red)]">{i + 1}</span>
                <p className="mt-2 text-lg font-bold">{s.title}</p>
                <p className="mt-1 text-white/80">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#form" className={ctaBtn}>Book My Free Safety Check</a>
            <CallLink location="how_it_works" className="inline-flex items-center gap-2 rounded-md border-2 border-white px-6 py-4 font-bold">
              <Phone className="h-5 w-5" /> Call {siteConfig.phone}
            </CallLink>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl">Common questions</h2>
        <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none font-bold text-slate-900 marker:hidden">
                {f.q}
                <span className="float-right text-[var(--onestop-red)] group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#form" className={ctaBtn}>Get My Free Safety Check</a>
        </div>
      </section>

      {/* Slim footer: license + required TDLR consumer notice */}
      <footer className="border-t border-slate-200 bg-slate-50 text-xs text-slate-600">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6">
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

      {/* Mobile sticky actions */}
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
