'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle2,
  Clock,
  Zap,
  Sparkles,
  Users,
  MapPin,
  ArrowRight,
  Phone,
  HardHat,
} from 'lucide-react';
import { siteConfig } from '../config';

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPageClient() {
  return (
    <>
      {/* ═══ PAGE HEADER ═══ */}
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0 bg-[var(--onestop-navy-deep)]/85" />
        <div className={`${shell} relative z-10`}>
          <nav aria-label="Breadcrumb" className="mb-5 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.18em]">
            <ol className="flex items-center gap-2 text-white/55">
              <li><Link href="/" className="hover:text-[var(--onestop-gold)] transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/25">/</li>
              <li className="font-semibold text-white">About</li>
            </ol>
          </nav>

          <div className="mb-4 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.24em] text-[var(--onestop-gold)]">
            <span className="h-px w-6 bg-[var(--onestop-gold)]" />
            Company · Licensed TX Contractor
          </div>
          <h1 className="h-display text-white">
            About <span className="text-[var(--onestop-gold)]">Solivance Electric</span>
          </h1>
          <p className="mt-5 text-[0.98rem] sm:text-base text-white/80 leading-[1.7] max-w-2xl">
            Licensed Texas electrical contractor. Commercial, light-industrial, and
            premium residential across Houston, Cypress, Katy, and Memorial — panel
            upgrades through 3-phase switchgear, standby generators with ATS
            commissioning, LED parking-lot retrofits, EV charger builds, RV park
            pedestals, and ground-up warehouse electrical.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/75">
            <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Licensed &amp; Insured</span>
            <span className="vrule text-white h-3" aria-hidden />
            <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> 24-Hour Response</span>
            <span className="vrule text-white h-3 hidden sm:block" aria-hidden />
            <span className="hidden sm:flex items-center gap-2"><HardHat className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> {siteConfig.yearsInBusiness}+ Years in Houston</span>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-white border-b border-slate-200/70">
        <div className={shell}>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-200/70">
            {[
              { value: '2023', label: 'NEC Compliant' },
              { value: '24 hr', label: 'Response Line' },
              { value: 'In-House', label: 'Licensed Crew' },
              { value: '1st Walk', label: 'Inspection Pass' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="py-8 sm:py-10 px-4 sm:px-6 text-center"
              >
                <div className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[var(--onestop-navy-deep)] tracking-[-0.025em] leading-none">{stat.value}</div>
                <div className="mt-2 text-[0.66rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-500 font-[family-name:var(--font-app-mono)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section className="bg-white py-14 sm:py-28">
        <div className={shell}>
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
                <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
                  <span className="h-px w-6 bg-[var(--onestop-gold)]" />
                  01 — What we do
                </div>
                <h2 className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl leading-tight mb-8">
                  A licensed Texas crew.<br/>One standard across every job.
                </h2>
                <div className="space-y-5 text-[0.95rem] leading-[1.8] text-slate-600">
                <p>
                  Solivance Electric is a licensed Texas electrical contractor covering
                  Houston, Cypress, Katy, and Memorial. We work commercial buildings,
                  light-industrial, warehouses, and premium residential — panel upgrades
                  from 200A through 3-phase switchgear, standby generator installs with
                  full ATS commissioning, Level 2 and DCFC EV charger builds, LED
                  parking-lot retrofits to photometric spec, RV park pedestal arrays
                  to NEC 551, and ground-up electrical for new warehouse construction.
                </p>
                <p>
                  In-house crew. Not subcontracted three layers deep, not handed off to
                  a scheduler. One foreman from the site walk to the final inspection.
                  When you call, a licensed electrician picks up — not a call center.
                </p>
                <p>
                  We pull the Harris County or City of Houston permit, coordinate the
                  CenterPoint cut-over, and show up when the inspector does. Every
                  splice is installed to the <strong className="text-[var(--onestop-navy-deep)]">2023 NEC</strong> when
                  it is made — not retro-fixed after the blue tag. The panel cover goes
                  back on straight. The grounding bonds are visible and labeled. The
                  mechanical room is swept before we leave.
                </p>
                <p>
                  <strong className="text-[var(--onestop-navy-deep)]">Done right the first time</strong> is
                  not a marketing line. It is the reason we do not have a callback
                  schedule. Inspections pass on the first walk because the work was
                  correct when it was buried.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-5">
                <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--onestop-gold)] hover:underline">
                  See our services <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[var(--onestop-gold)] transition-colors">
                  Request a quote <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Right — photo placeholder + trust badge */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="space-y-5"
            >
              {/* Photo placeholder */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
                <Image src="/placeholder.svg" alt="Solivance Electric LLC — licensed commercial electrician at work" fill className="object-cover" />
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[var(--onestop-cream)] border border-slate-200 px-5 py-4">
                <Shield className="h-5 w-5 text-[var(--onestop-gold)] shrink-0" />
                <span className="text-sm font-semibold text-[var(--onestop-navy-deep)]">Licensed Texas contractor · Liability COI on request</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — placeholder when empty ═══ */}
      {siteConfig.testimonials.length === 0 ? (
        <section className="bg-[var(--onestop-cream)] py-20 sm:py-24 border-y border-slate-200">
          <div className={shell}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl">
                Customer Reviews
              </h2>
              <div className="mt-10 rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-12 shadow-sm">
                <h3 className="text-lg font-extrabold text-[var(--onestop-navy-deep)] sm:text-xl">Your review goes here.</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                  We are building a Google review base one finished job at a time.
                  When we pull the feeder, wire the switchgear, or commission the
                  generator on your property — and the inspector signs off — an
                  honest review from you carries real weight in this city.
                </p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all"
                >
                  Start Your Project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* ═══ VALUES ═══ */}
      <section className="bg-white py-14 sm:py-28">
        <div className={shell}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)] justify-center">
              <span className="h-px w-6 bg-[var(--onestop-gold)]" />
              02 — How we work
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl leading-tight">
              Six things the spec sheet<br/>does not tell you.
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Shield, title: 'Fixed-fee quotes', desc: 'A walk of the site, an itemized number, a signed scope. No "time and materials" mid-job surprise.' },
              { icon: CheckCircle2, title: 'NEC 2023 first', desc: 'Every splice, every bond, every feeder sized to the current code the day it is installed. Not retro-fixed after the inspector shows up.' },
              { icon: HardHat, title: 'Lockout / tagout', desc: 'OSHA 1910.147 protocol on every energized job. Crew briefed, hazards called out, no one works inside a panel alive.' },
              { icon: Clock, title: 'Tenant-aware scheduling', desc: 'Occupied office, working warehouse, retail during hours — we sequence the downtime around the tenant, not the other way around.' },
              { icon: Zap, title: 'Commercial and light-industrial', desc: 'Warehouses, office parks, retail pads, medical, property-management portfolios. We know what an operational shutdown actually costs.' },
              { icon: Sparkles, title: 'Clean the room', desc: 'Conduit stubs capped, wire shavings swept, labels legible on every breaker. The mechanical room is neater than when we opened it.' },
            ].map((v) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className="card-surface card-surface-interactive rounded-md p-6 sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white ring-1 ring-[var(--onestop-navy)]/12 shadow-[inset_0_-1px_0_rgba(15,40,71,0.04),0_1px_2px_rgba(15,40,71,0.06)]">
                  <v.icon className="h-5 w-5 text-[var(--onestop-navy-deep)]" strokeWidth={1.9} />
                </div>
                <h3 className="mt-4 text-[0.95rem] sm:text-base font-bold text-[var(--onestop-navy-deep)] tracking-[-0.005em]">{v.title}</h3>
                <p className="mt-2 text-[0.88rem] leading-[1.65] text-slate-600">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICE AREAS ═══ */}
      <section className="bg-[var(--onestop-cream)] py-20 sm:py-24 border-t border-slate-200">
        <div className={shell}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
              <span className="h-px w-6 bg-[var(--onestop-gold)]" />
              03 — Where we work
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl leading-tight">
              Houston, Cypress, Katy, Memorial —<br/>and the metro around them.
            </h2>
            <p className="mt-4 text-base text-slate-500 leading-relaxed">
              <Users className="inline h-4 w-4 mr-1 align-[-2px]" />
              Core service area is the north-west and west side of Greater Houston —
              I-10 corridor, US-290 corridor, Memorial Villages, and the Katy-Cypress
              fringe. Harris County and Fort Bend County permits are what we pull
              day-in, day-out. If your address is inside the Beltway or along those
              corridors, we cover it.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
          >
            {siteConfig.allServiceAreas.map((area, i) => {
              const isPrimary = i < 5;
              return (
                <div
                  key={area}
                  className={`flex items-center gap-2 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-[0.76rem] sm:text-[0.82rem] font-semibold transition-all ${
                    isPrimary
                      ? 'bg-[var(--onestop-navy-deep)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(15,40,71,0.12)]'
                      : 'bg-white text-[var(--onestop-navy-deep)] shadow-[inset_0_0_0_1px_rgba(15,40,71,0.10),0_1px_2px_rgba(15,40,71,0.04)]'
                  }`}
                >
                  <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 opacity-60" />
                  {area}
                </div>
              );
            })}
          </motion.div>

          {siteConfig.neighborhoods ? (
            <div className="mt-8">
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-500">Plus neighborhoods:</span>{' '}
                {siteConfig.neighborhoods}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-20 sm:py-24">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-20 mix-blend-luminosity"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/40" />

        <div className={`${shell} relative z-10`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl leading-tight">
              Walk a site with us.
            </h2>
            <p className="mt-5 text-base text-white/50 max-w-lg mx-auto leading-relaxed">
              Describe the job on the phone or send the address. We walk the site
              free, hand back a fixed-fee number, and start on the date you picked.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="btn-solid inline-flex items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-7 h-12 text-xs sm:text-[0.78rem] font-bold uppercase tracking-[0.15em] text-white hover:bg-[#e55f15] whitespace-nowrap"
              >
                <Phone className="h-4 w-4" /> Call {siteConfig.phone}
              </a>
              <Link
                href="/contact"
                className="btn-ghost-dark inline-flex items-center justify-center gap-2 rounded-md px-7 h-12 text-xs sm:text-[0.78rem] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap"
              >
                Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[0.66rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/70">
              <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Licensed &amp; Insured</span>
              <span className="vrule text-white h-3" aria-hidden />
              <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> 24-Hour Response</span>
              <span className="vrule text-white h-3" aria-hidden />
              <span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Free Quotes</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
