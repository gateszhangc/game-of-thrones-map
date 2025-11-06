'use client';

import { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <section className="interactive-map-section" aria-labelledby="map-title">
      <div className="section-header">
        <h2 id="map-title">Interactive Map</h2>
        <div className="ornament" aria-hidden="true" />
      </div>

      <div className="map-container">
        {isLoading && (
          <div className="map-loading" aria-live="polite">
            <div className="loading-spinner" />
            <p>Loading map...</p>
          </div>
        )}

        {hasError && fallbackImageUrl ? (
          <div className="map-fallback">
            <img
              src={fallbackImageUrl}
              alt={`${regionId === 'westeros' ? 'Westeros' : 'Essos'} Map`}
              className="fallback-map-image"
            />
            <p className="map-error-message">Interactive map temporarily unavailable, showing static map</p>
          </div>
        ) : !hasError && (
          <iframe
            src={embedUrl}
            className="got-map-iframe"
            title={`${regionId === 'westeros' ? 'Westeros' : 'Essos'} Interactive Map - Character Journeys and Locations`}
            loading="lazy"
            allow="fullscreen"
            onLoad={handleLoad}
            onError={handleError}
          />
        )}

        <div className="map-attribution">
          <p>
            Interactive map provided by{' '}
            <a
              href="https://quartermaester.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              Quarter Maester
            </a>
            {' '}• Explore character journeys, locations, and timelines
          </p>
        </div>
      </div>
    </section>
  );
}
