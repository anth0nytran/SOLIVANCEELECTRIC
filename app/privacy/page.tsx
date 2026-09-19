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

const LAST_UPDATED = 'September 18, 2026';

export default function PrivacyPage() {
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-[family-name:var(--font-app-mono)] uppercase tracking-[0.18em] text-slate-600">
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
            browser type, and referring URL — through standard server logs. If you
            accept optional cookies, the Site also records aggregate page views,
            page-load performance, and clicks on call, email, and quote buttons through
            Vercel Web Analytics and Speed Insights. That data is aggregated and not used
            to identify individual visitors.
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
            We store quote requests and contact information on secured servers, in
            transactional email via our email provider (Resend), and in our customer
            relationship management system (GoHighLevel), which we use to track and
            follow up on quote requests. These providers process the data on our behalf
            and may not use it for their own marketing. Access is limited
            to personnel who need it to respond to your request. We retain quote
            data for as long as reasonably necessary to deliver the service, maintain
            records, and comply with Texas contractor and tax requirements.
          </p>

          <h2 id="cookies" className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10 scroll-mt-32">5. Cookies and analytics</h2>
          <p>
            When you first visit, the Site asks whether to allow optional cookies and
            tracking. Nothing optional loads until you choose.
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong>Essential (always on):</strong> browser storage that remembers your cookie choice and lets the quote forms work. No advertising or cross-site tracking.</li>
            <li><strong>Analytics (optional):</strong> Vercel Web Analytics and Speed Insights measure aggregate page views and load times. They do not use advertising cookies.</li>
            <li><strong>Maps (optional):</strong> the Google Maps embed on the Contact page is provided by Google and may set Google cookies. It stays off until you load it or accept optional cookies.</li>
          </ul>
          <p>
            You can change your choice any time with the <strong>Cookie Preferences</strong> link
            in the footer of every page. The Site honors the Global Privacy Control (GPC)
            browser signal as a request to decline optional cookies. You can also block
            cookies in your browser settings without breaking the quote forms.
          </p>
          <p>
            We do not sell personal information, and we do not share it for targeted
            advertising.
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
            <li>{siteConfig.address.full}</li>
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
    </div>
  );
}
