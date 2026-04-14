'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  ChevronDown,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Expand,
} from 'lucide-react';
import { siteConfig, type ServiceItem } from '../config';
import { useState, useRef, useCallback, useEffect } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function FaqAccordion({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--onestop-navy)]"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="text-base font-bold text-[var(--onestop-navy-deep)] sm:text-lg">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[var(--onestop-gold)] transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Fullscreen Lightbox ── */
function MediaLightbox({
  media,
  startIndex,
  title,
  onClose,
}: {
  media: ServiceItem['media'];
  startIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const item = media[index];

  const prev = useCallback(() => setIndex((i) => (i - 1 + media.length) % media.length), [media.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % media.length), [media.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-sm" onClick={onClose}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
        <span className="text-sm font-semibold text-white/60">
          {title} &mdash; {index + 1} / {media.length}
        </span>
        <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-all">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main content */}
      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-16" onClick={(e) => e.stopPropagation()}>
        {/* Prev/Next */}
        <button type="button" onClick={prev} className="absolute left-2 sm:left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button type="button" onClick={next} className="absolute right-2 sm:right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Media */}
        <div className="relative w-full max-w-5xl max-h-[75vh] flex items-center justify-center">
          {item.type === 'video' ? (
            <video
              key={item.src}
              src={item.src}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] max-w-full rounded-lg"
            />
          ) : (
            <div className="relative inline-block max-h-[75vh] max-w-full">
              <img
                key={item.src}
                src={item.src}
                alt={`${title} ${index + 1}`}
                className="max-h-[75vh] max-w-full rounded-lg object-contain"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 overflow-x-auto [&::-webkit-scrollbar]:hidden" onClick={(e) => e.stopPropagation()}>
        {media.map((m, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
              i === index ? 'border-[var(--onestop-gold)] scale-110' : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            {m.type === 'video' ? (
              <>
                <video src={m.src} preload="metadata" muted playsInline className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white drop-shadow" />
                </div>
              </>
            ) : (
              <Image src={m.src} alt={`${title} photo ${i + 1}`} fill sizes="64px" className="object-cover" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Service Media Gallery ── */
function MediaCarouselPlayer({ service }: { service: ServiceItem }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const videoPoster = service.media.find((item) => item.type === 'image')?.src;

  // Show first item as featured, rest as thumbnail grid
  const featured = service.media[0];
  const thumbnails = service.media.slice(1);
  const maxThumbs = 5;
  const visibleThumbs = thumbnails.slice(0, maxThumbs);
  const remaining = thumbnails.length - maxThumbs;

  return (
    <div className="w-full lg:[direction:ltr]">
      {/* Featured item */}
      <div
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-lg cursor-pointer"
        onClick={() => setLightboxIndex(0)}
      >
        {featured.type === 'video' ? (
          <video
            src={featured.src}
            controls
            playsInline
            preload="metadata"
            poster={videoPoster}
            className="absolute inset-0 h-full w-full object-cover"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <Image
            src={featured.src}
            alt={`${service.title} featured`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
           
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        )}
        <button
          type="button"
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-all"
          onClick={() => setLightboxIndex(0)}
          aria-label="View fullscreen"
        >
          <Expand className="h-4 w-4" />
        </button>
        {/* Turnaround badge */}
        <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-[var(--onestop-navy-deep)] px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-white shadow-xl pointer-events-none">
          <Clock className="h-3 w-3 text-[var(--onestop-gold)]" />
          {service.turnaround}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div ref={thumbRef} className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
        {visibleThumbs.map((item, i) => {
          const actualIndex = i + 1;
          const isLast = i === maxThumbs - 1 && remaining > 0;

          return (
            <button
              key={actualIndex}
              type="button"
              onClick={() => setLightboxIndex(actualIndex)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-slate-200 cursor-pointer hover:ring-2 hover:ring-[var(--onestop-gold)] transition-all"
            >
              {item.type === 'video' ? (
                <>
                  <video src={item.src} preload="metadata" muted playsInline className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="h-5 w-5 text-white drop-shadow group-hover:scale-110 transition-all" />
                  </div>
                </>
              ) : (
                <Image
                  src={item.src}
                  alt={`${service.title} ${actualIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 20vw, 10vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              {/* "+N more" overlay on last thumb */}
              {isLast && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-sm font-bold text-white">+{remaining + 1}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <MediaLightbox
          media={service.media}
          startIndex={lightboxIndex}
          title={service.title}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

export default function ServicesPageClient({
  services,
  faqs,
}: {
  services: ServiceItem[];
  faqs: FaqItem[];
}) {
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
              <li className="font-semibold text-white/70">Services</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-[1.08]">
            Our Electrical Services
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/50 max-w-xl">
            Panel upgrades, generators, parking lot lighting, EV chargers, warehouse
            electrical, pedestals &amp; mobile home connections. Licensed commercial
            electricians serving Houston, Sugar Land, Richmond, Katy &amp; surrounding areas.
          </p>

          {/* Quick-nav pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:border-white/30 hover:text-white transition-all"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICE SECTIONS ═══ */}
      {services.map((service, idx) => {
        const isEven = idx % 2 === 0;
        const bgClass = isEven ? 'bg-white' : 'bg-[var(--onestop-cream)]';

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`${bgClass} scroll-mt-20 py-14 sm:py-24 lg:py-28`}
          >
            <div className={shell}>
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  idx % 2 !== 0 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Media Carousel Wrapper */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className="w-full"
                >
                  <MediaCarouselPlayer service={service} />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  transition={{ duration: 0.45, delay: 0.08 }}
                  className="lg:[direction:ltr]"
                >
                  <h2 className="text-2xl font-extrabold tracking-tight text-[var(--onestop-navy-deep)] sm:text-3xl lg:text-4xl">
                    {service.title}
                  </h2>

                  <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-[1.05rem]">
                    {service.longDescription}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-slate-500 sm:text-base">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--onestop-navy)]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:brightness-110 transition-all active:scale-[0.98] whitespace-nowrap"
                    >
                      Free Quote <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={`tel:${siteConfig.cleanPhone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--onestop-navy-deep)]/15 px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-[var(--onestop-navy-deep)] hover:bg-[var(--onestop-navy-deep)]/5 transition-all whitespace-nowrap"
                    >
                      <Phone className="h-4 w-4" /> Call Now
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══ MID-PAGE CTA ═══ */}
      <section className="relative isolate overflow-hidden bg-[var(--onestop-navy-deep)] py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--onestop-navy-deep)]/90 to-transparent" />

        <div className={`${shell} relative z-10`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl leading-tight">
              Ready to Start Your Project?
            </h2>
            <p className="mt-5 text-base text-white/50 max-w-lg mx-auto leading-relaxed">
              Every project starts with a free, no-pressure quote. Call us or fill out the form — 24/7 for emergencies.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all whitespace-nowrap"
              >
                Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/5 transition-all whitespace-nowrap"
              >
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-white/30">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Licensed &amp; Insured</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> 24/7 Emergency</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="bg-white py-14 sm:py-24">
        <div className={shell}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl lg:text-4xl">
              Our Process
            </h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '01', title: 'Free Consultation', desc: 'We visit your property, evaluate the electrical scope, and discuss options at no cost.' },
              { step: '02', title: 'Custom Proposal', desc: 'You receive a detailed, itemized quote with code notes, timeline, and permit plan.' },
              { step: '03', title: 'Licensed Install', desc: 'Our licensed crew handles installation with clean runs, proper labeling, and minimal downtime.' },
              { step: '04', title: 'Final Walkthrough & Inspection', desc: 'We pass inspection, walk the job with you, and hand off clean documentation.' },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--onestop-navy-deep)] text-lg font-extrabold text-white">
                  {item.step}
                </div>
                <h3 className="mt-5 text-base font-bold text-[var(--onestop-navy-deep)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-[var(--onestop-cream)] py-14 sm:py-24">
        <div className={shell}>
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="lg:sticky lg:top-32"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--onestop-navy-deep)] sm:text-3xl lg:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-base text-slate-500 max-w-sm leading-relaxed">
                Don&apos;t see your question? We&apos;re happy to help — just give us a call.
              </p>
              <a href={`tel:${siteConfig.cleanPhone}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--onestop-navy-deep)] hover:text-[var(--onestop-gold)] transition-colors">
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
            </motion.div>

            <div>
              {faqs.map((faq, i) => (
                <FaqAccordion key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/40" />

        <div className={`${shell} relative z-10`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl leading-tight">
                Ready to get started? Call us today.
              </h2>
              <p className="mt-3 text-base text-white/50">
                Premium electrical work, done right. Licensed, insured &amp; 24/7 emergency service.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all whitespace-nowrap"
              >
                Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/5 transition-all whitespace-nowrap"
              >
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
