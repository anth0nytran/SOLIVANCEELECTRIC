import type { Metadata } from 'next';
import { siteConfig, serviceData } from '../config';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Electrical Services — Panel Upgrades, Generators, Soffit Lighting, EV Chargers · Southwest Houston · Heights · Bellaire · Memorial Villages',
  description:
    'Commercial & residential electrical services across Southwest Houston, the Heights, Bellaire, West University, and the Memorial Villages: panel upgrades through 3-phase switchgear, standby generator installs, LED parking-lot lighting, soffit lighting, Level 2 and DCFC EV chargers, warehouse builds, new home construction, shopping centers, RV park pedestals, mobile home connections. 24/7 emergency. (832) 965-9964.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Electrical Services — Panel Upgrades, Generators, Soffit Lighting, EV Chargers · Southwest Houston · Heights · Bellaire · Memorial Villages',
    description:
      'Panel upgrades, standby generators, LED parking-lot lighting, soffit lighting, EV chargers, warehouse electrical, RV park pedestals, mobile home connections. SW Houston, Heights, Bellaire, Memorial Villages. 24/7 emergency.',
    url: `${siteConfig.domain}/services`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Solivance Electric Services — Southwest Houston' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electrical Services — Panel Upgrades, Generators, EV Chargers · Solivance Electric',
    description: 'Commercial & residential electrical across SW Houston, Heights, Bellaire, Memorial Villages. 24/7 emergency.',
    images: ['/og-image.jpg'],
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
    q: 'How much does a commercial panel upgrade cost in Houston?',
    a: 'A 200A commercial upgrade typically runs $2,500–$8,500 depending on meter location and utility coordination. 400A and 3-phase upgrades run $6,000–$18,000. Every number is a fixed-fee quote after a free site walk — no ballpark over the phone. We pull the Harris County or City of Houston permit and coordinate the CenterPoint cut-over as part of the scope.',
  },
  {
    q: 'How long does a Level 2 or DC fast charger install take?',
    a: 'A single Level 2 charger with available panel capacity is a one-day install. Multi-stall Level 2 deployments or a DC fast charger (Level 3) typically run 3–10 days because of service capacity upgrades, trenching, and utility coordination. We scope the exact window after a site walk and load calc.',
  },
  {
    q: 'Do you pull permits and coordinate the inspection?',
    a: 'Yes. Every job that triggers a permit gets one. We file the application with Harris County or the City of Houston (depending on jurisdiction), meet the inspector for rough-in and final, and coordinate the CenterPoint Energy cut-over. You do not chase paperwork — we do.',
  },
  {
    q: 'Do you handle commercial and industrial, or just residential?',
    a: 'Commercial and light-industrial is the core of what we do — warehouses, retail pads, office parks, medical build-outs, fleet yards, and property-management portfolios. We also take on premium residential work where code compliance and switchgear sizing actually matter.',
  },
  {
    q: 'Do you run a 24-hour emergency line?',
    a: `Yes. Standard hours are 6am–6pm, six days a week. A licensed electrician picks up after hours for emergencies — lost power to a tenant suite, tripped main breaker, burning smell from a panel, smoke from switchgear. Call ${siteConfig.phone} any hour.`,
  },
  {
    q: 'Are you licensed and insured in Texas?',
    a: 'Yes. Solivance Electric LLC is a licensed Texas electrical contractor with active liability insurance on every job. License number and certificate of insurance are available on request before work begins.',
  },
  {
    q: 'Can you size and commission a commercial standby generator?',
    a: 'Yes. Load calc against your actual metered demand, generator sizing (commercial standby typically 22–150 kW), ATS wiring, fuel planning (natural gas or diesel), pad work, and the emissions permit if required. We commission the unit with a live test, document the run, and put the first annual service date on your calendar.',
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
