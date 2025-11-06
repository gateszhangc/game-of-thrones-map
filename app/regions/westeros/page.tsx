import { Metadata } from 'next';
import Link from 'next/link';
import RegionHero from '../components/RegionHero';
import RegionOverview from '../components/RegionOverview';
import RegionSection from '../components/RegionSection';
import RelatedPages from '../components/RelatedPages';
import { westerosData } from './data';

export const metadata: Metadata = {
  title: 'Westeros - Locations, Geography & Legends | Game of Thrones Map',
  description: 'Explore detailed maps and locations of the Seven Kingdoms of Westeros. From the frozen lands beyond The Wall to the deserts of Dorne, discover the history and culture of key locations like Winterfell, King\'s Landing, and Highgarden.',
  openGraph: {
    title: 'Westeros - Locations, Geography & Legends | Game of Thrones Map',
    description: 'Explore detailed maps and locations of the Seven Kingdoms of Westeros. From the frozen lands beyond The Wall to the deserts of Dorne, discover the history and culture of key locations like Winterfell, King\'s Landing, and Highgarden.',
    url: 'https://thegameofthronesmap.com/regions/westeros',
    type: 'website',
  },
  alternates: {
    canonical: 'https://thegameofthronesmap.com/regions/westeros',
  },
};

export default function WesterosPage() {
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
          title={westerosData.title}
          subtitle={westerosData.subtitle}
          regionId={westerosData.id}
        />

        <RegionOverview overview={westerosData.overview} />

        {westerosData.sections.map((section) => (
          <RegionSection
            key={section.id}
            section={section}
            regionId={westerosData.id}
          />
        ))}

        <RelatedPages currentRegion={westerosData.id} />
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