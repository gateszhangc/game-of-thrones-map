import Link from "next/link";

export default function ContactPage() {
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
            <li><Link href="/">Great Houses</Link></li>
            <li><Link href="/">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero-content">
            <div className="raven-icon">🐦‍⬛</div>
            <h1>Send a Raven</h1>
            <p className="contact-hero-subtitle">Contact the Maesters of the Map</p>
            <p className="contact-hero-description">
              Have questions about the realm? Spotted an error on the map? 
              Send us a message and we will respond as swiftly as a raven flies.
            </p>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-form-wrapper">
              <form className="contact-form">
                <div className="form-seal">🔱</div>
                
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Ser/Lady..."
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Raven return address"
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    placeholder="Purpose of your message"
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={6}
                    placeholder="What brings you to the Citadel?"
                    required 
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <span className="btn-icon">🐦‍⬛</span>
                  <span>Send Raven</span>
                </button>
              </form>
            </div>

            <div className="contact-info-wrapper">
              <div className="contact-info-card">
                <div className="info-icon">📧</div>
                <h3>Email</h3>
                <a href="mailto:hello@thegameofthronesmap.com" className="info-content-link">
                  hello@thegameofthronesmap.com
                </a>
                <p className="info-description">For general inquiries and map suggestions</p>
              </div>

              <div className="contact-info-card">
                <div className="info-icon">🐦</div>
                <h3>Follow Our Journey</h3>
                <p className="info-content">Stay updated on new locations</p>
                <div className="info-social-links">
                  <a href="https://x.com/GameOfThrones" target="_blank" rel="noopener noreferrer" className="social-link-small">Twitter</a>
                  <a href="https://www.facebook.com/GameOfThrones" target="_blank" rel="noopener noreferrer" className="social-link-small">Facebook</a>
                  <a href="https://www.instagram.com/gameofthrones" target="_blank" rel="noopener noreferrer" className="social-link-small">Instagram</a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-icon">⏰</div>
                <h3>Response Time</h3>
                <p className="info-content">Within 24-48 hours</p>
                <p className="info-description">Like a raven flight, swift but sure</p>
              </div>

              <div className="contact-info-card">
                <div className="info-icon">💡</div>
                <h3>Suggestions Welcome</h3>
                <p className="info-content">Found an error? Have a location to add?</p>
                <p className="info-description">We are always improving the map of the realm</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <section className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Use</Link></li>
            </ul>
          </section>

          <section className="footer-section">
            <h4>Contact</h4>
            <address>
              <a href="mailto:hello@thegameofthronesmap.com">hello@thegameofthronesmap.com</a>
            </address>
          </section>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Game of Thrones Map. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
