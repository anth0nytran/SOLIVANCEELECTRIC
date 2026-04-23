import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Commercial Electrical Contractor in Houston TX',
  description: 'Panel upgrades, generator installs, parking lot lighting, EV chargers & commercial electrical services in Houston TX. Licensed & insured. 24hr emergency — (832) 965-9964.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Commercial Electrical Contractor in Houston TX',
    description: 'Panel upgrades, generator installs, parking lot lighting, EV chargers & commercial electrical services in Houston TX. Licensed & insured. 24hr emergency service.',
    url: 'https://solivanceelectric.com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Solivance Electric LLC — Commercial Electrical Contractor in Houston TX' }],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
