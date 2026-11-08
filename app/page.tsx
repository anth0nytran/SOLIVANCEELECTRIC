import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

// The brand name was missing from the home page title. Search Console showed 2,859
// impressions for "solivance" with a 0.1% click rate: people searching the company by
// name weren't sure the result was it. Brand first, then the service + city.
export const metadata: Metadata = {
  title: { absolute: 'Solivance Electric | Houston Commercial & Residential Electrician' },
  description: 'Solivance Electric LLC is a licensed Houston electrician (TECL #41163) on S Post Oak Rd. Panel upgrades, standby generators, parking lot lighting, EV chargers. 24hr emergency: (832) 965-9964.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Solivance Electric | Houston Commercial & Residential Electrician',
    description: 'Panel upgrades, generator installs, parking lot lighting, EV chargers & commercial electrical services in Houston TX. Licensed & insured. 24hr emergency service.',
    url: 'https://solivanceelectric.com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Solivance Electric LLC — Commercial Electrical Contractor in Houston TX' }],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
