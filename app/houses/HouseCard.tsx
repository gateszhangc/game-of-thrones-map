import { House } from './types';

interface HouseCardProps {
  house: House;
}

export default function HouseCard({ house }: HouseCardProps) {
  return (
    <article className="house-card">
      <span className="house-sigil" aria-label={`${house.name} sigil`}>
        {house.sigil}
      </span>
      
      <h3 className="house-name">{house.name}</h3>
      
      <p className="house-words">"{house.words}"</p>
      
      <div className="house-info">
        <div className="house-location">
          <span aria-label="Seat">📍</span>
          <span>{house.seat}</span>
        </div>
        <div className="house-region">
          <span aria-label="Region">🗺️</span>
          <span>{house.region}</span>
        </div>
      </div>
      
      <p className="house-description">{house.description}</p>
    </article>
  );
}
