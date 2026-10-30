import { LP_PHONE } from '../_panel/phone';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { BadgeCheck, CalendarClock, Camera, Check, ClipboardCheck, Gauge, Phone, Scale, ShieldCheck, Wrench } from 'lucide-react';
import { siteConfig } from '../../config';
import { reviews } from '../../reviews';
import { PanelLeadForm } from '../_panel/PanelLeadForm';
import { LIGHTING_FORM } from '../_panel/formConfig';
import { CallLink } from '../_panel/CallLink';
import { ProcessSteps } from '../_panel/ProcessSteps';
import { SignsGrid } from '../_panel/SignsGrid';
import { GoogleG, Stars, TrustBadges } from '../_panel/Badges';

export const metadata: Metadata = {
  title: 'Parking Lot Lighting Repair & Installation in Houston',
  description:
    'Licensed Houston electrician for parking lot lighting. Lights out, damaged poles, LED upgrades and new installs. Free lot walk and one itemized written quote for the whole lot.',
  alternates: { canonical: '/lp/parking-lot-lighting' },
  // Shared links preview a lit lot, not the site-wide logo card.
  openGraph: {
    title: 'Parking Lot Lighting Repair & Installation in Houston',
    description: 'Free lot lighting audit from a licensed Houston electrician. Every pole checked, quoted two ways: fix what’s out, or switch to LED.',
    url: '/lp/parking-lot-lighting',
    images: [{ url: '/lp/og-parking-lot-lighting.jpg', width: 1200, height: 630, alt: 'Parking lot lit by LED pole lights at night' }],
  },
  twitter: { card: 'summary_large_image', images: ['/lp/og-parking-lot-lighting.jpg'] },
};

// Same layout and form as /lp/panel-inspection, written for the people who
// search this: property and facility managers, owners and business tenants.
// Claims stick to what Solivance states on its own service page. The lot
// photos are illustrative, so they're captioned without claiming a job.

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap' });

const wrap = 'mx-auto w-full max-w-6xl px-5 sm:px-8';
const section = 'py-14 sm:py-16';
const h2 = 'text-[2rem] font-bold leading-[1.08] tracking-[-0.025em] sm:text-[3.1rem]';
const label = 'text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#B23F07]';
const ink = 'bg-[#0A1322]';
const cta =
  'inline-flex items-center justify-center rounded-lg bg-[#E8590C] px-9 py-4 text-[1.05rem] font-semibold text-white transition-colors hover:bg-[#CF4E0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const HERO_POINTS = [
  `Licensed Texas electrical contractor, ${siteConfig.license.label}`,
  'Free lot lighting audit: repair price and LED price, side by side',
  'Photo report after every job. COI on request',
];

// The LED band: taken from Solivance's own parking-lot lighting service page.
const LED_GETS = [
  { icon: Gauge, title: 'Lower power use', detail: 'A typical metal-halide to LED retrofit cuts lighting power 55 to 75 percent.' },
  { icon: Wrench, title: 'Keep your poles', detail: 'Existing poles, bases and wiring usually stay. We swap the fixture heads.' },
  { icon: CalendarClock, title: 'On at dusk, every night', detail: 'Photocells come standard on every fixture we install, with timers where you need them.' },
];

// The offer the ads sell. Josh confirmed the photo report and COI on request.
const AUDIT = [
  { icon: ClipboardCheck, title: 'Every pole checked', detail: 'We walk the whole lot and mark every light that’s out, failing or damaged, not just the one you called about.' },
  { icon: Scale, title: 'Two prices, side by side', detail: 'Fix what’s out now, or switch the lot to LED. Both itemized in writing, so you can pick.' },
  { icon: Camera, title: 'Photo report after every job', detail: 'Before and after photos of the work, ready to forward to the owner.' },
  { icon: ShieldCheck, title: 'COI on request', detail: 'A certificate of insurance before we set foot on the property.' },
];

// One page for all three Google Ads ad groups. Each ad group's final URL adds
// ?s=repair|led|install so the headline repeats what was searched; no tag
// (or an unknown one) gets the combined headline.
const HEROES = {
  all: {
    h1: 'Parking lot lighting repair & installation in Houston',
    sub: 'Book a free lot lighting audit. We walk every pole and quote it two ways: fix what’s out, or switch the lot to LED.',
    close: 'Get your lot lit right.',
  },
  repair: {
    h1: 'Parking lot lighting repair in Houston',
    sub: 'Lights out, damaged poles or a lot that’s too dark. We walk the whole lot, find every problem and send one written quote.',
    close: 'Get your lot lit again.',
  },
  led: {
    h1: 'LED parking lot lighting upgrades in Houston',
    sub: 'Swap old lights for LED that uses far less power. Most lots keep their poles. We walk the lot and send a written quote.',
    close: 'Make the switch to LED.',
  },
  install: {
    h1: 'Parking lot lighting installation in Houston',
    sub: 'New lights, new poles or a lot that needs more light. We walk the lot, find what it needs and send a written quote.',
    close: 'Get your lot lit right.',
  },
};
type HeroKey = keyof typeof HEROES;

const review = (id: string) => reviews.find((r) => r.id === id)!;
const PULL = review('tamika-a');
const WALL = ['zno-z', 'harrison', 'donyal-w', 'cody-o', 'alco', 'michelle'].map(review);

const AREAS = ['Southwest Houston', 'Bellaire', 'Medical Center', 'Galleria', 'Westchase', 'Sharpstown', 'Memorial', 'The Heights', 'Stafford', 'Missouri City', 'Sugar Land'];

const FAQS = [
  {
    q: 'Can you quote the whole lot at once?',
    a: 'Yes. We walk every pole, not just the one that’s out, and put repairs, LED upgrades and new poles in one itemized written quote. Managing more than one property? We can walk them all.',
  },
  { q: 'What does the audit cost?', a: 'Nothing. The lot walk and both written prices are free, with no obligation.' },
  { q: 'Can you send a certificate of insurance?', a: 'Yes. We send a COI on request before any work starts.' },
  {
    q: 'Can you work around our tenants and customers?',
    a: 'Yes. Work is scheduled so traffic keeps moving, and after hours when the lot is busy during the day.',
  },
  {
    q: 'Can our existing poles be switched to LED?',
    a: 'Usually, yes. The poles, bases and wiring stay in place. We replace the fixture heads, remove the old ballasts and update the photocells.',
  },
  { q: 'Do you replace damaged poles?', a: 'Yes. We replace damaged or leaning poles and set new ones, including the bases and the underground wiring.' },
  { q: 'What areas do you serve?', a: `Houston and the surrounding area. Our shop is at ${siteConfig.address.full}.` },
];

export default async function ParkingLotLightingPage({ searchParams }: { searchParams: Promise<{ s?: string | string[] }> }) {
  const { s } = await searchParams;
  const key = typeof s === 'string' ? s.toLowerCase() : '';
  const hero = Object.hasOwn(HEROES, key) ? HEROES[key as HeroKey] : HEROES.all;

  // The form and shared LP pieces use --font-app-display; point it at Poppins here.
  const fontVars = { '--font-app-display': poppins.style.fontFamily } as CSSProperties;

  return (
    <div className={`${poppins.className} bg-white pb-20 text-[#0A1322] sm:pb-0`} style={fontVars}>
      {/* Company header: who we are and how to verify it, before anything else. */}
      <header className="border-b border-[#E6E8EC] bg-white">
        <div className={`${wrap} flex h-[68px] items-center justify-between gap-4`}>
          {/* The logo file has wide transparent margins; crop them in a fixed-height box. */}
          <div className="flex h-12 items-center overflow-hidden">
            <Image src="/logo/logo_horzontial.PNG" alt="Solivance Electric LLC" width={6144} height={4096} priority className="h-[104px] w-auto max-w-none" sizes="170px" />
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-2.5 border-r border-[#E6E8EC] pr-6 lg:flex">
              <GoogleG className="h-6 w-6" />
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.9rem] font-bold">{siteConfig.rating.toFixed(1)}</span>
                  <Stars className="h-3.5 w-3.5" />
                </div>
                <p className="text-[0.75rem] text-[#5A6B7F]">on Google</p>
              </div>
            </div>
            <div className="hidden items-center gap-2.5 border-r border-[#E6E8EC] pr-6 md:flex">
              <ShieldCheck className="h-5 w-5 text-[#1F7A4D]" strokeWidth={2} aria-hidden />
              <div className="leading-tight">
                <p className="text-[0.82rem] font-semibold">Licensed &amp; insured</p>
                <p className="text-[0.75rem] text-[#5A6B7F]">{siteConfig.license.label}</p>
              </div>
            </div>
            <CallLink location="header" className="flex items-center gap-2 rounded-lg bg-[#0A1322] px-4 py-2.5 text-[0.9rem] font-semibold text-white hover:bg-[#1B2A42]">
              <Phone className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">
                <span className="mr-1.5 font-normal text-white/60">24/7</span>
                {LP_PHONE}
              </span>
              <span className="sm:hidden">Call 24/7</span>
            </CallLink>
          </div>
        </div>
      </header>

      {/* Hero: headline, subheadline, form. */}
      {/* Lit lot at night behind a dark wash: sets the scene without competing with the form. */}
      <section className={`relative isolate overflow-hidden ${ink} text-white`}>
        <Image src="/lp/lot-lights-hero.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[50%_20%]" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0A1322]/95 via-[#0A1322]/85 to-[#0A1322]/70" aria-hidden />
        <div className={`${wrap} grid gap-8 pb-12 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:gap-16 lg:py-14`}>
          <div>
            {/* H1 repeats the search term: what Google matches the ad against. */}
            <h1 className="text-balance text-[2.3rem] font-bold leading-[1.04] tracking-[-0.03em] sm:text-[3.6rem]">{hero.h1}</h1>
            <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-[1.6] text-[#C9D2DE] sm:text-[1.2rem]">{hero.sub}</p>
            <ul className="mt-7 hidden space-y-3 lg:block">
              {HERO_POINTS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[1.02rem] font-medium">
                  <Check className="h-5 w-5 shrink-0 text-[#4ADE80]" strokeWidth={2.5} aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9 hidden max-w-[34rem] items-center gap-4 rounded-xl border border-[#E3E7EC] bg-white px-5 py-4 text-[#0A1322] shadow-[0_1px_2px_rgba(10,19,34,0.05)] lg:flex">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F4F6F9]">
                <GoogleG className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-bold">{siteConfig.rating.toFixed(1)}</span>
                  <Stars className="h-3.5 w-3.5" />
                  <span className="text-sm text-[#4A5568]">from {siteConfig.reviewCount} Google reviews</span>
                </div>
                <p className="mt-1 text-sm text-[#4A5568]">Licensed Houston electrician, with a shop on S Post Oak Rd.</p>
              </div>
            </div>
          </div>
          <PanelLeadForm config={LIGHTING_FORM} />
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-[#E6E8EC] bg-white">
        <div className={`${wrap} py-8 sm:py-10`}>
          <TrustBadges />
        </div>
      </section>

      {/* The offer: what the free audit actually hands the property manager. */}
      <section className={`bg-white ${section}`}>
        <div className={wrap}>
          <div className="max-w-2xl">
            <p className={label}>The free lot lighting audit</p>
            <h2 className={`mt-3 ${h2}`}>Every pole checked. Two prices. Paperwork you can forward.</h2>
          </div>
          <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {AUDIT.map(({ icon: Icon, title, detail }) => (
              <li key={title} className="rounded-xl border border-[#E6E8EC] bg-[#F7F8FA] p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#E8590C] ring-1 ring-[#E6E8EC]">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <p className="mt-5 font-semibold">{title}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[#4A5568]">{detail}</p>
              </li>
            ))}
          </ul>
          <a href="#form" className={`${cta} mt-9 w-full sm:w-auto`}>
            Book my free audit
          </a>
        </div>
      </section>

      {/* The problem */}
      <section className={`bg-[#F7F6F3] ${section}`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-20`}>
          <div>
            <h2 className={h2}>A dark lot is a problem for everyone who parks in it.</h2>
            <p className="mb-5 mt-7 text-[1.05rem] text-[#4A5568] sm:mt-9">What we get called for:</p>
            <SignsGrid variant="lighting" />
            <p className="mt-8 text-[1.1rem] font-semibold leading-[1.65]">
              Most of these come down to a fixture, a driver or ballast, a photocell or the wiring. We check every pole on the lot, not just the one that&apos;s
              out, so you get one quote that covers all of it.
            </p>
          </div>
          <figure>
            <Image
              src="/photos_new_pass2/parking-lot-lighting.jpg"
              alt="A commercial parking lot at night with a single working light"
              width={1024}
              height={768}
              className="aspect-[4/3] w-full rounded-xl object-cover lg:aspect-[3/4]"
              sizes="(min-width:1024px) 440px, 100vw"
            />
            <figcaption className="mt-3 text-sm text-[#5A6B7F]">One working light leaves most of a lot in the dark.</figcaption>
          </figure>
        </div>
      </section>

      {/* The process */}
      <section className={`bg-[#EEF1F5] ${section}`}>
        <div className={wrap}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className={label}>How it works</p>
              <h2 className={`mt-3 ${h2}`}>From lights out to lights on.</h2>
              <p className="mt-4 text-[1.05rem] leading-[1.65] text-[#4A5568]">One licensed crew, from the first walk to the night check.</p>
            </div>
            <CallLink location="process" className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-[#0A1322] px-5 py-3 font-semibold text-white hover:bg-[#1B2A42] lg:self-end">
              <Phone className="h-4 w-4" aria-hidden /> Rather talk? {LP_PHONE}
            </CallLink>
          </div>
          <div className="mt-9 lg:mt-12">
            <ProcessSteps variant="lighting" />
          </div>
        </div>
      </section>

      {/* LED upgrade: what it gets you */}
      <section className={`relative isolate overflow-hidden ${ink} text-white`}>
        <div className={`${wrap} ${section} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-6">
            <h2 className={`${h2} max-w-[16ch]`}>Still running the old lights?</h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.7] text-white/70 sm:text-lg">
              If you&apos;re repairing them every few months, an LED upgrade usually makes more sense. Here&apos;s what it gets you:
            </p>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {LED_GETS.map(({ icon: Icon, title, detail }) => (
                <li key={title} className="flex gap-4 py-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.07] text-[#FF7A2F] ring-1 ring-white/10">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-white/60">{detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a href="#form" className={`${cta} mt-9 w-full sm:w-auto`}>
              Request my quote
            </a>
          </div>
          <figure className="lg:col-span-6">
            <Image
              src="/photos_new/parking-lot-lighting.jpg"
              alt="An LED pole light over a commercial parking lot at dusk"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full rounded-2xl object-cover lg:aspect-[5/6]"
              sizes="(min-width:1024px) 560px, 100vw"
            />
          </figure>
        </div>
      </section>

      {/* Reviews */}
      <section className={`bg-white ${section}`}>
        <div className={wrap}>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <h2 className={`${h2} max-w-xl lg:max-w-md`}>What customers say about working with us</h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl border border-[#E6E8EC] bg-white px-5 py-4 shadow-[0_8px_24px_-16px_rgba(10,19,34,0.25)] sm:px-6 lg:shrink-0 lg:flex-nowrap">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F4F6F9]">
                <GoogleG className="h-7 w-7" />
              </span>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[2.1rem] font-bold leading-none tracking-[-0.02em]">{siteConfig.rating.toFixed(1)}</span>
                  <Stars className="h-5 w-5" />
                </div>
                <p className="mt-1 text-sm text-[#5A6B7F]">Based on {siteConfig.reviewCount} Google reviews</p>
              </div>
              <span className="hidden h-12 w-px bg-[#E6E8EC] sm:block" aria-hidden />
              <div className="flex items-center gap-2.5">
                <BadgeCheck className="h-6 w-6 shrink-0 text-[#1F7A4D]" aria-hidden />
                <div className="leading-tight">
                  <p className="font-semibold">Verified reviews</p>
                  <p className="text-sm text-[#5A6B7F]">Posted by real customers</p>
                </div>
              </div>
            </div>
          </div>

          {/* A commercial customer, set large. */}
          <figure className="mt-10 grid gap-6 rounded-xl bg-[#0A1322] p-6 text-white sm:mt-14 sm:gap-8 sm:p-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
            <div>
              <Stars className="h-5 w-5" />
              <p className="mt-5 text-[1.6rem] font-semibold leading-[1.25] tracking-[-0.02em] sm:text-[2.1rem]">
                &ldquo;They went out of their way to pick up the specific fixtures I needed.&rdquo;
              </p>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{PULL.author}</span> <span className="text-white/55">Salon owner, {PULL.source} review</span>
              </figcaption>
            </div>
            <blockquote className="line-clamp-6 text-[0.97rem] leading-[1.75] text-white/70 sm:line-clamp-none lg:border-l lg:border-white/15 lg:pl-10">
              {PULL.quote}
            </blockquote>
          </figure>

          <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {WALL.map((r) => (
              <figure key={r.id} className="flex w-[85%] shrink-0 snap-center flex-col rounded-xl border border-[#E6E8EC] bg-white p-6 sm:w-auto sm:p-7">
                <div className="flex items-center justify-between">
                  <Stars />
                  {r.source === 'Google' ? <GoogleG className="h-5 w-5" /> : null}
                </div>
                <blockquote className="mt-4 flex-1 text-[0.97rem] leading-[1.7] text-[#2D3748]">{r.quote}</blockquote>
                <figcaption className="mt-6 border-t border-[#EEF0F3] pt-4 text-sm">
                  <span className="font-semibold">{r.author}</span> <span className="text-[#5A6B7F]">{r.source} review</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-[#5A6B7F] sm:hidden">Swipe for more reviews</p>
        </div>
      </section>

      {/* Where we work */}
      <section className="border-y border-[#E6E8EC] bg-white">
        <div className={`${wrap} flex flex-col gap-5 py-10 lg:flex-row lg:items-center lg:gap-12`}>
          <div className="shrink-0">
            <p className="text-[1.25rem] font-bold tracking-[-0.02em]">Commercial lots across Houston</p>
            <p className="mt-1 text-sm text-[#5A6B7F]">From our shop on S Post Oak Rd</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <li key={a} className="rounded-full border border-[#D9DDE3] px-3.5 py-1.5 text-sm font-medium text-[#2D3748]">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Questions */}
      <section className={`bg-[#F7F6F3] ${section}`}>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16`}>
          <div className="lg:sticky lg:top-10 lg:self-start">
            <h2 className={h2}>Questions property managers ask</h2>
            <p className="mt-5 text-[1.05rem] leading-[1.65] text-[#4A5568]">Don&apos;t see yours? Give us a call.</p>
            <CallLink location="faq" className="mt-6 inline-flex items-center gap-2 text-[1.1rem] font-semibold text-[#E8590C] hover:underline">
              <Phone className="h-4 w-4" aria-hidden /> {LP_PHONE}
            </CallLink>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-xl bg-white px-6 shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.02rem] font-semibold">
                  {f.q}
                  <span className="text-2xl font-light leading-none text-[#5A6B7F] transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="-mt-1 pb-6 leading-[1.7] text-[#4A5568]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className={`relative isolate overflow-hidden ${ink} text-white`}>
        <Image src="/photos_new/houston.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-[50%_60%]" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-[#0A1322]/85" aria-hidden />
        <div className={`${wrap} py-20 text-center sm:py-28`}>
          <h2 className={`${h2} mx-auto max-w-[20ch]`}>{hero.close}</h2>
          <p className="mx-auto mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/70">It takes about a minute. We&apos;ll call you to set up the lot walk.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#form" className={`${cta} w-full sm:w-auto`}>
              Request my quote
            </a>
            <CallLink
              location="final_cta"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 px-9 py-4 font-semibold hover:bg-white/10 sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden /> {LP_PHONE}
            </CallLink>
          </div>
          <p className="mt-6 text-sm text-white/50">Free lot lighting audit. No obligation.</p>
        </div>
      </section>

      <footer className="bg-black text-[0.8rem] leading-relaxed text-white/50">
        <div className={`${wrap} space-y-1.5 py-8`}>
          <p>
            {siteConfig.businessName}, {siteConfig.address.full}. {siteConfig.license.type} {siteConfig.license.number}.
          </p>
          <p>
            Regulated by the {siteConfig.regulator.name}, {siteConfig.regulator.address}, {siteConfig.regulator.phones.join(' or ')}.
          </p>
          <p>
            <a href="/privacy" target="_blank" rel="noopener" className="underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" target="_blank" rel="noopener" className="underline">
              Terms
            </a>
          </p>
        </div>
      </footer>

      {/* Phones: call or request a quote, always in reach. */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-2 border-t border-[#E3E6EA] bg-white/95 px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 text-[0.95rem] backdrop-blur sm:hidden">
        <CallLink location="sticky_mobile" className="flex items-center justify-center gap-2 rounded-lg border border-[#0A1322] py-3 font-semibold">
          <Phone className="h-4 w-4" aria-hidden /> Call
        </CallLink>
        <a href="#form" className="flex items-center justify-center rounded-lg bg-[#E8590C] py-3 font-semibold text-white">
          Book free audit
        </a>
      </div>
    </div>
  );
}
