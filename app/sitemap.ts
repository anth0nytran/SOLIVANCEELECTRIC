import { MetadataRoute } from 'next';
import { getAllSlugs } from './blog/posts';
import { serviceData } from './config';
import { locationOrder } from './locations/locationContent';

const BASE_URL = 'https://solivanceelectric.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0, images: [`${BASE_URL}/photos_new/hero.jpg`, `${BASE_URL}/photos_new/cta-footer.jpg`] },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/locations`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceData.map((s) => {
    const serviceImages = s.media
      .filter((m) => m.type === 'image')
      .map((m) => `${BASE_URL}${m.src}`);
    return {
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      images: serviceImages.length ? serviceImages : undefined,
    };
  });

  const locationPages: MetadataRoute.Sitemap = locationOrder.map((slug) => ({
    url: `${BASE_URL}/locations/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    images: [`${BASE_URL}/photos_new/${slug}.jpg`],
  }));

  const blogPages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...locationPages, ...blogPages];
}
