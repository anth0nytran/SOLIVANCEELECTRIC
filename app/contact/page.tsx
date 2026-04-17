import type { Metadata } from 'next';
import { siteConfig } from '../config';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Solivance Electric — Fixed-Fee Quotes · Houston · Cypress · Katy · Memorial',
  description:
    'Licensed Texas electrical contractor. Walk a site free, fixed-fee quote in 24 hours. Panel upgrades, standby generators, EV chargers, parking-lot lighting, warehouse electrical. 24/7 emergency line. (832) 965-9964.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Solivance Electric — Fixed-Fee Quotes · Greater Houston',
    description:
      'Fixed-fee quote in 24 hours. Serving Houston, Cypress, Katy, Memorial. 24/7 emergency line answered by a licensed electrician.',
    url: `${siteConfig.domain}/contact`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Contact Solivance Electric LLC — Fixed-Fee Quotes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Solivance Electric — Fixed-Fee Quotes · Greater Houston',
    description: 'Fixed-fee quote in 24 hours. Houston, Cypress, Katy, Memorial. 24/7 emergency.',
    images: ['/og-image.jpg'],
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
    q: 'How fast will Solivance Electric respond to my quote request?',
    a: `Most written quote requests get a reply inside 24 hours. Emergency calls are routed to a licensed electrician on the 24-hour line — ${siteConfig.phone} — any hour, any day.`,
  },
  {
    q: 'Is the consultation and site walk really free?',
    a: 'Yes — free, zero obligation. We walk the site, check service capacity, pull a load calc if the scope needs one, and hand back a fixed-fee, itemized number. No hidden fees, no signed agreement required to get the quote.',
  },
  {
    q: 'What information do you need to quote a commercial job?',
    a: 'Name, phone, service address, and one or two sentences on the scope. For commercial work, existing single-line diagrams or a meter/panel photo speed up the pricing. Everything else we gather on the walk.',
  },
  {
    q: 'Do you run a 24-hour emergency electrical line?',
    a: `Yes. Outages, tripped main breakers, burning smells, smoke from a panel, a feeder melted at the lug — call ${siteConfig.phone} any hour. A licensed electrician picks up, not a scheduler.`,
  },
  {
    q: 'Do you offer milestone billing on larger commercial jobs?',
    a: 'Yes. Warehouse builds, multi-stall EV deployments, full switchgear replacements — we structure the invoice in milestones (mobilization, rough-in, trim, commissioning) so your cash flow matches the work on the ground. Tell us the budget shape in the consultation and we build the proposal around it.',
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
