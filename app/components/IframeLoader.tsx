'use client';

import { useEffect } from 'react';

export default function IframeLoader() {
  useEffect(() => {
    // 确保页面在顶部
    window.scrollTo(0, 0);

    const iframe = document.querySelector('.got-map-iframe') as HTMLIFrameElement;
    if (!iframe) return;

    let isMonitoring = true;
    let lastUserScroll = Date.now();
    let userScrollTimeout: NodeJS.Timeout;

    // 监听滚动事件，区分用户滚动和自动滚动
    const handleScroll = () => {
      if (!isMonitoring) return;

      // 如果滚动位置大于800px（接近iframe位置），且不是用户主动滚动
      const now = Date.now();
      const timeSinceLastUserScroll = now - lastUserScroll;
      
      // 如果在很短时间内（100ms）滚动超过800px，很可能是自动滚动
      if (window.scrollY > 800 && timeSinceLastUserScroll > 100) {
        // 立即滚回顶部，使用instant避免动画
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };

    // 监听用户的滚动意图（鼠标滚轮、触摸等）
    const markUserScroll = () => {
      lastUserScroll = Date.now();
      clearTimeout(userScrollTimeout);
      // 100ms内的滚动都认为是用户操作
      userScrollTimeout = setTimeout(() => {
        lastUserScroll = Date.now() - 200;
      }, 100);
    };

    // 添加事件监听
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', markUserScroll, { passive: true });
    window.addEventListener('touchmove', markUserScroll, { passive: true });

    // 延迟加载iframe
    const loadTimer = setTimeout(() => {
      const src = iframe.getAttribute('data-src');
      if (src) {
        iframe.src = src;
      }
    }, 500);

    // iframe加载后，等待其稳定
    const stopMonitoringTimer = setTimeout(() => {
      isMonitoring = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', markUserScroll);
      window.removeEventListener('touchmove', markUserScroll);
      // 最后确保在顶部
      if (window.scrollY > 100) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 2500); // 500ms加载延迟 + 2000ms稳定时间

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(stopMonitoringTimer);
      clearTimeout(userScrollTimeout);
      isMonitoring = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', markUserScroll);
      window.removeEventListener('touchmove', markUserScroll);
    };
  }, []);

  return null;
}
