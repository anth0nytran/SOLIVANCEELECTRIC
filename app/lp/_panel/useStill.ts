'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// True when the visitor asked for reduced motion. The server can't know that
// setting, so this stays false for the server render and the first client
// render (keeping the HTML identical, no hydration mismatch), then switches to
// the real preference right after mount.
export function useStill(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduce;
}
