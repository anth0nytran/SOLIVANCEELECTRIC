import type { Metadata } from 'next';
import { siteConfig, serviceData } from '../config';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services — Patio Covers, Concrete & More in Richmond TX',
  description:
    'Patio covers, concrete, outdoor kitchens, pergolas, roofing & walkways in Richmond, Katy & Houston TX. 15+ years. Licensed & insured. (832) 945-8084.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services — Patio Covers, Concrete & More in Richmond TX',
    description:
      'Patio covers, concrete, outdoor kitchens, pergolas, roofing & walkways in Richmond, Katy & Houston TX. 15+ years experience.',
    url: 'https://onestopoutdoorconstruction.net/services',
    images: [{ url: '/hero.png', width: 1200, height: 630, alt: 'One Stop Outdoor Construction Services — Richmond, Katy & Houston TX' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — Patio Covers, Concrete & More in Richmond TX',
    description: 'Patio covers, concrete, outdoor kitchens, pergolas, roofing & walkways in Richmond, Katy & Houston TX. 15+ years experience.',
    images: ['/hero.png'],
  },
};

/* ─── Structured Data ─── */
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteConfig.domain,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: `${siteConfig.domain}/services`,
    },
  ],
};

const serviceFaqs = [
  {
    q: 'How much does a patio cover cost in Richmond, TX?',
    a: 'Patio cover costs vary based on the size, materials, and design complexity. A basic aluminum patio cover may start around $3,000, while custom wood or insulated panel covers can range higher. We offer competitive pricing — book a consultation and we\'ll give you an honest quote before any work begins.',
  },
  {
    q: 'How long does a concrete driveway installation take?',
    a: 'Most residential concrete driveway installations in the Richmond, Katy, and Sugar Land area take 3-5 days from start to finish, including prep, pour, and curing time. Larger projects or decorative stamped concrete may take longer. We\'ll give you a clear timeline during your consultation.',
  },
  {
    q: 'Do I need a permit for a patio cover or outdoor kitchen in Richmond?',
    a: 'In most cases, yes — patio covers, outdoor kitchens, and pergolas typically require a building permit in Fort Bend County and surrounding areas. We handle the permitting process for you so you don\'t have to worry about it.',
  },
  {
    q: 'What materials do you use for outdoor kitchens?',
    a: 'We use high-quality, weather-resistant materials including stainless steel appliances, natural stone countertops, and durable masonry or stucco for the base structure. Every outdoor kitchen is custom-designed to fit your space and budget.',
  },
  {
    q: 'Do you offer warranties on your work?',
    a: `Yes — we stand behind every project we complete. Our workmanship warranty covers structural and installation issues. We\'re also licensed and fully insured for your protection. Call us at ${siteConfig.phone} for details.`,
  },
  {
    q: 'What is included in your walkway and paver installation?',
    a: 'Our walkway and paver installation includes site preparation, base material and compaction, paver layout and installation, edge restraints, and joint sand. We handle every step so your outdoor space looks polished and professional from day one.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: serviceFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServicesPageClient services={serviceData} faqs={serviceFaqs} />
    </>
  );
}
