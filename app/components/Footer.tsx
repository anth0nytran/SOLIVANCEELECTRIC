'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  Shield,
  Clock,
  Building2,
  CheckCircle2,
  Instagram,
  Star,
} from 'lucide-react';
import { siteConfig } from '../config';

const socialLinks = [
  {
    label: 'Google Business Profile',
    href: siteConfig.socials.google,
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M21.35 11.1h-9.17v2.98h5.27c-.23 1.46-1.7 4.28-5.27 4.28-3.17 0-5.76-2.63-5.76-5.86s2.59-5.86 5.76-5.86c1.8 0 3.01.77 3.7 1.43l2.52-2.43C16.83 3.93 14.77 3 12.18 3 7.07 3 2.95 7.12 2.95 12.5S7.07 22 12.18 22c6.67 0 9.17-4.69 9.17-9.06 0-.61-.07-1.08-.17-1.84z" />
      </svg>
    ),
  },
  {
    label: 'Yelp',
    href: siteConfig.socials.yelp,
    icon: <Star className="h-3.5 w-3.5 fill-current" strokeWidth={0} />,
  },
  {
    label: 'Thumbtack',
    href: siteConfig.socials.thumbtack,
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M12 2 4 10l3 3 3-3v6l2 2 2-2v-6l3 3 3-3-8-8z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: siteConfig.socials.instagram,
    icon: <Instagram className="h-3.5 w-3.5" strokeWidth={1.8} />,
  },
];

const footerServices: { slug: string; label: string }[] = [
  { slug: 'panel-upgrades', label: 'Panel Upgrades' },
  { slug: 'generator-installs', label: 'Generator Installs' },
  { slug: 'parking-lot-lighting', label: 'Parking Lot Lighting' },
  { slug: 'ev-chargers', label: 'EV Chargers' },
  { slug: 'commercial-warehouses', label: 'New Commercial Warehouses' },
  { slug: 'home-builds', label: 'New Home Builds' },
  { slug: 'commercial-centers', label: 'Commercial & Shopping Centers' },
  { slug: 'pedestals', label: 'RV Park Pedestals' },
  { slug: 'mobile-home-connections', label: 'Mobile Home Connections' },
];

const companyLinks = [
  { href: '/about', label: 'About Solivance Electric' },
  { href: '/reviews', label: 'Customer Reviews' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact & Free Quote' },
];

const trustBadges = [
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: Clock, label: '24/7 Emergency Service' },
  { icon: CheckCircle2, label: `${siteConfig.yearsInBusiness}+ Years Experience` },
  { icon: Building2, label: 'Commercial & Residential' },
];

const sectionHeading =
  'text-[0.7rem] font-bold uppercase tracking-[0.22em] text-white/45 mb-5';
const linkItem =
  'text-sm text-white/65 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors';
const microLabel =
  'text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/40';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Footer() {
  const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

  return (
    <footer className="bg-[var(--onestop-navy-deep)] text-white">

      {/* MAIN GRID */}
      <div className={`${shell} pt-16 pb-12 sm:pt-20 sm:pb-14`}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="grid gap-12 lg:gap-10 sm:grid-cols-2 lg:grid-cols-12"
        >

          {/* Brand & Contact */}
          <motion.div variants={item} className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="h-8 w-1 rounded-full bg-[var(--onestop-gold)]" aria-hidden />
              <span className="text-lg sm:text-xl font-extrabold tracking-[0.18em] uppercase text-white group-hover:text-[var(--onestop-gold)] transition-colors">
                Solivance Electric <span className="text-white/50 font-bold">LLC</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
              Licensed Texas electrical contractor. Commercial and residential across Southwest Houston, the Heights, Bellaire, and the Memorial Villages. 24-hour line answered by a licensed electrician.
            </p>

            <div className="mt-7 space-y-5">
              <div>
                <div className={`${microLabel} mb-2`}>Office &amp; Shop</div>
                <address className="not-italic text-sm leading-6">
                  <a
                    href={siteConfig.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[var(--onestop-gold)] transition-colors font-semibold"
                  >
                    {siteConfig.address.street}<br />
                    {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                  </a>
                </address>
              </div>

              <div>
                <div className={`${microLabel} mb-2`}>24/7 Emergency Line</div>
                <a
                  href={`tel:${siteConfig.cleanPhone}`}
                  className="text-2xl font-extrabold tracking-tight text-white hover:text-[var(--onestop-gold)] transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-[var(--onestop-red)] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white hover:bg-[#e55f15] transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={item} className="lg:col-span-3">
            <h4 className={sectionHeading}>Services</h4>
            <ul className="space-y-3">
              {footerServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkItem}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Areas */}
          <motion.div variants={item} className="lg:col-span-3">
            <h4 className={sectionHeading}>Service Areas</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {siteConfig.allServiceAreas.map((area) => (
                <li key={area} className="text-sm text-white/65">{area}</li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={item} className="lg:col-span-2">
            <h4 className={sectionHeading}>Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkItem}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Communities sub-line */}
        {siteConfig.neighborhoods && (
          <div className="mt-14 pt-8 border-t border-white/10">
            <div className={`${microLabel} mb-3`}>Communities We Serve</div>
            <p className="text-sm leading-6 text-white/55 max-w-4xl">
              {siteConfig.neighborhoods}
            </p>
          </div>
        )}
      </div>

      {/* TRUST + SOCIAL STRIP */}
      <div className="border-t border-white/10">
        <div className={`${shell} py-6 flex flex-col lg:flex-row items-center justify-between gap-6`}>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <Icon className="h-4 w-4 text-[var(--onestop-gold)]" strokeWidth={2} />
                {label}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={s.label}
                title={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-[var(--onestop-red)] hover:text-white hover:ring-[var(--onestop-red)] transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 bg-black/25">
        <div className={`${shell} py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/45`}>
          <p>&copy; {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-1">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>
              Website by{' '}
              <a
                href="https://quicklaunchweb.us"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                QuickLaunchWeb
              </a>
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}
