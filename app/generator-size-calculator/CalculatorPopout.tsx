'use client';

// Pop-out calculator for the public page. Any OpenCalcButton opens it full-screen over
// the page, locked in like the ad landing page: the only way out is the X (which asks
// first). Links that arrive with ?goal=&ac= (blog sizer boxes) open it automatically.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { SizingFlow } from '../lp/generator-sizing/SizingFlow';

const EVENT = 'solivance:open-calc';
type Prefill = { goal?: string; ac?: string };

export function OpenCalcButton({ goal, className, children }: { goal?: string; className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent<Prefill>(EVENT, { detail: { goal } }))}>
      {children}
    </button>
  );
}

export function CalculatorPopout({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [open, setOpen] = useState<Prefill | null>(null);
  const [run, setRun] = useState(0); // fresh funnel each time it opens
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setRun((r) => r + 1);
      setOpen((e as CustomEvent<Prefill>).detail || {});
    };
    window.addEventListener(EVENT, onOpen);
    const q = new URLSearchParams(window.location.search);
    if (q.get('goal')) setOpen({ goal: q.get('goal') || undefined, ac: q.get('ac') || undefined });
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div ref={box} role="dialog" aria-modal="true" aria-label="Houston generator size calculator" className={`fixed inset-0 z-[90] overflow-y-auto overscroll-contain bg-[#F5F6F8] ${className ?? ''}`} style={style}>
      <SizingFlow key={run} variant="lp" initial={open} onExit={() => setOpen(null)} scrollEl={() => box.current} />
    </div>,
    document.body,
  );
}
