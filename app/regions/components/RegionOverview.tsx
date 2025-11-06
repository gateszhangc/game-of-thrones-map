import { Overview } from '../types';

interface RegionOverviewProps {
  overview: Overview;
}

export default function RegionOverview({ overview }: RegionOverviewProps) {
  return (
    <section className="region-overview" aria-labelledby="overview-title">
      <div className="section-header">
        <h2 id="overview-title">Region Overview</h2>
        <div className="ornament" aria-hidden="true" />
      </div>

      <div className="overview-grid">
        <div className="overview-item">
          <div className="overview-icon" aria-hidden="true">🗺️</div>
          <h3>Geography</h3>
          <p>{overview.geography}</p>
        </div>

        <div className="overview-item">
          <div className="overview-icon" aria-hidden="true">🌤️</div>
          <h3>Climate</h3>
          <p>{overview.climate}</p>
        </div>

        <div className="overview-item">
          <div className="overview-icon" aria-hidden="true">🏛️</div>
          <h3>Culture</h3>
          <p>{overview.culture}</p>
        </div>

        <div className="overview-item">
          <div className="overview-icon" aria-hidden="true">👥</div>
          <h3>Population</h3>
          <p>{overview.population}</p>
        </div>
      </div>
    </section>
  );
}
