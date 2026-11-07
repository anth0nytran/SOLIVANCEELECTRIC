'use client';

import { useEffect, useRef, useState } from 'react';

/** Sticky product-line navigator. Highlights the line in view and keeps the active chip scrolled into view. */
export function LineNav({ items }: { items: { id: string; label: string; count: number }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const chip = rail.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (chip && rail.current) {
      const r = rail.current;
      r.scrollTo({ left: chip.offsetLeft - r.clientWidth / 2 + chip.clientWidth / 2, behavior: 'smooth' });
    }
  }, [active]);

  return (
    <nav aria-label="Product lines" className="sticky top-20 sm:top-28 lg:top-32 z-30 border-y border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="relative mx-auto w-full max-w-7xl">
        <div
          ref={rail}
          className="flex gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((i) => {
            const on = i.id === active;
            return (
              <a
                key={i.id}
                data-id={i.id}
                href={`#${i.id}`}
                aria-current={on ? 'true' : undefined}
                className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-[0.98rem] font-semibold transition-colors ${
                  on
                    ? 'border-[var(--onestop-navy-deep)] bg-[var(--onestop-navy-deep)] text-white'
                    : 'border-slate-300 text-slate-800 hover:border-[var(--onestop-navy-deep)]'
                }`}
              >
                {i.label}
                <span className={`rounded-full px-2 text-[0.82rem] font-bold ${on ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {i.count}
                </span>
              </a>
            );
          })}
        </div>
        {/* fade edges hint that the rail scrolls on small screens */}
        <span className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white lg:hidden" aria-hidden />
      </div>
    </nav>
  );
}
