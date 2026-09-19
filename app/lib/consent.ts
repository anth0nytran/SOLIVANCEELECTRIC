'use client';

import { useSyncExternalStore } from 'react';

// Visitor choice for optional (non-essential) cookies and tracking:
// analytics, performance measurement, and third-party embeds (Google Maps).
export type ConsentValue = 'accepted' | 'declined' | null;

const STORAGE_KEY = 'solivance-consent-v1';
const CHANGE_EVENT = 'solivance:consent-change';
const OPEN_EVENT = 'solivance:open-consent';

// Global Privacy Control — browser-level opt-out signal. Treated as "declined".
const hasGpcSignal = () =>
  typeof navigator !== 'undefined' &&
  (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;

export function readConsent(): ConsentValue {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === 'accepted' || value === 'declined') return value;
  } catch {
    // Storage blocked — fall through
  }
  return hasGpcSignal() ? 'declined' : null;
}

export function setConsent(value: Exclude<ConsentValue, null>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked — choice holds for this page view only
  }
  memoryValue = value;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenConsentPreferences(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

let memoryValue: ConsentValue = null;

const subscribe = (callback: () => void) => {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
};

const getSnapshot = (): ConsentValue => readConsent() ?? memoryValue;
const getServerSnapshot = (): ConsentValue | 'unknown' => 'unknown';

/** Returns 'unknown' during SSR / first hydration pass, then the stored choice or null. */
export function useConsent(): ConsentValue | 'unknown' {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const hasAnalyticsConsent = () => getSnapshot() === 'accepted';
