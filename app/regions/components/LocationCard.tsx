import { Location } from '../types';

interface LocationCardProps {
  location: Location;
  regionId: 'westeros' | 'essos';
}

const getLocationIcon = (type: string): string => {
  switch (type) {
    case 'city':
      return '🏙️';
    case 'castle':
      return '🏰';
    case 'landmark':
      return '⛰️';
    default:
      return '📍';
  }
};

export default function LocationCard({ location, regionId }: LocationCardProps) {
  return (
    <article className={`location-card location-card-${regionId}`}>
      <div className="location-card-header">
        <span className="location-icon" aria-hidden="true">
          {getLocationIcon(location.type)}
        </span>
        <h3 className="location-name">{location.name}</h3>
      </div>
      
      <div className="location-card-body">
        <p className="location-description">{location.description}</p>
        <div className="location-significance">
          <strong>重要性：</strong>
          <p>{location.significance}</p>
        </div>
      </div>
      
      <div className="location-card-footer">
        <span className="location-type">{location.type === 'city' ? '城市' : location.type === 'castle' ? '城堡' : '地标'}</span>
      </div>
    </article>
  );
}
