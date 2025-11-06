import { Metadata } from 'next';
import RegionHero from '../components/RegionHero';
import RegionOverview from '../components/RegionOverview';
import RegionSection from '../components/RegionSection';
import RelatedPages from '../components/RelatedPages';
import Header from '../../components/Header';
import { westerosData } from './data';

import { generateSEOMetadata, getCanonicalUrl } from '../../../lib/seo/metadata';
import { generateWebPageSchema } from '../../../lib/seo/structured-data';
import Script from 'next/script';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Game of Thrones Westeros Map - Seven Kingdoms Locations & Geography',
  description: 'Explore the complete Westeros map from Game of Thrones. Discover the Seven Kingdoms, from the frozen North and The Wall to King\'s Landing and Dorne. Interactive map of Westeros locations, houses, and landmarks.',
  keywords: [
    'game of thrones westeros map',
    'map of game of thrones westeros',
    'westeros map',
    'seven kingdoms map',
    'game of thrones 7 kingdoms map'
  ],
  canonicalUrl: getCanonicalUrl('/regions/westeros')
});

export default function WesterosPage() {
  const pageSchema = generateWebPageSchema({
    url: getCanonicalUrl('/regions/westeros'),
    name: 'Westeros Map - Game of Thrones Seven Kingdoms',
    description: 'Explore the complete Westeros map from Game of Thrones featuring the Seven Kingdoms and all major locations.'
  });

  return (
    <>
      <Script id="westeros-page-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(pageSchema)}
      </Script>
      <div className="page-wrapper">
      <Header currentPage="Locations" />

      <main>
        <RegionHero 
          title={westerosData.title}
          subtitle={westerosData.subtitle}
          regionId={westerosData.id}
        />

        <RegionOverview overview={westerosData.overview} />

        {westerosData.sections.map((section) => (
          <RegionSection
            key={section.id}
            section={section}
            regionId={westerosData.id}
          />
        ))}

        <RelatedPages currentRegion={westerosData.id} />
      </main>
    </div>
    </>
  );
}