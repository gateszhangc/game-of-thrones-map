'use client';

import { useEffect, useState } from 'react';

export default function MapIframe() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 禁用浏览器的自动滚动恢复
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // 确保页面在顶部
    window.scrollTo(0, 0);
    
    return () => {
      // 清理时恢复默认行为
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const IFRAME_HEIGHT = '800px';

  return (
    <div className="map-iframe-container" style={{ width: '100%', minHeight: IFRAME_HEIGHT }}>
      {!isLoaded ? (
        <button 
          className="map-placeholder"
          onClick={() => setIsLoaded(true)}
          aria-label="Load interactive map"
          style={{
            width: '100%',
            height: IFRAME_HEIGHT,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="map-placeholder-overlay">
            <div className="map-icon" style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</div>
            <h3 className="map-title" style={{ 
              fontFamily: 'Cinzel, serif',
              fontSize: '1.8rem',
              color: '#d4af37',
              marginBottom: '0.5rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
            }}>Interactive Game of Thrones Map</h3>
            <p className="map-description" style={{
              fontSize: '1rem',
              color: '#f4e8d0',
              marginBottom: '1.5rem',
              opacity: 0.9
            }}>Click to explore character journeys and locations</p>
            <span className="map-cta" style={{
              display: 'inline-block',
              padding: '12px 30px',
              background: '#c9a961',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '25px',
              boxShadow: '0 4px 15px rgba(201, 169, 97, 0.4)'
            }}>Load Map</span>
          </div>
        </button>
      ) : (
        <iframe
          src="https://quartermaester.info/"
          className="got-map-iframe"
          title="Game of Thrones Interactive Map - Character Journeys and Locations"
          allow="fullscreen"
          style={{
            width: '100%',
            height: IFRAME_HEIGHT,
            border: 'none',
            borderRadius: '8px'
          }}
        />
      )}
    </div>
  );
}
