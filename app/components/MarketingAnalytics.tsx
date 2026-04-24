'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

type EventValue = string | number | boolean | null;
type EventProperties = Record<string, EventValue>;

const MAX_VALUE_LENGTH = 240;

const cleanValue = (value: unknown): EventValue => {
  if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
    return value;
  }

  const text = String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();

  return text.length > MAX_VALUE_LENGTH ? text.slice(0, MAX_VALUE_LENGTH) : text;
};

export const trackMarketingEvent = (name: string, properties: EventProperties = {}) => {
  const safeProperties = Object.fromEntries(
    Object.entries(properties)
      .slice(0, 2)
      .map(([key, value]) => [key, cleanValue(value)])
  );

  try {
    track(name, safeProperties);
  } catch {
    // Analytics should never block navigation, calls, or lead capture.
  }
};

const getLinkText = (link: HTMLAnchorElement) => {
  const label = link.getAttribute('aria-label') || link.textContent || link.title || 'link';
  return cleanValue(label);
};

const getPlacement = (link: HTMLAnchorElement) => {
  const explicit = link.closest<HTMLElement>('[data-analytics-source]')?.dataset.analyticsSource;
  if (explicit) return cleanValue(explicit);

  const section = link.closest<HTMLElement>('section[id]');
  if (section?.id) return cleanValue(section.id);

  if (link.closest('header')) return 'header';
  if (link.closest('footer')) return 'footer';

  return typeof window === 'undefined' ? 'unknown' : cleanValue(window.location.pathname || '/');
};

const getInternalDestination = (url: URL) => {
  const path = url.pathname.replace(/\/$/, '') || '/';

  if (path.startsWith('/services/')) return `service:${path.split('/').pop()}`;
  if (path === '/services') return 'services:index';
  if (path.startsWith('/locations/')) return `location:${path.split('/').pop()}`;
  if (path === '/locations') return 'locations:index';
  if (path === '/contact') return url.hash === '#form' ? 'contact:form' : 'contact';
  if (url.hash === '#form' || url.hash === '#hero-form') return 'quote-form';

  return path;
};

export function MarketingAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;

      const rawHref = link.getAttribute('href');
      if (!rawHref) return;

      const source = getPlacement(link);
      const label = getLinkText(link);

      if (rawHref.startsWith('tel:')) {
        trackMarketingEvent('Phone Click', { source, label });
        return;
      }

      if (rawHref.startsWith('mailto:')) {
        trackMarketingEvent('Email Click', { source, label });
        return;
      }

      let url: URL;
      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      const isExternal = url.origin !== window.location.origin;
      if (isExternal) {
        trackMarketingEvent('Outbound Link Click', {
          source,
          destination: url.hostname.replace(/^www\./, ''),
        });
        return;
      }

      const destination = getInternalDestination(url);
      if (destination === 'contact' || destination === 'contact:form' || destination === 'quote-form') {
        trackMarketingEvent('Quote CTA Click', { source, destination });
        return;
      }

      if (destination.startsWith('service:') || destination === 'services:index') {
        trackMarketingEvent('Service Click', { source, destination });
        return;
      }

      if (destination.startsWith('location:') || destination === 'locations:index') {
        trackMarketingEvent('Location Click', { source, destination });
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return null;
}
