import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { Phone, Star } from 'lucide-react';
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

// Built on the Acquisition.com funnel layout: dark callout hero, symptoms,
// numbered process, one bold statement band, a wall of reviews, FAQ, close.
// Proof comes from Solivance's own job photos and reviews only. No links
// leave the page except the legal pages, which open in a new tab.

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap' });

const wrap = 'mx-auto w-full max-w-6xl px-5 sm:px-8';
const section = 'py-16 sm:py-20';
const h2 = 'text-[2rem] font-bold leading-[1.08] tracking-[-0.025em] sm:text-[3.1rem]';
const label = 'text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#E8590C]';
const ink = 'bg-[#0A1322]';
// Solivance orange in the spot Acquisition uses gold. Flat color only.
const callout = 'text-[#FF7A2F]';
const cta =
  'inline-flex items-center justify-center rounded-lg bg-[#E8590C] px-9 py-4 text-[1.05rem] font-semibold text-white transition-colors hover:bg-[#CF4E0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

// Acquisition-style stat row. Every figure comes from siteConfig.
const STATS = [
  { value: siteConfig.rating.toFixed(1), label: 'Google rating' },
  { value: String(siteConfig.reviewCount), label: 'Five-star reviews' },
  { value: `${siteConfig.yearsInBusiness} yrs`, label: 'In business' },
  { value: '24/7', label: 'Emergency line' },
];

const AREAS = ['Westbury', 'Meyerland', 'Bellaire', 'West University', 'Medical Center', 'The Heights', 'Garden Oaks', 'Memorial Villages', 'Stafford', 'Missouri City', 'Sugar Land'];

const SIGNS = [
  'Breakers trip when the AC and dryer run at the same time.',
  'Lights dim or flicker when something kicks on.',
  'The panel feels warm, buzzes, or smells like something burning.',
  'It’s a Federal Pacific, a Zinsco, or a brand you can’t find.',
  'An insurance company or a buyer’s inspector flagged it.',
  'It’s the original panel from when the house was built.',
];

const STEPS = [
  { title: 'The inspection', detail: 'A licensed electrician checks your panel in person for heat damage, problem brands and capacity. No cost, no obligation.' },
  { title: 'A written quote', detail: 'Itemized and in writing before any work starts. If your panel is fine, we tell you that.' },
  { title: 'The permit', detail: 'We file it with the city on every panel job. Plenty of electricians skip this step. We don’t.' },
  { title: 'The install', detail: 'We schedule the power shut-off and reconnect with the utility, then install your new panel to code.' },
  { title: 'The city inspection', detail: 'An inspector signs off and leaves the green tag on your panel. That’s your proof it passed.' },
];

const review = (id: string) => reviews.find((r) => r.id === id)!;
const FIRE_REVIEW = review('yeny-v');
const WALL = ['tonya-n', 'zno-z', 'joe-l', 'cody-o', 'dan-h', 'william-d'].map(review);

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

const Stars = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <span className="flex gap-0.5" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`${className} fill-[#F5B301] text-[#F5B301]`} aria-hidden />
    ))}
  </span>
);

export default function PanelInspectionPage() {
  // The form and shared LP pieces use --font-app-display; point it at Poppins here.
  const fontVars = { '--font-app-display': poppins.style.fontFamily } as CSSProperties;

  return (
    <div className={`${poppins.className} bg-white pb-20 text-[#0A1322] sm:pb-0`} style={fontVars}>
      {/* Top bar */}
      <div className="bg-black text-white">
        <div className={`${wrap} flex h-10 items-center justify-center gap-6 text-[0.7rem] font-medium uppercase tracking-[0.14em] sm:justify-between`}>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8B3D]" aria-hidden />
            Permit pulled on every panel job
            <span className="hidden text-white/50 md:inline">· Texas license {siteConfig.license.number}</span>
          </p>
          <CallLink location="header" className="hidden items-center gap-2 tracking-normal hover:text-[#FFC061] sm:flex">
            <Phone className="h-3.5 w-3.5" aria-hidden /> <span className="text-[0.85rem] normal-case">{siteConfig.phone}</span>
          </CallLink>
        </div>
      </div>

      {/* Hero */}
      <section className={`${ink} text-white`}>
        <div className={`${wrap} pb-14 pt-8 sm:pb-20 sm:pt-10`}>
          {/* Full-color logo on a white plate: the mark loses its shape if inverted. */}
          <div className="flex justify-center">
            <div className="flex h-12 items-center overflow-hidden rounded-lg bg-white px-3">
              <Image
                src="/logo/logo_horzontial.PNG"
                alt="Solivance Electric LLC"
                width={6144}
                height={4096}
                priority
                className="h-[100px] w-auto max-w-none"
                sizes="160px"
              />
            </div>
          </div>

          <h1 className="mt-6 text-center">
            <span className={`block text-[2.6rem] font-extrabold leading-[1] tracking-[-0.035em] sm:text-[4.6rem] ${callout}`}>
              Houston Homeowners:
            </span>
            <span className="mt-3 block text-[1.45rem] font-bold leading-[1.15] tracking-[-0.025em] sm:mt-4 sm:text-[2.35rem]">
              Replace your old breaker box the right way.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-center text-[1.02rem] leading-[1.65] text-white/70 sm:text-[1.1rem]">
            Licensed electrical panel replacement, permitted and city-inspected. It starts with a no-cost inspection.
          </p>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-stretch">
            <figure className="relative hidden overflow-hidden rounded-xl ring-1 ring-white/10 lg:block">
              <Image
                src="/lp/panel-new-inspected.jpg"
                alt="A new Solivance panel with the city inspection tag on the door"
                fill
                priority
                sizes="560px"
                className="object-cover object-[50%_45%]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-black/70 px-5 py-3 text-sm text-white/90">
                A Solivance panel replacement in Houston, tagged by the city inspector.
              </figcaption>
            </figure>
            <PanelLeadForm />
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#E6E8EC] bg-white">
        <ul className={`${wrap} grid grid-cols-2 gap-y-8 py-10 sm:py-12 lg:grid-cols-4`}>
          {STATS.map(({ value, label: l }) => (
            <li key={l} className="border-l-[3px] border-[#E8590C] pl-4 sm:pl-5">
              <p className="text-[2.1rem] font-bold leading-none tracking-[-0.03em] sm:text-[2.75rem]">{value}</p>
              <p className="mt-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#718096]">{l}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* The problem */}
      <section className={`bg-[#F7F6F3] ${section}`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-20`}>
          <div>
            <h2 className={h2}>Your house grew. Your panel didn&apos;t. That&apos;s the problem.</h2>
            <p className="mt-9 text-[1.05rem] text-[#4A5568]">Typical signs:</p>
            <ul className="mt-5 space-y-4 border-l-2 border-[#D9D5CC] pl-5">
              {SIGNS.map((s) => (
                <li key={s} className="text-[1.05rem] leading-[1.6] text-[#2D3748]">
                  {s}
                </li>
              ))}
            </ul>
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
              className="aspect-[3/4] w-full rounded-xl object-cover"
              sizes="(min-width:1024px) 440px, 100vw"
            />
            <figcaption className="mt-3 text-sm text-[#718096]">An aging exterior panel on a Houston home.</figcaption>
          </figure>
        </div>
      </section>

      {/* The process */}
      <section className={`bg-[#EEF1F5] ${section}`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className={label}>How it works</p>
            <h2 className={`mt-3 ${h2}`}>A panel replacement, start to finish.</h2>
            <p className="mt-5 text-[1.05rem] leading-[1.65] text-[#4A5568]">
              One licensed crew handles every step. You don&apos;t call the city or the utility. We do.
            </p>
            <Image
              src="/lp/panel-install-wall.jpg"
              alt="A Solivance electrician mid-install with the wall opened up"
              width={1600}
              height={2133}
              className="mt-9 aspect-[5/4] w-full rounded-xl object-cover object-[50%_45%]"
              sizes="(min-width:1024px) 520px, 100vw"
            />
            <div className="mt-4 flex flex-col gap-4 rounded-xl bg-[#0A1322] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">Rather talk it through?</p>
                <p className="mt-1 text-sm text-white/60">Mon–Sat, 6am–6pm. Emergencies any hour.</p>
              </div>
              <CallLink location="process" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-[#0A1322] hover:bg-white/90">
                <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
              </CallLink>
            </div>
          </div>

          <ol className="space-y-4">
            {STEPS.map(({ title, detail }, i) => (
              <li key={title} className="rounded-xl bg-white p-7 shadow-[0_1px_2px_rgba(10,19,34,0.06)] sm:p-8">
                <span className="text-[1.75rem] font-semibold leading-none text-[#E8590C]">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 text-[0.85rem] font-semibold uppercase tracking-[0.14em]">{title}</p>
                <p className="mt-3 leading-[1.7] text-[#4A5568]">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* One statement */}
      <section className={`relative isolate overflow-hidden ${ink} text-white`}>
        <div className={`${wrap} ${section} grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20`}>
          <div>
            <h2 className={`${h2} max-w-[16ch]`}>
              We pull the permit on <span className={callout}>every</span> panel job.
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.7] text-white/70 sm:text-lg">
              Not every electrician does. The permit means a city inspector checks our work after we finish, and it gives you a clean record when you sell the house or file an insurance claim.
            </p>
            <a href="#form" className={`${cta} mt-9 w-full sm:w-auto`}>
              Schedule my inspection
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-[380px]">
            <Image
              src="/lp/panel-new-meter.jpg"
              alt="A new panel and meter with the city inspection tag"
              width={1600}
              height={2133}
              className="aspect-square w-full rounded-xl object-cover object-[50%_88%]"
              sizes="380px"
            />
            <InspectedTag className="absolute -left-1 -top-8 origin-top-left scale-[0.8] sm:-left-12 sm:scale-100" />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className={`bg-white ${section}`}>
        <div className={wrap}>
          <div className="text-center">
            <div className="flex justify-center">
              <Stars className="h-5 w-5" />
            </div>
            <h2 className={`mt-4 ${h2}`}>See what homeowners are saying</h2>
            <p className="mt-3 text-[#4A5568]">5.0 on Google from {siteConfig.reviewCount} reviews</p>
          </div>
          {/* The one review that names the danger, set large. */}
          <figure className="mt-14 grid gap-8 rounded-xl bg-[#0A1322] p-8 text-white sm:p-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
            <div>
              <Stars className="h-5 w-5" />
              <p className="mt-5 text-[1.6rem] font-semibold leading-[1.25] tracking-[-0.02em] sm:text-[2.1rem]">
                &ldquo;They found other issues in the panel that could have caused a fire.&rdquo;
              </p>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{FIRE_REVIEW.author}</span> <span className="text-white/55">on {FIRE_REVIEW.source}</span>
              </figcaption>
            </div>
            <blockquote className="text-[0.97rem] leading-[1.75] text-white/70 lg:border-l lg:border-white/15 lg:pl-10">{FIRE_REVIEW.quote}</blockquote>
          </figure>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WALL.map((r) => (
              <figure key={r.id} className="flex flex-col rounded-xl border border-[#E6E8EC] bg-white p-7">
                <Stars />
                <blockquote className="mt-4 flex-1 text-[0.97rem] leading-[1.7] text-[#2D3748]">{r.quote}</blockquote>
                <figcaption className="mt-6 border-t border-[#EEF0F3] pt-4 text-sm">
                  <span className="font-semibold">{r.author}</span> <span className="text-[#718096]">on {r.source}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Where we work */}
      <section className="border-y border-[#E6E8EC] bg-white">
        <div className={`${wrap} flex flex-col gap-5 py-10 lg:flex-row lg:items-center lg:gap-12`}>
          <div className="shrink-0">
            <p className="text-[1.25rem] font-bold tracking-[-0.02em]">Panel jobs across Houston</p>
            <p className="mt-1 text-sm text-[#718096]">From our shop on S Post Oak Rd</p>
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
              <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
            </CallLink>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-xl bg-white px-6 shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.02rem] font-semibold">
                  {f.q}
                  <span className="text-2xl font-light leading-none text-[#718096] transition-transform group-open:rotate-45" aria-hidden>
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
              <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
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
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-[#E3E6EA] bg-white/95 p-2 backdrop-blur sm:hidden">
        <CallLink location="sticky_mobile" className="flex items-center justify-center gap-2 rounded-lg border border-[#0A1322] py-3 font-semibold">
          <Phone className="h-4 w-4" aria-hidden /> Call
        </CallLink>
        <a href="#form" className="flex items-center justify-center rounded-lg bg-[#E8590C] py-3 font-semibold text-white">
          Schedule inspection
        </a>
      </div>
    </div>
  );
}
