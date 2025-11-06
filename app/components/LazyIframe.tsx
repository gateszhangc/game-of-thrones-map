'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyIframeProps {
  src: string;
  title: string;
  className?: string;
}

export default function LazyIframe({ src, title, className = '' }: LazyIframeProps) {
  const [isInteractive, setIsInteractive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && !isInteractive) {
        const rect = containerRef.current.getBoundingClientRect();
        // 当iframe进入视口时启用交互
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsInteractive(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInteractive]);

  return (
    <div 
      ref={containerRef}
      className="iframe-wrapper"
      style={{ position: 'relative' }}
    >
      <iframe 
        src={src}
        className={className}
        title={title}
        loading="lazy"
        allow="fullscreen"
        style={{
          pointerEvents: isInteractive ? 'auto' : 'none'
        }}
      />
      {!isInteractive && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            cursor: 'pointer',
            zIndex: 1
          }}
          onClick={() => setIsInteractive(true)}
          aria-label="Click to interact with map"
        />
      )}
    </div>
  );
}
