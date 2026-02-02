"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AffiliateLink from "./AffiliateLink";
import { AFFILIATE_COPY, AFFILIATE_DISCLOSURE, AFFILIATE_URL } from "../../lib/affiliate";

const ALLOWED_PATHS = new Set(["/", "/locations", "/houses", "/battles"]);
const DISMISS_KEY = "affiliateStickyDismissed";

export default function AffiliateStickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;
    const dismissed = window.sessionStorage.getItem(DISMISS_KEY) === "1";
    setIsDismissed(dismissed);
  }, []);

  useEffect(() => {
    if (!isMounted || isDismissed) return;
    if (!pathname) return;
    const isAllowed = ALLOWED_PATHS.has(pathname) || pathname.startsWith("/regions/");
    if (!isAllowed) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setIsVisible(false);
        return;
      }
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setIsVisible(false);
        return;
      }
      const progress = window.scrollY / scrollable;
      setIsVisible(progress >= 0.5);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname, isMounted, isDismissed]);

  if (!isMounted || !isVisible || isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    }
  };

  return (
    <div className="affiliate-sticky" role="region" aria-label="GamsGo partner offer">
      <div className="affiliate-sticky-content">
        <span className="affiliate-sticky-text">{AFFILIATE_COPY.sticky.text}</span>
        <span className="affiliate-sticky-disclosure">{AFFILIATE_DISCLOSURE}</span>
      </div>
      <div className="affiliate-sticky-actions">
        <AffiliateLink
          href={AFFILIATE_URL}
          placementId="sticky-mobile"
          ctaVariant="value-v1"
          className="affiliate-sticky-cta"
          ariaLabel="Visit GamsGo via our partner link"
        >
          {AFFILIATE_COPY.sticky.cta}
        </AffiliateLink>
        <button
          type="button"
          className="affiliate-sticky-close"
          onClick={handleDismiss}
          aria-label="Dismiss offer"
        >
          x
        </button>
      </div>
    </div>
  );
}
