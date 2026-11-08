import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { Poppins } from 'next/font/google';
import { SizingFlow } from './SizingFlow';

export const metadata: Metadata = {
  title: { absolute: 'What Size Generator Do I Need? Free Estimate | Solivance Electric' },
  description:
    'Two quick questions and see which Briggs & Stratton standby generators fit your Houston home. Free site walk with a licensed electrician to confirm the exact size.',
  alternates: { canonical: '/lp/generator-sizing' },
};

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap' });

// Lead magnet for standby generators. Lives under /lp so it runs without the site
// header/footer (ChromeGate), loads GTM for conversion tracking, and stays noindex.
export default function GeneratorSizingPage() {
  return (
    // Headings use --font-app-display site-wide; point it at Poppins here (same as the panel page).
    <div className={poppins.className} style={{ '--font-app-display': poppins.style.fontFamily } as CSSProperties}>
      <SizingFlow />
    </div>
  );
}
