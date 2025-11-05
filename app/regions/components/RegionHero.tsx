interface RegionHeroProps {
  title: string;
  subtitle: string;
  regionId: 'westeros' | 'essos';
}

export default function RegionHero({ title, subtitle, regionId }: RegionHeroProps) {
  return (
    <section className={`region-hero region-hero-${regionId}`} aria-labelledby="region-hero-title">
      <div className="region-hero-content">
        <h1 id="region-hero-title" className="region-hero-title">{title}</h1>
        <p className="region-hero-subtitle">{subtitle}</p>
        <div className="ornament" aria-hidden="true" />
      </div>
    </section>
  );
}
