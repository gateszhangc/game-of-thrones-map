import { Metadata } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';

export const metadata: Metadata = {
  title: 'Great Houses - Game of Thrones Map',
  description: 'Learn about the noble houses of Westeros and Essos. Discover their sigils, words, ancestral seats, and the great families that shape the realm.',
};

async function getHousesPageData() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'houses-body.html');
    const housesBodyContent = await readFile(filePath, 'utf8');
    return { housesBodyContent };
  } catch (error) {
    console.error('Error reading houses page data:', error);
    return { housesBodyContent: '' };
  }
}

export default async function HousesPage() {
  const { housesBodyContent } = await getHousesPageData();

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
            ${housesBodyContent}
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