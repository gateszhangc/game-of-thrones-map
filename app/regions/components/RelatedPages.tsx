import Link from 'next/link';

interface RelatedPagesProps {
  currentRegion: 'westeros' | 'essos';
}

export default function RelatedPages({ currentRegion }: RelatedPagesProps) {
  const otherRegion = currentRegion === 'westeros' ? 'essos' : 'westeros';
  const otherRegionName = otherRegion === 'westeros' ? '维斯特洛' : '厄索斯';

  return (
    <section className="related-pages" aria-labelledby="related-pages-title">
      <div className="section-header">
        <h2 id="related-pages-title">相关页面</h2>
        <div className="ornament" aria-hidden="true" />
      </div>

      <div className="related-pages-grid">
        <article className="related-page-card">
          <div className="related-page-icon" aria-hidden="true">🗺️</div>
          <h3>探索{otherRegionName}</h3>
          <p>发现{otherRegionName}的地点、文化和历史</p>
          <Link href={`/regions/${otherRegion}`} className="related-page-link">
            访问{otherRegionName}
          </Link>
        </article>

        <article className="related-page-card">
          <div className="related-page-icon" aria-hidden="true">🏰</div>
          <h3>伟大家族</h3>
          <p>了解统治七大王国的贵族家族</p>
          <Link href="/houses" className="related-page-link">
            查看家族
          </Link>
        </article>

        <article className="related-page-card">
          <div className="related-page-icon" aria-hidden="true">⚔️</div>
          <h3>历史战役</h3>
          <p>探索塑造王国的传奇战役</p>
          <Link href="/battles" className="related-page-link">
            查看战役
          </Link>
        </article>

        <article className="related-page-card">
          <div className="related-page-icon" aria-hidden="true">🌍</div>
          <h3>交互式地图</h3>
          <p>在完整的世界地图上探索所有地点</p>
          <Link href="/#interactive-map" className="related-page-link">
            查看地图
          </Link>
        </article>
      </div>
    </section>
  );
}
