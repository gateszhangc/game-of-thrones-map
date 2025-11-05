import { Metadata } from 'next';
import Link from 'next/link';
import RegionHero from '../components/RegionHero';
import RegionOverview from '../components/RegionOverview';
import InteractiveMapSection from '../components/InteractiveMapSection';
import RegionSection from '../components/RegionSection';
import RelatedPages from '../components/RelatedPages';
import { essosData } from './data';

export const metadata: Metadata = {
  title: 'Essos - Locations, Geography & Legends | Game of Thrones Map',
  description: 'Explore detailed maps and locations of the eastern continent of Essos. From the Free Cities to the Dothraki Sea, discover the history and diverse cultures of key cities like Braavos, Meereen, and Qarth.',
  openGraph: {
    title: 'Essos - Locations, Geography & Legends | Game of Thrones Map',
    description: 'Explore detailed maps and locations of the eastern continent of Essos. From the Free Cities to the Dothraki Sea, discover the history and diverse cultures of key cities like Braavos, Meereen, and Qarth.',
    url: 'https://thegameofthronesmap.com/regions/essos',
    type: 'website',
  },
  alternates: {
    canonical: 'https://thegameofthronesmap.com/regions/essos',
  },
};

export default function EssosPage() {
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

        <InteractiveMapSection regionId={essosData.id} />

        {essosData.sections.map((section) => (
          <RegionSection
            key={section.id}
            section={section}
            regionId={essosData.id}
          />
        ))}

        <RelatedPages currentRegion={essosData.id} />
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