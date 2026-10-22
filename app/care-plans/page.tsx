import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, MapPin, Phone, ShieldCheck, X } from 'lucide-react';
import { siteConfig } from '../config';
import { carePlanTerms, getCarePlan } from '../carePlans';
import { CarePlanPicker } from '../components/CarePlanPicker';
import { Pending } from '../components/Pending';
import { Stars } from '../components/Stars';

export const metadata: Metadata = {
  title: 'Solivance Care Plans — Basic, Plus & Commercial',
  description: `Solivance Care Plans from ${siteConfig.businessName}, a licensed Texas electrical contractor (${siteConfig.license.label}). Choose Basic, Plus, or Commercial.`,
  alternates: { canonical: '/care-plans' },
};

// Written to be scrolled top to bottom with a customer: problem, the two
// choices, who we are, the plans, the promise, then the usual questions.
// Plain words, short sentences. Anything that depends on plan terms reads
// from carePlans.ts and shows a "coming soon" slot until Josh fills it in.

// Reading sections keep a short line length but share the wide sections' left edge.
const wrap = 'mx-auto w-full max-w-6xl px-5 sm:px-8 [&>*]:max-w-3xl';
const wide = 'mx-auto w-full max-w-6xl px-5 sm:px-8';
const h2 = 'text-[1.75rem] sm:text-[2.25rem] font-bold leading-[1.12] tracking-[-0.02em] text-[var(--onestop-navy-deep)] text-balance';
const lede = 'mt-4 text-[1.1rem] sm:text-[1.2rem] leading-[1.6] text-slate-600';

const WARNING_SIGNS = [
  'A wire comes loose and starts to get hot.',
  'A breaker trips again and again.',
  'Lights flicker or dim when something turns on.',
  'Parts wear out as the system gets older.',
];

const WITHOUT_PLAN = [
  'You only find out when something breaks.',
  'You call and wait for an opening.',
  'It happens at a bad time: a hot day, a holiday, a busy week.',
  'A small fix has grown into a bigger one.',
];

type Question = { q: string; a: string | null; pending?: string };

const QUESTIONS: Question[] = [
  {
    q: 'My electrical works fine right now.',
    a: 'Good. That is the best time to start. Most problems hide inside the panel and the walls, where you can’t see them. It is easier to deal with them while they are small.',
  },
  {
    q: 'It costs too much.',
    a: 'Think about what one surprise problem costs you. The repair. The time off work. The spoiled food, or the lost day of business. The plan is how you look after your system before that happens.',
  },
  {
    q: 'I’ll do it later.',
    a: 'Electrical problems don’t wait for a good time. They show up on the hottest day or the busiest week. Starting now is one less thing to worry about.',
  },
  {
    q: 'I need to talk to my spouse or partner first.',
    a: 'That makes sense. Your tech can send you this page so you can look at it together. Call us any time with questions.',
  },
  { q: 'Can I cancel?', a: carePlanTerms.cancellation, pending: 'Cancel terms' },
  {
    q: 'Are you licensed?',
    a: `Yes. ${siteConfig.businessName} holds Texas Electrical Contractor License ${siteConfig.license.label}, from the Texas Department of Licensing and Regulation.`,
  },
  {
    q: 'Which plan should I pick?',
    a: 'Commercial is for businesses. For a home, your tech will look at your system and help you choose between Basic and Plus.',
  },
];

export default async function CarePlansPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const initial = getCarePlan((await searchParams).plan)?.id;

  return (
    <>
      {/* Promise */}
      <section className="page-hero">
        <div className={`${wrap} relative z-10`}>
          <nav aria-label="Breadcrumb" className="mb-6 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.18em]">
            <ol className="flex flex-wrap items-center gap-2 text-white/55">
              <li><Link href="/" className="hover:text-[var(--onestop-gold)] transition-colors">Home</Link></li>
              <li aria-hidden className="text-white/25">/</li>
              <li className="text-white font-semibold">Care Plans</li>
            </ol>
          </nav>
          <h1 className="text-[2.25rem] sm:text-[3.25rem] font-bold leading-[1.05] tracking-[-0.03em] text-white text-balance">
            Take care of your electrical before it breaks.
          </h1>
          <p className="mt-5 text-[1.1rem] sm:text-[1.25rem] leading-[1.55] text-white/80">
            Solivance Care Plans help you look after the electrical system in your home or business. There are three plans: Basic, Plus, and Commercial.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#plans" className="btn-solid inline-flex items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-7 py-3.5 text-[1rem] font-bold text-white hover:bg-[#e55f15]">
              See the plans <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={`tel:${siteConfig.cleanPhone}`} className="btn-ghost-dark inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-[1rem] font-bold text-white">
              <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-b border-slate-200 bg-white">
        <ul className={`${wide} grid gap-x-8 gap-y-3 py-5 text-[0.95rem] text-slate-700 sm:grid-cols-3`}>
          <li className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#1F7A4D]" aria-hidden />
            Licensed in Texas · <span className="font-semibold">{siteConfig.license.label}</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Stars size="h-4 w-4" />
            <span><span className="font-semibold">{siteConfig.rating.toFixed(1)}</span> on Google</span>
          </li>
          <li className="flex items-center gap-2.5">
            <MapPin className="h-5 w-5 shrink-0 text-[var(--onestop-red)]" aria-hidden />
            Local shop in Southwest Houston
          </li>
        </ul>
      </section>

      {/* Problem */}
      <section className="bg-white py-14 sm:py-20">
        <div className={wrap}>
          <h2 className={h2}>Most electrical problems start small.</h2>
          <p className={lede}>You can’t see them. They hide inside the panel and the walls. And they get a little worse every day.</p>
          <ul className="mt-8 grid gap-3">
            {WARNING_SIGNS.map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-lg bg-slate-50 px-5 py-4 text-[1.05rem] leading-snug text-slate-800">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--onestop-red)]" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[1.15rem] font-semibold leading-[1.55] text-[var(--onestop-navy-deep)]">
            Left alone, a small problem can turn into a big repair, a power outage, or a fire.
          </p>
        </div>
      </section>

      {/* Two choices */}
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className={wide}>
          <div className="max-w-3xl">
            <h2 className={h2}>You have two ways to deal with it.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
              <h3 className="text-[1.25rem] font-bold text-slate-500">Wait until it breaks</h3>
              <ul className="mt-5 grid gap-4">
                {WITHOUT_PLAN.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[1.05rem] leading-snug text-slate-600">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" strokeWidth={2.5} aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-white p-6 ring-2 ring-[var(--onestop-navy-deep)] sm:p-8">
              <h3 className="text-[1.25rem] font-bold text-[var(--onestop-navy-deep)]">Get a Solivance Care Plan</h3>
              {carePlanTerms.everyPlanIncludes.length ? (
                <ul className="mt-5 grid gap-4">
                  {carePlanTerms.everyPlanIncludes.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-[1.05rem] leading-snug text-slate-800">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#1F7A4D]" strokeWidth={2.5} aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5">
                  <Pending>What every plan gives you</Pending>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Who */}
      <section className="bg-white py-14 sm:py-20">
        <div className={wrap}>
          <h2 className={h2}>Who takes care of it.</h2>
          <p className={lede}>
            {siteConfig.businessName} is a licensed Texas electrical contractor, {siteConfig.license.label}. Our shop is at {siteConfig.address.street}, in Southwest Houston. Our customers rate us {siteConfig.rating.toFixed(1)} stars on Google.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="scroll-mt-24 bg-slate-50 py-14 sm:py-20">
        <div className={wide}>
          <div className="mb-8 max-w-3xl">
            <h2 className={h2}>Pick your plan.</h2>
            <p className={lede}>Three plans. Tap one to pick it. Your tech can help you choose.</p>
          </div>
          <CarePlanPicker initial={initial} />
        </div>
      </section>

      {/* Promise */}
      <section className="bg-white py-14 sm:py-20">
        <div className={wrap}>
          <h2 className={h2}>Our promise to you.</h2>
          <div className="mt-6">
            {carePlanTerms.guarantee ? (
              <p className="rounded-xl border-l-4 border-[#1F7A4D] bg-[#F1F8F4] px-6 py-5 text-[1.15rem] leading-[1.55] text-slate-800">{carePlanTerms.guarantee}</p>
            ) : (
              <Pending>The guarantee</Pending>
            )}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className={wrap}>
          <h2 className={h2}>Questions people ask.</h2>
          <div className="mt-8 grid gap-3">
            {QUESTIONS.map(({ q, a, pending }) => (
              <details key={q} className="group rounded-xl bg-white ring-1 ring-slate-200 open:ring-slate-300">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[1.08rem] font-semibold text-[var(--onestop-navy-deep)] sm:px-6 [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <div className="px-5 pb-5 sm:px-6">
                  {a ? <p className="text-[1.02rem] leading-[1.6] text-slate-600">{a}</p> : <Pending>{pending}</Pending>}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="bg-[var(--onestop-navy-deep)] py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 text-center">
          <h2 className="text-[1.75rem] sm:text-[2.25rem] font-bold leading-[1.12] tracking-[-0.02em] text-white text-balance">Ready to take care of it?</h2>
          <p className="mt-4 text-[1.1rem] leading-[1.6] text-white/75">Pick a plan and we’ll set it up. Questions? Call us.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#plans" className="btn-solid inline-flex items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-7 py-3.5 text-[1rem] font-bold text-white hover:bg-[#e55f15]">
              Pick my plan <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={`tel:${siteConfig.cleanPhone}`} className="btn-ghost-dark inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-[1rem] font-bold text-white">
              <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
