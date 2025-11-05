import { Metadata } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';

export const metadata: Metadata = {
  title: 'Historic Battles - Game of Thrones Map',
  description: 'Discover the locations of legendary battles that shaped the realm. From the War of the Five Kings to the Targaryen Conquest, explore the historic conflicts of Westeros and Essos.',
};

async function getBattlesPageData() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'battles-body.html');
    const battlesBodyContent = await readFile(filePath, 'utf8');
    return { battlesBodyContent };
  } catch (error) {
    console.error('Error reading battles page data:', error);
    return { battlesBodyContent: '' };
  }
}

export default async function BattlesPage() {
  const { battlesBodyContent } = await getBattlesPageData();

  return (
    <div
      className="page-wrapper"
      dangerouslySetInnerHTML={{
        __html: `
          <header className="main-header">
            <nav>
              <div className="logo">
                <a href="/">
                  <span className="logo-text">Game of Thrones</span>
                  <span className="logo-subtext">Map</span>
                </a>
              </div>
              <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/">Locations</a></li>
                <li><a href="/">Great Houses</a></li>
                <li><a href="/">About</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </nav>
          </header>

          <main>
            ${battlesBodyContent}
          </main>

          <footer className="main-footer">
            <div className="footer-content">
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="/privacy">Privacy Policy</a></li>
                  <li><a href="/terms">Terms of Use</a></li>
                  <li><a href="/sitemap.xml">Sitemap</a></li>
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
        `
      }}
    />
  );
}