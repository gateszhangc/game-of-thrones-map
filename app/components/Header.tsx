'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  currentPage?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
  { label: "Great Houses", href: "/houses" },
  { label: "Battles", href: "/battles" },
  { label: "Contact", href: "/contact" }
];

export default function Header({ currentPage }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="main-header" role="banner">
      <nav aria-label="Primary">
        <div className="logo">
          <Link href="/" aria-label="Game of Thrones Map home">
            <span className="logo-text">Game of Thrones</span>
            <span className="logo-subtext">Map</span>
          </Link>
        </div>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => {
            const isActive = currentPage === link.label || pathname === link.href;

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}