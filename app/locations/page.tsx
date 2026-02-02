import { Metadata } from "next";
import Script from "next/script";
import Header from "../components/Header";
import AffiliateInlineCard from "../components/AffiliateInlineCard";
import { generateSEOMetadata, getCanonicalUrl } from "../../lib/seo/metadata";
import { generateWebPageSchema } from "../../lib/seo/structured-data";
import { SITE_URL } from "../../lib/seo/constants";
import { getKeywordList } from "../../lib/seo/longTailKeywords";
import { AFFILIATE_COPY } from "../../lib/affiliate";

const LOCATION_TITLE = "Game of Thrones Locations Map | Westeros & Essos";
const LOCATION_DESCRIPTION =
  "Use our Game of Thrones locations map to explore Westeros & Essos journeys, map of Game of Thrones locations, and precise Game of Thrones map locations.";
const LOCATION_KEYWORDS = getKeywordList(
  [
    "game of thrones locations map",
    "map of game of thrones locations",
    "game of thrones map locations"
  ],
  3
);

export const metadata: Metadata = generateSEOMetadata({
  title: LOCATION_TITLE,
  description: LOCATION_DESCRIPTION,
  keywords: LOCATION_KEYWORDS,
  canonicalUrl: getCanonicalUrl("/locations")
});

export default function LocationsPage() {
  const pageSchema = generateWebPageSchema({
    url: `${SITE_URL}/locations`,
    name: LOCATION_TITLE,
    description: LOCATION_DESCRIPTION
  });

  return (
    <>
      <Script id="locations-page-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(pageSchema)}
      </Script>
      <div className="page-wrapper">
        <Header currentPage="Locations" />
        <main id="main-content" className="locations-main">
          <section className="locations-map-section">
            <iframe
              src="https://quartermaester.info/"
              className="locations-iframe"
              title="Game of Thrones Interactive Map - Character Journeys and Locations"
              allow="fullscreen"
            />
          </section>
          <AffiliateInlineCard
            title={AFFILIATE_COPY.inlineCard.title}
            description={AFFILIATE_COPY.inlineCard.description}
            ctaLabel={AFFILIATE_COPY.inlineCard.cta}
            placementId="map-below"
            compact
          />
        </main>
      </div>
    </>
  );
}
