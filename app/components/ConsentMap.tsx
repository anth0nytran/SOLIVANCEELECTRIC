'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { siteConfig } from '../config';
import { setConsent, useConsent } from '../lib/consent';

// Google Maps sets third-party cookies, so the embed loads only after consent.
export function ConsentMap() {
  const consent = useConsent();
  const [loadOnce, setLoadOnce] = useState(false);

  if (consent === 'accepted' || loadOnce) {
    return (
      <iframe
        title={`Map: ${siteConfig.businessName}, ${siteConfig.address.full}`}
        src={siteConfig.address.googleMapsEmbedSrc}
        width="100%"
        height="280"
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="flex h-[280px] flex-col items-center justify-center gap-3 px-6 text-center">
      <MapPin className="h-6 w-6 text-[var(--onestop-navy)]" aria-hidden />
      <p className="max-w-xs text-[0.82rem] leading-relaxed text-slate-700">
        The map is provided by Google and may set cookies.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setLoadOnce(true)}
          className="min-h-11 rounded-md bg-[var(--onestop-navy-deep)] px-4 py-2 text-[0.74rem] font-bold uppercase tracking-[0.1em] text-white hover:bg-[var(--onestop-navy)]"
        >
          Load map
        </button>
        <button
          type="button"
          onClick={() => setConsent('accepted')}
          className="min-h-11 rounded-md border border-slate-300 bg-white px-4 py-2 text-[0.74rem] font-bold uppercase tracking-[0.1em] text-[var(--onestop-navy-deep)] hover:bg-slate-50"
        >
          Always allow
        </button>
      </div>
      <a
        href={siteConfig.address.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[0.78rem] font-semibold text-[var(--onestop-navy)] underline"
      >
        Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
