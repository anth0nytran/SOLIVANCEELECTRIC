import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us — 15+ Years Serving Richmond & Katy TX',
  description:
    'Family-owned outdoor construction in Richmond, Katy & Houston TX. 15+ years, fully insured. Patio covers, concrete, outdoor kitchens & more. (832) 945-8084.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us — 15+ Years Serving Richmond & Katy TX',
    description:
      'Family-owned outdoor construction in Richmond, Katy & Houston TX. 15+ years, fully insured, locally trusted.',
    url: 'https://onestopoutdoorconstruction.net/about',
    images: [{ url: '/hero.png', width: 1200, height: 630, alt: 'One Stop Outdoor Construction — Richmond, Katy & Houston TX' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us — 15+ Years Serving Richmond & Katy TX',
    description: 'Family-owned outdoor construction in Richmond, Katy & Houston TX. 15+ years, fully insured, locally trusted.',
    images: ['/hero.png'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://onestopoutdoorconstruction.net/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://onestopoutdoorconstruction.net/about' },
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
