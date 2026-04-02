import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Patio Covers & Outdoor Construction in Richmond TX',
  description: 'Patio covers, concrete, outdoor kitchens & pergolas in Richmond, Katy, Houston & Sugar Land TX. 15+ years. Licensed & insured. (832) 945-8084.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Patio Covers & Outdoor Construction in Richmond TX',
    description: 'Patio covers, concrete, outdoor kitchens & pergolas in Richmond, Katy, Houston & Sugar Land TX. 15+ years. Licensed & insured.',
    url: 'https://onestopoutdoorconstruction.com',
    images: [{ url: '/hero.png', width: 1200, height: 630, alt: 'One Stop Outdoor Construction — Patio Covers & Outdoor Construction in Richmond TX' }],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
