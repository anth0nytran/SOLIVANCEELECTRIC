'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Phone,
  Clock,
  Shield,
  CheckCircle2,
  ArrowRight,
  MapPin,
  HardHat,
  Zap,
} from 'lucide-react';
import { siteConfig } from '../config';
import { EstimateForm } from '../components/EstimateForm';

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPageClient({ faqs }: { faqs: { q: string; a: string }[] }) {
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
              <li className="font-semibold text-white/70">Contact</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.08] tracking-tight">
            Walk a site. Get a number.
          </h1>
          <p className="mt-3 text-base text-white/50 leading-relaxed max-w-lg">
            Panel upgrade, standby generator, EV charger build, parking-lot retrofit,
            warehouse fit-out, RV park pedestal array, or a mobile home hookup —
            describe it below. We respond within 24 hours with an itemized, fixed-fee
            quote. Emergencies are handled by phone, any hour.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/40">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-white/50" /> Free quotes
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-white/50" /> Response within 24 hrs
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-white/50" /> 24/7 Emergency
            </span>
          </div>

          {/* Mobile phone CTA */}
          <div className="mt-6 sm:hidden">
            <a
              href={`tel:${siteConfig.cleanPhone}`}
              className="inline-flex items-center justify-center gap-2.5 w-full bg-[var(--onestop-red)] py-4 text-sm font-bold uppercase tracking-wider text-white rounded-lg shadow-lg"
            >
              <Phone className="h-4 w-4" /> Tap to Call: {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FORM + SIDEBAR ═══ */}
      <section id="form" className="scroll-mt-20 bg-white py-14 sm:py-20">
        <div className={shell}>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-start">

            {/* Left — Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
            >
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--onestop-navy-deep)] leading-tight uppercase tracking-tight">
                  Request a fixed-fee quote
                </h2>
                <p className="text-[0.95rem] text-slate-500 mt-3 leading-relaxed">
                  Commercial, light-industrial, or premium residential. A licensed
                  Texas contractor walks the site free, hands back an itemized number,
                  and starts on the date you pick. No high-pressure pitch, no ballpark
                  over the phone.
                </p>
              </div>
              <EstimateForm />
            </motion.div>

            {/* Right — Sidebar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              className="lg:sticky lg:top-28 space-y-8"
            >
              {/* Direct Contact Card */}
              <div className="bg-[var(--onestop-navy-deep)] rounded-xl p-7 sm:p-8">
                <h3 className="text-lg font-extrabold text-white mb-6">Direct Contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                      <Phone className="h-4 w-4 text-[var(--onestop-gold)]" />
                    </div>
                    <div>
                      <div className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">Call or Text</div>
                      <a href={`tel:${siteConfig.cleanPhone}`} className="mt-0.5 block text-lg font-bold text-white hover:text-[var(--onestop-gold)] transition-colors">
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                      <Clock className="h-4 w-4 text-[var(--onestop-gold)]" />
                    </div>
                    <div>
                      <div className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">Hours</div>
                      <p className="mt-0.5 text-base font-medium text-white/90">{siteConfig.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                      <MapPin className="h-4 w-4 text-[var(--onestop-gold)]" />
                    </div>
                    <div>
                      <div className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">Serving Area</div>
                      <p className="mt-0.5 text-sm font-medium leading-relaxed text-white/90">
                        {siteConfig.serviceAreas.join(', ')} &amp; surrounding areas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Talk to a Licensed Electrician Card */}
              <div className="bg-[var(--onestop-cream)] border border-slate-200 rounded-xl p-7 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-2 -mr-1 text-8xl text-[var(--onestop-navy-deep)]/5 font-[family-name:var(--font-app-display)] leading-none select-none">&ldquo;</div>
                <h4 className="text-[1.05rem] font-bold text-[var(--onestop-navy-deep)] mb-3 relative z-10 leading-snug">Rather walk it through<br/>on the phone?</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-5 relative z-10 font-medium">
                  Describe the site, scope, and timing. A licensed electrician
                  picks up — not a dispatcher, not a call center. Emergencies are
                  routed the same way, any hour.
                </p>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="h-0.5 w-6 bg-[var(--onestop-red)] opacity-60" />
                  <a href={`tel:${siteConfig.cleanPhone}`} className="text-xs font-bold uppercase tracking-widest text-[var(--onestop-navy-deep)] hover:text-[var(--onestop-red)] transition-colors">
                    {siteConfig.phone} · 24/7 Emergency Line
                  </a>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Shield, label: 'Licensed & Insured' },
                  { icon: Clock, label: '24/7 Emergency' },
                  { icon: HardHat, label: 'Commercial & Residential' },
                  { icon: Zap, label: 'Free Quotes' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 bg-slate-50 rounded-lg px-3.5 py-3 border border-slate-100">
                    <item.icon className="h-4 w-4 shrink-0 text-[var(--onestop-navy)]" />
                    <span className="text-xs font-semibold text-slate-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ — two-column layout ═══ */}
      <section className="py-14 sm:py-24 bg-[var(--onestop-cream)]">
        <div className={shell}>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="lg:sticky lg:top-32"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--onestop-navy-deep)] leading-tight uppercase tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-[0.95rem] text-slate-500 leading-relaxed">
                Still have questions? Call us at{' '}
                <a href={`tel:${siteConfig.cleanPhone}`} className="font-semibold text-[var(--onestop-red)] hover:underline">
                  {siteConfig.phone}
                </a>{' '}
                &mdash; we are happy to help.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
            >
              <div className="divide-y divide-slate-200 border-y border-slate-200">
                {faqs.map(({ q, a }) => (
                  <details key={q} className="group">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 sm:py-6 text-[0.95rem] font-semibold text-[var(--onestop-navy-deep)]">
                      {q}
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-lg text-[var(--onestop-red)] transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <div className="pb-5 sm:pb-6 text-sm leading-relaxed text-slate-500">{a}</div>
                  </details>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/40" />
        <div className={`${shell} relative z-10`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-between gap-8"
          >
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                On the schedule this week.
              </h2>
              <p className="mt-2 text-base text-white/50">
                Walk the site free. Fixed-fee number in 24 hours. {siteConfig.hours}.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[var(--onestop-red)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all shadow-lg shadow-[var(--onestop-red)]/20"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              <Link
                href="/contact#form"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-white/5 transition-all"
              >
                Fill Out Form <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
