'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  Phone,
  X,
  ChevronDown,
  ArrowRight,
  MapPin,
  Zap,
  PlugZap,
  Lightbulb,
  Battery,
  Warehouse,
  Cable,
  Home as HomeIcon,
  Hammer,
  Store,
  Info,
  FileText,
  HelpCircle,
  Shield,
  Clock,
} from 'lucide-react';
import { siteConfig, navLinks, type NavChild } from '../config';

const childIconMap: Record<NonNullable<NavChild['icon']>, typeof Zap> = {
  panel: Zap,
  generator: Battery,
  lighting: Lightbulb,
  ev: PlugZap,
  warehouse: Warehouse,
  pedestal: Cable,
  'mobile-home': HomeIcon,
  'home-build': Hammer,
  retail: Store,
  'map-pin': MapPin,
  info: Info,
  phone: Phone,
  help: HelpCircle,
  file: FileText,
};

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
  };
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 40;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const openNow = (key: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpenDropdown(key);
  };
  const closeSoon = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <>
      {/* ═══ ANNOUNCEMENT BAR ═══ */}
      <motion.div
        initial={{ y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[var(--onestop-navy-deep)] text-white"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-3 py-2 text-[0.68rem] sm:text-[0.72rem] font-[family-name:var(--font-app-mono)] uppercase tracking-[0.14em]">
          <div className="hidden sm:flex items-center gap-4 text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-[var(--onestop-gold)]" />
              Licensed TX Contractor
            </span>
            <span className="h-3 w-px bg-white/20" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-[var(--onestop-gold)]" />
              24-Hour Response
            </span>
          </div>
          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            <span className="font-semibold text-white/90">
              Houston · Cypress · Katy · Memorial
            </span>
            <span className="h-3 w-px bg-white/25 hidden sm:inline-block" aria-hidden />
            <a href={`tel:${siteConfig.cleanPhone}`} className="hidden sm:inline-flex items-center gap-1.5 font-bold text-white hover:text-[var(--onestop-gold)] transition-colors duration-200 normal-case tracking-normal">
              <Phone className="h-3 w-3" /> {siteConfig.phone}
            </a>
          </div>
        </div>
      </motion.div>

      {/* ═══ HEADER ═══ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50"
      >
        <div className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-[0_1px_0_rgba(15,40,71,0.08),0_4px_18px_-6px_rgba(15,40,71,0.18)]' : 'shadow-[0_1px_0_rgba(15,40,71,0.08)]'}`}>
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 flex items-center justify-between h-24 sm:h-32">

            {/* Brand */}
            <Link href="/" className="group leading-none relative shrink-0 min-w-[150px] sm:min-w-[250px]">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Image
                  src="/logo/logo_horzontial.PNG"
                  alt="Solivance Electric LLC"
                  width={600}
                  height={400}
                  priority
                  className="h-20 sm:h-28 w-auto scale-125 sm:scale-[1.45] origin-left"
                />
              </motion.div>
            </Link>

            {/* Nav links */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-2 xl:gap-3">
              {navLinks.map((l, i) => {
                const isActive =
                  l.href === '/'
                    ? pathname === '/'
                    : pathname === l.href || pathname.startsWith(l.href + '/');
                const hasChildren = !!l.children?.length;
                const isOpen = openDropdown === l.label;

                if (!hasChildren) {
                  return (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.3 + i * 0.05 }}
                    >
                      <Link
                        href={l.href}
                        className={`relative inline-flex items-center px-4 py-2.5 text-[0.95rem] font-semibold tracking-[-0.005em] rounded-lg transition-all duration-200 group ${
                          isActive
                            ? 'text-[var(--onestop-navy-deep)] bg-[var(--onestop-navy)]/5'
                            : 'text-slate-600 hover:text-[var(--onestop-navy-deep)] hover:bg-[var(--onestop-navy)]/5'
                        }`}
                      >
                        {l.label}
                        <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${isActive ? 'w-6 bg-[var(--onestop-red)]' : 'w-0 bg-[var(--onestop-red)] group-hover:w-6'}`} />
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.05 }}
                    className="relative"
                    onMouseEnter={() => openNow(l.label)}
                    onMouseLeave={closeSoon}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(isOpen ? null : l.label)}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                      className={`relative inline-flex items-center gap-1.5 px-4 py-2.5 text-[0.95rem] font-semibold tracking-[-0.005em] rounded-lg transition-all duration-200 group ${
                        isActive || isOpen
                          ? 'text-[var(--onestop-navy-deep)] bg-[var(--onestop-navy)]/5'
                          : 'text-slate-600 hover:text-[var(--onestop-navy-deep)] hover:bg-[var(--onestop-navy)]/5'
                      }`}
                    >
                      {l.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${isActive ? 'w-6 bg-[var(--onestop-red)]' : 'w-0 bg-[var(--onestop-red)] group-hover:w-6'}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          role="menu"
                          className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 w-[min(92vw,640px)]"
                        >
                          <div className="pointer-events-auto overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_60px_-20px_rgba(15,40,71,0.35)]">
                            <div className="grid grid-cols-[1.35fr_1fr]">
                              <div className="p-3 sm:p-4 bg-white">
                                <div className="mb-2 px-2 flex items-center justify-between">
                                  <span className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-slate-400 font-[family-name:var(--font-app-mono)]">
                                    {l.label}
                                  </span>
                                  <Link
                                    href={l.href}
                                    onClick={() => setOpenDropdown(null)}
                                    className="text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-[var(--onestop-red)] hover:underline inline-flex items-center gap-1"
                                  >
                                    View all
                                    <ArrowRight className="h-3 w-3" />
                                  </Link>
                                </div>
                                <ul className="grid gap-0.5">
                                  {l.children!.map((c) => {
                                    const Icon = c.icon ? childIconMap[c.icon] : Zap;
                                    return (
                                      <li key={c.href}>
                                        <Link
                                          href={c.href}
                                          onClick={() => setOpenDropdown(null)}
                                          className="group/item flex items-start gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-slate-50"
                                        >
                                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--onestop-navy)]/5 text-[var(--onestop-navy-deep)] group-hover/item:bg-[var(--onestop-red)]/10 group-hover/item:text-[var(--onestop-red)] transition-colors">
                                            <Icon className="h-4 w-4" strokeWidth={1.8} />
                                          </span>
                                          <span className="min-w-0 flex-1">
                                            <span className="block text-[0.84rem] font-bold text-[var(--onestop-navy-deep)] leading-snug">
                                              {c.label}
                                            </span>
                                            {c.description && (
                                              <span className="mt-0.5 block text-[0.74rem] text-slate-500 leading-snug">
                                                {c.description}
                                              </span>
                                            )}
                                          </span>
                                          <ArrowRight className="mt-2 h-3.5 w-3.5 text-slate-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all shrink-0" />
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>

                              {l.featured && (
                                <div className="relative bg-[var(--onestop-navy-deep)] p-5 text-white flex flex-col">
                                  <div className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[var(--onestop-gold)] font-[family-name:var(--font-app-mono)] mb-2">
                                    {l.featured.heading}
                                  </div>
                                  <p className="text-[0.82rem] leading-[1.5] text-white/75 mb-4">
                                    {l.featured.body}
                                  </p>
                                  <div className="mt-auto space-y-2">
                                    <Link
                                      href={l.featured.ctaHref}
                                      onClick={() => setOpenDropdown(null)}
                                      className="inline-flex w-full items-center justify-between gap-2 rounded-md bg-[var(--onestop-red)] px-3 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white hover:brightness-110 transition-all"
                                    >
                                      {l.featured.ctaLabel}
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                    <a
                                      href={`tel:${siteConfig.cleanPhone}`}
                                      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/15 px-3 py-2 text-[0.72rem] font-bold text-white hover:bg-white/5 transition-colors font-[family-name:var(--font-app-mono)]"
                                    >
                                      <Phone className="h-3.5 w-3.5" />
                                      {siteConfig.phone}
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </nav>

            {/* Right side — phone + CTA */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="hidden sm:flex items-center gap-3 shrink-0"
            >
              <Link href="/contact" className="btn-solid relative bg-[var(--onestop-red)] px-6 py-3 text-[0.74rem] font-bold uppercase tracking-[0.15em] text-white rounded-md overflow-hidden hover:bg-[#e55f15] group">
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  Free Quote
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>

            {/* Mobile menu toggle */}
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center lg:hidden text-[var(--onestop-navy-deep)]" onClick={() => setMobileMenuOpen((o) => !o)} aria-label="Menu">
              <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-white border-b border-slate-100 lg:hidden"
            >
              <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 flex flex-col gap-1 py-5">
                <nav className="flex flex-col">
                  {navLinks.map((l, i) => {
                    const hasChildren = !!l.children?.length;
                    const expanded = mobileExpanded === l.label;
                    return (
                      <motion.div
                        key={l.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.04 }}
                        className="border-b border-slate-100 last:border-0"
                      >
                        {!hasChildren ? (
                          <Link
                            href={l.href}
                            onClick={closeMobileMenu}
                            className="block py-3.5 text-base font-semibold text-[var(--onestop-navy-deep)] transition-colors hover:text-[var(--onestop-red)]"
                          >
                            {l.label}
                          </Link>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => setMobileExpanded(expanded ? null : l.label)}
                              aria-expanded={expanded}
                              className="flex w-full items-center justify-between py-3.5 text-base font-semibold text-[var(--onestop-navy-deep)]"
                            >
                              {l.label}
                              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence initial={false}>
                              {expanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <ul className="pb-3 pl-1">
                                    <li>
                                      <Link
                                        href={l.href}
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-2 py-2 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-[var(--onestop-red)] font-[family-name:var(--font-app-mono)]"
                                      >
                                        <ArrowRight className="h-3.5 w-3.5" />
                                        All {l.label}
                                      </Link>
                                    </li>
                                    {l.children!.map((c) => {
                                      const Icon = c.icon ? childIconMap[c.icon] : Zap;
                                      return (
                                        <li key={c.href}>
                                          <Link
                                            href={c.href}
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-3 py-2.5 text-[0.88rem] font-semibold text-slate-700 hover:text-[var(--onestop-navy-deep)]"
                                          >
                                            <Icon className="h-4 w-4 text-slate-400" strokeWidth={1.8} />
                                            {c.label}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </nav>
                <div className="mt-4 flex flex-col gap-3">
                  <a href={`tel:${siteConfig.cleanPhone}`} className="flex items-center justify-center gap-2 text-sm font-bold text-[var(--onestop-navy-deep)]">
                    <Phone className="h-4 w-4" /> {siteConfig.phone}
                  </a>
                  <Link href="/contact" onClick={closeMobileMenu} className="block text-center bg-[var(--onestop-red)] py-4 rounded-lg text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[var(--onestop-navy-deep)]">
                    Request Free Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
