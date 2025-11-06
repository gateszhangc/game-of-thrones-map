import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Header from "./components/Header";
import ScrollButton from "./components/ScrollButton";
import { generateSEOMetadata, getCanonicalUrl } from "../lib/seo/metadata";
import { generateWebPageSchema } from "../lib/seo/structured-data";
import { SITE_URL } from "../lib/seo/constants";

export const metadata: Metadata = generateSEOMetadata({
  title: "Game of Thrones Map - Interactive World Map of Westeros & Essos",
  description: "Explore the complete Game of Thrones map featuring the Seven Kingdoms, Westeros, Essos, and all major locations. Interactive map with houses, battles, and character journeys.",
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


const MAP_CONTROLS = [
  { region: "westeros", label: "Westeros" },
  { region: "essos", label: "Essos" },
  { region: "north", label: "The North" }
] as const;

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

const QUICK_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" }
] as const;

const SOCIAL_LINKS = [
  { label: "Game of Thrones on X", href: "https://x.com/GameOfThrones", iconClassName: "twitter" },
  { label: "Game of Thrones on Facebook", href: "https://www.facebook.com/GameOfThrones", iconClassName: "facebook" },
  { label: "Game of Thrones on Instagram", href: "https://www.instagram.com/gameofthrones", iconClassName: "instagram" }
] as const;

const CONTACT_EMAIL = "hello@thegameofthronesmap.com";
const CURRENT_YEAR = new Date().getFullYear();

export default function Home() {
  const pageSchema = generateWebPageSchema({
    url: SITE_URL,
    name: "Game of Thrones Map - Interactive World Map",
    description: "Explore the complete Game of Thrones map featuring the Seven Kingdoms, Westeros, Essos, and all major locations."
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
                <ScrollButton targetId="interactive-map" className="cta-button">
                  Explore Map
                </ScrollButton>
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

          <section id="interactive-map" className="interactive-map-section" aria-labelledby="interactive-map-title">
            <div className="section-header">
              <h2 id="interactive-map-title">Interactive Map</h2>
              <div className="ornament" aria-hidden="true" />
            </div>

            <div className="map-container">
              <iframe 
                // src="about:blank"
                src="https://quartermaester.info/"
                className="got-map-iframe"
                title="Game of Thrones Interactive Map - Character Journeys and Locations"
                loading="lazy"
                allow="fullscreen"
                // style="width:100%; height:100%; border:0;"
              />

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
                  <a href={resource.href} className="resource-link" target="_blank" rel="noopener noreferrer">
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
