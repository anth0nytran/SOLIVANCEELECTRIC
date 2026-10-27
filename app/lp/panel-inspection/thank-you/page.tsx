import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { ArrowRight, BookUser, Check, Phone, TriangleAlert } from 'lucide-react';
import { ConversionClaim } from './ConversionClaim';
import { siteConfig } from '../../../config';
import { reviews } from '../../../reviews';
import { CallLink } from '../../_panel/CallLink';
import { GoogleG, GoogleRatingCard, Stars } from '../../_panel/Badges';

export const metadata: Metadata = {
  title: 'Request received',
  robots: { index: false, follow: false },
};

// The lead is already in. This page's job is the show-up: say what happens
// next, get our number saved so the call gets answered, give a short prep
// list (a little effort raises commitment), then reassure with proof. Links
// to the main site sit last, for people who want to read more.

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });

const wrap = 'mx-auto w-full max-w-3xl px-5 sm:px-8';
const h2 = 'text-[1.6rem] font-bold leading-tight tracking-[-0.02em] sm:text-[2rem]';

const NEXT = [
  { title: 'We call you', detail: `From ${siteConfig.phone}, to pick a time that works for you.` },
  { title: 'A licensed electrician inspects your panel', detail: 'In person, at no cost and with no obligation.' },
  { title: 'You get a written quote', detail: 'Itemized, before any work starts. If your panel is fine, we tell you that.' },
];

const PREP = [
  'Make sure we can get to the panel (garage, closet or outside wall).',
  'Take a photo of the panel door and its label from a step back. Please don’t open it.',
  'Note which breakers trip, and when (for example, when the AC kicks on).',
  'If an insurance company or inspector flagged it, keep that letter or report handy.',
];

const PROOF = ['yeny-v', 'tonya-n', 'joe-l'].map((id) => reviews.find((r) => r.id === id)!);

const LEARN = [
  { label: 'Panel upgrades and replacements', href: '/services/panel-upgrades' },
  { label: 'Read all our reviews', href: '/reviews' },
  { label: 'About Solivance Electric', href: '/about' },
  { label: 'Common questions', href: '/faq' },
];

export default function ThankYouPage() {
  return (
    <div className={`${poppins.className} bg-white text-[#0A1322]`}>
      <Suspense fallback={null}>
        <ConversionClaim />
      </Suspense>

      {/* Confirmation + the two actions that get the call answered */}
      <section className="bg-[#0A1322] py-12 text-white sm:py-16">
        <div className={wrap}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F7A4D]">
            <Check className="h-7 w-7" strokeWidth={3} aria-hidden />
          </span>
          <h1 className="mt-5 text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[2.8rem]">You&apos;re in. Here&apos;s what happens next.</h1>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-white/75 sm:text-[1.15rem]">
            Keep your phone close. We&apos;ll call you from <strong className="text-white">{siteConfig.phone}</strong> to set up your no-cost panel
            inspection.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <a
              href="/lp/solivance-electric.vcf"
              download="Solivance Electric.vcf"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#E8590C] px-5 py-4 font-semibold text-white hover:bg-[#CF4E0A]"
            >
              <BookUser className="h-5 w-5" aria-hidden /> Save our number
            </a>
            <CallLink
              location="thank_you"
              className="flex items-center justify-center gap-2 rounded-lg border border-white/30 px-5 py-4 font-semibold text-white hover:bg-white/10"
            >
              <Phone className="h-5 w-5" aria-hidden /> Call {siteConfig.phone}
            </CallLink>
          </div>
          <p className="mt-3 text-sm text-white/55">Saving it means our call won&apos;t show up as an unknown number.</p>
        </div>
      </section>

      {/* What happens next */}
      <section className="py-12 sm:py-14">
        <div className={wrap}>
          <h2 className={h2}>What happens next</h2>
          <ol className="mt-7 space-y-6">
            {NEXT.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A1322] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="text-[1.1rem] font-semibold">{s.title}</p>
                  <p className="mt-1 leading-relaxed text-[#4A5568]">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Prep list */}
      <section className="bg-[#F7F6F3] py-12 sm:py-14">
        <div className={wrap}>
          <h2 className={h2}>Get ready in 2 minutes</h2>
          <p className="mt-2 text-[#4A5568]">These help the electrician get it right on the first visit.</p>
          <ul className="mt-6 space-y-3.5">
            {PREP.map((p) => (
              <li key={p} className="flex gap-3 leading-relaxed">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#1F7A4D]" strokeWidth={2.5} aria-hidden />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4 text-[0.97rem] leading-relaxed">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#E8590C]" aria-hidden />
            <p>
              <strong>Don&apos;t wait if it&apos;s urgent.</strong> If you smell burning, hear buzzing, or the panel feels hot, call us right away at{' '}
              <CallLink location="thank_you_urgent" className="font-semibold text-[#E8590C] underline">
                {siteConfig.phone}
              </CallLink>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="py-12 sm:py-14">
        <div className={wrap}>
          <h2 className={h2}>You&apos;re in good hands</h2>
          <GoogleRatingCard className="mt-6" />
          <div className="mt-6 grid gap-4">
            {PROOF.map((r) => (
              <figure key={r.id} className="rounded-xl border border-[#E6E8EC] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <Stars />
                  <GoogleG className="h-5 w-5" />
                </div>
                <blockquote className="mt-3 line-clamp-5 leading-relaxed text-[#2D3748]">{r.quote}</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{r.author}</span> <span className="text-[#718096]">Google review</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <figure className="mt-8">
            <Image
              src="/lp/panel-new-inspected.jpg"
              alt="The city inspection tag on a new Solivance panel"
              width={1600}
              height={2133}
              className="aspect-[4/3] w-full rounded-xl object-cover object-[50%_62%]"
              sizes="(min-width:768px) 720px, 100vw"
            />
            <figcaption className="mt-3 text-sm text-[#718096]">
              Every panel job is permitted and ends with the city inspector&apos;s green tag. {siteConfig.license.label}.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Main site, for people who want to read more */}
      <section className="border-t border-[#E6E8EC] bg-[#F7F6F3] py-12 sm:py-14">
        <div className={wrap}>
          <h2 className={h2}>While you wait</h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {LEARN.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#E2E4E8] bg-white px-4 py-3.5 font-medium hover:border-[#0A1322]"
                >
                  {l.label} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
