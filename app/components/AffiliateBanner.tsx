import AffiliateLink from "./AffiliateLink";
import { AFFILIATE_COPY, AFFILIATE_DISCLOSURE, AFFILIATE_URL } from "../../lib/affiliate";

export default function AffiliateBanner() {
  return (
    <section className="affiliate-banner" aria-label="GamsGo partner offer">
      <div className="affiliate-banner-inner">
        <div className="affiliate-banner-content">
          <p className="affiliate-eyebrow">Partner offer</p>
          <h2 className="affiliate-title">{AFFILIATE_COPY.banner.title}</h2>
          <p className="affiliate-subtitle">{AFFILIATE_COPY.banner.subtitle}</p>
          <p className="affiliate-trust">{AFFILIATE_COPY.banner.trustLine}</p>
          <p className="affiliate-disclosure">{AFFILIATE_DISCLOSURE}</p>
        </div>
        <div className="affiliate-banner-actions">
          <AffiliateLink
            href={AFFILIATE_URL}
            placementId="home-hero"
            ctaVariant="value-v1"
            className="cta-button affiliate-cta"
            ariaLabel="Visit GamsGo via our partner link"
          >
            {AFFILIATE_COPY.banner.cta}
          </AffiliateLink>
        </div>
      </div>
    </section>
  );
}
