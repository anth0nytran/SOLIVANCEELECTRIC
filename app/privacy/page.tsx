import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '../config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Solivance Electric LLC collects, uses, and protects the information you submit through our website and SMS program.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'April 16, 2026';

export default function PrivacyPage() {
  return (
    <main className="bg-white py-14 sm:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-[family-name:var(--font-app-mono)] uppercase tracking-[0.18em] text-slate-400">
            <li><Link href="/" className="hover:text-[var(--onestop-navy-deep)] transition-colors">Home</Link></li>
            <li aria-hidden>/</li>
            <li className="text-[var(--onestop-navy-deep)]">Privacy Policy</li>
          </ol>
        </nav>

        <div className="mb-8 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
          <span className="h-px w-6 bg-[var(--onestop-gold)]" />
          Legal
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--onestop-navy-deep)] leading-[1.1] tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

        <section className="prose prose-slate max-w-none mt-10 space-y-6 text-[0.95rem] leading-[1.75] text-slate-600">
          <p>
            Solivance Electric LLC (&quot;Solivance Electric,&quot; &quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;) operates solivanceelectric.com (the &quot;Site&quot;) and provides
            commercial and residential electrical services across Greater Houston.
            This Privacy Policy explains what we collect, how we use it, and the
            choices you have.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">1. Information we collect</h2>
          <p>When you request a quote or contact us, we collect the information you submit — typically:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Service address and ZIP code</li>
            <li>Preferred appointment date and time window</li>
            <li>Service type requested and any project details you choose to share</li>
          </ul>
          <p>
            We also collect limited technical information automatically — IP address,
            browser type, referring URL, and basic analytics events — through server
            logs and Google Analytics (if enabled). Analytics data is aggregated and
            not used to identify individual visitors.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">2. How we use the information</h2>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>To respond to your quote request, schedule a site visit, and follow up on your project.</li>
            <li>To send transactional phone calls, emails, and — if you opt in — SMS text messages related to your inquiry.</li>
            <li>To improve our services, website, and internal processes.</li>
            <li>To comply with legal obligations (permits, tax records, inspection documentation).</li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information. We do not share
            your information with third-party marketers.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">3. SMS text-message program</h2>
          <p>
            If you opt in to SMS text messages from Solivance Electric LLC by checking
            the SMS consent box on any of our forms, you agree to receive text messages
            related to your quote, scheduling, and appointment follow-up.
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong>Message frequency:</strong> Varies based on your conversation, typically 1–5 messages per active quote request.</li>
            <li><strong>Message and data rates may apply.</strong> Standard carrier rates apply — we do not charge for the messages themselves.</li>
            <li><strong>Opt-out:</strong> Reply <strong>STOP</strong> at any time to unsubscribe. You will receive one final confirmation message.</li>
            <li><strong>Help:</strong> Reply <strong>HELP</strong> for assistance, or call {siteConfig.phone}.</li>
            <li><strong>Supported carriers:</strong> AT&amp;T, Verizon, T-Mobile, Sprint, US Cellular, and most other US carriers. Carriers are not liable for delayed or undelivered messages.</li>
            <li><strong>No mobile information is shared with third parties or affiliates for marketing or promotional purposes.</strong> All opt-in data and consent records are held solely by Solivance Electric LLC and the messaging platform we use to deliver your texts.</li>
          </ul>
          <p>
            Consent to receive SMS is not a condition of purchasing services or
            submitting the form. You can still request and receive a quote by phone
            or email without opting in to texts.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">4. How we store and protect information</h2>
          <p>
            We store quote requests and contact information on secured servers and
            in transactional email via our email provider (Resend). Access is limited
            to personnel who need it to respond to your request. We retain quote
            data for as long as reasonably necessary to deliver the service, maintain
            records, and comply with Texas contractor and tax requirements.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">5. Cookies and analytics</h2>
          <p>
            The Site uses minimal cookies required for core functionality. If Google
            Analytics is enabled, it sets cookies to measure aggregate traffic patterns.
            You can disable cookies in your browser settings without breaking any
            quote-request functionality on the Site.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">6. Third-party links</h2>
          <p>
            The Site may link to third-party pages (Google Business Profile, blog
            source references, manufacturer product pages). We are not responsible
            for the content or privacy practices of those sites.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">7. Your rights</h2>
          <p>
            You can request a copy of the personal information we hold about you,
            ask us to correct errors, or ask us to delete your information. Email{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-[var(--onestop-red)] underline">
              {siteConfig.email}
            </a>{' '}
            or call {siteConfig.phone}. We will respond within 30 days.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">8. Children</h2>
          <p>
            The Site is not directed to children under 13. We do not knowingly
            collect information from children under 13.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">9. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The &quot;Last updated&quot;
            date at the top of this page reflects the most recent revision. Material
            changes will be flagged on the Site.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">10. Contact</h2>
          <p>Questions about this policy or your information?</p>
          <ul className="list-none p-0 space-y-1">
            <li><strong>Solivance Electric LLC</strong></li>
            <li>Houston, Texas</li>
            <li>Email: <a href={`mailto:${siteConfig.email}`} className="text-[var(--onestop-red)] underline">{siteConfig.email}</a></li>
            <li>Phone: <a href={`tel:${siteConfig.cleanPhone}`} className="text-[var(--onestop-red)] underline">{siteConfig.phone}</a></li>
          </ul>

          <div className="mt-12 border-t border-slate-200 pt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="font-semibold text-[var(--onestop-navy)] hover:text-[var(--onestop-red)] transition-colors">
              Terms of Service →
            </Link>
            <Link href="/contact" className="font-semibold text-[var(--onestop-navy)] hover:text-[var(--onestop-red)] transition-colors">
              Contact →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
