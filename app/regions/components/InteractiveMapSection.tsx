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
        <h2 id="map-title">交互式地图</h2>
        <div className="ornament" aria-hidden="true" />
      </div>

      <div className="map-container">
        {isLoading && (
          <div className="map-loading" aria-live="polite">
            <div className="loading-spinner" />
            <p>地图加载中...</p>
          </div>
        )}

        {hasError && fallbackImageUrl ? (
          <div className="map-fallback">
            <img 
              src={fallbackImageUrl} 
              alt={`${regionId === 'westeros' ? '维斯特洛' : '厄索斯'}地图`}
              className="fallback-map-image"
            />
            <p className="map-error-message">交互式地图暂时无法加载，显示静态地图</p>
          </div>
        ) : !hasError && (
          <iframe
            src={embedUrl}
            className="got-map-iframe"
            title={`${regionId === 'westeros' ? '维斯特洛' : '厄索斯'}交互式地图 - 角色旅程和地点`}
            loading="lazy"
            allow="fullscreen"
            onLoad={handleLoad}
            onError={handleError}
          />
        )}

        <div className="map-attribution">
          <p>
            交互式地图由{' '}
            <a
              href="https://quartermaester.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              Quarter Maester
            </a>
            {' '}提供 • 探索角色旅程、地点和时间线
          </p>
        </div>
      </div>
    </section>
  );
}
