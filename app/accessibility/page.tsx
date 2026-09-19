import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '../config';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description:
    'Solivance Electric LLC commits to WCAG 2.1 Level AA on solivanceelectric.com. How to report an accessibility barrier and get help by phone or email.',
  alternates: { canonical: '/accessibility' },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'September 18, 2026';

export default function AccessibilityPage() {
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-[family-name:var(--font-app-mono)] uppercase tracking-[0.18em] text-slate-600">
            <li><Link href="/" className="hover:text-[var(--onestop-navy-deep)] transition-colors">Home</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-[var(--onestop-navy-deep)]">Accessibility</li>
          </ol>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--onestop-navy-deep)] leading-[1.1] tracking-tight">
          Accessibility Statement
        </h1>
        <p className="mt-3 text-sm text-slate-600">Last updated: {LAST_UPDATED}</p>

        <section className="mt-10 space-y-6 text-[0.95rem] leading-[1.75] text-slate-700">
          <p>
            {siteConfig.businessName} wants every visitor to be able to read about our
            services, request a quote, and reach our office — including people who use
            screen readers, keyboard navigation, magnification, or voice control.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">Our standard</h2>
          <p>
            solivanceelectric.com targets the Web Content Accessibility Guidelines (WCAG)
            2.1, Level AA. Measures in place today:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>A &quot;Skip to main content&quot; link at the top of every page.</li>
            <li>All navigation menus, forms, and buttons work with a keyboard, with a visible focus outline.</li>
            <li>Form fields carry programmatic labels, and required fields are marked.</li>
            <li>Images carry text alternatives; decorative icons are hidden from screen readers.</li>
            <li>Text and background colors are chosen to meet contrast minimums.</li>
            <li>Animation is reduced when your device requests reduced motion, and the intro video can be skipped with the Escape key.</li>
            <li>Links that open a new tab are announced to screen readers.</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">Known limitations</h2>
          <p>
            Some third-party content — the Google Maps embed and links to review sites
            such as Google, Yelp, and Thumbtack — is controlled by those providers and
            may not fully meet WCAG 2.1 AA. The address, directions link, and reviews
            summary on this site give the same information in accessible form.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">Report a barrier or get help</h2>
          <p>
            If any part of this site is hard to use, tell us. We will provide the
            information or take your quote request another way, and we aim to respond
            within 2 business days.
          </p>
          <ul className="list-none p-0 space-y-1">
            <li>Phone: <a href={`tel:${siteConfig.cleanPhone}`} className="text-[var(--onestop-navy)] font-semibold underline">{siteConfig.phone}</a></li>
            <li>Email: <a href={`mailto:${siteConfig.email}`} className="text-[var(--onestop-navy)] font-semibold underline">{siteConfig.email}</a></li>
            <li>Mail: {siteConfig.businessName}, {siteConfig.address.full}</li>
          </ul>
          <p>
            Please include the page address and a short description of the problem.
          </p>

          <div className="mt-12 border-t border-slate-200 pt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="font-semibold text-[var(--onestop-navy)] hover:text-[var(--onestop-red)] transition-colors">
              Privacy Policy →
            </Link>
            <Link href="/terms" className="font-semibold text-[var(--onestop-navy)] hover:text-[var(--onestop-red)] transition-colors">
              Terms of Service →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
