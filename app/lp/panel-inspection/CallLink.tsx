'use client';

import type { ReactNode } from 'react';
import { siteConfig } from '../../config';
import { pushDataLayer } from '../../lib/tracking';

// Click-to-call. Pushes a separate `phone_click` event so calls can be tracked
// as a secondary action — never as the primary lead conversion.
export function CallLink({ location, className, children }: { location: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={`tel:${siteConfig.cleanPhone}`}
      className={className}
      onClick={() => pushDataLayer({ event: 'phone_click', click_location: location })}
    >
      {children}
    </a>
  );
}
