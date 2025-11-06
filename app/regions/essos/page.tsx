import { Metadata } from 'next';
import Link from 'next/link';
import RegionHero from '../components/RegionHero';
import RegionOverview from '../components/RegionOverview';
import RegionSection from '../components/RegionSection';
import RelatedPages from '../components/RelatedPages';
import { essosData } from './data';

import { generateSEOMetadata, getCanonicalUrl } from '../../../lib/seo/metadata';
import { generateWebPageSchema } from '../../../lib/seo/structured-data';
import Script from 'next/script';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Game of Thrones Essos Map - Free Cities & Eastern Continent Locations',
  description: 'Explore the complete Essos map from Game of Thrones. Discover the Free Cities, Dothraki Sea, Slaver\'s Bay, and locations like Braavos, Meereen, Qarth, and Volantis. Interactive map of Essos geography.',
  keywords: [
    'game of thrones essos map',
    'map of game of thrones essos',
    'essos map',
    'free cities map',
    'game of thrones map essos'
  ],
  canonicalUrl: getCanonicalUrl('/regions/essos')
});

export default function EssosPage() {
  const pageSchema = generateWebPageSchema({
    url: getCanonicalUrl('/regions/essos'),
    name: 'Essos Map - Game of Thrones Eastern Continent',
    description: 'Explore the complete Essos map from Game of Thrones featuring the Free Cities and all major locations.'
  });

  return (
    <>
      <Script id="essos-page-schema" type="application/ld+json" strategy="beforeInteractive">
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
            <li><Link href="/#interactive-map">Locations</Link></li>
            <li><Link href="/houses">Great Houses</Link></li>
            <li><Link href="/battles">Battles</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <RegionHero 
          title={essosData.title}
          subtitle={essosData.subtitle}
          regionId={essosData.id}
        />

        <RegionOverview overview={essosData.overview} />

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