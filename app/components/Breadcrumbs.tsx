import Link from 'next/link';
import { BreadcrumbItem } from '../../lib/seo/structured-data';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li
            key={item.url}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index < items.length - 1 ? (
              <>
                <Link href={item.url} itemProp="item">
                  <span itemProp="name">{item.name}</span>
                </Link>
                <meta itemProp="position" content={String(index + 1)} />
                <span className="separator" aria-hidden="true"> / </span>
              </>
            ) : (
              <>
                <span itemProp="name" aria-current="page">{item.name}</span>
                <meta itemProp="position" content={String(index + 1)} />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
