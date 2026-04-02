import type { Metadata } from 'next';
import { siteConfig } from '../config';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Free Estimate — Contact Us in Richmond, Katy & Houston TX',
  description:
    'Book a free consultation with One Stop Outdoor Construction. Patio covers, concrete & outdoor kitchens in Richmond, Katy & Houston TX. (832) 945-8084.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Free Estimate — Contact Us in Richmond, Katy & Houston TX',
    description:
      'Book your free consultation. Serving Richmond, Katy, Houston, Sugar Land & surrounding areas.',
    url: 'https://onestopoutdoorconstruction.net/contact',
    images: [{ url: '/hero.png', width: 1200, height: 630, alt: 'Contact One Stop Outdoor Construction — Free Estimates' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Estimate — Contact Us in Richmond, Katy & Houston TX',
    description: 'Book your free consultation. Serving Richmond, Katy, Houston, Sugar Land & surrounding areas.',
    images: ['/hero.png'],
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
    q: 'How fast do you respond?',
    a: 'Most consultation requests get a reply within 1-2 hours during business hours (8am-5pm). Call (832) 945-8084 directly for the fastest response.',
  },
  {
    q: 'Is the consultation really free?',
    a: 'Yes — 100% free, zero obligation. We assess the job and give you an honest, upfront price. No hidden fees, no pressure.',
  },
  {
    q: 'What info do you need from me?',
    a: 'Just your phone number and address. That\'s it. We\'ll reach out to schedule a time that works for you.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'We offer flexible options on larger jobs. During your consultation, let us know your budget and we\'ll work with you. We accept cash, checks, and all major credit cards.',
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
