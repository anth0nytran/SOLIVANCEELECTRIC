import Image from 'next/image';

/**
 * Houston-at-night photo behind every bottom CTA, with a subtle neutral gradient.
 * Parent section needs `relative isolate overflow-hidden`.
 * Photo: Houston aerial at night, Unsplash (free under the Unsplash License).
 */
export function CtaBackdrop() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <Image src="/photos_new/cta-houston-night.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_60%]" />
      {/* neutral gradient only (no brand tint): darkest at the bottom where it meets the footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/80" />
    </div>
  );
}
