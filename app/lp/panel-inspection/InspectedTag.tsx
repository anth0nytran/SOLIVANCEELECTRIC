// Signature element: a nod to the fluorescent green inspection tag the city
// leaves on a panel that passes — Solivance's own label, not a copy of the
// city's tag (no seal, no official wording). Stamps on once at page load.

import { siteConfig } from '../../config';

export function InspectedTag({ className = '' }: { className?: string }) {
  return (
    <div
      className={`lp-tag w-[212px] rotate-[-5deg] rounded-[5px] bg-[#B8F03C] px-4 pb-4 pt-3 text-[#13290A] shadow-[0_14px_30px_-12px_rgba(14,34,64,0.55)] ${className}`}
      aria-label="Permitted, inspected and passed on every Solivance panel job"
    >
      <div className="mx-auto mb-2 h-2.5 w-2.5 rounded-full bg-[#13290A]/25 ring-1 ring-[#13290A]/20" aria-hidden />
      <p className="font-[family-name:var(--font-app-display)] text-[1.55rem] font-bold leading-[1.02] tracking-[-0.01em]">
        Permitted.
        <br />
        Inspected.
        <br />
        Passed.
      </p>
      <div className="mt-3 border-t border-dashed border-[#13290A]/35 pt-2 text-[0.78rem] leading-snug">
        Every Solivance panel job
        <br />
        Texas license {siteConfig.license.number}
      </div>
    </div>
  );
}
