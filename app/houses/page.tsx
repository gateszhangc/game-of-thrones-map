import { Metadata } from 'next';
import Link from 'next/link';
import HouseCard from './HouseCard';
import { houses } from './data';

export const metadata: Metadata = {
  title: 'Great Houses - Game of Thrones Map',
  description: 'Learn about the noble houses of Westeros and Essos. Discover their sigils, words, ancestral seats, and the great families that shape the realm.',
};

export default function HousesPage() {
  return (
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

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Use</Link></li>
              <li><Link href="/sitemap.xml">Sitemap</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: <a href="mailto:hello@thegameofthronesmap.com">hello@thegameofthronesmap.com</a></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Game of Thrones Map. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}