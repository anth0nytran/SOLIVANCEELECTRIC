'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { Battery } from 'lucide-react';

/**
 * Manufacturer product shot through next/image (WebP/AVIF, sized per viewport),
 * with an icon fallback if the file is missing.
 */
export function ProductImage({
  src,
  alt,
  className = '',
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(!src);
  // An image that 404s before hydration never fires React's onError; check it when attached.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div className={`flex items-center justify-center rounded-md bg-slate-100 text-slate-400 ${className}`} aria-hidden>
        <Battery className="h-1/3 max-h-12 w-1/3 max-w-12" strokeWidth={1.3} />
      </div>
    );
  }
  return (
    <div className={`relative ${className}`}>
      <Image ref={ref} src={src} alt={alt} fill sizes={sizes} priority={priority} onError={() => setFailed(true)} className="object-contain" />
    </div>
  );
}
