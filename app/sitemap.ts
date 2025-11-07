import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  
  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/regions/westeros`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/regions/essos`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/houses`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/battles`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Location pages
  const locationPages = [
    {
      url: `${SITE_URL}/locations`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Note: /houses-simple is a redirect page with robots: { index: false }, not included in sitemap
  // Future pages (keep commented):
  // FAQ page: /faq
  // City pages: /locations/kings-landing, /locations/dragonstone, /locations/qarth, /locations/volantis, /locations/oldtown
  // Special pages: /regions/the-north, /regions/the-wall, /regions/valyria

  return [...staticPages, ...locationPages];
}
