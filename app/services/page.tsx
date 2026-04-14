import type { Metadata } from 'next';
import { siteConfig, serviceData } from '../config';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Electrical Services — Panel Upgrades, Generators & EV Chargers in Houston TX',
  description:
    'Commercial electrical services in Houston TX: panel upgrades, generator installs, parking lot lighting, EV chargers, warehouse electrical. Licensed & insured. (832) 965-9964.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Electrical Services — Panel Upgrades, Generators & EV Chargers in Houston TX',
    description:
      'Panel upgrades, generators, parking lot lighting, EV chargers, warehouse electrical. Serving Houston, Sugar Land, Richmond & Katy. 24/7 emergency.',
    url: `${siteConfig.domain}/services`,
    images: [{ url: '/placeholder.svg', width: 1200, height: 630, alt: 'Solivance Electric Services — Houston TX' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electrical Services — Panel Upgrades, Generators & EV Chargers in Houston TX',
    description: 'Panel upgrades, generators, parking lot lighting, EV chargers, warehouse electrical. 24/7 emergency.',
    images: ['/placeholder.svg'],
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
    q: 'How much does a panel upgrade cost in Houston, TX?',
    a: 'Panel upgrade costs depend on service size (100A, 200A, 400A+), wire run length, and whether the meter base and grounding need replacement. Most residential 200A upgrades fall in a predictable range; commercial panels vary with switchgear. We provide a transparent, itemized quote before any work begins — no surprises.',
  },
  {
    q: 'How long does an EV charger install take?',
    a: 'A single Level 2 EV charger install is typically completed in one day once materials are on site. DC fast chargers (Level 3) and multi-unit commercial deployments take longer because of service capacity, trenching, and utility coordination. We scope timing precisely during the consultation.',
  },
  {
    q: 'Do you pull permits and coordinate inspections?',
    a: 'Yes — every job that requires a permit gets one. We handle the permit application, the rough-in and final inspections, and any utility coordination so you are not chasing paperwork. It is part of the price, not an add-on.',
  },
  {
    q: 'Do you handle commercial projects, or just residential?',
    a: 'Both, but commercial and industrial are our specialty — warehouses, retail, offices, medical, property management, and fleet facilities. We also take on premium residential work where code compliance and craftsmanship matter.',
  },
  {
    q: 'Do you offer 24-hour emergency electrical service?',
    a: `Yes. Standard hours are 6am–6pm, but we provide 24-hour emergency electrical service across the Houston metro. Call ${siteConfig.phone} any time — we prioritize outages, burning smells, and anything unsafe.`,
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes — Solivance Electric LLC is a fully licensed Texas electrical contractor carrying comprehensive liability insurance. We are happy to provide license and insurance documentation on request.',
  },
  {
    q: 'Can you install a commercial standby generator?',
    a: 'Yes. We size, install, and commission commercial standby generators with automatic transfer switches — including load calculations, fuel planning (natural gas or diesel), pad work, and the permits required. We also offer annual service contracts.',
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
