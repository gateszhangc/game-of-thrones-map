import InteractiveMapClient from './InteractiveMapClient';

interface InteractiveMapSectionProps {
  regionId: 'westeros' | 'essos';
  embedUrl?: string;
  fallbackImageUrl?: string;
}

export default function InteractiveMapSection({
  regionId,
  embedUrl = 'https://quartermaester.info/',
  fallbackImageUrl
}: InteractiveMapSectionProps) {
  return (
    <section className="interactive-map-section" aria-labelledby="map-title">
      <div className="section-header">
        <h2 id="map-title">Interactive Map</h2>
        <div className="ornament" aria-hidden="true" />
      </div>

      <InteractiveMapClient
        regionId={regionId}
        embedUrl={embedUrl}
        fallbackImageUrl={fallbackImageUrl}
      />
    </section>
  );
}
