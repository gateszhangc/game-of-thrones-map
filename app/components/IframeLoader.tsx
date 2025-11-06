'use client';

import { useEffect } from 'react';

export default function IframeLoader() {
  useEffect(() => {
    let scrollBlocked = true;
    
    // 阻止所有滚动，直到iframe加载完成
    const preventScroll = () => {
      if (scrollBlocked) {
        window.scrollTo(0, 0);
      }
    };

    // 立即滚动到顶部
    window.scrollTo(0, 0);
    
    // 监听滚动事件
    window.addEventListener('scroll', preventScroll, { passive: true });
    
    const iframe = document.querySelector('.got-map-iframe') as HTMLIFrameElement;
    if (!iframe) return;

    // 延迟加载iframe
    const loadTimer = setTimeout(() => {
      const src = iframe.getAttribute('data-src');
      if (src) {
        iframe.src = src;
        
        // iframe加载后，再等待一段时间确保其内容稳定
        const unblockTimer = setTimeout(() => {
          scrollBlocked = false;
          window.removeEventListener('scroll', preventScroll);
          window.scrollTo(0, 0); // 最后确保在顶部
        }, 1500);
        
        return () => clearTimeout(unblockTimer);
      }
    }, 300);

    return () => {
      clearTimeout(loadTimer);
      scrollBlocked = false;
      window.removeEventListener('scroll', preventScroll);
    };
  }, []);

  return null;
}
