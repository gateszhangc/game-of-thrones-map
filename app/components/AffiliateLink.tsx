"use client";

import type { ReactNode } from "react";

type AffiliateLinkProps = {
  href: string;
  placementId: string;
  ctaVariant: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export default function AffiliateLink({
  href,
  placementId,
  ctaVariant,
  className,
  ariaLabel,
  children
}: AffiliateLinkProps) {
  const handleClick = () => {
    if (typeof window === "undefined") return;
    const gtag = (window as typeof window & {
      gtag?: (...args: unknown[]) => void;
    }).gtag;
    if (typeof gtag === "function") {
      gtag("event", "affiliate_click", {
        placement_id: placementId,
        cta_variant: ctaVariant,
        link_url: href
      });
    }
  };

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
