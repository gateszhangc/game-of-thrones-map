import { Battle } from './types';

interface BattleCardProps {
  battle: Battle;
}

export default function BattleCard({ battle }: BattleCardProps) {
  return (
    <article className="battle-card">
      <span className="battle-icon" aria-label={`${battle.name} icon`}>
        {battle.icon}
      </span>
      
      <h3 className="battle-name">{battle.name}</h3>
      
      <div className="battle-meta">
        <div className="battle-year">
          <span aria-label="Year">📅</span>
          <span>{battle.year}</span>
        </div>
        <div className="battle-location">
          <span aria-label="Location">📍</span>
          <span>{battle.location}</span>
        </div>
      </div>
      
      <div className="battle-participants">
        <strong>Participants:</strong> {battle.participants}
      </div>
      
      <div className="battle-outcome">
        <strong>Outcome:</strong> {battle.outcome}
      </div>
      
      <p className="battle-description">{battle.description}</p>
    </article>
  );
}
