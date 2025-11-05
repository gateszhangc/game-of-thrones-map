import { Metadata } from 'next';
import Link from 'next/link';
import HouseCard from './HouseCard';
import { houses } from './data';

export const metadata: Metadata = {
  title: '伟大家族 - 权力的游戏地图',
  description: '了解维斯特洛和厄索斯的贵族家族。探索他们的族徽、族语、祖传驻地，以及塑造王国的伟大家族。',
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
        {/* 英雄区 */}
        <section className="houses-hero">
          <div className="houses-hero-content">
            <h1 className="houses-hero-title">维斯特洛的伟大家族</h1>
            <p className="houses-hero-subtitle">塑造七大王国的贵族家族</p>
            <div className="ornament"></div>
          </div>
        </section>

        {/* 家族网格区 */}
        <section className="houses-grid">
          {houses.map((house) => (
            <HouseCard key={house.name} house={house} />
          ))}
        </section>

        {/* CTA 区域 */}
        <section className="houses-cta">
          <div className="cta-buttons">
            <Link href="/#interactive-map" className="cta-button">
              探索交互式地图
            </Link>
            <Link href="/battles" className="cta-button">
              查看历史战役
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