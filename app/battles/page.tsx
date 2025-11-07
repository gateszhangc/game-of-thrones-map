import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import BattleCard from './BattleCard';
import Header from '../components/Header';
import { battles } from './data';
import { generateSEOMetadata, getCanonicalUrl } from '../../lib/seo/metadata';
import { generateWebPageSchema } from '../../lib/seo/structured-data';
import { getKeywordList } from '../../lib/seo/longTailKeywords';

export const dynamic = 'force-static';

const BATTLES_TITLE = 'Game of Thrones Battles Map | Historic Battle Guide';
const BATTLES_DESCRIPTION =
  'Discover a Game of Thrones battles map covering game of thrones battle map highlights, historic battles Westeros, and the essential game of thrones war map.';
const BATTLES_KEYWORDS = getKeywordList(
  [
    'game of thrones battles map',
    'game of thrones battle map',
    'historic battles westeros'
  ],
  3
);

export const metadata: Metadata = generateSEOMetadata({
  title: BATTLES_TITLE,
  description: BATTLES_DESCRIPTION,
  keywords: BATTLES_KEYWORDS,
  canonicalUrl: getCanonicalUrl('/battles')
});

export default function BattlesPage() {
  const pageSchema = generateWebPageSchema({
    url: getCanonicalUrl('/battles'),
    name: BATTLES_TITLE,
    description: BATTLES_DESCRIPTION
  });

  return (
    <>
      <Script id="battles-page-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(pageSchema)}
      </Script>
      <div className="page-wrapper">
        <Header currentPage="Battles" />

        <main>
          {/* Hero Section */}
          <section className="battles-hero">
            <div className="battles-hero-content">
              <h1 className="battles-hero-title">Historic Battles of Westeros and Essos</h1>
              <p className="battles-hero-subtitle">Legendary conflicts that shaped the Seven Kingdoms</p>
              <div className="ornament"></div>
            </div>
          </section>

          {/* Battles Grid Section */}
          <section className="battles-grid">
            {battles.map((battle) => (
              <BattleCard key={battle.name} battle={battle} />
            ))}
          </section>

          {/* CTA Section */}
          <section className="battles-cta">
            <div className="cta-buttons">
              <Link href="/locations" className="cta-button">
                Explore Interactive Map
              </Link>
              <Link href="/houses" className="cta-button">
                View Great Houses
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
