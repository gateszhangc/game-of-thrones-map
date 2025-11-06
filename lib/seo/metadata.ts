import { Metadata } from 'next';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from './constants';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl: string;
  ogImage?: string;
  noindex?: boolean;
}

/**
 * 生成标准化的SEO元数据
 * @param config SEO配置对象
 * @returns Next.js Metadata对象
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const { 
    title, 
    description, 
    keywords = [], 
    canonicalUrl, 
    ogImage = DEFAULT_OG_IMAGE, 
    noindex = false 
  } = config;
  
  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    },
    robots: noindex ? {
      index: false,
      follow: false
    } : {
      index: true,
      follow: true
    }
  };
}

/**
 * 为页面生成完整的URL
 * @param path 页面路径（如 '/regions/westeros'）
 * @returns 完整的URL
 */
export function getCanonicalUrl(path: string): string {
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
