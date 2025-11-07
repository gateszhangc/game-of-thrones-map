import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/Footer";

const SITE_URL = "https://thegameofthronesmap.com";
const PAGE_TITLE = "Game of Thrones Map | Interactive Westeros & Essos Guide";
const PAGE_DESCRIPTION =
  "Explore the Game of Thrones map of Westeros and Essos to track Seven Kingdoms houses and locate Braavos, Dragonstone, and Meereen with answers to fan questions.";
const GA_MEASUREMENT_ID = "G-B1WMBOGCV1";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Game of Thrones Map",
      description: PAGE_DESCRIPTION,
      inLanguage: "en"
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` }
    }
  ]
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_TITLE,
    template: "%s | Game of Thrones Map"
  },
  description: PAGE_DESCRIPTION,
  keywords: [
    "Game of Thrones map",
    "Westeros map",
    "Essos map",
    "Seven Kingdoms atlas",
    "Game of Thrones locations",
    "A Song of Ice and Fire geography"
  ],
  authors: [{ name: "Game of Thrones Map" }],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Game of Thrones Map",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/got-map-hero.png",
        width: 1200,
        height: 630,
        alt: "Stylized Game of Thrones map spanning Westeros and Essos."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/images/got-map-hero.png"]
  },
  robots: {
    index: true,
    follow: true
  },
  category: "entertainment",

};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0f0f1e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lora:wght@400;600&family=MedievalSharp&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "u2an6idi46");
            `
          }}
        />
        <Script
          id="google-gtag-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
        <Footer />
        <Script id="site-structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(structuredData)}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
