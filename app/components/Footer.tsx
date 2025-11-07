import Link from 'next/link';
import BackToTopButton from './BackToTopButton';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section footer-about">
          <div className="footer-logo">🏰 Game of Thrones Map</div>
          <p className="footer-description">
            Interactive atlas of Westeros and Essos. An unofficial fan-created resource exploring the world of Game of Thrones.
          </p>
        </div>

        {/* Explore Links */}
        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/locations">Map</Link></li>
            <li><Link href="/houses">Houses</Link></li>
            <li><Link href="/battles">Battles</Link></li>
            <li><Link href="/regions/westeros">Regions</Link></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <a
                href="https://www.hbo.com/game-of-thrones"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="HBO Official Game of Thrones Website"
              >
                HBO Official
              </a>
            </li>
            <li>
              <a
                href="https://awoiaf.westeros.org/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="A Wiki of Ice and Fire"
              >
                Wiki of Ice & Fire
              </a>
            </li>
            <li>
              <a
                href="https://quartermaester.info/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Quartermaester - Game of Thrones Resources"
              >
                Quartermaester
              </a>
            </li>
          </ul>
        </div>

        {/* Connect Section */}
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="footer-connect">
            <Link href="/contact" className="contact-link">
              📧 Contact Us
            </Link>
            <div className="social-links">
              <a
                href="https://twitter.com/gameofthrones"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Follow on Twitter/X"
                className="social-link"
              >
                𝕏
              </a>
              <a
                href="https://www.facebook.com/GameOfThrones"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Follow on Facebook"
                className="social-link"
              >
                📘
              </a>
              <a
                href="https://www.instagram.com/gameofthrones/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Follow on Instagram"
                className="social-link"
              >
                📷
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="footer-back-to-top">
        <BackToTopButton />
      </div>

      {/* Copyright and Legal */}
      <div className="footer-bottom">
        <p>© 2025 Game of Thrones Map. All rights reserved.</p>
        <div className="footer-legal">
          <Link href="/privacy">Privacy Policy</Link>
          <span> • </span>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
