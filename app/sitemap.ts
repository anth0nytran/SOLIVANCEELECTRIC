import { MetadataRoute } from 'next';
import { getPublishedPosts } from './blog/posts';
import { serviceData } from './config';
import { locationContent, locationOrder, locationImage } from './locations/locationContent';

const BASE_URL = 'https://solivanceelectric.com';

// Re-render hourly so scheduled blog posts enter the sitemap on their publish date.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0, images: [`${BASE_URL}/photos_new/hero.jpg`, `${BASE_URL}/photos_new/cta-footer.jpg`] },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/generators`, lastModified: now, changeFrequency: 'weekly', priority: 0.95, images: [`${BASE_URL}/photos_new/generator-installs.jpg`] },
    { url: `${BASE_URL}/financing`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/locations`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/accessibility`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
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
    images: [`${BASE_URL}${locationImage(locationContent[slug])}`],
  }));

  const blogPages: MetadataRoute.Sitemap = getPublishedPosts().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T12:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...locationPages, ...blogPages];
}
