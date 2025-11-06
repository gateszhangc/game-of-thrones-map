import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  
  // 静态页面
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

  // 未来将添加的页面（暂时注释，等创建后取消注释）
  const futurePages = [
    // FAQ页面
    // {
    //   url: `${SITE_URL}/faq`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.7,
    // },
    
    // 城市页面
    // {
    //   url: `${SITE_URL}/locations/kings-landing`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.7,
    // },
    // {
    //   url: `${SITE_URL}/locations/dragonstone`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.6,
    // },
    // {
    //   url: `${SITE_URL}/locations/qarth`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.6,
    // },
    // {
    //   url: `${SITE_URL}/locations/volantis`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.6,
    // },
    // {
    //   url: `${SITE_URL}/locations/oldtown`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.6,
    // },
    
    // 专题页面
    // {
    //   url: `${SITE_URL}/regions/the-north`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.7,
    // },
    // {
    //   url: `${SITE_URL}/regions/the-wall`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.7,
    // },
    // {
    //   url: `${SITE_URL}/regions/valyria`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.7,
    // },
  ];

  return [...staticPages];
}
