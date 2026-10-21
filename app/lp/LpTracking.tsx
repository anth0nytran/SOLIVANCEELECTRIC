'use client';

import { useEffect } from 'react';
import { readConsent } from '../lib/consent';
import { captureAttribution, pushDataLayer } from '../lib/tracking';

// gtag() must push its `arguments` object (not an array) for GTM to read it.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  pushDataLayer(arguments as unknown as Record<string, unknown>);
}

// Saves gclid/gbraid/wbraid/UTMs on arrival and mirrors cookie-banner choices
// into Google Consent Mode.
export function LpTracking() {
  useEffect(() => {
    captureAttribution();

    const onConsentChange = () => {
      const v = readConsent() === 'declined' ? 'denied' : 'granted';
      gtag('consent', 'update', { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
    };
    window.addEventListener('solivance:consent-change', onConsentChange);
    return () => window.removeEventListener('solivance:consent-change', onConsentChange);
  }, []);

  return null;
}
