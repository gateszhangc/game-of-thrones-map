import { Metadata } from 'next';
import Link from 'next/link';
import BattleCard from './BattleCard';
import { battles } from './data';

export const metadata: Metadata = {
  title: 'Historic Battles - Game of Thrones Map',
  description: 'Discover the locations of legendary battles that shaped the realm. From the War of the Five Kings to the Targaryen Conquest, explore the historic conflicts of Westeros and Essos.',
};

export default function BattlesPage() {
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
            <li><Link href="/houses">Great Houses</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

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
  );
}
