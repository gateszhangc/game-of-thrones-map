import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
  isCurrent: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", isCurrent: true },
  { label: "Locations", href: "/#interactive-map", isCurrent: false },
  { label: "Great Houses", href: "/houses", isCurrent: false },
  { label: "Battles", href: "/battles", isCurrent: false },
  { label: "Contact", href: "/contact", isCurrent: false }
];

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
  return (
    <>
      <div className="page-wrapper">
        <header className="main-header" role="banner">
          <nav aria-label="Primary">
            <div className="logo">
              <Link href="/" aria-label="Game of Thrones Map home">
                <span className="logo-text">Game of Thrones</span>
                <span className="logo-subtext">Map</span>
              </Link>
            </div>

            <ul className="nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} aria-current={link.isCurrent ? "page" : undefined}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main id="main-content">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-content">
              <h1 id="hero-title">Explore the World of Ice and Fire</h1>
              <p className="hero-subtitle">Journey through the Seven Kingdoms and beyond the Narrow Sea</p>
              <div className="hero-cta">
                <a href="#interactive-map" className="cta-button">
                  Explore Map
                </a>
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
                src="https://quartermaester.info/"
                className="got-map-iframe"
                title="Game of Thrones Interactive Map - Character Journeys and Locations"
                loading="lazy"
                allow="fullscreen"
              />
              
              <div className="map-attribution">
                <p>
                  Interactive map powered by{' '}
                  <a 
                    href="https://quartermaester.info/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    Quarter Maester
                  </a>
                  {' '}• Explore character journeys, locations, and timelines
                </p>
              </div>
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

        <footer className="main-footer">
          <div className="footer-content">
            <section className="footer-section" aria-labelledby="quick-links-title">
              <h4 id="quick-links-title">Quick Links</h4>
              <ul>
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("http") || link.href.endsWith(".xml") ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="footer-section" aria-labelledby="contact-title">
              <h4 id="contact-title">Contact</h4>
              <address>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </address>
            </section>

            <section className="footer-section" aria-labelledby="follow-us-title">
              <h4 id="follow-us-title">Follow Us</h4>
              <div className="social-links">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`social-icon ${link.iconClassName}`}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="footer-bottom">
            <p>&copy; {CURRENT_YEAR} Game of Thrones Map. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
