'use client';

import { CtaBackdrop } from './components/CtaBackdrop';
import { FinancingNote } from './components/FinancingBanner';
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
import { ReviewsSection } from './components/ReviewsSection';
import { CarePlanShowcase } from './components/CarePlanShowcase';
import { QuoteQuiz } from './components/QuoteQuiz';
import { LineBreak } from './components/LineBreak';

const getServicePreviewImage = (service: (typeof serviceData)[number]) =>
  service.media.find((item) => item.type === 'image')?.src ?? '/photos_new/hero.jpg';

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
            src="/photos_new/hero.jpg"
            alt="Solivance Electric LLC electrical crew on a Southwest Houston commercial job site"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-[center_40%]"
          />
        </div>
        {/* Overlay — readable text without killing the image */}
        <div className="absolute inset-0 bg-black/55 lg:bg-transparent" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-black/70 via-black/45 to-black/20" />

        <div className={`${shell} relative z-10`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10 xl:gap-14 items-center w-full py-12 sm:py-14 lg:py-16">

            {/* Left — headline */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="text-white">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-white/80">
                <span className="h-px w-6 bg-[var(--onestop-gold)]" />
                <span className="sm:hidden">Southwest Houston · Heights · Bellaire</span>
                <span className="hidden sm:inline">Southwest Houston · Heights · Bellaire · Memorial Villages</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-[2.1rem] sm:text-[2.75rem] lg:text-[3.15rem] xl:text-[3.6rem] font-extrabold leading-[1] tracking-[-0.035em] text-white mb-5 sm:mb-6">
                Southwest Houston&rsquo;s<LineBreak /><span className="relative inline-block text-white">electrician.<span aria-hidden className="absolute left-0 -bottom-1 h-[3px] w-full bg-[var(--onestop-red)]" /></span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }} className="text-[0.95rem] sm:text-base leading-[1.7] text-white/95 max-w-[520px] mb-6 sm:mb-7">
                Licensed commercial &amp; residential electrical contractor based on S Post Oak Rd (77045). Panel upgrades, standby generators, parking-lot lighting, Level 2 and DC fast chargers — across Southwest Houston, the Heights, Bellaire, and the Memorial Villages. Licensed. Insured. 24/7.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="flex flex-col sm:flex-row gap-3 mb-7 sm:mb-8">
                <a href={`tel:${cleanPhone}`} className="btn-solid group inline-flex items-center justify-center gap-2.5 bg-[var(--onestop-red)] h-12 px-7 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white rounded-md hover:bg-[#e55f15]">
                  <Phone className="h-4 w-4" />
                  <span className="font-[family-name:var(--font-app-mono)] tracking-normal normal-case text-[0.82rem] font-medium">{siteConfig.phone}</span>
                </a>
                <Link href="/services" className="btn-ghost-dark inline-flex items-center justify-center gap-2 h-12 px-7 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white rounded-md">
                  Our Services <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.45 }} className="grid grid-cols-3 gap-2 sm:gap-4 text-[0.6rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-white/75">
                <span className="flex items-center gap-1.5 sm:gap-2 min-w-0"><Shield className="h-3.5 w-3.5 text-[var(--onestop-gold)] shrink-0" /> <span className="truncate">Licensed &amp; Insured</span></span>
                <span className="flex items-center gap-1.5 sm:gap-2 min-w-0"><Clock className="h-3.5 w-3.5 text-[var(--onestop-gold)] shrink-0" /> <span className="truncate">24-Hour Response</span></span>
                <span className="flex items-center gap-1.5 sm:gap-2 min-w-0"><HardHat className="h-3.5 w-3.5 text-[var(--onestop-gold)] shrink-0" /> <span className="truncate">{siteConfig.yearsInBusiness}+ Yrs in Houston</span></span>
              </motion.div>
            </motion.div>

            {/* Right — floating form card */}
            <motion.div id="hero-form" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="scroll-mt-28">
              <div className="bg-white rounded-md overflow-hidden shadow-[0_1px_0_rgba(15,40,71,0.06),0_4px_12px_rgba(15,40,71,0.10),0_30px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/5">
                {/* Authority bar */}
                <div className="flex items-center justify-between gap-3 bg-[var(--onestop-navy-deep)] px-5 sm:px-6 lg:px-7 py-2.5 text-white">
                  <div className="flex items-center gap-2 font-[family-name:var(--font-app-mono)] text-[0.62rem] uppercase tracking-[0.22em] text-white/70">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--onestop-gold)] animate-pulse" />
                    Free Quote<span className="hidden min-[420px]:inline"> · No Obligation</span>
                  </div>
                  <div className="font-[family-name:var(--font-app-mono)] text-[0.62rem] uppercase tracking-[0.18em] text-[var(--onestop-gold)]">
                    Booking this week
                  </div>
                </div>
                <div className="p-5 sm:p-6 lg:p-7">
                  <h2 className="text-xl sm:text-[1.4rem] font-bold text-[var(--onestop-navy-deep)] tracking-[-0.025em] leading-tight mb-1.5">Get an electrician out this week.</h2>
                  <p className="text-[0.82rem] text-slate-500 mb-5 leading-snug">4 quick taps. We call you right back to lock in your day.</p>
                  <QuoteQuiz location="home:hero" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAND — credentials strip ═══ */}
      <section className="bg-white border-b border-slate-200/70">
        <div className={`${shell} py-5 sm:py-6`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-y-0 md:divide-x md:divide-slate-200/70">
            {[
              { icon: Shield, label: 'Licensed', value: 'Texas Electrical Contractor' },
              { icon: CheckCircle2, label: 'Insured', value: 'COI on Request' },
              { icon: Clock, label: '24-Hour Response', value: 'Emergencies Prioritized' },
              { icon: HardHat, label: `${siteConfig.yearsInBusiness}+ Years`, value: 'Greater Houston Metro' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-3 sm:px-4 md:px-5 md:first:pl-0 py-1">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--onestop-navy)]/[0.06]">
                  <item.icon className="h-4 w-4 text-[var(--onestop-navy-deep)]" strokeWidth={1.9} />
                </div>
                <div className="min-w-0">
                  <div className="text-[0.78rem] font-bold text-[var(--onestop-navy-deep)] tracking-[-0.005em] leading-tight">{item.label}</div>
                  <div className="text-[0.66rem] text-slate-500 font-medium leading-snug uppercase tracking-[0.08em]">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="num-host scroll-mt-20 bg-white pt-16 sm:pt-24 pb-16 sm:pb-24 overflow-hidden">
        <span className="num-anchor top-4 -right-6 sm:top-8 sm:-right-10" aria-hidden>01</span>
        <div className="beam-layer beam-diagonal -top-20 -right-40 hidden md:block" aria-hidden />
        <div className="beam-layer top-24 left-8 hidden lg:block" aria-hidden>
          <div className="beam-vertical beam-vertical--accent" style={{ height: '180px' }} />
        </div>
        <div className={shell}>
          <div className="max-w-2xl mb-10 sm:mb-14">
            <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
              <span className="h-px w-6 bg-[var(--onestop-gold)]" />
              01 — Services
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[var(--onestop-navy-deep)] tracking-[-0.03em] leading-[1.05]">What we do best.</h2>
            <p className="mt-5 text-[0.95rem] sm:text-base text-slate-500 leading-relaxed max-w-xl">
              Nine services, one crew, one standard. Commercial, light-industrial, new construction, and premium residential electrical across Southwest Houston, the Heights, Bellaire, and the Memorial Villages — greater Houston on a call.
            </p>
          </div>

          {/* Top row — 3 equal cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-3">
            {serviceData.slice(0, 3).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group relative overflow-hidden rounded-md bg-slate-100 aspect-[4/3] flex flex-col justify-end ring-1 ring-slate-200 hover:ring-[var(--onestop-navy-deep)]/20 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_1px_0_rgba(15,40,71,0.04),0_1px_3px_rgba(15,40,71,0.06)] hover:shadow-[0_1px_0_rgba(15,40,71,0.06),0_8px_24px_-8px_rgba(15,40,71,0.22)]">
                <Image src={getServicePreviewImage(s)} alt={s.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 p-5">
                  <h3 className="text-lg font-extrabold text-white tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/60 line-clamp-1">{s.summary.split(' — ')[0]}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-white/40 group-hover:text-[var(--onestop-gold)] transition-colors">
                    See {s.title} <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom row — remaining cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceData.slice(3).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group relative overflow-hidden rounded-md bg-slate-100 aspect-[4/3] flex flex-col justify-end ring-1 ring-slate-200 hover:ring-[var(--onestop-navy-deep)]/20 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_1px_0_rgba(15,40,71,0.04),0_1px_3px_rgba(15,40,71,0.06)] hover:shadow-[0_1px_0_rgba(15,40,71,0.06),0_8px_24px_-8px_rgba(15,40,71,0.22)]">
                <Image src={getServicePreviewImage(s)} alt={s.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 p-5">
                  <h3 className="text-lg font-extrabold text-white tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/60 line-clamp-1">{s.summary.split(' — ')[0]}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-white/40 group-hover:text-[var(--onestop-gold)] transition-colors">
                    See {s.title} <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* View all services CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 font-medium max-w-md">
              Each service has a dedicated page with scope, timelines, code references, and FAQs.
            </p>
            <Link
              href="/services"
              className="btn-solid inline-flex items-center gap-2 bg-[var(--onestop-navy-deep)] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white rounded-md hover:bg-[var(--onestop-red)]"
            >
              View all services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <CarePlanShowcase />

      {/* ═══ SERVICE AREAS — clean professional ═══ */}
      <section className="num-host bg-white py-16 sm:py-24 border-t border-slate-100 overflow-hidden">
        <div className="beam-layer block-anchor block-anchor--orange top-0 right-0 hidden md:block" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }} aria-hidden />
        <div className={shell}>
          <div className="max-w-2xl mb-10 sm:mb-12">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--onestop-red)] mb-3">
              Service Areas
            </div>
            <h2 className="text-[1.85rem] sm:text-[2.4rem] font-bold text-[var(--onestop-navy-deep)] leading-[1.15] tracking-[-0.02em]">
              Serving Southwest Houston, the Heights, Bellaire &amp; the Memorial Villages.
            </h2>
            <p className="mt-4 text-[0.98rem] text-slate-600 leading-[1.7]">
              Licensed Texas commercial &amp; residential electrical contractor based at 13035 S Post Oak Rd Suite I, Houston, TX 77045. Harris and Fort Bend County permits are what we pull day-in, day-out, plus Bellaire, West University, and the six Memorial Villages AHJs. Greater Houston covered on a call.
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
                  className="group rounded-md bg-white ring-1 ring-slate-200 p-6 hover:ring-[var(--onestop-navy-deep)] hover:bg-[var(--onestop-navy-deep)] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_1px_0_rgba(15,40,71,0.04)] hover:shadow-[0_1px_0_rgba(15,40,71,0.08),0_8px_24px_-8px_rgba(15,40,71,0.25)]"
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
              Plus Westbury, Meyerland, West U, Medical Center, Garden Oaks, Hunters Creek, and Spring Valley. Greater Houston covered on a call.
            </p>
            <Link
              href="/locations"
              className="btn-solid inline-flex items-center gap-2 bg-[var(--onestop-navy-deep)] px-5 py-2.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white rounded-md hover:bg-[var(--onestop-red)]"
            >
              All service areas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / WHY US ═══ */}
      <section id="about" className="num-host scroll-mt-20 bg-[var(--onestop-cream)] py-14 sm:py-24 overflow-hidden">
        <span className="num-anchor top-6 -left-6 sm:top-10 sm:-left-10" aria-hidden>02</span>
        <div className="beam-layer beam-diagonal beam-diagonal--orange -bottom-32 -left-32 hidden md:block" aria-hidden />
        <div className="beam-layer bar-rack bar-rack--accent top-20 right-6 sm:right-12 hidden lg:grid" aria-hidden>
          <span /><span /><span /><span /><span /><span />
        </div>
        <div className={shell}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">
            {/* Left — company photo */}
            <div className="relative">
              <div className="aspect-[4/3] flex items-center justify-center overflow-hidden lg:overflow-visible">
                <Image src="/logo/logo_vertical.PNG" alt="Solivance Electric LLC — licensed commercial electrical contractor" width={800} height={800} className="h-full w-auto max-w-full lg:max-w-none object-contain scale-110 sm:scale-110 md:scale-110 lg:scale-[1.5]" priority />
              </div>
            </div>

            {/* Right */}
            <div className="pt-4 lg:pt-0">
              <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
                <span className="h-px w-6 bg-[var(--onestop-gold)]" />
                02 — About
              </div>
              <h2 className="text-3xl font-bold leading-[1.08] text-[var(--onestop-navy-deep)] sm:text-4xl tracking-[-0.03em]">Commercial electrical.<LineBreak />Done right the first time.</h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-600">
                Solivance Electric is a licensed Texas electrical contractor working commercial,
                light-industrial, and premium residential sites. The shop sits at 13035 S Post Oak Rd Suite I, 77045 — Southwest Houston, the Heights, Bellaire, and the Memorial Villages are the daily run.
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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-[var(--onestop-navy)]/12 shadow-[inset_0_-1px_0_rgba(15,40,71,0.04),0_1px_2px_rgba(15,40,71,0.06)]">
                      <item.icon className="h-4 w-4 text-[var(--onestop-navy-deep)]" strokeWidth={1.9} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--onestop-navy-deep)] tracking-[-0.005em]">{item.title}</div>
                      <div className="text-xs text-slate-500 leading-snug mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/about" className="btn-solid inline-flex items-center justify-center gap-2 bg-[var(--onestop-red)] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white rounded-md hover:bg-[#e55f15]">Our Story <ArrowRight className="h-3.5 w-3.5" /></Link>
                <a href={`tel:${cleanPhone}`} className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-xs font-bold text-[var(--onestop-navy-deep)] rounded-md hover:bg-slate-50 transition-colors shadow-[inset_0_0_0_1px_rgba(15,40,71,0.14),0_1px_2px_rgba(15,40,71,0.06)] uppercase tracking-[0.12em]"><Phone className="h-3.5 w-3.5" /> {siteConfig.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS (placeholder when empty) ═══ */}
      <ReviewsSection />

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="num-host scroll-mt-20 bg-white py-16 sm:py-24 overflow-hidden">
        <span className="num-anchor top-8 -right-6 sm:top-12 sm:-right-10" aria-hidden>04</span>
        <div className="beam-layer block-anchor bottom-0 left-0 hidden md:block" aria-hidden />
        <div className="beam-layer top-16 left-8 hidden lg:block" aria-hidden>
          <div className="beam-vertical beam-vertical--accent" style={{ height: '140px' }} />
        </div>
        <div className={`${shell} grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16`}>
          <div>
            <div className="mb-5 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
              <span className="h-px w-6 bg-[var(--onestop-gold)]" />
              04 — FAQ
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
        <CtaBackdrop />

        <div className={`${shell} relative z-10`}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-center">
            {/* Left — CTA copy */}
            <div className="text-white">
              <h2 className="text-2xl font-extrabold sm:text-3xl uppercase tracking-tight">Get a Free Quote</h2>
              <p className="mt-3 text-base text-white/60 max-w-md">Tap through 4 quick questions. We call you right back to lock in a day this week. Emergencies, call now.</p>
              <a href={`tel:${cleanPhone}`} className="mt-6 inline-flex items-center gap-2 text-xl font-extrabold text-white hover:text-white/80 transition-colors">
                <Phone className="h-5 w-5" /> {siteConfig.phone}
              </a>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider text-white/40">
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Licensed &amp; Insured</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 24/7 Emergency</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Free Quotes</span>
              </div>
              <FinancingNote align="left" />
            </div>
            {/* Right — form */}
            <div className="rounded-2xl bg-white p-6 sm:p-8 lg:p-10 shadow-2xl">
              <QuoteQuiz location="home:footer" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
