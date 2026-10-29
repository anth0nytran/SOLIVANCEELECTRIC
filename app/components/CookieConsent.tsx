'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { MarketingAnalytics } from './MarketingAnalytics';
import { onOpenConsentPreferences, openConsentPreferences, setConsent, useConsent } from '../lib/consent';

export function CookieConsent() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  const acceptRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => onOpenConsentPreferences(() => setReopened(true)), []);

  useEffect(() => {
    if (reopened) acceptRef.current?.focus();
  }, [reopened]);

  const visible = consent === null || reopened;

  const choose = (value: 'accepted' | 'declined') => {
    setConsent(value);
    setReopened(false);
  };

  return (
    <>
      {consent === 'accepted' ? (
        <>
          <MarketingAnalytics />
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}

      {visible ? (
        <section
          role="region"
          aria-label="Cookie preferences"
          className="fixed inset-x-0 bottom-0 z-[60] px-2 pb-[calc(env(safe-area-inset-bottom,0px)+8px)] sm:px-6 sm:pb-[calc(env(safe-area-inset-bottom,0px)+12px)]"
        >
          <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-3 shadow-[0_12px_40px_-8px_rgba(15,40,71,0.35)] sm:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
              <div className="flex-1 text-[0.8rem] leading-snug text-slate-700 sm:text-[0.85rem] sm:leading-relaxed">
                <h2 className="mb-1 hidden text-sm font-bold text-[var(--onestop-navy-deep)] sm:block">Cookies on this site</h2>
                <p className="sm:hidden">
                  Optional cookies power analytics and the Google Map. Nothing is sold.{' '}
                  <Link href="/privacy#cookies" className="font-semibold text-[var(--onestop-navy)] underline">
                    Details
                  </Link>
                </p>
                <p className="hidden sm:block">
                  Solivance Electric uses essential storage to run the site and quote forms. With your
                  permission, the site also loads traffic analytics and the Google Maps embed, which may
                  set cookies. Nothing is sold. Details in the{' '}
                  <Link href="/privacy#cookies" className="font-semibold text-[var(--onestop-navy)] underline hover:text-[var(--onestop-red)]">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => choose('declined')}
                  className="min-h-11 flex-1 rounded-md text-balance leading-tight border-2 border-[var(--onestop-navy-deep)] bg-white px-3 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] sm:px-5 sm:text-[0.78rem] sm:tracking-[0.1em] text-[var(--onestop-navy-deep)] transition-colors hover:bg-slate-50"
                >
                  Essential only
                </button>
                <button
                  ref={acceptRef}
                  type="button"
                  onClick={() => choose('accepted')}
                  className="min-h-11 flex-1 rounded-md text-balance leading-tight border-2 border-[var(--onestop-navy-deep)] bg-[var(--onestop-navy-deep)] px-3 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] sm:px-5 sm:text-[0.78rem] sm:tracking-[0.1em] text-white transition-colors hover:bg-[var(--onestop-navy)]"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openConsentPreferences}
      className={className}
    >
      Cookie Preferences
    </button>
  );
}
