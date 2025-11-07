import { Metadata } from "next";
import Script from "next/script";
import Header from "../components/Header";
import { generateSEOMetadata, getCanonicalUrl } from "../../lib/seo/metadata";
import { generateWebPageSchema } from "../../lib/seo/structured-data";
import { SITE_URL } from "../../lib/seo/constants";

export const metadata: Metadata = generateSEOMetadata({
  title: "Locations - Interactive Map of Westeros & Essos",
  description: "Explore the complete interactive map of Game of Thrones. Discover all locations, character journeys, and timelines from Westeros to Essos with our detailed map powered by Quarter Maester.",
  keywords: [
    "game of thrones locations",
    "westeros map",
    "essos map",
    "interactive got map",
    "character journeys",
    "game of thrones timeline",
    "quarter maester map"
  ],
  canonicalUrl: getCanonicalUrl("/locations")
});

export default function LocationsPage() {
  const pageSchema = generateWebPageSchema({
    url: `${SITE_URL}/locations`,
    name: "Game of Thrones Locations - Interactive Map",
    description: "Explore the complete interactive map of Game of Thrones featuring all locations, character journeys, and timelines from Westeros to Essos."
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
        </main>
      </div>
    </>
  );
}
