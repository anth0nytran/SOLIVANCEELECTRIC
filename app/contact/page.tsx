import type { Metadata } from 'next';
import { siteConfig } from '../config';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Solivance Electric — Free Quote in Houston, Sugar Land & Katy',
  description:
    'Contact Solivance Electric LLC for a free electrical quote. Panel upgrades, generators, EV chargers, parking lot lighting & commercial electrical. 24/7 emergency. (832) 965-9964.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Solivance Electric — Free Quote in Houston, Sugar Land & Katy',
    description:
      'Get a free quote for commercial or residential electrical work. Serving Houston, Sugar Land, Richmond, Katy & Pearland. 24/7 emergency.',
    url: `${siteConfig.domain}/contact`,
    images: [{ url: '/placeholder.svg', width: 1200, height: 630, alt: 'Contact Solivance Electric LLC — Free Quotes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Solivance Electric — Free Quote in Houston, Sugar Land & Katy',
    description: 'Get a free quote. Serving Houston, Sugar Land, Richmond, Katy & Pearland. 24/7 emergency.',
    images: ['/placeholder.svg'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteConfig.domain}/contact` },
  ],
};

const contactFaqs = [
  {
    q: 'How fast do you respond to quote requests?',
    a: `Most quote requests receive a reply within 24 hours. For urgent or emergency electrical issues, call ${siteConfig.phone} directly — we run 24/7 emergency response.`,
  },
  {
    q: 'Is the consultation really free?',
    a: 'Yes — 100% free, zero obligation. We evaluate the electrical scope, pull load calcs if needed, and provide a transparent, itemized quote. No hidden fees, no pressure.',
  },
  {
    q: 'What info do you need from me to quote a job?',
    a: 'For most jobs we need your name, phone, service address, and a short description of the electrical work. For commercial scopes, a site visit or existing electrical drawings speed things up.',
  },
  {
    q: 'Do you offer 24-hour emergency electrical service?',
    a: `Yes. Solivance Electric provides 24/7 emergency service for outages, tripped commercial panels, burning smells, and anything unsafe. Call ${siteConfig.phone} any time, day or night.`,
  },
  {
    q: 'Do you offer payment plans for large commercial jobs?',
    a: 'For larger commercial scopes (warehouse builds, multi-charger EV deployments, full panel replacements), we offer flexible milestone-based billing. Tell us your budget during the consultation and we will structure the proposal around it.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: contactFaqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function ContactPage() {
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
      <ContactPageClient faqs={contactFaqs} />
    </>
  );
}
