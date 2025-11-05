import { Metadata } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';

export const metadata: Metadata = {
  title: 'Contact Us - Game of Thrones Map',
  description: 'Contact us for any questions about the Game of Thrones Map. We\'re here to help!',
};

async function getContactPageData() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'contact-body.html');
    const contactBodyContent = await readFile(filePath, 'utf8');
    return { contactBodyContent };
  } catch (error) {
    console.error('Error reading contact page data:', error);
    return { contactBodyContent: '' };
  }
}

export default async function ContactPage() {
  const { contactBodyContent } = await getContactPageData();

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
                <li><a href="/contact" className="current">Contact</a></li>
              </ul>
            </nav>
          </header>

          <main className="contact-content">
            ${contactBodyContent}
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