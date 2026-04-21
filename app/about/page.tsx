import type { Metadata } from 'next';
import { siteConfig } from '../config';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Solivance Electric — Licensed Texas Commercial Electrical Contractor',
  description:
    'Licensed Texas commercial electrical contractor covering Southwest Houston, the Heights, Bellaire, and the Memorial Villages. In-house crew — not subcontracted out. Harris County permits pulled, CenterPoint cut-over coordinated, inspections passed on the first walk. 24/7 emergency line.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Solivance Electric — Licensed Texas Commercial Electrical Contractor',
    description:
      'Southwest Houston · Heights · Bellaire · Memorial Villages. Commercial and light-industrial electrical. Panel upgrades, standby generators, EV chargers, parking-lot lighting, warehouse builds. 24/7 emergency.',
    url: `${siteConfig.domain}/about`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'About Solivance Electric LLC — Houston Commercial Electrical Contractor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Solivance Electric — Licensed Texas Electrical Contractor',
    description: 'Southwest Houston, Heights, Bellaire, Memorial Villages. In-house crew. Permits pulled. Inspections passed on the first walk.',
    images: ['/og-image.jpg'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.domain}/` },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${siteConfig.domain}/about` },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutPageClient />
    </>
  );
}
