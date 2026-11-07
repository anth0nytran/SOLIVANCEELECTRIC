import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BadgeDollarSign, CheckCircle2, ClipboardList, FileSignature, Phone, Wrench } from 'lucide-react';
import { siteConfig } from '../config';
import { financing } from '../lib/brands';
import { SynchronyLogo } from '../components/FinancingBanner';
import { EstimateForm } from '../components/EstimateForm';
import { CtaBackdrop } from '../components/CtaBackdrop';
import { formatUsd, products } from '../generators/products';

const title = 'Electrical & Generator Financing in Houston | Synchrony';
const description =
  'Finance a Briggs & Stratton standby generator, panel upgrade, EV charger, or lighting job with Solivance Electric through Synchrony. Ask about monthly payment options. Subject to credit approval.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'generator financing Houston',
    'electrical financing Houston TX',
    'panel upgrade financing Houston',
    'Synchrony financing electrician Houston',
    'Briggs & Stratton generator financing',
    'finance whole home generator Texas',
  ],
  alternates: { canonical: '/financing' },
  openGraph: {
    title,
    description,
    url: `${siteConfig.domain}/financing`,
    images: [{ url: '/photos_new/generator-installs.jpg', width: 1200, height: 630, alt: 'Standby generator installed by Solivance Electric' }],
  },
};

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';
const lowestGenerator = Math.min(...products.filter((p) => p.group === 'powerprotect').map((p) => p.map));

const projects = [
  { label: 'Standby generators', sub: 'Briggs & Stratton, 13–60 kW', href: '/generators', img: '/photos_new/generator-installs.jpg' },
  { label: 'Panel upgrades', sub: '100A to 200A, 400A, 3-phase', href: '/services/panel-upgrades', img: '/photos_new/panel-upgrades.jpg' },
  { label: 'EV chargers', sub: 'Level 2 home and commercial', href: '/services/ev-chargers', img: '/photos_new/ev-chargers.jpg' },
  { label: 'Soffit lighting', sub: 'Recessed LED, ribbon, RGBW', href: '/services/soffit-lighting', img: '/photos_new/soffit-lighting.jpg' },
  { label: 'Parking lot lighting', sub: 'HID-to-LED retrofits', href: '/services/parking-lot-lighting', img: '/photos_new/parking-lot-lighting.jpg' },
  { label: 'New home electrical', sub: 'Rough-in through trim', href: '/services/home-builds', img: '/photos_new/home-builds.jpg' },
];

const steps = [
  { icon: ClipboardList, title: 'Free site walk', body: 'We meter the panel, scope the job, and write one fixed price.' },
  { icon: BadgeDollarSign, title: 'Ask about monthly options', body: 'We go over the Synchrony financing options available on that price.' },
  { icon: FileSignature, title: 'Apply with Synchrony', body: 'Synchrony makes the credit decision, not us.' },
  { icon: Wrench, title: 'We do the work', body: 'Permit pulled, equipment ordered, install on the calendar.' },
];

const faqs = [
  {
    q: 'Does Solivance Electric offer financing?',
    a: 'Yes. Solivance Electric offers financing through Synchrony on standby generators, panel upgrades, EV chargers, lighting, and other electrical work. Ask about monthly payment options when you call (832) 965-9964 or request a quote. Subject to credit approval.',
  },
  {
    q: 'Can I finance a Briggs & Stratton generator and the installation together?',
    a: 'Yes. The generator, transfer switch, and installation can go on one financed amount, so the unit, pad, gas line, permit, and commissioning are covered together. Subject to credit approval.',
  },
  {
    q: 'Do I get a price before I apply?',
    a: 'Yes. Solivance Electric walks the site and writes one fixed price first, so you know the exact amount before you apply with Synchrony. Nothing is ordered until you sign.',
  },
  {
    q: 'Who decides if I am approved?',
    a: 'Synchrony makes the credit decision, not Solivance Electric. The plan offered and its terms depend on Synchrony and your credit approval.',
  },
  {
    q: 'Is financing available for commercial work?',
    a: 'Ask on the call. Availability depends on the job and the applicant. Solivance Electric tells you which options apply before any work is scheduled.',
  },
];

export default function FinancingPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
        { '@type': 'ListItem', position: 2, name: 'Financing', item: `${siteConfig.domain}/financing` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ═══ HERO + FORM ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fff7f1] via-white to-white">
        <div className={`${shell} grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14 lg:py-16`}>
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.18em]">
              <ol className="flex items-center gap-2 text-slate-500">
                <li><Link href="/" className="hover:text-[var(--onestop-red)] transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li className="font-semibold text-[var(--onestop-navy-deep)]">Financing</li>
              </ol>
            </nav>
            <div className="mb-5 flex items-center gap-3">
              <SynchronyLogo size="md" />
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--onestop-red)] font-[family-name:var(--font-app-mono)]">
                Financing partner
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-app-display)] text-[2.1rem] sm:text-[2.75rem] lg:text-[3.1rem] font-bold leading-[1.05] tracking-[-0.025em] text-[var(--onestop-navy-deep)] text-balance">
              Get the generator or panel upgrade now. Pay over time.
            </h1>
            <p className="mt-5 max-w-xl text-[0.98rem] leading-[1.7] text-slate-600">
              {financing.headline} on generators and electrical work. One fixed price first, then ask about monthly
              payment options on that number.
            </p>
            <ul className="mt-6 grid gap-2.5 text-[0.92rem] text-slate-700">
              {['Fixed price in writing before you apply', 'Equipment and installation on one plan', 'Synchrony makes the credit decision'].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--onestop-red)]" aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <div className="relative mt-8 hidden aspect-[16/8] overflow-hidden rounded-lg sm:block">
              <Image src="/photos_new/generator-installs.jpg" alt="Standby generator installed by Solivance Electric" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-md bg-white/95 px-3.5 py-2 text-[0.9rem] font-extrabold text-[var(--onestop-navy-deep)] shadow-lg hover:text-[var(--onestop-red)]"
              >
                <Phone className="h-4 w-4 text-[var(--onestop-red)]" aria-hidden /> {siteConfig.phone}
              </a>
            </div>
            <a href={`tel:${siteConfig.cleanPhone}`} className="mt-6 inline-flex items-center gap-2 text-lg font-extrabold text-[var(--onestop-navy-deep)] sm:hidden">
              <Phone className="h-5 w-5 text-[var(--onestop-red)]" aria-hidden /> {siteConfig.phone}
            </a>
            <p className="mt-3 text-xs text-slate-500">{financing.disclaimer}</p>
          </div>

          <div id="form" className="scroll-mt-28 rounded-lg border border-slate-200 bg-white p-5 sm:p-7 shadow-[0_24px_60px_-28px_rgba(15,40,71,0.35)] lg:sticky lg:top-36">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-[var(--onestop-navy-deep)]">Ask about monthly options</h2>
            <p className="mb-5 mt-1 text-[0.82rem] text-slate-500">Tell us the job. We call back with a price and the financing options.</p>
            <EstimateForm defaultFinancing />
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU CAN FINANCE ═══ */}
      <section className="bg-white py-14 sm:py-20">
        <div className={shell}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[var(--onestop-red)] font-[family-name:var(--font-app-mono)]">
                What you can finance
              </div>
              <h2 className="font-[family-name:var(--font-app-display)] text-2xl sm:text-3xl font-bold text-[var(--onestop-navy-deep)]">
                Generators, panels, chargers, lighting.
              </h2>
            </div>
            <Link href="/contact#form" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--onestop-red)] hover:underline">
              Something else? Ask <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group relative isolate flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-md p-5 text-white"
              >
                <Image src={p.img} alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <span className="text-lg font-extrabold leading-tight">{p.label}</span>
                <span className="mt-0.5 flex items-center justify-between gap-2 text-[0.8rem] text-white/80">
                  {p.sub}
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GENERATOR PROMPT ═══ */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className={`${shell} flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between`}>
          <div>
            <div className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[var(--onestop-red)] font-[family-name:var(--font-app-mono)]">
              Authorized Briggs &amp; Stratton dealer
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-[var(--onestop-navy-deep)]">
              Standby generators from {formatUsd(lowestGenerator)}, every model priced.
            </h2>
            <p className="mt-1 text-sm text-slate-600">Unit price shown. Installed price quoted after a free site walk.</p>
          </div>
          <Link
            href="/generators"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[var(--onestop-navy-deep)] px-6 text-[0.76rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-[var(--onestop-red)] transition-colors"
          >
            See generators <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="bg-white py-14 sm:py-20">
        <div className={shell}>
          <h2 className="font-[family-name:var(--font-app-display)] text-2xl sm:text-3xl font-bold text-[var(--onestop-navy-deep)]">How it works</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title: t, body }, i) => (
              <li key={t} className="relative rounded-md border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--onestop-navy-deep)] text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-[family-name:var(--font-app-mono)] text-2xl font-bold text-slate-200">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-bold text-[var(--onestop-navy-deep)]">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-slate-50 py-14 sm:py-20 border-t border-slate-200">
        <div className={`${shell} max-w-4xl`}>
          <h2 className="font-[family-name:var(--font-app-display)] text-2xl sm:text-3xl font-bold text-[var(--onestop-navy-deep)]">Financing questions</h2>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[0.98rem] font-bold text-[var(--onestop-navy-deep)]">
                  {f.q}
                  <span className="mt-1 text-[var(--onestop-red)] transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-xs leading-relaxed text-slate-500">
            Financing is provided by Synchrony, not {siteConfig.businessName}. {financing.disclaimer} Plan terms, availability,
            and approval are set by Synchrony and can change. {siteConfig.businessName} does not guarantee approval.
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <CtaBackdrop />
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 text-center">
          <h2 className="h-section text-white">Price first. Then the monthly options.</h2>
          <p className="mx-auto mt-4 max-w-lg text-[1rem] leading-[1.7] text-white/85">
            Free site walk, one fixed number, and the Synchrony options on that number.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#form" className="btn-solid inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-7 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#e55f15]">
              Ask about monthly options <ArrowRight className="h-4 w-4" />
            </a>
            <a href={`tel:${siteConfig.cleanPhone}`} className="btn-ghost-dark inline-flex h-12 items-center justify-center gap-2 rounded-md px-7 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white">
              <Phone className="h-4 w-4" />
              <span className="font-[family-name:var(--font-app-mono)] text-[0.82rem] normal-case tracking-normal">{siteConfig.phone}</span>
            </a>
          </div>
          <p className="mt-4 text-xs text-white/70">{financing.disclaimer}</p>
        </div>
      </section>
    </>
  );
}
