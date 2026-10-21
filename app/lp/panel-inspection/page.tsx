import type { Metadata } from 'next';
import Image from 'next/image';
import { BadgeCheck, Phone, Star } from 'lucide-react';
import { siteConfig } from '../../config';
import { reviews } from '../../reviews';
import { PanelLeadForm } from './PanelLeadForm';
import { CallLink } from './CallLink';
import { InspectedTag } from './InspectedTag';

export const metadata: Metadata = {
  title: 'Electrical Panel Replacement in Houston',
  description:
    'Licensed Houston electrical panel replacement. Start with a no-cost inspection. Permit pulled and city-inspected on every panel job.',
  alternates: { canonical: '/lp/panel-inspection' },
};

// One job: book the inspection. Proof comes from Solivance's own job photos
// (Google Business Profile) — no stock or generated imagery. No links leave
// the page except the legal pages, which open in a new tab.

// Shared scale so every section breathes the same way.
const wrap = 'mx-auto w-full max-w-6xl px-5 sm:px-8';
const section = 'py-16 sm:py-24';
const h2 = 'font-[family-name:var(--font-app-display)] text-[1.85rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]';
const lede = 'text-[1.0625rem] leading-[1.65] text-[#3D4F66] sm:text-lg';

// Site photo behind a deep navy wash: atmosphere only, text stays the focus.
const PhotoBackdrop = ({ src, position = '50% 50%' }: { src: string; position?: string }) => (
  <>
    <Image src={src} alt="" fill sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: position }} aria-hidden />
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(14,34,64,0.84),rgba(14,34,64,0.70)_50%,rgba(14,34,64,0.88))]" aria-hidden />
  </>
);

const review = (id: string) => reviews.find((r) => r.id === id)!;
const FIRE_REVIEW = review('yeny-v');
const PANEL_REVIEW = review('tonya-n');

const TRUST = [
  { title: `License ${siteConfig.license.number}`, detail: 'Texas Electrical Contractor' },
  { title: 'Permit on every job', detail: 'City-inspected panel work' },
  { title: '5.0 on Google', detail: `${siteConfig.reviewCount} homeowner reviews` },
  { title: 'Local Houston shop', detail: siteConfig.address.street },
];

const COVERS = [
  { title: 'Heat and wear', detail: 'Breakers, wire connections and the main checked for heat damage.' },
  { title: 'Brand check', detail: 'We look for panels with known problems, like Federal Pacific and Zinsco.' },
  { title: 'Capacity', detail: 'Can it handle your AC, appliances, and anything you plan to add?' },
  { title: 'A straight answer', detail: 'Safe as is, needs a repair, or needs replacing. No pressure.' },
  { title: 'Written quote', detail: 'Itemized, in writing, and only if you actually need work.' },
];

const PERMIT_POINTS = [
  'A city inspector checks the work after we finish',
  'The green tag on your panel proves it passed',
  'A clean record when you sell or file an insurance claim',
];

// A real sequence, so it is numbered.
const REPLACEMENT = [
  { title: 'Written quote', detail: 'Itemized and in writing before any work starts.' },
  { title: 'Permit pulled', detail: 'Filed with the city on every panel job.' },
  { title: 'Utility coordinated', detail: 'We schedule the power shut-off and reconnect.' },
  { title: 'City-inspected', detail: 'An inspector signs off and tags your new panel.' },
];

const FAQS = [
  {
    q: 'How much does a panel replacement cost?',
    a: 'It depends on your panel, your home and what you run on it. After the no-cost inspection you get an itemized written quote, so you know the exact number before deciding.',
  },
  { q: 'What does the inspection cost?', a: 'Nothing. There is no charge and no obligation. If your panel is fine, we will tell you that.' },
  { q: 'Should I open my panel to look?', a: 'Please don’t. Tell us what you have noticed and our licensed electrician will handle the hands-on part.' },
  {
    q: 'Do you pull a permit?',
    a: 'Yes, on every panel job. We handle the permit, schedule the city inspection, and coordinate the power shut-off with the utility.',
  },
  { q: 'Will a new panel raise my electric bill?', a: 'No. A panel upgrade on its own doesn’t raise your bill. It makes your system safer.' },
];

const Stars = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <span className="flex gap-0.5" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`${className} fill-[#F5B301] text-[#F5B301]`} aria-hidden />
    ))}
  </span>
);

const ctaClass =
  'inline-flex w-full items-center justify-center rounded-md bg-[#F26B1F] px-8 py-4 text-[1.05rem] font-bold text-white transition-colors hover:bg-[#DD5E15] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto';

export default function PanelInspectionPage() {
  return (
    <div className="bg-white pb-20 text-[#0E2240] sm:pb-0">
      <header className="sticky top-0 z-30 border-b border-[#E3E6EA] bg-white/95 backdrop-blur">
        <div className={`${wrap} flex h-16 items-center justify-between gap-3`}>
          {/* The logo file has wide transparent margins; crop them in a fixed-height box. */}
          <div className="flex h-11 items-center overflow-hidden">
            <Image src="/logo/logo_horzontial.PNG" alt="Solivance Electric LLC" width={6144} height={4096} priority className="h-[96px] w-auto max-w-none" sizes="150px" />
          </div>
          <CallLink location="header" className="flex items-center gap-2 rounded-md px-2 py-2 text-[0.95rem] font-semibold hover:bg-[#EEF0F2]">
            <Phone className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{siteConfig.phone}</span>
            <span className="sm:hidden">Call us</span>
          </CallLink>
        </div>
      </header>

      {/* Hero */}
      {/* Hero. Desktop: a real Solivance job fills the right side and the form sits on it. */}
      <section className="relative bg-white">
        <div className="absolute inset-y-0 right-0 hidden w-[45%] lg:block">
          <Image
            src="/lp/panel-new-inspected.jpg"
            alt="A new Solivance panel with the city inspection tag on the door"
            fill
            priority
            sizes="45vw"
            className="object-cover object-[0%_80%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,34,64,0.55),rgba(14,34,64,0.1)_40%)]" aria-hidden />
        </div>
        <div className={`${wrap} relative grid gap-10 pb-14 pt-10 sm:pt-16 lg:min-h-[660px] lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-20 lg:py-16`}>
          <div className="lg:max-w-[33rem]">
            <h1 className="font-[family-name:var(--font-app-display)] text-[2.25rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-[3.9rem]">
              Electrical panel replacement in Houston
            </h1>
            <p className="mt-6 text-[1.15rem] leading-[1.6] text-[#3D4F66] sm:text-[1.25rem]">
              Start with a no-cost inspection. If your panel needs replacing, we handle the quote, the permit and the city inspection.
            </p>
            <div className="mt-7 flex items-center gap-3 text-[0.95rem] text-[#3D4F66]">
              <Stars />
              <span>
                <strong className="text-[#0E2240]">5.0</strong> from {siteConfig.reviewCount} Google reviews
              </span>
            </div>
            <p className="mt-10 hidden border-t border-[#E3E6EA] pt-5 text-sm leading-relaxed text-[#5A6B7F] lg:block">
              Licensed Texas electrical contractor, {siteConfig.license.number}.
              <br />
              {siteConfig.address.full}
            </p>
          </div>

          <div>
            <PanelLeadForm />
          </div>
        </div>
      </section>

      {/* Credentials strip: set as type, not icon tiles. */}
      <section className="border-y border-[#E3E6EA] bg-white">
        <ul className={`${wrap} grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[#E3E6EA]`}>
          {TRUST.map(({ title, detail }) => (
            <li key={title} className="py-6 lg:px-8 lg:py-8 lg:first:pl-0">
              <p className="font-[family-name:var(--font-app-display)] text-[1.15rem] font-bold leading-snug tracking-[-0.01em] sm:text-[1.35rem]">{title}</p>
              <p className="mt-1 text-sm leading-snug text-[#5A6B7F]">{detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Permits + real work */}
      <section className={`bg-[#EEF0F2] ${section}`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16`}>
          <div>
            <h2 className={h2}>We pull the permit on every panel job</h2>
            <p className={`mt-5 ${lede}`}>Not every electrician does. Here is what it means for you:</p>
            <ul className="mt-7 divide-y divide-[#D5DAE0] border-y border-[#D5DAE0]">
              {PERMIT_POINTS.map((text) => (
                <li key={text} className="py-4 text-[1.0625rem] font-medium leading-snug">
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <figure className="relative col-span-2 lg:hidden">
              <Image
                src="/lp/panel-new-inspected.jpg"
                alt="A new Solivance panel with the city inspection tag on the door"
                width={1600}
                height={2133}
                className="aspect-[4/3] w-full rounded-lg object-cover object-[50%_40%]"
                sizes="100vw"
              />
              <InspectedTag className="absolute -bottom-5 right-3 origin-bottom-right scale-[0.72]" />
            </figure>
            <figure className="row-span-2">
              <Image src="/lp/panel-install-wall.jpg" alt="A panel mid-install with the wall opened up" width={1600} height={2133} className="h-full min-h-[260px] w-full rounded-lg object-cover" sizes="(min-width:1024px) 330px, 50vw" />
            </figure>
            <figure>
              <Image src="/lp/panel-old-exterior.jpg" alt="An aging exterior panel on a Houston home" width={599} height={799} className="aspect-[4/3] w-full rounded-lg object-cover" sizes="(min-width:1024px) 330px, 50vw" />
            </figure>
            <figure>
              <Image src="/lp/panel-new-meter.jpg" alt="A new panel and meter with the city inspection tag" width={1600} height={2133} className="aspect-[4/3] w-full rounded-lg object-cover object-[50%_60%]" sizes="(min-width:1024px) 330px, 50vw" />
            </figure>
            <figcaption className="col-span-2 text-sm text-[#5A6B7F]">Panels we&apos;ve worked on across Houston.</figcaption>
          </div>
        </div>
      </section>

      {/* What the inspection covers */}
      <section className={section}>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16`}>
          <div>
            <h2 className={h2}>What the inspection covers</h2>
            <p className={`mt-5 ${lede}`}>A licensed electrician comes to your home and checks it in person.</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#EEF0F2] px-4 py-2.5 font-semibold">
              <BadgeCheck className="h-5 w-5" aria-hidden /> No cost. No obligation.
            </p>
          </div>
          <ul className="divide-y divide-[#E3E6EA] border-y border-[#E3E6EA]">
            {COVERS.map(({ title, detail }) => (
              <li key={title} className="grid gap-1 py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <p className="text-[1.0625rem] font-semibold leading-snug">{title}</p>
                <p className="leading-relaxed text-[#3D4F66]">{detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Replacement: what the homeowner actually buys */}
      <section className="relative isolate overflow-hidden bg-[#0E2240] text-white">
        <PhotoBackdrop src="/photos_new/panel-upgrades.jpg" />
        <div className={`${wrap} ${section}`}>
          <h2 className={`${h2} max-w-[22ch]`}>If your panel needs replacing, we handle all of it</h2>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/75 sm:text-lg">
            One licensed crew from quote to green tag. You don&apos;t call the city or the utility. We do.
          </p>
          <ol className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {REPLACEMENT.map(({ title, detail }, i) => (
              <li key={title} className="border-t-2 border-white/25 pt-5">
                <span className="font-[family-name:var(--font-app-display)] text-[0.95rem] font-bold text-[#F26B1F]">Step {i + 1}</span>
                <p className="mt-2 text-[1.15rem] font-semibold leading-snug">{title}</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-white/70">{detail}</p>
              </li>
            ))}
          </ol>
          <a href="#form" className={`${ctaClass} mt-10`}>Schedule my inspection</a>
        </div>
      </section>

      {/* Reviews */}
      <section className={section}>
        <div className={wrap}>
          <h2 className={h2}>What homeowners say</h2>
          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <figure>
              <Stars className="h-5 w-5" />
              <p className="mt-5 font-[family-name:var(--font-app-display)] text-[1.5rem] font-semibold leading-[1.3] tracking-[-0.01em] sm:text-[1.9rem]">
                &ldquo;They found other issues in the panel that could have caused a fire.&rdquo;
              </p>
              <blockquote className="mt-5 leading-[1.7] text-[#3D4F66]">{FIRE_REVIEW.quote}</blockquote>
              <figcaption className="mt-4 text-sm">
                <strong>{FIRE_REVIEW.author}</strong> <span className="text-[#5A6B7F]">on Google</span>
              </figcaption>
            </figure>
            <figure className="rounded-lg bg-[#EEF0F2] p-7 lg:self-start">
              <Stars />
              <blockquote className="mt-4 text-[1.0625rem] leading-[1.7]">{PANEL_REVIEW.quote}</blockquote>
              <figcaption className="mt-4 text-sm">
                <strong>{PANEL_REVIEW.author}</strong> <span className="text-[#5A6B7F]">on Google</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className={`border-t border-[#E3E6EA] ${section}`}>
        <div className={`${wrap} max-w-3xl`}>
          <h2 className={h2}>Questions</h2>
          <div className="mt-8 divide-y divide-[#E3E6EA] border-y border-[#E3E6EA]">
            {FAQS.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-semibold">
                  {f.q}
                  <span className="text-2xl font-light leading-none text-[#5A6B7F] transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="-mt-1 pb-5 leading-[1.7] text-[#3D4F66]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Last call to action */}
      <section className="relative isolate overflow-hidden bg-[#0E2240] text-white">
        <PhotoBackdrop src="/photos_new/houston.jpg" position="50% 60%" />
        <div className={`${wrap} ${section} text-center`}>
          <h2 className={`${h2} mx-auto max-w-[20ch]`}>Find out if your panel is safe</h2>
          <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-white/75">It takes about a minute. We&apos;ll call you to set a time.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#form" className={ctaClass}>Schedule my inspection</a>
            <CallLink
              location="final_cta"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/30 px-8 py-4 font-semibold hover:bg-white/10 sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
            </CallLink>
          </div>
        </div>
      </section>

      <footer className="bg-white text-[0.8rem] leading-relaxed text-[#5A6B7F]">
        <div className={`${wrap} space-y-1.5 py-8`}>
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
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-[#E3E6EA] bg-white/95 p-2 backdrop-blur sm:hidden">
        <CallLink location="sticky_mobile" className="flex items-center justify-center gap-2 rounded-md border border-[#0E2240] py-3 font-semibold">
          <Phone className="h-4 w-4" aria-hidden /> Call
        </CallLink>
        <a href="#form" className="flex items-center justify-center rounded-md bg-[#F26B1F] py-3 font-semibold text-white">
          Schedule inspection
        </a>
      </div>
    </div>
  );
}
