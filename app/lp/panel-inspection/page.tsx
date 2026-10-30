import { LP_PHONE } from '../_panel/phone';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { BadgeCheck, Check, FileCheck, Landmark, Phone, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../../config';
import { reviews } from '../../reviews';
import { PanelLeadForm } from '../_panel/PanelLeadForm';
import { CallLink } from '../_panel/CallLink';
import { ProcessSteps } from '../_panel/ProcessSteps';
import { SignsGrid } from '../_panel/SignsGrid';
import { GoogleG, Stars, TrustBadges } from '../_panel/Badges';

export const metadata: Metadata = {
  title: 'Electrical Panel Replacement in Houston',
  description:
    'Licensed Houston electrical panel replacement. Start with a no-cost inspection. Permit pulled and city-inspected on every panel job.',
  alternates: { canonical: '/lp/panel-inspection' },
};

// Built on the Acquisition.com funnel layout: a plain hero (headline,
// subheadline, form), then proof, symptoms, numbered process, one bold
// statement band, a wall of reviews, FAQ, close.
// Proof comes from Solivance's own job photos and reviews only. No links
// leave the page except the legal pages, which open in a new tab.

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
  'Permit pulled and city-inspected on every panel job',
  'Itemized written quote before any work starts',
];

const AREAS = ['Westbury', 'Meyerland', 'Bellaire', 'West University', 'Medical Center', 'The Heights', 'Garden Oaks', 'Memorial Villages', 'Stafford', 'Missouri City', 'Sugar Land'];

// What the permit gets the homeowner (the "We pull the permit" section).
const PERMIT_GETS = [
  { icon: Landmark, title: 'A city inspector checks our work', detail: 'After we finish, the city inspects the install and signs off.' },
  { icon: FileCheck, title: 'A clean record when you sell', detail: 'Buyers and their inspectors can see the work was permitted.' },
  { icon: ShieldCheck, title: 'Proof for your insurance', detail: 'A permitted, inspected panel is on record if you ever file a claim.' },
];

const review = (id: string) => reviews.find((r) => r.id === id)!;
const FIRE_REVIEW = review('yeny-v');
// Google reviews only, so every card can carry the Google mark.
const WALL = ['tonya-n', 'zno-z', 'joe-l', 'cody-o', 'donyal-w', 'william-d'].map(review);

const FAQS = [
  {
    q: 'How much does a panel replacement cost?',
    a: 'It depends on your panel, your home and what you run on it. After the no-cost inspection you get an itemized written quote, so you know the exact number before deciding.',
  },
  { q: 'What does the inspection cost?', a: 'Nothing. There is no charge and no obligation. If your panel is fine, we will tell you that.' },
  {
    q: 'Do you pull a permit?',
    a: 'Yes, on every panel job. We handle the permit, schedule the city inspection, and coordinate the power shut-off with the utility.',
  },
  { q: 'Should I open my panel to look?', a: 'Please don’t. Tell us what you have noticed and our licensed electrician will handle the hands-on part.' },
  { q: 'Will a new panel raise my electric bill?', a: 'No. A panel upgrade on its own doesn’t raise your bill. It makes your system safer.' },
  { q: 'What areas do you serve?', a: `Houston and the surrounding area. Our shop is at ${siteConfig.address.full}.` },
];

export default function PanelInspectionPage() {
  // The form and shared LP pieces use --font-app-display; point it at Poppins here.
  const fontVars = { '--font-app-display': poppins.style.fontFamily } as CSSProperties;

  return (
    <div data-lp-root className={`${poppins.className} overflow-x-clip bg-white pb-20 text-[#0A1322] sm:pb-0`} style={fontVars}>
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

      {/* Hero: headline, subheadline, form. Side by side on desktop so the fold has no dead space. */}
      <section className="border-b border-[#E6E8EC] bg-[#F4F6F9]">
        <div className={`${wrap} grid gap-8 pb-12 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:gap-16 lg:py-14`}>
          <div>
            {/* H1 repeats the search term: what Google matches the ad against. */}
            <h1 className="text-[2.3rem] font-bold leading-[1.04] tracking-[-0.03em] sm:text-[3.6rem]">
              Electrical panel replacement in Houston
            </h1>
            <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-[1.6] text-[#4A5568] sm:text-[1.2rem]">
              Replace your old breaker box the right way: permitted, city-inspected, and it starts with a no-cost inspection.
            </p>
            <ul className="mt-7 hidden space-y-3 lg:block">
              {HERO_POINTS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[1.02rem] font-medium">
                  <Check className="h-5 w-5 shrink-0 text-[#1F7A4D]" strokeWidth={2.5} aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            {/* Proof, not decoration: a photo from a real install beside the Google rating. */}
            <div className="mt-9 hidden max-w-[34rem] items-center gap-5 rounded-xl border border-[#E3E7EC] bg-white p-3 pr-6 shadow-[0_1px_2px_rgba(10,19,34,0.05)] lg:flex">
              <Image
                src="/lp/panel-install-wall.jpg"
                alt="A new panel being installed by a Solivance electrician"
                width={1600}
                height={2133}
                className="h-[76px] w-[76px] shrink-0 rounded-lg object-cover object-[50%_45%]"
                sizes="76px"
              />
              <div className="min-w-0">
                <p className="font-semibold leading-snug">Recent panel install in Houston</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#4A5568]">
                  <GoogleG className="h-4 w-4" />
                  <span className="font-semibold text-[#0A1322]">5.0</span>
                  <Stars className="h-3.5 w-3.5" />
                  <span>from {siteConfig.reviewCount} Google reviews</span>
                </div>
              </div>
            </div>
          </div>
          <PanelLeadForm />
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-[#E6E8EC] bg-white">
        <div className={`${wrap} py-8 sm:py-10`}>
          <TrustBadges />
        </div>
      </section>

      {/* The problem */}
      <section className={`bg-[#F7F6F3] ${section}`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-20`}>
          <div>
            <h2 className={h2}>Your house grew. Your panel didn&apos;t. That&apos;s the problem.</h2>
            <p className="mb-5 mt-7 text-[1.05rem] text-[#4A5568] sm:mt-9">Typical signs:</p>
            <SignsGrid />
            <p className="mt-8 text-[1.1rem] font-semibold leading-[1.65]">
              These aren&apos;t six separate problems. They&apos;re what it looks like when a home outgrows its panel. The fix is a new panel, installed to code, with a permit and a city inspection. That&apos;s the only way we do it.
            </p>
          </div>
          <figure>
            <Image
              src="/lp/panel-old-exterior.jpg"
              alt="An aging exterior panel on a Houston home"
              width={599}
              height={799}
              className="aspect-[4/3] w-full rounded-xl object-cover lg:aspect-[3/4]"
              sizes="(min-width:1024px) 440px, 100vw"
            />
            <figcaption className="mt-3 text-sm text-[#5A6B7F]">An aging exterior panel on a Houston home.</figcaption>
          </figure>
        </div>
      </section>

      {/* The process */}
      <section className={`bg-[#EEF1F5] ${section}`}>
        <div className={wrap}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className={label}>How it works</p>
              <h2 className={`mt-3 ${h2}`}>A panel replacement, start to finish.</h2>
              <p className="mt-4 text-[1.05rem] leading-[1.65] text-[#4A5568]">
                One licensed crew handles every step. You don&apos;t call the city or the utility. We do.
              </p>
            </div>
            <CallLink location="process" className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-[#0A1322] px-5 py-3 font-semibold text-white hover:bg-[#1B2A42] lg:self-end">
              <Phone className="h-4 w-4" aria-hidden /> Rather talk? {LP_PHONE}
            </CallLink>
          </div>

          {/* A real sequence: a timeline on phones, one row on desktop, drawn in as it scrolls into view. */}
          <div className="mt-9 lg:mt-12">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* The permit: what it gets you, beside the proof photo */}
      <section className={`relative isolate overflow-hidden ${ink} text-white`}>
        <div className={`${wrap} ${section} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-6">
            <h2 className={`${h2} max-w-[16ch]`}>We pull the permit on every panel job.</h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.7] text-white/70 sm:text-lg">
              Not every electrician does. Here&apos;s what the permit gets you:
            </p>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {PERMIT_GETS.map(({ icon: Icon, title, detail }) => (
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
              Schedule my inspection
            </a>
          </div>
          {/* Proof, not a claim: the city's tag on a Solivance panel, labelled. */}
          <figure className="relative lg:col-span-6">
            <Image
              src="/lp/panel-new-inspected.jpg"
              alt="The city inspection tag on a new Solivance panel"
              width={1600}
              height={2133}
              className="aspect-[4/3] w-full rounded-2xl object-cover object-[50%_62%] lg:aspect-[5/6]"
              sizes="(min-width:1024px) 560px, 100vw"
            />
            <figcaption className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/95 p-4 text-[#0A1322] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur sm:right-auto sm:max-w-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1F7A4D] text-white">
                <BadgeCheck className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-semibold leading-tight">City inspection passed</span>
                <span className="mt-0.5 block text-sm text-[#5A6B7F]">The green tag on one of our panels.</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Reviews */}
      <section className={`bg-white ${section}`}>
        <div className={wrap}>
          {/* Heading beside one verified rating bar (stays on-page: no link out). */}
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <h2 className={`${h2} max-w-xl lg:max-w-md`}>See what homeowners are saying</h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl border border-[#E6E8EC] bg-white px-5 py-4 lg:shrink-0 lg:flex-nowrap shadow-[0_8px_24px_-16px_rgba(10,19,34,0.25)] sm:px-6">
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
                  <p className="font-semibold">Verified Google reviews</p>
                  <p className="text-sm text-[#5A6B7F]">Posted by real customers</p>
                </div>
              </div>
            </div>
          </div>
          {/* The one review that names the danger, set large. */}
          <figure className="mt-10 grid gap-6 rounded-xl bg-[#0A1322] p-6 text-white sm:mt-14 sm:gap-8 sm:p-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
            <div>
              <Stars className="h-5 w-5" />
              <p className="mt-5 text-[1.6rem] font-semibold leading-[1.25] tracking-[-0.02em] sm:text-[2.1rem]">
                &ldquo;They found other issues in the panel that could have caused a fire.&rdquo;
              </p>
              <figcaption className="mt-6 flex items-center gap-2.5 text-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                  <GoogleG className="h-4 w-4" />
                </span>
                <span className="font-semibold">{FIRE_REVIEW.author}</span> <span className="text-white/55">Google review</span>
              </figcaption>
            </div>
            {/* Phones show the opening lines; the pull quote above carries the point. */}
            <blockquote className="line-clamp-6 text-[0.97rem] leading-[1.75] text-white/70 sm:line-clamp-none lg:border-l lg:border-white/15 lg:pl-10">
              {FIRE_REVIEW.quote}
            </blockquote>
          </figure>

          {/* Phones: a swipeable row instead of six stacked cards. */}
          <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {WALL.map((r) => (
              <figure key={r.id} className="flex w-[85%] shrink-0 snap-center flex-col rounded-xl border border-[#E6E8EC] bg-white p-6 sm:w-auto sm:p-7">
                <div className="flex items-center justify-between">
                  <Stars />
                  <GoogleG className="h-5 w-5" />
                </div>
                <blockquote className="mt-4 flex-1 text-[0.97rem] leading-[1.7] text-[#2D3748]">{r.quote}</blockquote>
                <figcaption className="mt-6 border-t border-[#EEF0F3] pt-4 text-sm">
                  <span className="font-semibold">{r.author}</span> <span className="text-[#5A6B7F]">Google review</span>
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
            <p className="text-[1.25rem] font-bold tracking-[-0.02em]">Panel jobs across Houston</p>
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
            <h2 className={h2}>Questions homeowners ask before they call</h2>
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
          <h2 className={`${h2} mx-auto max-w-[20ch]`}>Ready to find out if your panel is safe?</h2>
          <p className="mx-auto mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/70">
            It takes about a minute. We&apos;ll call you to set a time.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#form" className={`${cta} w-full sm:w-auto`}>
              Schedule my inspection
            </a>
            <CallLink
              location="final_cta"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 px-9 py-4 font-semibold hover:bg-white/10 sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden /> {LP_PHONE}
            </CallLink>
          </div>
          <p className="mt-6 text-sm text-white/50">No cost and no obligation.</p>
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
            <a href="/privacy" target="_blank" rel="noopener" className="underline">Privacy Policy</a> and{' '}
            <a href="/terms" target="_blank" rel="noopener" className="underline">Terms</a>
          </p>
        </div>
      </footer>

      {/* Phones: call or schedule, always in reach. */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-2 border-t border-[#E3E6EA] bg-white/95 px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 text-[0.95rem] backdrop-blur sm:hidden">
        <CallLink location="sticky_mobile" className="flex items-center justify-center gap-2 rounded-lg border border-[#0A1322] py-3 font-semibold">
          <Phone className="h-4 w-4" aria-hidden /> Call
        </CallLink>
        <a href="#form" className="flex items-center justify-center rounded-lg bg-[#E8590C] py-3 font-semibold text-white">
          Book inspection
        </a>
      </div>
    </div>
  );
}
