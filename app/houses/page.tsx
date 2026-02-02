import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import HouseCard from './HouseCard';
import Header from '../components/Header';
import AffiliateInlineCard from '../components/AffiliateInlineCard';
import { houses } from './data';
import { generateSEOMetadata, getCanonicalUrl } from '../../lib/seo/metadata';
import { generateWebPageSchema } from '../../lib/seo/structured-data';
import { getKeywordList } from '../../lib/seo/longTailKeywords';
import { AFFILIATE_COPY } from '../../lib/affiliate';

export const dynamic = 'force-static';

const HOUSES_TITLE = 'Game of Thrones Houses Map | Westeros Great Houses';
const HOUSES_DESCRIPTION =
  'Explore a Game of Thrones houses map highlighting Game of Thrones map with houses, great houses Westeros, and the full map of houses in Game of Thrones.';
const HOUSES_KEYWORDS = getKeywordList(
  [
    'game of thrones houses map',
    'game of thrones map with houses',
    'map of houses in game of thrones'
  ],
  3
);

export const metadata: Metadata = generateSEOMetadata({
  title: HOUSES_TITLE,
  description: HOUSES_DESCRIPTION,
  keywords: HOUSES_KEYWORDS,
  canonicalUrl: getCanonicalUrl('/houses')
});

export default function HousesPage() {
  const pageSchema = generateWebPageSchema({
    url: getCanonicalUrl('/houses'),
    name: HOUSES_TITLE,
    description: HOUSES_DESCRIPTION
  });

  return (
    <>
      <Script id="houses-page-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(pageSchema)}
      </Script>
      <div className="page-wrapper">
        <Header currentPage="Great Houses" />

        <main>
          {/* Hero Section */}
          <section className="houses-hero">
            <div className="houses-hero-content">
              <h1 className="houses-hero-title">The Great Houses of Westeros</h1>
              <p className="houses-hero-subtitle">Noble families that shaped the Seven Kingdoms</p>
              <div className="ornament"></div>
            </div>
          </section>

          <AffiliateInlineCard
            title={AFFILIATE_COPY.supportCard.title}
            description={AFFILIATE_COPY.supportCard.description}
            ctaLabel={AFFILIATE_COPY.supportCard.cta}
            placementId="content-inline"
            compact
          />

          {/* Houses Grid Section */}
          <section className="houses-grid">
            {houses.map((house) => (
              <HouseCard key={house.name} house={house} />
            ))}
          </section>

          {/* CTA Section */}
          <section className="houses-cta">
            <div className="cta-buttons">
              <Link href="/locations" className="cta-button">
                Explore Interactive Map
              </Link>
              <Link href="/battles" className="cta-button">
                View Historic Battles
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
