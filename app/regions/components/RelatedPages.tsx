import Link from 'next/link';

interface RelatedPagesProps {
  currentRegion: 'westeros' | 'essos';
}

export default function RelatedPages({ currentRegion }: RelatedPagesProps) {
  const otherRegion = currentRegion === 'westeros' ? 'essos' : 'westeros';
  const otherRegionName = otherRegion === 'westeros' ? 'Westeros' : 'Essos';

  return (
    <section className="related-pages" aria-labelledby="related-pages-title">
      <div className="section-header">
        <h2 id="related-pages-title">Related Pages</h2>
        <div className="ornament" aria-hidden="true" />
      </div>

      <div className="related-pages-grid">
        <article className="related-page-card">
          <div className="related-page-icon" aria-hidden="true">🗺️</div>
          <h3>Explore {otherRegionName}</h3>
          <p>Discover the locations, culture, and history of {otherRegionName}</p>
          <Link href={`/regions/${otherRegion}`} className="related-page-link">
            Visit {otherRegionName}
          </Link>
        </article>

        <article className="related-page-card">
          <div className="related-page-icon" aria-hidden="true">🏰</div>
          <h3>Great Houses</h3>
          <p>Learn about the noble families that rule the Seven Kingdoms</p>
          <Link href="/houses" className="related-page-link">
            View Houses
          </Link>
        </article>

        <article className="related-page-card">
          <div className="related-page-icon" aria-hidden="true">⚔️</div>
          <h3>Historic Battles</h3>
          <p>Explore the legendary battles that shaped the kingdoms</p>
          <Link href="/battles" className="related-page-link">
            View Battles
          </Link>
        </article>

        <article className="related-page-card">
          <div className="related-page-icon" aria-hidden="true">🌍</div>
          <h3>Interactive Map</h3>
          <p>Explore all locations on the complete world map</p>
          <Link href="/#interactive-map" className="related-page-link">
            View Map
          </Link>
        </article>
      </div>
    </section>
  );
}
