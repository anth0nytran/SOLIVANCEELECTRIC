'use client';

// Google Ads attribution helpers for the paid landing pages (/lp/*).
// Nothing personal goes into the dataLayer or the attribution cookie — only
// click IDs, UTM values and the random submission ID.

const ATTR_COOKIE = 'slv_attr';
const ATTR_DAYS = 90; // Google Ads click-through window
const PARAMS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readAttribution(): Attribution {
  if (typeof document === 'undefined') return {};
  const raw = document.cookie.split('; ').find((c) => c.startsWith(`${ATTR_COOKIE}=`));
  if (!raw) return {};
  try {
    return JSON.parse(decodeURIComponent(raw.slice(ATTR_COOKIE.length + 1))) as Attribution;
  } catch {
    return {};
  }
}

/**
 * Save click IDs / UTMs from the landing URL. A new ad click replaces the old
 * attribution as a set (last paid click wins); a plain revisit keeps it.
 */
export function captureAttribution() {
  const url = new URL(window.location.href);
  const fresh: Attribution = {};
  for (const key of PARAMS) {
    const value = url.searchParams.get(key);
    if (value) fresh[key] = value.slice(0, 200);
  }
  if (!Object.keys(fresh).length) return;
  const isNewClick = !!(fresh.gclid || fresh.gbraid || fresh.wbraid);
  const next = isNewClick ? fresh : { ...readAttribution(), ...fresh };
  const expires = new Date(Date.now() + ATTR_DAYS * 864e5).toUTCString();
  document.cookie = `${ATTR_COOKIE}=${encodeURIComponent(JSON.stringify(next))}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

export function pushDataLayer(event: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/** Random, non-personal ID for one logical form submission. */
export function newSubmissionId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  // RFC 4122 v4 fallback for older browsers.
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}
