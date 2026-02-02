import AffiliateLink from "./AffiliateLink";
import { AFFILIATE_DISCLOSURE, AFFILIATE_URL } from "../../lib/affiliate";

type AffiliateInlineCardProps = {
  title: string;
  description: string;
  placementId: string;
  ctaLabel: string;
  compact?: boolean;
};

export default function AffiliateInlineCard({
  title,
  description,
  placementId,
  ctaLabel,
  compact = false
}: AffiliateInlineCardProps) {
  return (
    <section className={`affiliate-inline ${compact ? "affiliate-inline-compact" : ""}`.trim()}>
      <div className="affiliate-card">
        <div className="affiliate-card-content">
          <h3 className="affiliate-card-title">{title}</h3>
          <p className="affiliate-card-description">{description}</p>
          <p className="affiliate-disclosure">{AFFILIATE_DISCLOSURE}</p>
        </div>
        <div className="affiliate-card-actions">
          <AffiliateLink
            href={AFFILIATE_URL}
            placementId={placementId}
            ctaVariant="value-v1"
            className="cta-button affiliate-cta"
            ariaLabel="Visit GamsGo via our partner link"
          >
            {ctaLabel}
          </AffiliateLink>
        </div>
      </div>
    </section>
  );
}
