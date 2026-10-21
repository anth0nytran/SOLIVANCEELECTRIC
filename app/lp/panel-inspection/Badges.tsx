import { FileCheck2, ShieldCheck, Star, Umbrella } from 'lucide-react';
import { siteConfig } from '../../config';

// Self-built trust badges. Each one states a fact Solivance actually holds;
// nothing here imitates a third-party seal or certification.

export const GoogleG = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden>
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
  </svg>
);

export const Stars = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <span className="flex gap-0.5" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`${className} fill-[#FBBC04] text-[#FBBC04]`} aria-hidden />
    ))}
  </span>
);

// Google rating card, styled like a review-platform widget but built here.
export function GoogleRatingCard({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-5 rounded-2xl border border-[#E3E6EA] bg-white px-6 py-5 text-left shadow-[0_8px_24px_-12px_rgba(10,19,34,0.18)] ${className}`}>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F4F6F9]">
        <GoogleG className="h-8 w-8" />
      </span>
      <div>
        <p className="text-[0.95rem] font-semibold text-[#3C4043]">Google Reviews</p>
        <div className="mt-1 flex items-center gap-2.5">
          <span className="text-[1.9rem] font-bold leading-none tracking-[-0.02em] text-[#0A1322]">{siteConfig.rating.toFixed(1)}</span>
          <Stars className="h-5 w-5" />
        </div>
        <p className="mt-1.5 text-[0.8rem] text-[#5F6368]">{siteConfig.businessName}, Houston TX</p>
      </div>
    </div>
  );
}

const BADGES = [
  { icon: ShieldCheck, title: 'Texas licensed', detail: siteConfig.license.label },
  { icon: Umbrella, title: 'Fully insured', detail: 'Liability coverage' },
  { icon: FileCheck2, title: 'Permitted work', detail: 'City-inspected' },
];

export function TrustBadges() {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <li className="flex items-center gap-3.5 rounded-xl border border-[#E3E6EA] bg-white px-4 py-4 sm:px-5">
        <GoogleG className="h-8 w-8 shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[1.05rem] font-bold leading-none">{siteConfig.rating.toFixed(1)}</span>
            <Stars className="h-3.5 w-3.5" />
          </div>
          <p className="mt-1 text-[0.8rem] text-[#5F6368]">Google rating</p>
        </div>
      </li>
      {BADGES.map(({ icon: Icon, title, detail }) => (
        <li key={title} className="flex items-center gap-3.5 rounded-xl border border-[#E3E6EA] bg-white px-4 py-4 sm:px-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F3EC]" aria-hidden>
            <Icon className="h-[18px] w-[18px] text-[#1F7A4D]" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="text-[0.95rem] font-semibold leading-tight">{title}</p>
            <p className="mt-1 text-[0.8rem] text-[#5F6368]">{detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
