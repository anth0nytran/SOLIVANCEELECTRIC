import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  Building2,
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

export function Footer() {
  const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

  return (
    <footer className="bg-[var(--onestop-navy-deep)] text-white">

      {/* MAIN GRID */}
      <div className={`${shell} py-16 sm:py-20`}>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* 0. Brand & Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/logo_vertical.PNG"
                alt={siteConfig.businessName}
                width={400}
                height={400}
                className="h-28 sm:h-32 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-white/50 max-w-md leading-relaxed font-medium">
              Licensed Texas electrical contractor covering Houston, Cypress, Katy, Memorial, Sugar Land, Stafford, Missouri City, Magnolia, Conroe, Spring — and surrounding Texas on a call. Commercial, light-industrial, and premium residential. 24-hour line answered by a licensed electrician.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">24/7 Emergency Service Available</div>
                <a href={`tel:${siteConfig.cleanPhone}`} className="text-xl font-extrabold text-white hover:text-white transition-colors">{siteConfig.phone}</a>
              </div>
              <Link href="/contact" className="btn-solid inline-flex items-center justify-center bg-[var(--onestop-red)] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white hover:bg-[#e55f15] rounded-md">
                Get Free Quote
              </Link>
            </div>
          </div>

          {/* 1. Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm text-white/50 font-medium">
              {footerServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-white/30" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Service Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-6">Service Areas</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm text-white/50 font-medium">
              {siteConfig.allServiceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            {siteConfig.neighborhoods && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xs text-white/40 leading-relaxed font-medium">
                  <span className="text-white/50 block mb-2 font-bold uppercase tracking-wider text-[0.7rem]">Communities We Serve</span>
                  {siteConfig.neighborhoods}
                </p>
              </div>
            )}
          </div>

          {/* 3. Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/50 font-medium">
              <li><Link href="/about" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/20" /> About Solivance Electric</Link></li>
              <li><Link href="/reviews" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/20" /> Customer Reviews</Link></li>
              <li><Link href="/blog" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/20" /> Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/20" /> Contact &amp; Free Quote</Link></li>
            </ul>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-4 text-sm text-white/60 font-semibold">
              <div className="flex items-center gap-3"><Shield className="h-4 w-4 text-white/30" />Licensed &amp; Insured</div>
              <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-white/30" />24/7 Emergency Service</div>
              <div className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-white/30" />{siteConfig.yearsInBusiness}+ Years Experience</div>
              <div className="flex items-center gap-3"><Building2 className="h-4 w-4 text-white/30" />Commercial &amp; Residential</div>
            </div>
          </div>

        </div>
      </div>

      {/* SOCIAL ROW */}
      <div className="border-t border-white/10">
        <div className={`${shell} py-5 flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <div className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/40 font-[family-name:var(--font-app-mono)]">
            <span className="h-px w-6 bg-[var(--onestop-gold)]" />
            Find us online
          </div>
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
      <div className="border-t border-white/10 bg-black/20">
        <div className={`${shell} py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-white/30 font-medium tracking-wide`}>
          <p>&copy; {new Date().getFullYear()} {siteConfig.businessName} &mdash; Houston, TX. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-1">
            <Link href="/privacy" className="text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
            <span aria-hidden className="text-white/20">·</span>
            <Link href="/terms" className="text-white/50 hover:text-white transition-colors">Terms of Service</Link>
            <span aria-hidden className="text-white/20">·</span>
            <span>Website by <a href="https://quicklaunchweb.us" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">QuickLaunchWeb</a></span>
          </div>
        </div>
      </div>

    </footer>
  );
}
