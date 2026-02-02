import { Metadata } from "next";
import Header from "../components/Header";
import { generateSEOMetadata, getCanonicalUrl } from "../../lib/seo/metadata";

const DISCLOSURE_TITLE = "Affiliate Disclosure | Game of Thrones Map";
const DISCLOSURE_DESCRIPTION =
  "Learn how affiliate links support the Game of Thrones Map and our commitment to transparent recommendations.";

export const metadata: Metadata = generateSEOMetadata({
  title: DISCLOSURE_TITLE,
  description: DISCLOSURE_DESCRIPTION,
  canonicalUrl: getCanonicalUrl("/affiliate-disclosure")
});

export default function AffiliateDisclosurePage() {
  return (
    <div className="page-wrapper">
      <Header currentPage="Affiliate" />
      <main className="affiliate-disclosure-page" id="main-content">
        <section className="affiliate-disclosure-hero">
          <div className="affiliate-disclosure-content">
            <h1>Affiliate Disclosure</h1>
            <p>
              Game of Thrones Map participates in affiliate programs. If you click a
              partner link and make a purchase, we may earn a commission at no extra cost
              to you. These commissions help us fund ongoing map updates and content.
            </p>
          </div>
        </section>
        <section className="affiliate-disclosure-details">
          <h2>Our approach</h2>
          <ul>
            <li>We use affiliate links to support ongoing development and hosting costs.</li>
            <li>We only link to partners we believe are relevant to our audience.</li>
            <li>Affiliate links never change the price you pay.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
