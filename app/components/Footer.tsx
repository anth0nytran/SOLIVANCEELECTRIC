import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  Building2,
} from 'lucide-react';
import { siteConfig } from '../config';

const footerServices: { slug: string; label: string }[] = [
  { slug: 'panel-upgrades', label: 'Panel Upgrades' },
  { slug: 'generator-installs', label: 'Generator Installs' },
  { slug: 'parking-lot-lighting', label: 'Parking Lot Lighting' },
  { slug: 'ev-chargers', label: 'EV Chargers' },
  { slug: 'commercial-warehouses', label: 'New Commercial Warehouses' },
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
              Licensed Texas electrical contractor covering Houston, Cypress, Katy, Memorial and the surrounding Harris and Fort Bend metro. Commercial, light-industrial, and premium residential. 24-hour emergency line answered by a licensed electrician.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">24/7 Emergency Service Available</div>
                <a href={`tel:${siteConfig.cleanPhone}`} className="text-xl font-extrabold text-white hover:text-white transition-colors">{siteConfig.phone}</a>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center bg-[var(--onestop-red)] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white hover:brightness-110 transition-all rounded-lg">
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
              <li><Link href="/#reviews" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/20" /> Customer Reviews</Link></li>
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
