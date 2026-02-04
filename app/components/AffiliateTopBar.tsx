"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AffiliateLink from "./AffiliateLink";
import { AFFILIATE_COPY, AFFILIATE_DISCLOSURE, AFFILIATE_URL } from "../../lib/affiliate";

const DISMISS_KEY = "affiliateTopBarDismissed";

export default function AffiliateTopBar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;
    const dismissed = window.sessionStorage.getItem(DISMISS_KEY) === "1";
    setIsDismissed(dismissed);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (pathname !== "/") {
      setIsVisible(false);
      return;
    }
    if (isDismissed) {
      setIsVisible(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [isMounted, pathname, isDismissed]);

  if (!isMounted || pathname !== "/" || isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    }
  };

  return (
    <div
      className={`affiliate-topbar${isVisible ? " is-visible" : ""}`}
      role="region"
      aria-label="GamsGo partner offer"
    >
      <div className="affiliate-topbar-inner">
        <div className="affiliate-topbar-content">
          <p className="affiliate-topbar-eyebrow">Partner offer</p>
          <p className="affiliate-topbar-title">{AFFILIATE_COPY.topBar.title}</p>
          <p className="affiliate-topbar-subtitle">{AFFILIATE_COPY.topBar.subtitle}</p>
          <p className="affiliate-disclosure">{AFFILIATE_DISCLOSURE}</p>
        </div>
        <div className="affiliate-topbar-actions">
          <AffiliateLink
            href={AFFILIATE_URL}
            placementId="home-top-popup"
            ctaVariant="value-v1"
            className="cta-button affiliate-cta affiliate-topbar-cta"
            ariaLabel="Visit GamsGo via our partner link"
          >
            {AFFILIATE_COPY.topBar.cta}
          </AffiliateLink>
          <button
            type="button"
            className="affiliate-topbar-close"
            onClick={handleDismiss}
            aria-label="Dismiss offer"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
