import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ConversionClaim } from './ConversionClaim';
import { siteConfig } from '../../../config';
import { CallLink } from '../../_panel/CallLink';

export const metadata: Metadata = {
  title: 'Request received',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] bg-white px-4 py-16 text-center">
      <Suspense fallback={null}>
        <ConversionClaim />
      </Suspense>
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-bold uppercase tracking-wider text-[var(--onestop-red)]">Request received</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl">You&apos;re all set. We&apos;ll call you shortly.</h1>
        <p className="mt-4 text-lg text-slate-700">
          Keep your phone nearby — the call comes from {siteConfig.phone}. We&apos;ll confirm a time for your free panel safety check.
        </p>
        <p className="mt-6 rounded-lg bg-orange-50 p-4 text-left text-slate-800">
          <strong>Until then:</strong> please don&apos;t open your panel. If you smell burning, hear buzzing, or the panel feels hot, call us right
          away.
        </p>
        <CallLink
          location="thank_you"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-[var(--onestop-navy-deep)] px-6 py-4 font-bold text-white"
        >
          Call {siteConfig.phone}
        </CallLink>
      </div>
    </div>
  );
}
