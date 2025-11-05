import { Overview } from '../types';

interface RegionOverviewProps {
  overview: Overview;
}

export default function RegionOverview({ overview }: RegionOverviewProps) {
  return (
    <section className="region-overview" aria-labelledby="overview-title">
      <div className="section-header">
        <h2 id="overview-title">区域概览</h2>
        <div className="ornament" aria-hidden="true" />
      </div>
      
      <div className="overview-grid">
        <div className="overview-item">
          <div className="overview-icon" aria-hidden="true">🗺️</div>
          <h3>地理</h3>
          <p>{overview.geography}</p>
        </div>
        
        <div className="overview-item">
          <div className="overview-icon" aria-hidden="true">🌤️</div>
          <h3>气候</h3>
          <p>{overview.climate}</p>
        </div>
        
        <div className="overview-item">
          <div className="overview-icon" aria-hidden="true">🏛️</div>
          <h3>文化</h3>
          <p>{overview.culture}</p>
        </div>
        
        <div className="overview-item">
          <div className="overview-icon" aria-hidden="true">👥</div>
          <h3>人口</h3>
          <p>{overview.population}</p>
        </div>
      </div>
    </section>
  );
}
