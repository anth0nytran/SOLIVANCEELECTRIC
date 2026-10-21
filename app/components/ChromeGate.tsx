'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Paid landing pages (/lp/*) run without the site header, footer, mobile bar
// and intro video: one page, one offer, no exits.
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/lp')) return null;
  return <>{children}</>;
}
