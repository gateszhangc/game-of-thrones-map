import { RegionSection as RegionSectionType } from '../types';
import LocationCard from './LocationCard';

interface RegionSectionProps {
  section: RegionSectionType;
  regionId: 'westeros' | 'essos';
}

export default function RegionSection({ section, regionId }: RegionSectionProps) {
  return (
    <section id={section.id} className="region-section" aria-labelledby={`section-${section.id}-title`}>
      <div className="region-section-header">
        <h2 id={`section-${section.id}-title`} className="region-section-title">{section.name}</h2>
        <p className="region-section-description">{section.description}</p>
        
        {(section.climate || section.culture) && (
          <div className="region-section-info">
            {section.climate && (
              <div className="info-item">
                <strong>Climate:</strong> {section.climate}
              </div>
            )}
            {section.culture && (
              <div className="info-item">
                <strong>Culture:</strong> {section.culture}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="locations-grid">
        {section.locations.map((location) => (
          <LocationCard 
            key={location.id} 
            location={location} 
            regionId={regionId}
          />
        ))}
      </div>
    </section>
  );
}
