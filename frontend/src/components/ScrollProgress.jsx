import React, { useEffect, useRef } from 'react';

/**
 * ScrollProgress renders a top fixed thin progress bar
 * representing the scroll progress of the active page.
 * Uses direct DOM manipulation & RAF for 60 FPS buttery smooth updates.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!barRef.current) return;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScrollable = scrollHeight - clientHeight;
      
      if (totalScrollable > 0) {
        const scrolledPercentage = (window.scrollY / totalScrollable) * 100;
        barRef.current.style.width = `${scrolledPercentage}%`;
      } else {
        barRef.current.style.width = '0%';
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial call
    updateProgress();

    // Periodically sync scroll height in case layout shifts dynamically as content loads/animates
    const syncInterval = setInterval(updateProgress, 250);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearInterval(syncInterval);
    };
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '0%',
        height: '3.5px',
        background: 'linear-gradient(90deg, var(--color-gold) 0%, var(--color-purple) 50%, var(--color-indigo) 100%)',
        zIndex: 99999,
        pointerEvents: 'none',
        boxShadow: '0 1px 8px rgba(255, 51, 51, 0.25)',
        willChange: 'width'
      }}
    />
  );
}
