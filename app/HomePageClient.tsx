'use client';

import { useState, useCallback, type FormEvent } from 'react';
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
  MapPin,
  Award,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
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

  const inputClass = "w-full border border-slate-300 bg-white px-3 py-2.5 lg:py-3 text-sm lg:text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/15";

  return (
    <form className="grid gap-3 lg:gap-4" action="/api/lead" method="POST" onSubmit={handleSubmit}>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="hidden" name="_ts" value={formTimestamp} />

      <div className="grid gap-3 lg:gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1 lg:mb-1.5 uppercase tracking-wide">Full Name <span className="text-[var(--onestop-red)]">*</span></label>
          <input required name="name" type="text" placeholder="John Doe" autoComplete="name" pattern="[A-Za-z\s\-']{2,50}" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1 lg:mb-1.5 uppercase tracking-wide">Phone <span className="text-[var(--onestop-red)]">*</span></label>
          <input required name="phone" type="tel" placeholder="(832) 555-0123" autoComplete="tel" value={phoneValue} onChange={(e) => setPhoneValue(formatPhone(e.target.value))} pattern="\(\d{3}\) \d{3}-\d{4}" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 mb-1 lg:mb-1.5 uppercase tracking-wide">Street Address <span className="text-[var(--onestop-red)]">*</span></label>
        <input required name="address" type="text" placeholder="123 Main St, Richmond TX" autoComplete="street-address" className={inputClass} />
      </div>

      <div className="grid gap-3 lg:gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1 lg:mb-1.5 uppercase tracking-wide">Service Needed <span className="text-[var(--onestop-red)]">*</span></label>
          <select required name="service" defaultValue="" className={`${inputClass} appearance-none`}>
            <option value="" disabled>Select a service</option>
            {[siteConfig.primaryService, ...siteConfig.services].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1 lg:mb-1.5 uppercase tracking-wide">Timeline</label>
          <select name="timeline" defaultValue="" className={`${inputClass} appearance-none`}>
            <option value="" disabled>How soon?</option>
            <option value="ASAP">ASAP</option>
            <option value="Within 2 weeks">Within 2 weeks</option>
            <option value="Within 1 month">Within 1 month</option>
            <option value="1-3 months">1-3 months</option>
            <option value="Just exploring">Just exploring</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 mb-1 lg:mb-1.5 uppercase tracking-wide">Project Details <span className="text-slate-400 normal-case font-normal">(optional)</span></label>
        <textarea name="message" rows={2} maxLength={5000} placeholder="Describe your project, budget, or best time to reach you..." className={`${inputClass} resize-none`} />
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer">
        <input type="checkbox" name="sms_consent" defaultChecked className="mt-0.5 h-4 w-4 border-slate-300 text-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)] rounded-sm" />
        <span className="text-[0.7rem] leading-relaxed text-slate-500">I agree to receive SMS/text messages from One Stop Outdoor Construction regarding my estimate. Message &amp; data rates may apply. Reply STOP to opt out.</span>
      </label>

      <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-[var(--onestop-red)] py-3 lg:py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#a5311f] active:scale-[0.98] disabled:opacity-60">
        {formStatus === 'sending' ? 'SENDING...' : 'GET YOUR FREE ESTIMATE'}
      </button>

      {formStatus === 'success' && <div role="status" aria-live="polite" className="border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 font-medium">Got it — we&apos;ll call you within 24 hours to schedule your free estimate.</div>}
      {formStatus === 'error' && <div role="alert" aria-live="assertive" className="border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800 font-medium">{formError}</div>}
    </form>
  );
}

/* ─── REVIEWS CAROUSEL ─── */
const REVIEWS_PER_PAGE = 6;
const getServicePreviewImage = (service: (typeof serviceData)[number]) =>
  service.media.find((item) => item.type === 'image')?.src ?? '/facebook/hero.jpg';

function ReviewsSection() {
  const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';
  const allReviews = siteConfig.testimonials;
  const totalPages = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);
  const [page, setPage] = useState(0);

  const goNext = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages]);
  const goPrev = useCallback(() => setPage((p) => (p - 1 + totalPages) % totalPages), [totalPages]);

  const visible = allReviews.slice(page * REVIEWS_PER_PAGE, (page + 1) * REVIEWS_PER_PAGE);

  return (
    <section id="reviews" className="scroll-mt-20 relative isolate overflow-hidden py-16 sm:py-32">
      <div className="absolute inset-0 -top-20 -bottom-20">
        <Image
          src="/facebook/hero.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
         
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/75" />

      <div className={`${shell} relative z-10`}>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl uppercase tracking-tight">Customer Reviews</h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Stars count={5} size="h-5 w-5 text-[#FBBC05]" />
            <span className="text-lg font-extrabold text-white">{siteConfig.rating.toFixed(1)}</span>
            <span className="text-sm text-white/50">Perfect 5.0 on Google</span>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {visible.map((t) => (
            <div key={t.name} className="flex flex-col rounded-lg bg-white/8 border border-white/10 p-6 hover:-translate-y-1 transition-all duration-300">
              <Stars count={t.stars} size="h-4 w-4 text-[#FBBC05]" />
              <p className="mt-4 text-[0.93rem] leading-relaxed text-white/80 line-clamp-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-[0.7rem] text-white/40 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-[#4285F4]" /> Verified Google Review
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={goPrev}
              aria-label="Previous reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Page ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === page ? 'w-8 bg-[#FBBC05]' : 'w-2.5 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              aria-label="Next reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function HomePageClient() {
  const cleanPhone = siteConfig.cleanPhone;
  const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

  return (
    <>
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": siteConfig.faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "HowTo", "name": "How to Get Professional Outdoor Construction in Richmond, Katy & Houston TX", "description": "Get expert outdoor construction from One Stop Outdoor Construction in 3 simple steps.", "totalTime": "PT1H", "step": [{ "@type": "HowToStep", "position": 1, "name": "Call for a Free Estimate", "text": "Contact us at (832) 945-8084. Describe your project.", "url": "https://onestopoutdoorconstruction.com/contact" }, { "@type": "HowToStep", "position": 2, "name": "On-Site Evaluation & Quote", "text": "We visit your property and provide a transparent, competitive price." }, { "@type": "HowToStep", "position": 3, "name": "Expert Build & Completion", "text": "Our licensed crew handles the project from start to finish." }] }) }} />

      {/* ═══ HERO ═══ */}
      <section className="relative isolate overflow-hidden bg-[var(--onestop-navy-deep)] lg:min-h-[calc(100dvh-6.5rem)]">
        {/* Hero background */}
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
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

        <div className={`${shell} relative z-10 flex items-center lg:min-h-[calc(100dvh-6.5rem)]`}>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10 xl:gap-16 items-center w-full py-8 sm:py-12 lg:py-16">

            {/* Left — headline */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="text-white">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="inline-flex items-center gap-2.5 rounded-full bg-white/8 border border-white/12 px-4 py-2 mb-6 backdrop-blur-sm">
                <Stars count={5} size="h-3.5 w-3.5 text-[#FBBC05]" />
                <span className="text-[0.75rem] font-medium text-white/80">{siteConfig.rating} Star Rated &bull; Google Verified</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem] font-black leading-[0.95] tracking-[-0.02em] text-white mb-4 sm:mb-6">
                Custom Outdoor Construction.<br /><span className="text-[var(--onestop-red)]">Done Right.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }} className="text-sm sm:text-base lg:text-lg leading-[1.6] text-white/60 max-w-[460px] mb-5 sm:mb-8">
                Patio covers, outdoor kitchens, concrete &amp; pergolas. {siteConfig.yearsInBusiness}+ years serving Richmond, Katy, Sugar Land, Houston &amp; surrounding areas. Licensed &amp; insured.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-5 sm:mb-8">
                <a href={`tel:${cleanPhone}`} className="inline-flex items-center justify-center gap-2.5 bg-[var(--onestop-red)] h-11 sm:h-[52px] px-6 sm:px-8 text-[0.75rem] sm:text-[0.8rem] font-bold uppercase tracking-[0.1em] text-white rounded-xl hover:bg-[#a5311f] active:scale-[0.97] transition-all duration-200 shadow-xl shadow-[var(--onestop-red)]/20">
                  <Phone className="h-4 w-4" /> Call Now: {siteConfig.phone}
                </a>
                <Link href="/gallery" className="inline-flex items-center justify-center gap-2 bg-white/8 border border-white/15 h-11 sm:h-[52px] px-6 sm:px-8 text-[0.75rem] sm:text-[0.8rem] font-semibold text-white/90 rounded-xl hover:bg-white/15 active:scale-[0.97] transition-all duration-200 backdrop-blur-sm">
                  View Our Work <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.45 }} className="flex items-center gap-4 sm:gap-5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/40">
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Licensed &amp; Insured</span>
                <span className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> BBB Accredited</span>
                <span className="hidden sm:flex items-center gap-1.5"><ThumbsUp className="h-3.5 w-3.5" /> 70% Referral</span>
              </motion.div>
            </motion.div>

            {/* Right — floating form card */}
            <motion.div id="hero-form" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="scroll-mt-28">
              <div className="bg-white p-4 sm:p-6 lg:p-10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-[var(--onestop-navy-deep)] tracking-tight mb-1 uppercase">Get Your Free Estimate</h2>
                <p className="text-xs sm:text-sm text-slate-400 mb-4 lg:mb-6">No cost. No obligation. Fast response.</p>
                <HeroEstimateForm />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hard bottom edge — no fade */}
      </section>

      {/* ═══ TRUSTED & VERIFIED ═══ */}
      <section className="bg-[var(--onestop-cream)] border-y border-slate-200">
        <div className={`${shell} py-12 sm:py-16`}>
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px flex-1 max-w-16 bg-slate-300" />
            <p className="text-center text-[0.7rem] font-extrabold uppercase tracking-[0.25em] text-slate-500">Trusted &amp; Verified</p>
            <div className="h-px flex-1 max-w-16 bg-slate-300" />
          </div>
          {/* Row 1: 4 logos */}
          <div className="grid grid-cols-4 gap-4 sm:gap-8 items-center justify-items-center lg:hidden">
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-10 sm:h-14 w-auto" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div className="flex items-center justify-center">
              <img src="/logos/bbb-aplus-rating-clean.svg" alt="BBB A+ Rating" className="h-12 sm:h-16 w-auto" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/logos/Yelp-Logo-clean.svg" alt="Yelp" className="h-8 sm:h-12 w-auto" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/logos/Nextdoor-logo-green-clean.svg" alt="Nextdoor" className="h-8 sm:h-12 w-auto" />
            </div>
          </div>
          {/* Row 2: 3 logos centered */}
          <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-4 sm:gap-8 items-center justify-items-center lg:hidden">
            <div className="flex items-center justify-center">
              <img src="/logos/neighborhood-fave-2025-clean.svg" alt="Nextdoor Neighborhood Fave 2025" className="h-12 sm:h-16 w-auto" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/logos/facebook-clean.svg" alt="Facebook" className="h-8 sm:h-12 w-auto" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/logos/licenseinsuredbonded-clean.svg" alt="Licensed, Insured & Bonded" className="h-12 sm:h-16 w-auto" />
            </div>
          </div>
          {/* Desktop: single row of 7 */}
          <div className="hidden lg:grid grid-cols-7 gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-14 w-auto" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div className="flex items-center justify-center">
              <img src="/logos/bbb-aplus-rating-clean.svg" alt="BBB A+ Rating" className="h-16 w-auto" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/logos/Yelp-Logo-clean.svg" alt="Yelp" className="h-12 w-auto" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/logos/Nextdoor-logo-green-clean.svg" alt="Nextdoor" className="h-12 w-auto" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/logos/neighborhood-fave-2025-clean.svg" alt="Nextdoor Neighborhood Fave 2025" className="h-16 w-auto" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/logos/facebook-clean.svg" alt="Facebook" className="h-12 w-auto" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/logos/licenseinsuredbonded-clean.svg" alt="Licensed, Insured & Bonded" className="h-16 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="scroll-mt-20 bg-white pt-8 pb-14 sm:pb-24">
        <div className={shell}>
          <div className="max-w-xl mb-8 sm:mb-12">
            <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl uppercase tracking-tight">Our Services</h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              Custom patio covers, concrete, outdoor kitchens &amp; more — serving Richmond, Katy, Sugar Land, Houston &amp; surrounding areas.
            </p>
          </div>

          {/* Top row — 3 equal cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-3">
            {serviceData.slice(0, 3).map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`} className="group relative overflow-hidden rounded-xl bg-slate-100 aspect-[4/3] flex flex-col justify-end">
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

          {/* Bottom row — 3 equal cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceData.slice(3).map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`} className="group relative overflow-hidden rounded-xl bg-slate-100 aspect-[4/3] flex flex-col justify-end">
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
        </div>
      </section>

      {/* ═══ ABOUT / WHY US ═══ */}
      <section id="about" className="scroll-mt-20 bg-[var(--onestop-cream)] py-14 sm:py-24">
        <div className={shell}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">
            {/* Left — company photo + stats */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-slate-200 overflow-hidden">
                <Image src="/facebook/builton.jpg" alt="One Stop Outdoor Construction worksite showing quality craftsmanship" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-5 left-3 right-3 sm:left-6 sm:right-6 grid grid-cols-3 gap-2 sm:gap-2.5">
                {[
                  { value: `${siteConfig.yearsInBusiness}+`, label: 'Years' },
                  { value: '70%', label: 'Referrals' },
                  { value: '5.0', label: 'Rated' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white px-2 py-3 sm:p-3 text-center shadow-lg border border-slate-100">
                    <div className="text-lg sm:text-xl font-extrabold text-[var(--onestop-navy-deep)]">{stat.value}</div>
                    <div className="text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="pt-8 lg:pt-0">
              <h2 className="text-3xl font-extrabold leading-tight text-[var(--onestop-navy-deep)] sm:text-4xl">Built on trust. Driven by craftsmanship.</h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-600">
                David and the One Stop Outdoor team have been building patios, outdoor kitchens, and concrete projects across Richmond, Katy, and Houston for over {siteConfig.yearsInBusiness} years. We show up on time, use quality materials, and we don&apos;t leave until the job is done right.
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-600">
                70% of our work comes from repeat clients and referrals. We earned that.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-4">
                {[
                  { icon: Shield, title: 'Licensed & Insured', desc: 'Full coverage on every project.' },
                  { icon: Clock, title: 'Fast Response', desc: 'Quick scheduling, always on time.' },
                  { icon: Award, title: 'BBB Accredited', desc: 'Verified business you can trust.' },
                  { icon: HardHat, title: `${siteConfig.yearsInBusiness}+ Years`, desc: 'Decades of outdoor expertise.' },
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

      {/* ═══ PORTFOLIO PREVIEW ═══ */}
      <section id="work" className="scroll-mt-20 bg-white py-14 sm:py-24">
        <div className={shell}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl uppercase tracking-tight">Recent Work</h2>
              <p className="mt-2 text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg">
                Real projects completed for homeowners in Richmond, Katy, Sugar Land, Houston, Rosenberg and nearby communities.
              </p>
            </div>
            <Link href="/gallery" className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--onestop-navy)] hover:text-[var(--onestop-red)] transition-colors py-1">View Full Gallery <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { service: 'Patio Cover', location: 'Richmond', src: '/photos_new_web/patio-cover/patio-cover-1.jpg' },
              { service: 'Concrete', location: 'Sugar Land', src: '/photos_new_web/concrete/concrete-1.jpg' },
              { service: 'Outdoor Kitchen', location: 'Katy', src: '/photos_new_web/outdoor-kitchen/outdoor-kitchen-1.jpg' },
              { service: 'Pergola', location: 'Sugar Land', src: '/service/IMG_6339.jpeg' },
              { service: 'Patio Cover', location: 'Katy', src: '/photos_new_web/patio-cover/patio-cover-4.jpg' },
              { service: 'Concrete', location: 'Houston', src: '/photos_new_web/concrete/concrete-3.jpg' },
            ].map((project, i) => (
              <Link key={i} href="/gallery" className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative bg-slate-100 overflow-hidden aspect-[4/3]">
                  <Image
                    src={project.src}
                    alt={`${project.service} in ${project.location}, TX`}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--onestop-navy-deep)]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Watermark */}
                  <div className="absolute bottom-1.5 left-1.5 pointer-events-none select-none opacity-30">
                    <img src="/logos/main_logo.png" alt="" aria-hidden draggable={false} className="h-[5%] min-h-[14px] max-h-[20px] w-auto" />
                  </div>
                </div>
                <div className="px-5 py-3.5 border-t border-slate-100 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--onestop-red)]">
                      {project.service}
                    </span>
                    <span className="shrink-0 flex items-center gap-1 rounded-full bg-[var(--onestop-cream)] px-2.5 py-1 text-[0.7rem] font-semibold text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {project.location}, TX
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a 
              href="https://www.facebook.com/profile.php?id=100063553814373&sk=photos_by" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:bg-[#1877F2]/90 transition-colors"
            >
              See More Photos on Facebook <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS — parallax background ═══ */}
      <ReviewsSection />

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="scroll-mt-20 bg-white py-14 sm:py-24">
        <div className={`${shell} grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14`}>
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl uppercase tracking-tight">FAQ</h2>
            <p className="mt-3 text-sm text-slate-500">Don&apos;t see yours? Call us — we&apos;re happy to help.</p>
            <a href={`tel:${cleanPhone}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--onestop-navy)]"><Phone className="h-4 w-4" /> {siteConfig.phone}</a>
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

      {/* ═══ BOTTOM CTA + SECOND FORM — Pattern 2: Dual Lead Capture ═══ */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-20 sm:py-28">
        <div className="absolute inset-0">
          <Image
            src="/facebook/filler2.jpg"
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
              <p className="mt-3 text-base text-white/60 max-w-md">Tell us about your project. We&apos;ll get back to you within 24 hours.</p>
              <a href={`tel:${cleanPhone}`} className="mt-6 inline-flex items-center gap-2 text-xl font-extrabold text-white hover:text-white/80 transition-colors">
                <Phone className="h-5 w-5" /> {siteConfig.phone}
              </a>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider text-white/40">
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Licensed &amp; Insured</span>
                <span className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> BBB Accredited</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Free Estimates</span>
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
