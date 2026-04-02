import type { Metadata } from 'next';
import { siteConfig, serviceData } from '../config';
import GalleryPageClient from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'Our Work — Patio Covers, Concrete & More in Richmond TX',
  description:
    'Real patio cover, concrete, outdoor kitchen & pergola projects by One Stop Outdoor Construction in Richmond, Katy, Houston & Sugar Land TX.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Our Work — Patio Covers, Concrete & More in Richmond TX',
    description: 'Real outdoor construction projects from Richmond, Katy, Houston, Sugar Land & surrounding areas.',
    url: 'https://onestopoutdoorconstruction.com/gallery',
    images: [{ url: '/hero.png', width: 1200, height: 630, alt: 'One Stop Outdoor Construction Project Gallery — Richmond TX' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work — Patio Covers, Concrete & More in Richmond TX',
    description: 'Real outdoor construction projects from Richmond, Katy, Houston, Sugar Land & surrounding areas.',
    images: ['/hero.png'],
  },
};

const cities = ['Richmond', 'Katy', 'Sugar Land', 'Houston', 'Rosenberg'];

const photoProjects = [
  // Patio Cover — new photos
  ...Array.from({ length: 9 }, (_, i) => ({
    service: 'Patio Cover',
    location: cities[i % cities.length],
    src: `/photos_new_web/patio-cover/patio-cover-${i + 1}.jpg`,
  })),
  // Concrete — new photos
  ...Array.from({ length: 8 }, (_, i) => ({
    service: 'Concrete',
    location: cities[i % cities.length],
    src: `/photos_new_web/concrete/concrete-${i + 1}.jpg`,
  })),
  // Outdoor Kitchen — new photos
  ...Array.from({ length: 9 }, (_, i) => ({
    service: 'Outdoor Kitchen',
    location: cities[i % cities.length],
    src: `/photos_new_web/outdoor-kitchen/outdoor-kitchen-${i + 1}.jpg`,
  })),
  // Pergola — existing photos
  { service: 'Pergola', location: 'Sugar Land', src: '/service/IMG_6339.jpeg' },
  { service: 'Pergola', location: 'Houston', src: '/OneStopOutdoor_Photos/photo_14.jpg' },
  { service: 'Pergola', location: 'Richmond', src: '/OneStopOutdoor_Photos/photo_15.jpg' },
  { service: 'Pergola', location: 'Rosenberg', src: '/OneStopOutdoor_Photos/photo_16.jpg' },
];

// Map service slugs to gallery-friendly labels
const slugToService: Record<string, string> = {
  'patio-covers': 'Patio Cover',
  'concrete-driveways': 'Concrete',
  'outdoor-kitchens': 'Outdoor Kitchen',
  'pergolas': 'Pergola',
  'roofing': 'Roofing',
  'walkways-pavers': 'Walkways & Pavers',
};

// Pull video entries from serviceData into the gallery
const videoProjects = serviceData.flatMap((service) =>
  service.media
    .filter((m) => m.type === 'video')
    .map((m, i) => ({
      service: slugToService[service.slug] || service.title,
      location: cities[i % cities.length],
      src: m.src,
    }))
);

// Combine: photos first, then videos
const allProjects = [
  ...photoProjects.map((p) => ({ ...p, type: 'image' as const })),
  ...videoProjects.map((p) => ({ ...p, type: 'video' as const })),
];

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
              { '@type': 'ListItem', position: 2, name: 'Gallery', item: `${siteConfig.domain}/gallery` },
            ],
          }),
        }}
      />
      <GalleryPageClient projects={allProjects} />
    </>
  );
}
