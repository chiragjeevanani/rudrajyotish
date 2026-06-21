import { useEffect } from 'react';

/**
 * Custom hook to manage scroll-driven animations and interactions.
 * Handles:
 * 1. Auto-assigning stagger delays to children of `.reveal-stagger`
 * 2. IntersectionObserver-based count-up animations for elements with `.count-up`
 * 3. Parallax updates via `--parallax-y` custom property
 */
export function useScrollAnimation(locationPathname) {
  useEffect(() => {
    // 1. Auto-assign stagger delays
    const staggerContainers = document.querySelectorAll('.reveal-stagger');
    staggerContainers.forEach((container) => {
      const delayStep = parseInt(container.getAttribute('data-stagger-step') || '150', 10);
      const children = Array.from(container.children);
      children.forEach((child, index) => {
        child.style.setProperty('--stagger-delay', `${index * delayStep}ms`);
      });
    });

    // 2. Count-up animations via IntersectionObserver
    const countElements = document.querySelectorAll('.count-up');
    const countObserverOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.classList.contains('counted')) return;
          el.classList.add('counted');

          const target = parseFloat(el.getAttribute('data-target') || '0');
          const duration = parseInt(el.getAttribute('data-duration') || '1500', 10);
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          
          let startTime = null;

          function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Easing function: easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentValue = Math.floor(easeProgress * target);

            // Handle displaying clean integer
            el.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
            }
          }

          requestAnimationFrame(animate);
          countObserver.unobserve(el);
        }
      });
    }, countObserverOptions);

    countElements.forEach((el) => countObserver.observe(el));

    // 3. Parallax scroll handler using requestAnimationFrame
    let ticking = false;
    const updateParallax = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      document.documentElement.style.setProperty('--parallax-y', `${scrollY}px`);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set state
    updateParallax();

    return () => {
      countElements.forEach((el) => countObserver.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, [locationPathname]);
}
