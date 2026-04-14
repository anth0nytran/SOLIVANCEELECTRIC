import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from './config';

export const metadata = {
  title: '404 — Page Not Found',
  description: "The page you're looking for doesn't exist. Browse our commercial electrical services or contact Solivance Electric LLC for an estimate.",
};

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

export default function NotFound() {
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
              <li className="font-semibold text-white/70">404</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-extrabold leading-[1.06] text-white sm:text-4xl tracking-tight">
            Page <span className="text-[var(--onestop-gold)]">Not Found</span>
          </h1>
          <p className="mt-3 text-base text-white/50 leading-relaxed max-w-xl">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
      </section>

      {/* ═══ BODY ═══ */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className={shell}>
          <div className="max-w-2xl">
            <p className="eyebrow text-[var(--onestop-gold)] mb-4">
              <span className="inline-block w-6 h-px bg-[var(--onestop-gold)] mr-3" />
              Let&apos;s get you back
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--onestop-navy-deep)] tracking-tight mb-4">
              Looking for Something?
            </h2>

            <p className="text-slate-500 text-base leading-relaxed mb-10">
              We might have moved things around. Check out our services, browse our recent
              projects, or give us a call — we&apos;re happy to help.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[var(--onestop-red)] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#a5311f]"
              >
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border-2 border-[var(--onestop-navy)] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--onestop-navy)] transition-colors hover:bg-[var(--onestop-navy)] hover:text-white"
              >
                Our Services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--onestop-navy-deep)] transition-colors hover:text-[var(--onestop-red)]"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
