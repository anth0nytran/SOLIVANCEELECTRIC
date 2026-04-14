import type { Metadata } from 'next';
import { siteConfig } from '../config';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Solivance Electric — Commercial Electrician in Houston TX',
  description:
    'Solivance Electric LLC — licensed commercial electrical contractor serving Houston, Sugar Land, Richmond & Katy. Panel upgrades, generators, EV chargers. 24/7 emergency.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Solivance Electric — Commercial Electrician in Houston TX',
    description:
      'Licensed commercial electrical contractor in Houston TX. Panel upgrades, generators, parking lot lighting, EV chargers. 24/7 emergency service.',
    url: `${siteConfig.domain}/about`,
    images: [{ url: '/placeholder.svg', width: 1200, height: 630, alt: 'Solivance Electric LLC — Commercial Electrician in Houston TX' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Solivance Electric — Commercial Electrician in Houston TX',
    description: 'Licensed commercial electrical contractor serving Houston, Sugar Land, Richmond & Katy.',
    images: ['/placeholder.svg'],
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
