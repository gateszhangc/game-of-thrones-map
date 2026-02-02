import { Metadata } from 'next';
import RegionHero from '../components/RegionHero';
import RegionOverview from '../components/RegionOverview';
import RegionSection from '../components/RegionSection';
import RelatedPages from '../components/RelatedPages';
import Header from '../../components/Header';
import AffiliateInlineCard from '../../components/AffiliateInlineCard';
import { westerosData } from './data';

import { generateSEOMetadata, getCanonicalUrl } from '../../../lib/seo/metadata';
import { generateWebPageSchema } from '../../../lib/seo/structured-data';
import Script from 'next/script';
import { getKeywordList } from '../../../lib/seo/longTailKeywords';
import { AFFILIATE_COPY } from '../../../lib/affiliate';

const WESTEROS_TITLE = 'Westeros Map | Game of Thrones Seven Kingdoms';
const WESTEROS_DESCRIPTION =
  'Explore the Game of Thrones Westeros map with the map of Game of Thrones Westeros, Seven Kingdoms map, and complete Game of Thrones 7 kingdoms map.';
const WESTEROS_KEYWORDS = getKeywordList(
  [
    'game of thrones westeros map',
    'map of game of thrones westeros',
    'game of thrones 7 kingdoms map'
  ],
  3
);

export const metadata: Metadata = generateSEOMetadata({
  title: WESTEROS_TITLE,
  description: WESTEROS_DESCRIPTION,
  keywords: WESTEROS_KEYWORDS,
  canonicalUrl: getCanonicalUrl('/regions/westeros')
});

export default function WesterosPage() {
  const pageSchema = generateWebPageSchema({
    url: getCanonicalUrl('/regions/westeros'),
    name: WESTEROS_TITLE,
    description: WESTEROS_DESCRIPTION
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

        <AffiliateInlineCard
          title={AFFILIATE_COPY.inlineCard.title}
          description={AFFILIATE_COPY.inlineCard.description}
          ctaLabel={AFFILIATE_COPY.inlineCard.cta}
          placementId="region-inline"
          compact
        />

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
