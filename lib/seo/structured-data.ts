import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from './constants';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * 生成面包屑导航的结构化数据
 * @param items 面包屑项目数组
 * @returns Schema.org BreadcrumbList JSON-LD
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * 生成地点的结构化数据
 * @param place 地点信息
 * @returns Schema.org Place JSON-LD
 */
export function generatePlaceSchema(place: {
  name: string;
  description: string;
  image?: string;
  region: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: place.name,
    description: place.description,
    image: place.image,
    containedInPlace: {
      '@type': 'Place',
      name: place.region
    }
  };
}

/**
 * 生成文章的结构化数据
 * @param article 文章信息
 * @returns Schema.org Article JSON-LD
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author
    },
    image: article.image
  };
}

/**
 * 生成FAQ页面的结构化数据
 * @param faqs FAQ数组
 * @returns Schema.org FAQPage JSON-LD
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * 生成网站的基础结构化数据
 * @returns Schema.org WebSite JSON-LD
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: 'en'
  };
}

/**
 * 生成网页的结构化数据
 * @param page 页面信息
 * @returns Schema.org WebPage JSON-LD
 */
export function generateWebPageSchema(page: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${page.url}/#webpage`,
    url: page.url,
    name: page.name,
    description: page.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` }
  };
}
