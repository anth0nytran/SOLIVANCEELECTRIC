import type { Metadata } from 'next';
import Image from 'next/image';
import { Phone, Star } from 'lucide-react';
import { siteConfig } from '../../config';
import { reviews } from '../../reviews';
import { PanelLeadForm } from './PanelLeadForm';
import { CallLink } from './CallLink';

export const metadata: Metadata = {
  title: 'Electrical Panel Safety Inspection in Houston',
  description:
    'Is your breaker box safe? A licensed Houston electrician inspects your panel at no cost and gives you a straight answer. Written quote only if you need work.',
  alternates: { canonical: '/lp/panel-inspection' },
};

// One job: book the inspection. Proof comes from Solivance's own job photos
// (from their Google Business Profile) — no stock or generated imagery.
// No links leave this page except the legal pages, which open in a new tab.

const PANEL_REVIEWS = ['tonya-n', 'yeny-v']
  .map((id) => reviews.find((r) => r.id === id))
  .filter((r): r is (typeof reviews)[number] => !!r);

const COVERS = [
  'Breakers, wiring connections and the main checked for heat damage and wear',
  'Brand check for panels with known problems, like Federal Pacific and Zinsco',
  'Capacity check against your AC, appliances, and anything you plan to add',
  'A straight answer: safe as is, needs a repair, or needs replacing',
  'A written, itemized quote, only if you actually need work',
];

const FAQS = [
  { q: 'What does the inspection cost?', a: 'Nothing. There is no charge and no obligation. If your panel is fine, we will tell you that.' },
  { q: 'Should I open my panel to look?', a: 'Please don’t. Tell us what you have noticed and our licensed electrician will handle the hands-on part.' },
  { q: 'If I need a new panel, who handles the permit?', a: 'We do: the permit, the city inspection, and coordinating the power shut-off with the utility.' },
  { q: 'Will a new panel raise my electric bill?', a: 'No. A panel upgrade on its own doesn’t raise your bill. It makes your system safer.' },
];

const navy = 'text-[#0E2240]';

const Stars = () => (
  <span className="flex gap-0.5" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-[#F5B301] text-[#F5B301]" />
    ))}
  </span>
);

export default function PanelInspectionPage() {
  return (
    <div className={`bg-white pb-20 ${navy} sm:pb-0`}>
      <header className="border-b border-[#E3E6EA]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5">
          {/* The logo file has wide transparent margins; crop them in a fixed-height box. */}
          <div className="flex h-11 items-center overflow-hidden">
            <Image src="/logo/logo_horzontial.PNG" alt="Solivance Electric LLC" width={6144} height={4096} priority className="h-[96px] w-auto max-w-none" sizes="150px" />
          </div>
          <CallLink location="header" className="flex items-center gap-2 text-[0.95rem] font-semibold">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{siteConfig.phone}</span>
            <span className="sm:hidden">Call</span>
          </CallLink>
        </div>
      </header>

      {/* Hero: question, answer, form. The real tagged panel carries the proof on desktop. */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-10 pt-7 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-14 lg:pt-14">
        <div className="lg:pt-2">
          <h1 className="font-[family-name:var(--font-app-display)] text-[2.1rem] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[3.4rem]">
            Is your breaker box safe? Find out from a licensed Houston electrician.
          </h1>
          <p className="mt-4 max-w-[34rem] text-[1.1rem] leading-relaxed text-[#3D4F66]">
            A no-cost panel safety inspection with a straight answer. You get a written quote only if your panel actually needs work.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.95rem] text-[#3D4F66]">
            <span className="flex items-center gap-2">
              <Stars /> <strong className={navy}>5.0</strong> from {siteConfig.reviewCount} Google reviews
            </span>
            <span>Texas license {siteConfig.license.number}</span>
          </div>

          <figure className="relative mt-8 hidden overflow-hidden rounded-md lg:block">
            <Image
              src="/lp/panel-new-inspected.jpg"
              alt="A new Solivance panel with the city inspection tag on the door"
              width={1600}
              height={2133}
              className="h-[420px] w-full object-cover object-[50%_35%]"
              sizes="(min-width:1024px) 600px, 100vw"
              priority
            />
            <figcaption className="absolute bottom-3 left-3 rounded bg-white/95 px-3 py-2 text-sm font-medium shadow-sm">
              One of our panels, permitted and passed by the city inspector.
            </figcaption>
          </figure>
        </div>

        <div className="lg:sticky lg:top-6">
          <PanelLeadForm />
        </div>
      </section>

      {/* Real work: a true sequence, so it's labeled as one. */}
      <section className="bg-[#EEF0F2]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <h2 className="max-w-2xl font-[family-name:var(--font-app-display)] text-[1.75rem] font-bold leading-tight tracking-[-0.015em] sm:text-4xl">
            Real panels we&apos;ve worked on in Houston
          </h2>
          <p className="mt-3 max-w-xl text-[#3D4F66]">Every replacement is permitted and inspected by the city. Look for the green tag.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {[
              // Phones don't see the hero photo, so the tagged panel leads here.
              { src: '/lp/panel-new-inspected.jpg', w: 1600, h: 2133, cap: 'Passed city inspection', mobileOnly: true },
              { src: '/lp/panel-old-exterior.jpg', w: 599, h: 799, cap: 'An aging exterior panel' },
              { src: '/lp/panel-install-wall.jpg', w: 1600, h: 2133, cap: 'Mid-install, opened up' },
              { src: '/lp/panel-new-meter.jpg', w: 1600, h: 2133, cap: 'New panel, city-tagged' },
            ].map((p) => (
              <figure key={p.src} className={'mobileOnly' in p ? 'lg:hidden' : undefined}>
                <Image
                  src={p.src}
                  alt={p.cap}
                  width={p.w}
                  height={p.h}
                  className="aspect-[3/4] w-full rounded-md object-cover"
                  sizes="(min-width:1024px) 360px, 50vw"
                />
                <figcaption className="mt-2 text-sm leading-snug text-[#3D4F66]">{p.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* What the inspection covers + who we're for. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-[family-name:var(--font-app-display)] text-[1.75rem] font-bold leading-tight tracking-[-0.015em] sm:text-4xl">
            What the inspection covers
          </h2>
          <ul className="mt-6 divide-y divide-[#E3E6EA] border-y border-[#E3E6EA]">
            {COVERS.map((t) => (
              <li key={t} className="py-3.5 text-[1.05rem] leading-snug">{t}</li>
            ))}
          </ul>
          <p className="mt-5 text-[1.05rem] font-semibold">No cost. No obligation.</p>
        </div>
        <div className="rounded-md bg-[#0E2240] p-7 text-white sm:p-9 lg:self-start">
          <p className="font-[family-name:var(--font-app-display)] text-2xl font-bold leading-snug sm:text-[1.7rem]">
            We&apos;re not the cheapest electrician in Houston.
          </p>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-white/80">
            We&apos;re licensed, we pull the permit, and we do it right the first time, so you never have to wonder about your panel again.
          </p>
          <dl className="mt-7 grid gap-4 border-t border-white/15 pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-white/60">Texas Electrical Contractor</dt>
              <dd className="mt-0.5 font-semibold">License {siteConfig.license.number}</dd>
            </div>
            <div>
              <dt className="text-white/60">Shop</dt>
              <dd className="mt-0.5 font-semibold">{siteConfig.address.street}, Houston</dd>
            </div>
            <div>
              <dt className="text-white/60">Google rating</dt>
              <dd className="mt-0.5 font-semibold">5.0 from {siteConfig.reviewCount} reviews</dd>
            </div>
            <div>
              <dt className="text-white/60">In business</dt>
              <dd className="mt-0.5 font-semibold">{siteConfig.yearsInBusiness}+ years</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Reviews, quoted in full. */}
      <section className="border-t border-[#E3E6EA]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <h2 className="font-[family-name:var(--font-app-display)] text-[1.75rem] font-bold leading-tight tracking-[-0.015em] sm:text-4xl">
            What homeowners say
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {PANEL_REVIEWS.map((r) => (
              <figure key={r.id}>
                <Stars />
                <blockquote className="mt-3 text-[1.05rem] leading-relaxed text-[#2A3B52]">{r.quote}</blockquote>
                <figcaption className="mt-3 text-sm">
                  <strong>{r.author}</strong> <span className="text-[#6B7A8C]">on Google</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EEF0F2]">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
          <h2 className="font-[family-name:var(--font-app-display)] text-[1.75rem] font-bold leading-tight tracking-[-0.015em] sm:text-4xl">
            Questions
          </h2>
          <div className="mt-6 divide-y divide-[#D5DAE0] border-y border-[#D5DAE0]">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.05rem] font-semibold">
                  {f.q}
                  <span className="text-xl leading-none text-[#6B7A8C] transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-2 leading-relaxed text-[#3D4F66]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 text-center">
        <h2 className="font-[family-name:var(--font-app-display)] text-[1.75rem] font-bold leading-tight tracking-[-0.015em] sm:text-4xl">
          Find out if your panel is safe
        </h2>
        <p className="mt-3 text-[#3D4F66]">It takes about a minute. We&apos;ll call you to set a time.</p>
        <a
          href="#form"
          className="mt-7 inline-flex w-full items-center justify-center rounded-md bg-[#F26B1F] px-8 py-4 text-[1.05rem] font-bold text-white hover:bg-[#DD5E15] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E2240] sm:w-auto"
        >
          Schedule my inspection
        </a>
      </section>

      <footer className="border-t border-[#E3E6EA] text-xs leading-relaxed text-[#6B7A8C]">
        <div className="mx-auto max-w-6xl space-y-1.5 px-5 py-6">
          <p>
            {siteConfig.businessName}, {siteConfig.address.full}. {siteConfig.license.type} {siteConfig.license.number}.
          </p>
          <p>
            Regulated by the {siteConfig.regulator.name}, {siteConfig.regulator.address}, {siteConfig.regulator.phones.join(' or ')}.
          </p>
          <p>
            <a href="/privacy" target="_blank" rel="noopener" className="underline">Privacy Policy</a> and{' '}
            <a href="/terms" target="_blank" rel="noopener" className="underline">Terms</a>
          </p>
        </div>
      </footer>

      {/* Phones: call or schedule, always in reach. */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-[#E3E6EA] bg-white p-2 sm:hidden">
        <CallLink location="sticky_mobile" className="flex items-center justify-center gap-2 rounded-md border border-[#0E2240] py-3 font-semibold">
          <Phone className="h-4 w-4" /> Call
        </CallLink>
        <a href="#form" className="flex items-center justify-center rounded-md bg-[#F26B1F] py-3 font-semibold text-white">
          Schedule inspection
        </a>
      </div>
    </div>
  );
}
