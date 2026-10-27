import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { BookUser, Check, ChevronRight, Phone, TriangleAlert } from 'lucide-react';
import { ConversionClaim } from './ConversionClaim';
import { StatusTracker } from './StatusTracker';
import { siteConfig } from '../../../config';
import { reviews } from '../../../reviews';
import { CallLink } from '../../_panel/CallLink';
import { GoogleG, Stars } from '../../_panel/Badges';

export const metadata: Metadata = {
  title: 'Request received',
  robots: { index: false, follow: false },
};

// The lead is already in. This page's job is the show-up: get our number
// saved so the call gets answered, show exactly where they are in the process
// (a tracker, like a delivery status), give a short prep list, then reassure
// with proof. Links to the main site sit last.

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });

const wrap = 'mx-auto w-full max-w-6xl px-5 sm:px-8';
// One vertical rhythm for every section band.
const band = 'py-14 sm:py-20';
const sectionTitle = 'text-[1.75rem] font-bold leading-tight tracking-[-0.025em] sm:text-[2.25rem]';

// Tracker: step 1 is done, CURRENT is in progress, the rest are upcoming.
const CURRENT = 1;
const TRACK = [
  { title: 'Request received', detail: 'Your details are with our team.' },
  { title: 'We call you', detail: `From ${siteConfig.phone}, to pick a time that works for you.` },
  { title: 'Panel inspection', detail: 'A licensed electrician checks your panel in person. No cost, no obligation.' },
  { title: 'Written quote', detail: 'Itemized, before any work starts. If your panel is fine, we tell you that.' },
];

const PREP = [
  { title: 'Clear a path to the panel', detail: 'Garage, closet or outside wall. We just need to reach it.' },
  { title: 'Photograph the label', detail: 'Take a photo of the panel door and its label from a step back. Please don’t open it.' },
  { title: 'Note what trips', detail: 'Which breakers, and when. For example, when the AC kicks on.' },
  { title: 'Keep any paperwork handy', detail: 'If an insurance company or home inspector flagged the panel, have that letter or report ready.' },
];

const PROOF = ['tonya-n', 'yeny-v', 'joe-l'].map((id) => reviews.find((r) => r.id === id)!);

const LEARN = [
  { label: 'Panel upgrades', href: '/services/panel-upgrades' },
  { label: 'All reviews', href: '/reviews' },
  { label: 'About us', href: '/about' },
  { label: 'Common questions', href: '/faq' },
];

export default function ThankYouPage() {
  return (
    <div className={`${poppins.className} min-h-screen bg-[#F4F6F9] text-[#0A1322]`}>
      <Suspense fallback={null}>
        <ConversionClaim />
      </Suspense>

      <header className="border-b border-[#E3E7EC] bg-white">
        <div className={`${wrap} flex h-[68px] items-center justify-between gap-4`}>
          {/* The logo file has wide transparent margins; crop them in a fixed-height box. */}
          <div className="flex h-12 items-center overflow-hidden">
            <Image src="/logo/logo_horzontial.PNG" alt="Solivance Electric LLC" width={6144} height={4096} priority className="h-[104px] w-auto max-w-none" sizes="170px" />
          </div>
          <p className="hidden text-sm text-[#5A6B7F] sm:block">
            Licensed Texas electrical contractor · {siteConfig.license.label}
          </p>
        </div>
      </header>

      {/* Confirmation (wide) beside the status tracker (narrow) */}
      <section className="bg-white">
        <div className={`${wrap} grid gap-10 ${band} lg:grid-cols-12 lg:gap-14`}>
          {/* Centered on phones and tablets; left-aligned beside the tracker on desktop. */}
          <div className="text-center lg:col-span-7 lg:self-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#E8F4EE] px-3 py-1 text-sm font-semibold text-[#1F7A4D]">
              <Check className="h-4 w-4" strokeWidth={3} aria-hidden /> Request received
            </p>
            <h1 className="mx-auto mt-5 max-w-[15ch] text-[2.4rem] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[3.4rem] lg:mx-0">
              We&apos;ll call you shortly.
            </h1>
            <p className="mx-auto mt-5 max-w-[32rem] text-[1.08rem] leading-relaxed text-[#4A5568] lg:mx-0">
              The call comes from <strong className="whitespace-nowrap font-semibold text-[#0A1322]">{siteConfig.phone}</strong>. Save it now so it
              doesn&apos;t show up as an unknown number.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="/lp/solivance-electric.vcf"
                download="Solivance Electric.vcf"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#E8590C] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#CF4E0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8590C]"
              >
                <BookUser className="h-5 w-5" aria-hidden /> Save our number
              </a>
              <CallLink
                location="thank_you"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#CBD2DA] px-6 py-4 font-semibold transition-colors hover:border-[#0A1322] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A1322]"
              >
                <Phone className="h-5 w-5" aria-hidden /> Call {siteConfig.phone}
              </CallLink>
            </div>
          </div>

          {/* The tracker: one look tells them where they are. */}
          <div className="lg:col-span-5">
            <StatusTracker steps={TRACK} current={CURRENT} />
          </div>
        </div>
      </section>

      {/* Prep: photo (narrow) beside the checklist (wide) */}
      <section className="border-y border-[#E3E7EC]">
        <div className={`${wrap} grid gap-10 ${band} lg:grid-cols-12 lg:items-center lg:gap-14`}>
          <figure className="order-2 lg:order-1 lg:col-span-5">
            <Image
              src="/lp/panel-new-inspected.jpg"
              alt="The city inspection tag on a new Solivance panel"
              width={1600}
              height={2133}
              className="aspect-[4/3] w-full rounded-2xl object-cover object-[50%_62%] lg:aspect-[4/5]"
              sizes="(min-width:1024px) 440px, 100vw"
            />
            <figcaption className="mt-3 text-sm text-[#5A6B7F]">One of our panels after the city inspection. The green tag is the inspector&apos;s sign-off.</figcaption>
          </figure>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <h2 className={sectionTitle}>Before we come out</h2>
            <p className="mt-3 max-w-[36rem] text-[1.05rem] leading-relaxed text-[#4A5568]">
              Two minutes now helps the electrician get it right on the first visit.
            </p>
            <ul className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {PREP.map((p) => (
                <li key={p.title} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#E8F4EE] text-[#1F7A4D]">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-[#5A6B7F]">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3 rounded-r-lg border-l-4 border-[#E8590C] bg-white py-4 pl-4 pr-5 text-[0.97rem] leading-relaxed shadow-[0_1px_0_#E3E7EC]">
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#E8590C]" aria-hidden />
              <p>
                <strong className="font-semibold">Smell burning, hear buzzing, or the panel feels hot?</strong> Don&apos;t wait for our call. Call{' '}
                <CallLink location="thank_you_urgent" className="whitespace-nowrap font-semibold text-[#E8590C] underline underline-offset-2">
                  {siteConfig.phone}
                </CallLink>{' '}
                now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof: one compact dark band, quotes side by side */}
      <section className="bg-[#0A1322] text-white">
        <div className={`${wrap} ${band}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className={sectionTitle}>What homeowners say</h2>
            <p className="flex items-center gap-2.5 text-white/75">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                <GoogleG className="h-4 w-4" />
              </span>
              <span className="font-semibold text-white">{siteConfig.rating.toFixed(1)}</span>
              <Stars className="h-4 w-4" />
              <span className="text-sm">on Google</span>
            </p>
          </div>
          <div className="mt-10 grid gap-y-9 border-t border-white/10 pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
            {PROOF.map((r, i) => (
              <figure key={r.id} className={`flex flex-col ${i === 0 ? 'md:pr-8' : i === PROOF.length - 1 ? 'md:pl-8' : 'md:px-8'}`}>
                <Stars className="h-4 w-4" />
                <blockquote className="mt-4 line-clamp-5 flex-1 leading-relaxed text-white/80">{r.quote}</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold">{r.author}</span> <span className="text-white/50">· Google review</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Footer: links into the main site */}
      <footer className="bg-white">
        <div className={`${wrap} flex flex-col gap-5 py-10 sm:py-12 md:flex-row md:items-center md:justify-between`}>
          <p className="text-[0.95rem] text-[#5A6B7F]">Want to read more while you wait?</p>
          <nav aria-label="More from Solivance Electric" className="flex flex-wrap gap-x-7 gap-y-3">
            {LEARN.map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 font-semibold hover:text-[#E8590C]">
                {l.label} <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-[#E3E7EC]">
          <p className={`${wrap} py-5 text-sm text-[#8A97A8]`}>
            {siteConfig.businessName} · {siteConfig.address.full}
          </p>
        </div>
      </footer>
    </div>
  );
}
