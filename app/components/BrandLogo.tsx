'use client';

import { useCallback, useState } from 'react';

/* eslint-disable @next/next/no-img-element -- small partner logos; client fallback needs a plain img */

/**
 * Partner logo with a typeset fallback, so a missing or blocked file never
 * shows a broken-image icon.
 */
export function BrandLogo({
  src,
  name,
  className = 'h-5',
  fallbackClassName = '',
}: {
  src: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  // Catches a logo that failed before hydration (React's onError misses those).
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) {
    return (
      <span className={`inline-flex items-center whitespace-nowrap font-extrabold tracking-tight leading-none ${fallbackClassName}`}>
        {name}
      </span>
    );
  }
  return (
    <img
      ref={ref}
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} w-auto max-w-full object-contain`}
    />
  );
}
