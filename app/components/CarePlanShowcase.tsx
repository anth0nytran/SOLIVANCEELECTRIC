'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MotionConfig, motion, type Variants } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { carePlans } from '../carePlans';
import { siteConfig } from '../config';
import { trackMarketingEvent } from './MarketingAnalytics';

// Home page care-plan section: why join, plus a priced card per plan linking to
// its detail. Copy comes from the customer flyer (SE-CP-003) via ../carePlans.

const WHY_JOIN = [
  'Catch loose connections, overheating, and worn breakers before they cause a fire or an outage.',
  'Be first on our schedule when storms hit Houston.',
  'Save on every flat-rate repair, with no after-hours surcharge.',
  'A written report on your electrical system every year.',
];

// Cards show the first few benefits and tease the rest, so the full list is a click away.
const PREVIEW_COUNT = 3;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export function CarePlanShowcase() {
  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="care-plan-showcase" className="relative isolate overflow-hidden bg-[#0b0d10] py-16 text-white sm:py-20">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <Image src="/photos_new/care-plans-home.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_40%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/70" />
        </div>
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16"
          >
            <motion.div variants={fadeUp}>
              <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--onestop-red)]">
                Solivance Care Plans
              </p>
              <h2 id="care-plan-showcase" className="max-w-xl text-[1.85rem] font-bold leading-[1.12] tracking-[-0.025em] sm:text-[2.25rem]">
                One inspection a year. First call when the storm hits.
              </h2>
              <p className="mt-3 max-w-lg text-[0.98rem] leading-[1.65] text-white/85">
                Priority scheduling and member pricing on repairs. Plans start at {carePlans[0].price} a year.
              </p>
            </motion.div>
            <motion.ul variants={fadeUp} className="grid gap-3">
              {WHY_JOIN.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[0.92rem] leading-[1.5] text-white/90">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-[var(--onestop-red)]" strokeWidth={2.75} aria-hidden />
                  {w}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="mt-12 grid gap-5 md:grid-cols-3"
          >
            {carePlans.map((p) => {
              const lines = [...(p.includes ? [`Everything in ${p.includes}`] : []), ...p.features];
              const more = lines.length - PREVIEW_COUNT;
              return (
                <motion.li key={p.id} variants={fadeUp} className="relative">
                  <Link
                    href={`/care-plans?plan=${p.id}`}
                    onClick={() => trackMarketingEvent('Care Plan Home Card', { plan: p.id })}
                    className={`glass glass-hover group flex h-full flex-col rounded-2xl p-6 text-white transition-transform duration-300 hover:-translate-y-1 ${
                      p.popular ? 'border-2! border-[var(--onestop-red)]!' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[1.15rem] font-bold tracking-[-0.015em]">{p.name}</h3>
                      {p.popular ? (
                        <span className="rounded-full bg-[var(--onestop-red)] px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.06em] text-white">
                          Most popular
                        </span>
                      ) : (
                        <span className="text-[0.75rem] font-medium text-white/70">{p.forWho}</span>
                      )}
                    </div>

                    <p className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-[2.25rem] font-bold leading-none tracking-[-0.03em] tabular-nums">{p.price}</span>
                      <span className="text-[0.88rem] text-white/70">{p.period}</span>
                    </p>
                    <p className="mt-1.5 text-[0.8rem] text-white/70">{p.monthly}</p>

                    <ul className="mt-5 mb-6 grid gap-2 border-t border-white/15 pt-5">
                      {lines.slice(0, PREVIEW_COUNT).map((f, i) => (
                        <li key={f} className={`flex items-start gap-2.5 text-[0.88rem] leading-[1.45] ${p.includes && i === 0 ? 'font-semibold' : 'text-white/85'}`}>
                          <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[var(--onestop-red)]" strokeWidth={2.75} aria-hidden />
                          {f}
                        </li>
                      ))}
                      {more > 0 && <li className="pl-6 text-[0.82rem] font-medium text-white/60">+ {more} more</li>}
                    </ul>

                    <span className="mt-auto inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-[#ffa36b]">
                      See the {p.name} plan
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.9rem] text-white/80">
              Ask your technician or call{' '}
              <a href={`tel:${siteConfig.cleanPhone}`} className="font-semibold text-white hover:text-[var(--onestop-red)]">{siteConfig.phone}</a>{' '}
              to join.
            </p>
            <Link
              href="/care-plans"
              className="group inline-flex h-11 items-center justify-center gap-2 self-start rounded-md bg-white px-5 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[var(--onestop-navy-deep)] transition-colors hover:bg-[var(--onestop-red)] hover:text-white sm:self-auto"
            >
              Compare all plans <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
