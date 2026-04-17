import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '../config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of the Solivance Electric LLC website, quote-request forms, and SMS program.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'April 16, 2026';

export default function TermsPage() {
  return (
    <main className="bg-white py-14 sm:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-[family-name:var(--font-app-mono)] uppercase tracking-[0.18em] text-slate-400">
            <li><Link href="/" className="hover:text-[var(--onestop-navy-deep)] transition-colors">Home</Link></li>
            <li aria-hidden>/</li>
            <li className="text-[var(--onestop-navy-deep)]">Terms of Service</li>
          </ol>
        </nav>

        <div className="mb-8 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--onestop-navy)]">
          <span className="h-px w-6 bg-[var(--onestop-gold)]" />
          Legal
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--onestop-navy-deep)] leading-[1.1] tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

        <section className="prose prose-slate max-w-none mt-10 space-y-6 text-[0.95rem] leading-[1.75] text-slate-600">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of
            solivanceelectric.com (the &quot;Site&quot;) and the quote-request,
            email, and SMS programs operated by Solivance Electric LLC
            (&quot;Solivance Electric,&quot; &quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;). By using the Site or submitting a form, you agree to
            these Terms.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">1. The Site is informational</h2>
          <p>
            Content on the Site — service descriptions, cost ranges, timeline
            estimates, code references, and blog articles — is provided for general
            informational purposes. Nothing on the Site constitutes a binding quote,
            a contract, or an electrical engineering stamp. Pricing and scope are
            confirmed only after a site visit and a written, signed proposal from
            Solivance Electric LLC.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">2. Quote requests</h2>
          <p>
            Submitting a form does not create a service contract. It authorizes
            Solivance Electric to contact you by phone, email, and — if you opt in
            — SMS, to gather additional information and deliver an itemized quote.
            You are free to accept, modify, or decline any quote we provide.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">3. SMS text-message program</h2>
          <p>
            If you check the SMS consent box on a form, you agree to receive SMS
            text messages from Solivance Electric LLC related to your quote,
            scheduling, and follow-up. By opting in you confirm that:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>You are the authorized user or account holder of the mobile number you provided.</li>
            <li>You are 18 years of age or older, or have the consent of a parent or legal guardian.</li>
            <li>You understand message frequency varies (typically 1–5 messages per active quote request).</li>
            <li>You understand that message and data rates may apply based on your carrier plan.</li>
            <li>You can reply <strong>STOP</strong> at any time to cancel messages, and <strong>HELP</strong> for help.</li>
          </ul>
          <p>
            Carriers are not liable for delayed or undelivered messages. SMS consent
            is optional and is not required to purchase or receive services. Full
            detail is in our{' '}
            <Link href="/privacy" className="text-[var(--onestop-red)] underline">Privacy Policy</Link>.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">4. Emergency service</h2>
          <p>
            We operate a 24-hour emergency line. However, if you are experiencing a
            fire, smoke, visible arcing, or any immediate life-safety electrical
            hazard, call 911 before you call us. The Site and its forms are not
            monitored in real time and must not be used to report emergencies.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">5. Licensing and jurisdiction</h2>
          <p>
            Solivance Electric LLC is a licensed Texas electrical contractor
            operating in the Greater Houston metro. License and certificate of
            insurance are available on request. All work performed is governed by
            Texas law, the 2023 National Electrical Code as adopted by the Texas
            Department of Licensing and Regulation, and the requirements of the
            local Authority Having Jurisdiction (AHJ).
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">6. Intellectual property</h2>
          <p>
            The Site, including all copy, photos, logos, illustrations, and design
            elements, is the property of Solivance Electric LLC or its licensors.
            You may not copy, reproduce, or redistribute content from the Site
            without written permission, except for fair-use quotation with
            attribution and a link back to the source page.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">7. Prohibited uses</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Submit false, impersonated, or fraudulent information.</li>
            <li>Use the Site or its forms to transmit spam, malware, or scraping tools.</li>
            <li>Harass, threaten, or abuse Solivance Electric staff or subcontractors.</li>
            <li>Violate any applicable local, state, or federal law.</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">8. Disclaimer of warranties</h2>
          <p>
            The Site is provided &quot;as is.&quot; We make no warranty that Site
            content is error-free, up-to-date at every moment, or fit for a
            particular purpose. Technical specifications, code citations, and cost
            ranges are representative and must be confirmed on-site for any specific
            project.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">9. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Solivance Electric LLC is not
            liable for indirect, incidental, consequential, or punitive damages
            arising out of your use of the Site or reliance on Site content outside
            of a signed service contract. Any direct liability is capped at the
            greater of $100 or the amount actually paid to us under the specific
            service contract in dispute.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">10. Governing law</h2>
          <p>
            These Terms are governed by the laws of the State of Texas, without
            regard to conflict-of-laws rules. Any dispute arising from the Site or
            a service contract is subject to the exclusive jurisdiction of the
            state and federal courts located in Harris County, Texas.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">11. Changes to these Terms</h2>
          <p>
            We may revise these Terms from time to time. The &quot;Last updated&quot;
            date at the top reflects the most recent revision. Your continued use of
            the Site after a revision constitutes acceptance of the updated Terms.
          </p>

          <h2 className="text-xl font-bold text-[var(--onestop-navy-deep)] mt-10">12. Contact</h2>
          <ul className="list-none p-0 space-y-1">
            <li><strong>Solivance Electric LLC</strong></li>
            <li>Houston, Texas</li>
            <li>Email: <a href={`mailto:${siteConfig.email}`} className="text-[var(--onestop-red)] underline">{siteConfig.email}</a></li>
            <li>Phone: <a href={`tel:${siteConfig.cleanPhone}`} className="text-[var(--onestop-red)] underline">{siteConfig.phone}</a></li>
          </ul>

          <div className="mt-12 border-t border-slate-200 pt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="font-semibold text-[var(--onestop-navy)] hover:text-[var(--onestop-red)] transition-colors">
              Privacy Policy →
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
