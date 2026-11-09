'use client';

import Link from 'next/link';
import { BadgeDollarSign, Instagram, Mail, MapPin, ShieldCheck, Star } from 'lucide-react';
import { siteConfig } from '../config';
import { CookiePreferencesButton } from './CookieConsent';

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
  { label: 'Yelp', href: siteConfig.socials.yelp, icon: <Star className="h-3.5 w-3.5 fill-current" strokeWidth={0} /> },
  {
    label: 'Thumbtack',
    href: siteConfig.socials.thumbtack,
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M12 2 4 10l3 3 3-3v6l2 2 2-2v-6l3 3 3-3-8-8z" />
      </svg>
    ),
  },
  { label: 'Instagram', href: siteConfig.socials.instagram, icon: <Instagram className="h-3.5 w-3.5" strokeWidth={1.8} /> },
];

const footerServices: { href: string; label: string }[] = [
  { href: '/services/panel-upgrades', label: 'Panel Upgrades' },
  { href: '/services/generator-installs', label: 'Generator Installs' },
  { href: '/services/ev-chargers', label: 'EV Chargers' },
  { href: '/services/parking-lot-lighting', label: 'Parking Lot Lighting' },
  { href: '/services/soffit-lighting', label: 'Soffit Lighting' },
  { href: '/services/commercial-warehouses', label: 'Commercial Warehouses' },
  { href: '/services/home-builds', label: 'New Home Builds' },
  { href: '/services/commercial-centers', label: 'Shopping Centers' },
  { href: '/services/pedestals', label: 'RV Park Pedestals' },
  { href: '/services/mobile-home-connections', label: 'Mobile Home Connections' },
];

const shopLinks = [
  { href: '/generators', label: 'Briggs & Stratton Generators' },
  { href: '/generator-size-calculator', label: 'Generator Size Calculator' },
  { href: '/generators#fortress', label: 'Fortress Liquid-Cooled' },
  { href: '/generators#bs-transfer', label: 'Transfer Switches' },
  { href: '/financing', label: 'Financing' },
  { href: '/care-plans', label: 'Care Plans' },
];

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/locations', label: 'Service Areas' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const heading = 'mb-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/45';
const linkCls = 'text-[0.88rem] text-white/75 hover:text-white transition-colors';

export function Footer() {
  const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';
  const areas = siteConfig.allServiceAreas.map((a) => a.replace(', TX', ''));

  return (
    <footer className="bg-[#0a1424] text-white">
      {/* ── Main grid ── */}
      <div className={`${shell} grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:py-14`}>
        {/* Brand + contact */}
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" className="text-lg font-extrabold uppercase tracking-[0.16em] text-white hover:text-[var(--onestop-gold)] transition-colors">
            Solivance Electric <span className="text-white/40">LLC</span>
          </Link>
          <p className="mt-3 max-w-sm text-[0.88rem] leading-relaxed text-white/60">
            Licensed Texas electrical contractor and authorized Briggs &amp; Stratton generator dealer. Commercial and residential
            across Southwest Houston, the Heights, Bellaire, and the Memorial Villages.
          </p>
          <ul className="mt-6 space-y-3 text-[0.88rem]">
            <li>
              <a href={siteConfig.address.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/80 hover:text-white">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--onestop-gold)]" aria-hidden />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-white/80 hover:text-white break-all">
                <Mail className="h-4 w-4 shrink-0 text-[var(--onestop-gold)]" aria-hidden /> {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-white/80">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--onestop-gold)]" aria-hidden />
              {siteConfig.license.label} · Licensed &amp; insured
            </li>
            <li>
              <Link href="/financing" className="flex items-center gap-3 text-white/80 hover:text-white">
                <BadgeDollarSign className="h-4 w-4 shrink-0 text-[var(--onestop-gold)]" aria-hidden />
                Financing through Synchrony · subject to credit approval
              </Link>
            </li>
          </ul>
          <p className="mt-5 text-[0.78rem] text-white/45">{siteConfig.hours}</p>
        </div>

        {/* Services */}
        <nav aria-label="Services" className="lg:col-span-3">
          <h2 className={heading}>Services</h2>
          <ul className="grid grid-cols-1 gap-y-2.5">
            {footerServices.map((s) => (
              <li key={s.href}><Link href={s.href} className={linkCls}>{s.label}</Link></li>
            ))}
          </ul>
        </nav>

        {/* Shop + company */}
        <div className="grid grid-cols-2 gap-8 sm:col-span-1 lg:col-span-3 lg:grid-cols-1 lg:gap-9">
          <nav aria-label="Generators and financing">
            <h2 className={heading}>Generators</h2>
            <ul className="space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2 className={heading}>Company</h2>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Areas */}
        <div className="sm:col-span-2 lg:col-span-2">
          <h2 className={heading}>Service areas</h2>
          <p className="text-[0.84rem] leading-[1.8] text-white/65">{areas.join(' · ')}</p>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.07]">
        <div className={`${shell} pb-24 pt-6 sm:pb-6`}>
          <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-[0.76rem] text-white/50 md:text-left">
              &copy; {new Date().getFullYear()} {siteConfig.businessName}
              <span className="mx-2 text-white/20" aria-hidden>|</span>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <span className="mx-2 text-white/20" aria-hidden>|</span>
              <Link href="/terms" className="hover:text-white">Terms</Link>
              <span className="mx-2 text-white/20" aria-hidden>|</span>
              <Link href="/accessibility" className="hover:text-white">Accessibility</Link>
              <span className="mx-2 text-white/20" aria-hidden>|</span>
              <CookiePreferencesButton className="hover:text-white" />
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`${s.label} (opens in a new tab)`}
                  title={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/70 hover:bg-[var(--onestop-red)] hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          {/* TDLR consumer notice (required) */}
          <p className="mt-5 text-center text-[0.7rem] leading-[1.6] text-white/40 md:text-left">
            {siteConfig.businessName} · {siteConfig.license.type} {siteConfig.license.label}. Regulated by the{' '}
            {siteConfig.regulator.name}, {siteConfig.regulator.address}, {siteConfig.regulator.phones.join(', ')};{' '}
            <a href={siteConfig.regulator.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/70">
              www.tdlr.texas.gov<span className="sr-only"> (opens in a new tab)</span>
            </a>
            . Verify this license or file a complaint through TDLR. Website by{' '}
            <a href="https://quicklaunchweb.us" target="_blank" rel="noopener noreferrer" className="hover:text-white/70">QuickLaunchWeb</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
