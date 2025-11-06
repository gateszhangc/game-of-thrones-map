'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  label: string;
  href: string;
  isHash?: boolean;
}

interface HeaderProps {
  currentPage?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/#interactive-map", isHash: true },
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
            // 判断当前页面是否激活
            const isActive = currentPage === link.label ||
                           (pathname === link.href && link.href !== "/#interactive-map") ||
                           (link.href === "/#interactive-map" && pathname === "/");

            return (
              <li key={link.label}>
                {link.isHash ? (
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      
                      // 如果不在首页，先导航到首页
                      if (pathname !== "/") {
                        window.location.href = "/#interactive-map";
                        return;
                      }
                      
                      // 在首页时直接滚动到iframe
                      const element = document.getElementById('interactive-map');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}