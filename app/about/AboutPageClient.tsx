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
      <section className="relative isolate overflow-hidden bg-[var(--onestop-navy-deep)] py-10 sm:py-14 lg:py-16">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-[var(--onestop-navy-deep)]/80" />
        <div className={`${shell} relative z-10`}>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-white/70">About</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-extrabold leading-[1.06] text-white sm:text-4xl tracking-tight">
            About <span className="text-[var(--onestop-gold)]">Solivance Electric</span>
          </h1>
          <p className="mt-3 text-base text-white/50 leading-relaxed max-w-xl">
            Licensed commercial electrical contractor based in Houston, TX. Premium
            panel upgrades, generators, EV chargers, and warehouse electrical for
            businesses and high-end residential across the greater Houston area.
          </p>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-white border-b border-slate-100">
        <div className={shell}>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {[
              { value: 'Licensed', label: '& Insured' },
              { value: '24/7', label: 'Emergency Service' },
              { value: 'Commercial', label: '& Residential' },
              { value: '100%', label: 'Code Compliant' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="py-10 px-6 text-center"
              >
                <div className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl">{stat.value}</div>
                <div className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</div>
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
                <h2 className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl leading-tight mb-8">
                Our Story
              </h2>
              <div className="space-y-5 text-[0.95rem] leading-[1.8] text-slate-600">
                <p>
                  {siteConfig.ownerName} founded Solivance Electric LLC to bring premium,
                  code-correct electrical work to Houston-area businesses and high-end
                  residential clients. After years of licensed field experience across
                  commercial and industrial projects, Jossue saw a simple gap in the
                  market: contractors who actually do the work right the first time.
                </p>
                <p>
                  Solivance is a young, focused operation — no call centers, no
                  sub-sub-sub-contractors. When you call, you&apos;re talking to the team
                  that will actually be on your property. We pull our own permits,
                  coordinate our own inspections, and stand behind every panel, every
                  feeder, every fixture.
                </p>
                <p>
                  Our top services — <strong className="text-[var(--onestop-navy-deep)]">panel
                  upgrades, generator installs, parking lot lighting, EV chargers,
                  and new commercial warehouse electrical</strong> — are built around one
                  standard: premium quality work, done right. We also handle pedestals
                  and mobile home connections with the same attention to code and detail.
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
                <span className="text-sm font-semibold text-[var(--onestop-navy-deep)]">Fully licensed &amp; insured — every job, every time</span>
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
                <h3 className="text-lg font-extrabold text-[var(--onestop-navy-deep)] sm:text-xl">Be our first reviewer.</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                  Solivance Electric LLC is a new Houston business focused on premium,
                  code-correct work. We value every customer&apos;s feedback — after we
                  complete your project, we&apos;d be grateful for an honest review.
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
            <h2 className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl leading-tight">
              How We Work
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Shield, title: 'Integrity', desc: 'Honest pricing, clear scope, no upselling. If something is not right, we come back and fix it — no argument.' },
              { icon: CheckCircle2, title: 'Code Compliance', desc: 'Every panel, feeder, and fixture is installed to current NEC and local code. Permits pulled, inspections passed.' },
              { icon: HardHat, title: 'Safety', desc: 'Every crew member is trained in electrical safety, lockout/tagout, and proper worksite protocols.' },
              { icon: Clock, title: 'Reliability', desc: 'When we say we will be there, we are there — including 24/7 emergency response for urgent issues.' },
              { icon: Zap, title: 'Commercial Expertise', desc: 'Warehouses, offices, retail, medical — we understand operational downtime and work around it.' },
              { icon: Sparkles, title: 'Clean Worksite', desc: 'Every conduit stub, every drop of wire shaving — cleaned up. Your property stays pristine.' },
            ].map((v) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className="rounded-2xl border border-slate-200 bg-[var(--onestop-cream)] p-7 hover:shadow-md transition-shadow"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--onestop-navy-deep)]/10">
                  <v.icon className="h-5 w-5 text-[var(--onestop-navy-deep)]" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[var(--onestop-navy-deep)]">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.desc}</p>
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
            <h2 className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl leading-tight">
              Service Areas
            </h2>
            <p className="mt-4 text-base text-slate-500 leading-relaxed">
              <Users className="inline h-4 w-4 mr-1 align-[-2px]" />
              We serve commercial and high-end residential electrical clients across
              the greater Houston area. Not sure whether we cover your location?
              Just call — we probably do.
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
                  className={`flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold ${
                    isPrimary
                      ? 'bg-[var(--onestop-navy-deep)] text-white'
                      : 'bg-white text-[var(--onestop-navy-deep)] border border-slate-200'
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
              Get a Free Quote
            </h2>
            <p className="mt-5 text-base text-white/50 max-w-lg mx-auto leading-relaxed">
              Premium electrical work, done right the first time. Call us or fill
              out the form — no obligation.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all whitespace-nowrap"
              >
                <Phone className="h-4 w-4" /> Call {siteConfig.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/5 transition-all whitespace-nowrap"
              >
                Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-white/30">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Licensed &amp; Insured</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> 24/7 Emergency</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Free Quotes</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
