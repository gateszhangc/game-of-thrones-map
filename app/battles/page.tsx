import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import BattleCard from './BattleCard';
import Header from '../components/Header';
import { battles } from './data';
import { generateSEOMetadata, getCanonicalUrl } from '../../lib/seo/metadata';
import { generateWebPageSchema } from '../../lib/seo/structured-data';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Game of Thrones Battles Map - Historic Conflicts & Battle Locations',
  description: 'Explore historic battles from Game of Thrones on an interactive map. Discover legendary conflicts like the Battle of the Bastards, Blackwater, and the War of the Five Kings with their locations across Westeros and Essos.',
  keywords: [
    'game of thrones battles',
    'game of thrones battle map',
    'historic battles westeros',
    'game of thrones war map'
  ],
  canonicalUrl: getCanonicalUrl('/battles')
});

export default function BattlesPage() {
  const pageSchema = generateWebPageSchema({
    url: getCanonicalUrl('/battles'),
    name: 'Historic Battles - Game of Thrones Map',
    description: 'Explore historic battles from Game of Thrones and their locations on the map.'
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
            <Link href="/#interactive-map" className="cta-button">
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
