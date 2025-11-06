import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import HouseCard from './HouseCard';
import { houses } from './data';
import { generateSEOMetadata, getCanonicalUrl } from '../../lib/seo/metadata';
import { generateWebPageSchema } from '../../lib/seo/structured-data';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Game of Thrones Houses Map - Great Houses of Westeros & Their Locations',
  description: 'Explore the Great Houses of Westeros on the Game of Thrones map. Discover noble families like Stark, Lannister, Targaryen, and Baratheon with their sigils, words, and ancestral seats mapped across the Seven Kingdoms.',
  keywords: [
    'game of thrones houses map',
    'game of thrones map with houses',
    'great houses westeros',
    'game of thrones map and houses',
    'map of houses in game of thrones'
  ],
  canonicalUrl: getCanonicalUrl('/houses')
});

export default function HousesPage() {
  const pageSchema = generateWebPageSchema({
    url: getCanonicalUrl('/houses'),
    name: 'Great Houses of Westeros - Game of Thrones Map',
    description: 'Explore the Great Houses of Westeros and their locations on the Game of Thrones map.'
  });

  return (
    <>
      <Script id="houses-page-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(pageSchema)}
      </Script>
      <div className="page-wrapper">
      <header className="main-header">
        <nav>
          <div className="logo">
            <Link href="/">
              <span className="logo-text">Game of Thrones</span>
              <span className="logo-subtext">Map</span>
            </Link>
          </div>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/">Locations</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="houses-hero">
          <div className="houses-hero-content">
            <h1 className="houses-hero-title">The Great Houses of Westeros</h1>
            <p className="houses-hero-subtitle">Noble families that shaped the Seven Kingdoms</p>
            <div className="ornament"></div>
          </div>
        </section>

        {/* Houses Grid Section */}
        <section className="houses-grid">
          {houses.map((house) => (
            <HouseCard key={house.name} house={house} />
          ))}
        </section>

        {/* CTA Section */}
        <section className="houses-cta">
          <div className="cta-buttons">
            <Link href="/#interactive-map" className="cta-button">
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