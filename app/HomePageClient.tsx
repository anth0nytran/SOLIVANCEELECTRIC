'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Shield,
  Clock,
  HardHat,
  Award,
  MapPin,
} from 'lucide-react';
import { siteConfig, serviceData } from './config';
import { Stars } from './components/Stars';

/* ─── COMPACT HERO FORM ─── */
function HeroEstimateForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [formTimestamp] = useState(() => Date.now().toString());
  const [phoneValue, setPhoneValue] = useState('');

  const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 10);
    if (!d.length) return '';
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setFormStatus('sending');
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (typeof window !== 'undefined') {
      fd.set('page', window.location.href);
    }
    if (String(fd.get('website') || '').trim()) { form.reset(); setPhoneValue(''); setFormStatus('success'); return; }
    try {
      const res = await fetch('/api/lead', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) { setFormStatus('error'); setFormError(data?.error || 'Something went wrong.'); return; }
      form.reset(); setPhoneValue(''); setFormStatus('success');
    } catch { setFormStatus('error'); setFormError('Something went wrong. Please try again.'); }
  };

  const inputClass = "w-full border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/15 rounded-md";
  const labelClass = "block text-[0.7rem] font-bold text-slate-600 mb-1 uppercase tracking-wide";

  return (
    <form className="grid gap-3" action="/api/lead" method="POST" onSubmit={handleSubmit}>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="hidden" name="_ts" value={formTimestamp} />

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full Name <span className="text-[var(--onestop-red)]">*</span></label>
          <input required name="name" type="text" placeholder="John Doe" autoComplete="name" pattern="[A-Za-z\s\-']{2,50}" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Phone <span className="text-[var(--onestop-red)]">*</span></label>
          <input required name="phone" type="tel" placeholder="(832) 555-0123" autoComplete="tel" value={phoneValue} onChange={(e) => setPhoneValue(formatPhone(e.target.value))} pattern="\(\d{3}\) \d{3}-\d{4}" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Email <span className="text-[var(--onestop-red)]">*</span></label>
          <input required name="email" type="email" placeholder="you@example.com" autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Service Address <span className="text-[var(--onestop-red)]">*</span></label>
          <input required name="address" type="text" placeholder="123 Main St, Cypress TX" autoComplete="street-address" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Service Needed <span className="text-[var(--onestop-red)]">*</span></label>
        <select required name="service" defaultValue="" className={`${inputClass} appearance-none`}>
          <option value="" disabled>Select a service</option>
          {[siteConfig.primaryService, ...siteConfig.services].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Preferred Date <span className="text-[var(--onestop-red)]">*</span></label>
          <input required name="preferredDate" type="date" min={new Date().toISOString().split('T')[0]} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Time Window <span className="text-[var(--onestop-red)]">*</span></label>
          <select required name="timeWindow" defaultValue="" className={`${inputClass} appearance-none`}>
            <option value="" disabled>Pick a window</option>
            <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
            <option value="Afternoon (12pm–5pm)">Afternoon (12pm–5pm)</option>
            <option value="After hours (5pm–8pm)">After hours (5pm–8pm)</option>
            <option value="Emergency — now">Emergency — now</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Project Details <span className="text-slate-400 normal-case font-normal">(optional)</span></label>
        <textarea name="message" rows={2} maxLength={5000} placeholder="Site access notes, scope, equipment on order, or the best number to reach a foreman..." className={`${inputClass} resize-none`} />
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer border border-slate-200 bg-slate-50 rounded-md px-3 py-2">
        <input type="checkbox" name="sms_consent" value="yes" className="mt-[3px] h-4 w-4 border-slate-300 text-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)] rounded-sm shrink-0" />
        <span className="text-[0.68rem] leading-[1.5] text-slate-600">
          <span className="font-bold text-slate-700">SMS consent (optional).</span> I agree to receive SMS texts from Solivance Electric LLC about my quote, scheduling, and follow-up. 1–5 msgs/request. Msg &amp; data rates apply. Reply STOP to opt out. See our <a href="/privacy" className="underline hover:text-[var(--onestop-red)]">Privacy Policy</a> &amp; <a href="/terms" className="underline hover:text-[var(--onestop-red)]">Terms</a>.
        </span>
      </label>

      <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-[var(--onestop-red)] py-3.5 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#a5311f] active:scale-[0.98] disabled:opacity-60 rounded-md">
        {formStatus === 'sending' ? 'SENDING…' : 'GET YOUR FREE QUOTE'}
      </button>

      {formStatus === 'success' && <div role="status" aria-live="polite" className="border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 font-medium rounded-md">Got it — we&apos;ll call you within 24 hours.</div>}
      {formStatus === 'error' && <div role="alert" aria-live="assertive" className="border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800 font-medium rounded-md">{formError}</div>}
    </form>
  );
}

/* ─── REVIEWS PLACEHOLDER ─── */
const getServicePreviewImage = (service: (typeof serviceData)[number]) =>
  service.media.find((item) => item.type === 'image')?.src ?? '/placeholder.svg';

function ReviewsSection() {
  const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';
  const allReviews = siteConfig.testimonials;

  if (allReviews.length === 0) {
    return (
      <section id="reviews" className="scroll-mt-20 bg-[var(--onestop-navy-deep)] py-16 sm:py-24">
        <div className={`${shell}`}>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl uppercase tracking-tight">Customer Reviews</h2>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-10 sm:px-10 sm:py-12 backdrop-blur-sm">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--onestop-red)]/15">
                <Stars count={5} size="h-5 w-5 text-[#FBBC05]" />
              </div>
              <h3 className="text-lg font-extrabold text-white sm:text-xl">Your review could go here.</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                Solivance Electric is building out a Google review base one finished job at a time.
                If we pull the feeder, wire the panel, or commission the generator on your property,
                an honest review after the inspector signs off goes a long way.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all"
              >
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

export default function HomePageClient() {
  const cleanPhone = siteConfig.cleanPhone;
  const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

  return (
    <>
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": siteConfig.faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "HowTo", "name": "How to Get Premium Commercial Electrical Work in Houston TX", "description": "Get licensed commercial electrical work from Solivance Electric LLC in 3 simple steps.", "totalTime": "PT1H", "step": [{ "@type": "HowToStep", "position": 1, "name": "Call for a Free Quote", "text": `Contact us at ${siteConfig.phone}. Describe your project.`, "url": `${siteConfig.domain}/contact` }, { "@type": "HowToStep", "position": 2, "name": "On-Site Evaluation & Quote", "text": "We visit your property and provide a transparent, competitive price." }, { "@type": "HowToStep", "position": 3, "name": "Licensed Install & Inspection", "text": "Our licensed crew handles the project from start to finish with code-compliant workmanship." }] }) }} />

      {/* ═══ HERO ═══ */}
      <section className="relative isolate overflow-hidden bg-[var(--onestop-navy-deep)]">
        {/* Hero background */}
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-[center_40%]"
          />
        </div>
        {/* Overlay — heavier on mobile for stacked text readability */}
        <div className="absolute inset-0 bg-black/60 lg:bg-transparent" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-black/75 via-black/55 to-black/35" />

        <div className={`${shell} relative z-10`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10 xl:gap-14 items-center w-full py-12 sm:py-14 lg:py-16">

            {/* Left — headline */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="text-white">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-white/55">
                <span className="h-px w-6 bg-[var(--onestop-gold)]" />
                Houston · Cypress · Katy · Memorial
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-[2.1rem] sm:text-[2.75rem] lg:text-[3.15rem] xl:text-[3.6rem] font-extrabold leading-[1] tracking-[-0.035em] text-white mb-5 sm:mb-6">
                Commercial electrical,<br/><span className="relative inline-block text-white">done right.<span aria-hidden className="absolute left-0 -bottom-1 h-[3px] w-full bg-[var(--onestop-red)]" /></span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }} className="text-[0.95rem] sm:text-base leading-[1.65] text-white/65 max-w-[480px] mb-6 sm:mb-7">
                200A through 3-phase switchgear. Standby generators with ATS commissioning. LED parking-lot retrofits. Level 2 and DC fast chargers. Warehouse builds, RV park pedestals, mobile-home hookups — across Houston, Cypress, Katy, and Memorial. Licensed. Insured. 24/7.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-7">
                <a href={`tel:${cleanPhone}`} className="group inline-flex items-center justify-center gap-2.5 bg-[var(--onestop-red)] h-12 px-7 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white rounded-md hover:bg-[#e55f15] transition-colors duration-200">
                  <Phone className="h-4 w-4" />
                  <span className="font-[family-name:var(--font-app-mono)] tracking-normal normal-case text-[0.82rem] font-medium">{siteConfig.phone}</span>
                </a>
                <Link href="/services" className="inline-flex items-center justify-center gap-2 border border-white/20 h-12 px-7 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white/90 rounded-md hover:bg-white/[0.06] hover:border-white/30 transition-colors duration-200">
                  Our Services <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.45 }} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/45">
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Licensed &amp; Insured</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 24/7 Emergency</span>
                <span className="hidden sm:flex items-center gap-1.5"><HardHat className="h-3.5 w-3.5" /> Commercial Expertise</span>
              </motion.div>
            </motion.div>

            {/* Right — floating form card */}
            <motion.div id="hero-form" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="scroll-mt-28">
              <div className="bg-white p-5 sm:p-6 lg:p-7 rounded-md shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-black/5">
                <div className="mb-4 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.22em] text-[var(--onestop-navy)]">
                  <span className="h-px w-6 bg-[var(--onestop-gold)]" />
                  Free Quote
                </div>
                <h2 className="text-xl sm:text-[1.4rem] font-bold text-[var(--onestop-navy-deep)] tracking-[-0.025em] leading-tight mb-1.5">Tell us about your project.</h2>
                <p className="text-[0.82rem] text-slate-500 mb-5 leading-snug">Response within 24 hours. Faster for emergencies.</p>
                <HeroEstimateForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAND ═══ */}
      <section className="bg-white border-b border-slate-100">
        <div className={`${shell} py-8 sm:py-10`}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.22em] text-slate-500">
            <span className="flex items-center gap-2.5"><Shield className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Licensed</span>
            <span className="flex items-center gap-2.5"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Insured</span>
            <span className="flex items-center gap-2.5"><Clock className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> 24/7 Emergency</span>
            <span className="flex items-center gap-2.5"><HardHat className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Commercial &amp; Residential</span>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="scroll-mt-20 bg-white pt-16 sm:pt-24 pb-16 sm:pb-24">
        <div className={shell}>
          <div className="max-w-2xl mb-10 sm:mb-14">
            <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
              <span className="h-px w-6 bg-[var(--onestop-gold)]" />
              01 — Services
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[var(--onestop-navy-deep)] tracking-[-0.03em] leading-[1.05]">What we do best.</h2>
            <p className="mt-5 text-[0.95rem] sm:text-base text-slate-500 leading-relaxed max-w-xl">
              Seven services, one crew, one standard. Commercial, light-industrial, and premium residential electrical across the Greater Houston metro.
            </p>
          </div>

          {/* Top row — 3 equal cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-3">
            {serviceData.slice(0, 3).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group relative overflow-hidden rounded-xl bg-slate-100 aspect-[4/3] flex flex-col justify-end">
                <Image src={getServicePreviewImage(s)} alt={s.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 p-5">
                  <h3 className="text-lg font-extrabold text-white tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/60 line-clamp-1">{s.summary.split(' — ')[0]}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-white/40 group-hover:text-[var(--onestop-gold)] transition-colors">
                    Learn More <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom row — remaining cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceData.slice(3).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group relative overflow-hidden rounded-xl bg-slate-100 aspect-[4/3] flex flex-col justify-end">
                <Image src={getServicePreviewImage(s)} alt={s.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 p-5">
                  <h3 className="text-lg font-extrabold text-white tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/60 line-clamp-1">{s.summary.split(' — ')[0]}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-white/40 group-hover:text-[var(--onestop-gold)] transition-colors">
                    Learn More <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* View all services CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 font-medium max-w-md">
              Each service has a dedicated page with cost ranges, timelines, code references, and FAQs.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[var(--onestop-navy-deep)] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white rounded-md hover:bg-[var(--onestop-red)] transition-colors"
            >
              View all seven services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SERVICE AREAS — clean professional ═══ */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-100">
        <div className={shell}>
          <div className="max-w-2xl mb-10 sm:mb-12">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--onestop-red)] mb-3">
              Service Areas
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-bold text-[var(--onestop-navy-deep)] leading-[1.15] tracking-[-0.02em]">
              Serving Houston, Cypress, Katy &amp; Memorial.
            </h2>
            <p className="mt-4 text-[0.98rem] text-slate-600 leading-[1.7]">
              Licensed Texas commercial electrical contractor working the Greater Houston metro. Harris and Fort Bend County permits are what we pull day-in, day-out. Surrounding metro covered on a call.
            </p>
          </div>

          {/* Clean 4-card row for cities */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.serviceAreas.map((area) => {
              const citySlug = area.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={area}
                  href={`/locations/${citySlug}`}
                  className="group rounded-md bg-slate-50 p-6 hover:bg-[var(--onestop-navy-deep)] transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <MapPin className="h-4 w-4 text-[var(--onestop-red)] group-hover:text-[var(--onestop-gold)] transition-colors" />
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="text-[1.35rem] font-bold text-[var(--onestop-navy-deep)] group-hover:text-white transition-colors leading-tight">
                    {area}
                  </h3>
                  <div className="mt-2 text-[0.82rem] text-slate-500 group-hover:text-white/70 transition-colors font-[family-name:var(--font-app-mono)]">
                    Commercial &middot; Residential
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 max-w-md">
              Plus Spring, Jersey Village, Tomball, Bellaire, Sugar Land, Missouri City and the surrounding metro.
            </p>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-[var(--onestop-navy-deep)] px-5 py-2.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white rounded-md hover:bg-[var(--onestop-red)] transition-colors"
            >
              All service areas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / WHY US ═══ */}
      <section id="about" className="scroll-mt-20 bg-[var(--onestop-cream)] py-14 sm:py-24">
        <div className={shell}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">
            {/* Left — company photo */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-slate-200 overflow-hidden">
                <Image src="/placeholder.svg" alt="Solivance Electric LLC worksite — licensed commercial electrical contractor" fill className="object-cover" />
              </div>
            </div>

            {/* Right */}
            <div className="pt-4 lg:pt-0">
              <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
                <span className="h-px w-6 bg-[var(--onestop-gold)]" />
                02 — About
              </div>
              <h2 className="text-3xl font-bold leading-[1.08] text-[var(--onestop-navy-deep)] sm:text-4xl tracking-[-0.03em]">Commercial electrical.<br/>Done right the first time.</h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-600">
                Solivance Electric is a licensed Texas electrical contractor working commercial,
                light-industrial, and premium residential sites across Greater Houston.
                In-house crew — not subcontracted three layers deep. One foreman from the site
                walk to the final inspection.
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-600">
                We pull the Harris County or City of Houston permits, coordinate the
                CenterPoint cut-over, and show up when the inspector does. Every splice
                is to the 2023 NEC when it is made — not after the blue tag goes up.
                The panel cover goes back on straight. The grounding bonds are visible and
                labeled. The mechanical room is swept. No callbacks.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-4">
                {[
                  { icon: Shield, title: 'Licensed & Insured', desc: 'Texas contractor, COI on request.' },
                  { icon: Clock, title: '24/7 Emergency Line', desc: 'A licensed electrician answers.' },
                  { icon: HardHat, title: 'In-House Crew', desc: 'Not subcontracted out.' },
                  { icon: Award, title: 'First-Walk Inspections', desc: 'Pass on the first pass.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--onestop-navy)]/8">
                      <item.icon className="h-4 w-4 text-[var(--onestop-navy)]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--onestop-navy-deep)]">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/about" className="inline-flex items-center justify-center gap-2 bg-[var(--onestop-red)] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white rounded-lg hover:bg-[#a5311f] transition-colors">Our Story <ArrowRight className="h-3.5 w-3.5" /></Link>
                <a href={`tel:${cleanPhone}`} className="inline-flex items-center justify-center gap-2 border border-[var(--onestop-navy-deep)]/15 bg-white px-6 py-3 text-xs font-bold text-[var(--onestop-navy-deep)] rounded-lg hover:bg-slate-50 transition-colors"><Phone className="h-3.5 w-3.5" /> {siteConfig.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS (placeholder when empty) ═══ */}
      <ReviewsSection />

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="scroll-mt-20 bg-white py-16 sm:py-24">
        <div className={`${shell} grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16`}>
          <div>
            <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
              <span className="h-px w-6 bg-[var(--onestop-gold)]" />
              03 — FAQ
            </div>
            <h2 className="text-3xl font-bold text-[var(--onestop-navy-deep)] sm:text-4xl tracking-[-0.03em] leading-[1.08]">Questions, answered.</h2>
            <p className="mt-4 text-[0.95rem] text-slate-500 leading-relaxed">Don&apos;t see yours? Call us — we&apos;re happy to help.</p>
            <a href={`tel:${cleanPhone}`} className="mt-5 inline-flex items-center gap-2 font-[family-name:var(--font-app-mono)] text-sm text-[var(--onestop-navy)] hover:text-[var(--onestop-red)] transition-colors"><Phone className="h-4 w-4" /> {siteConfig.phone}</a>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {siteConfig.faqs.map((faq, i) => (
              <details key={faq.q} className="group" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-[0.95rem] font-semibold text-[var(--onestop-navy-deep)]">
                  {faq.q}
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-base text-[var(--onestop-navy)] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="pb-5 text-sm leading-relaxed text-slate-500">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA + SECOND FORM ═══ */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-20 sm:py-28">
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
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-center">
            {/* Left — CTA copy */}
            <div className="text-white">
              <h2 className="text-2xl font-extrabold sm:text-3xl uppercase tracking-tight">Get a Free Quote</h2>
              <p className="mt-3 text-base text-white/60 max-w-md">Tell us about your electrical project. We&apos;ll get back to you within 24 hours — faster for emergencies.</p>
              <a href={`tel:${cleanPhone}`} className="mt-6 inline-flex items-center gap-2 text-xl font-extrabold text-white hover:text-white/80 transition-colors">
                <Phone className="h-5 w-5" /> {siteConfig.phone}
              </a>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider text-white/40">
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Licensed &amp; Insured</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 24/7 Emergency</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Free Quotes</span>
              </div>
            </div>
            {/* Right — form */}
            <div className="rounded-2xl bg-white p-6 sm:p-8 lg:p-10 shadow-2xl">
              <HeroEstimateForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
