import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Header from "./components/Header";
import { generateSEOMetadata, getCanonicalUrl } from "../lib/seo/metadata";
import { generateWebPageSchema } from "../lib/seo/structured-data";
import { SITE_DESCRIPTION, SITE_PRIMARY_TITLE_SUFFIX, SITE_URL } from "../lib/seo/constants";

const HOME_TITLE = `Game of Thrones Map | ${SITE_PRIMARY_TITLE_SUFFIX}`;
const HOME_DESCRIPTION = SITE_DESCRIPTION;

export const metadata: Metadata = generateSEOMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  keywords: [
    "game of thrones map",
    "game of thrones world map",
    "game of thrones interactive map",
    "game of thrones 7 kingdoms map",
    "westeros map",
    "essos map",
    "seven kingdoms map"
  ],
  canonicalUrl: getCanonicalUrl("/")
});


const FEATURE_CARDS = [
  {
    title: "Westeros",
    description: "From the frozen lands beyond The Wall to the deserts of Dorne, explore the Seven Kingdoms.",
    href: "/regions/westeros",
    iconClassName: "westeros-icon",
    ctaLabel: "Explore Westeros"
  },
  {
    title: "Essos",
    description: "Journey through the Free Cities, the Dothraki Sea, and the ancient ruins of Old Valyria.",
    href: "/regions/essos",
    iconClassName: "essos-icon",
    ctaLabel: "Explore Essos"
  },
  {
    title: "Great Houses",
    description: "Learn about the noble houses, their sigils, words, and ancestral seats.",
    href: "/houses",
    iconClassName: "houses-icon",
    ctaLabel: "View Houses"
  },
  {
    title: "Historic Battles",
    description: "Discover the locations of legendary battles that shaped the realm.",
    href: "/battles",
    iconClassName: "battles-icon",
    ctaLabel: "View Battles"
  }
] as const;

const RESOURCE_LINKS = [
  {
    title: "Official HBO Map",
    description: "The official interactive viewer's guide map from HBO.",
    href: "https://viewers-guide.hbo.com/game-of-thrones"
  },
  {
    title: "A Wiki of Ice and Fire",
    description: "Detailed maps and locations from the comprehensive ASOIAF wiki.",
    href: "https://awoiaf.westeros.org/index.php/Portal:Geography"
  },
  {
    title: "Quarter Maester",
    description: "Interactive map showing character journeys throughout the series.",
    href: "https://quartermaester.info/"
  },
  {
    title: "GOT Wiki Maps",
    description: "Collection of maps from the Game of Thrones Wiki.",
    href: "https://gameofthrones.fandom.com/wiki/Category:Maps"
  }
] as const;

export default function Home() {
  const pageSchema = generateWebPageSchema({
    url: SITE_URL,
    name: HOME_TITLE,
    description: HOME_DESCRIPTION
  });

  return (
    <>
      <Script id="home-page-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(pageSchema)}
      </Script>
      <div className="page-wrapper">
        <Header currentPage="Home" />

        <main id="main-content">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-content">
              <h1 id="hero-title">Game of Thrones Map: Explore the World of Ice and Fire</h1>
              <p className="hero-subtitle">Discover the complete Game of Thrones world map featuring the Seven Kingdoms, Westeros, Essos, and the interactive map of all major locations and houses.</p>
              <div className="hero-cta">
                <Link href="/locations" className="cta-button">
                  Explore Map
                </Link>
                <Link href="/houses" className="cta-button secondary">
                  View Houses
                </Link>
              </div>
            </div>

            <div className="scroll-indicator" aria-hidden="true">
              <span className="scroll-text">Scroll to Explore</span>
              <div className="scroll-arrow" />
            </div>
          </section>

          <section className="map-preview-section" aria-labelledby="map-preview-title">
            <div className="section-header">
              <h2 id="map-preview-title">Interactive Map</h2>
              <div className="ornament" aria-hidden="true" />
            </div>
            
            <Link href="/locations" className="map-preview-link">
              <div className="map-preview-container">
                <img 
                  src="/images/map-placeholder.png" 
                  alt="Game of Thrones Interactive Map Preview"
                  className="map-preview-image"
                />
                <div className="map-preview-overlay">
                  <span className="map-preview-text">点击探索完整地图</span>
                  <span className="map-preview-icon">🗺️</span>
                </div>
              </div>
            </Link>
            
            <div className="map-attribution">
              <p>
                Interactive map powered by{' '}
                <a 
                  href="https://quartermaester.info/" 
                  target="_blank" 
                  rel="noopener noreferrer nofollow"
                  className="map-link"
                >
                  Quarter Maester
                </a>
                {' '}• Explore character journeys, locations, and timelines
              </p>
            </div>
          </section>

          <section className="features" aria-labelledby="discover-title">
            <div className="section-header">
              <h2 id="discover-title">Discover the Realm</h2>
              <div className="ornament" aria-hidden="true" />
            </div>

            <div className="feature-grid">
              {FEATURE_CARDS.map((card) => (
                <article key={card.title} className="feature-card">
                  <div className={`feature-icon ${card.iconClassName}`} aria-hidden="true" />
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link href={card.href} className="feature-link">
                    {card.ctaLabel}
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="related-resources" aria-labelledby="resources-title">
            <div className="section-header">
              <h2 id="resources-title">Recommended Resources</h2>
              <div className="ornament" aria-hidden="true" />
            </div>

            <div className="resources-grid">
              {RESOURCE_LINKS.map((resource) => (
                <article key={resource.href} className="resource-card">
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <a href={resource.href} className="resource-link" target="_blank" rel="noopener noreferrer nofollow">
                    Visit Site
                  </a>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
