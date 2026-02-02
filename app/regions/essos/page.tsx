import { Metadata } from 'next';
import RegionHero from '../components/RegionHero';
import RegionOverview from '../components/RegionOverview';
import RegionSection from '../components/RegionSection';
import RelatedPages from '../components/RelatedPages';
import Header from '../../components/Header';
import AffiliateInlineCard from '../../components/AffiliateInlineCard';
import { essosData } from './data';

import { generateSEOMetadata, getCanonicalUrl } from '../../../lib/seo/metadata';
import { generateWebPageSchema } from '../../../lib/seo/structured-data';
import Script from 'next/script';
import { getKeywordList } from '../../../lib/seo/longTailKeywords';
import { AFFILIATE_COPY } from '../../../lib/affiliate';

const ESSOS_TITLE = 'Essos Map | Game of Thrones Free Cities';
const ESSOS_DESCRIPTION =
  'Explore the Game of Thrones Essos map covering map of Game of Thrones Essos, Free Cities map, and the broader Game of Thrones map Essos.';
const ESSOS_KEYWORDS = getKeywordList(
  [
    'game of thrones essos map',
    'map of game of thrones essos',
    'free cities map'
  ],
  3
);

export const metadata: Metadata = generateSEOMetadata({
  title: ESSOS_TITLE,
  description: ESSOS_DESCRIPTION,
  keywords: ESSOS_KEYWORDS,
  canonicalUrl: getCanonicalUrl('/regions/essos')
});

export default function EssosPage() {
  const pageSchema = generateWebPageSchema({
    url: getCanonicalUrl('/regions/essos'),
    name: ESSOS_TITLE,
    description: ESSOS_DESCRIPTION
  });

  return (
    <>
      <Script id="essos-page-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(pageSchema)}
      </Script>
      <div className="page-wrapper">
      <Header currentPage="Locations" />

      <main>
        <RegionHero 
          title={essosData.title}
          subtitle={essosData.subtitle}
          regionId={essosData.id}
        />

        <RegionOverview overview={essosData.overview} />

        <AffiliateInlineCard
          title={AFFILIATE_COPY.inlineCard.title}
          description={AFFILIATE_COPY.inlineCard.description}
          ctaLabel={AFFILIATE_COPY.inlineCard.cta}
          placementId="region-inline"
          compact
        />

        {essosData.sections.map((section) => (
          <RegionSection
            key={section.id}
            section={section}
            regionId={essosData.id}
          />
        ))}

        <RelatedPages currentRegion={essosData.id} />
      </main>
    </div>
    </>
  );
}
