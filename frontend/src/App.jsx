import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Yogadhan from './pages/Yogadhan';
import Blog from './pages/Blog';
import VastuTips from './pages/VastuTips';
import Teaching from './pages/Teaching';
import Lenis from 'lenis';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import ScrollProgress from './components/ScrollProgress';
import AdminApp from './admin/AdminApp';

export default function App() {
  const location = useLocation();
  
  // Clean bypass for Admin portal routes
  if (location.pathname.startsWith('/admin')) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </div>
    );
  }

  const [displayLocation, setDisplayLocation] = useState(location);

  const [transitionStage, setTransitionStage] = useState("idle"); // idle, entering, exiting
  const [activeTransition, setActiveTransition] = useState("vastu");

  const lenisRef = useRef(null);

  // Memoize ambient background particles
  const particles = useMemo(() => {
    const colors = ['#FF3333', '#3B82F6', '#10B981', '#FBBF24'];
    return Array.from({ length: 15 }).map((_, idx) => {
      const size = Math.floor(Math.random() * 6) + 4; // 4px to 10px
      const left = Math.floor(Math.random() * 100); // 0% to 100%
      const top = Math.floor(Math.random() * 100); // 0% to 100%
      const color = colors[idx % colors.length];
      const duration = Math.floor(Math.random() * 15) + 15; // 15s to 30s
      const delay = Math.floor(Math.random() * 15) * -1; // Negative delay so they are already moving
      return { size, left, top, color, duration, delay };
    });
  }, []);

  // Initialize scroll animation engine (handles staggers, count-ups, and parallax coordinates)
  useScrollAnimation(displayLocation.pathname);

  // Dynamic transition theme picker based on destination path
  const getTransitionTheme = (pathname) => {
    if (pathname === '/' || pathname === '/services' || pathname === '/vastu-tips') {
      return 'vastu';
    }
    if (pathname === '/yogadhan' || pathname === '/testimonials') {
      return 'astrology';
    }
    return 'eclipse'; // Default for About, Contact, Blog, etc.
  };

  // Initialize Lenis Smooth Scroll globally
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change via Lenis
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setActiveTransition(getTransitionTheme(location.pathname));
      setTransitionStage("entering");
      
      const timer1 = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("exiting");
      }, 600);

      const timer2 = setTimeout(() => {
        setTransitionStage("idle");
      }, 1200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [location, displayLocation]);

  // Global Intersection Observer for Scroll Reveals
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.08
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Timeout to ensure DOM is fully painted after route transitions
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-flip, .reveal-zoom-out'
      );
      revealElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-flip, .reveal-zoom-out'
      );
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [displayLocation]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Ambient background particles */}
      {particles.map((p, idx) => (
        <div
          key={idx}
          className="particle-el"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
            animation: `particleDrift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Dynamic Celestial Curtain Loader */}
      <div 
        className={`cosmic-curtain ${transitionStage === "entering" ? "active" : ""} ${transitionStage === "exiting" ? "exit" : ""}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          
          {/* 1. Vastu Compass Grid Transition */}
          {activeTransition === 'vastu' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <svg width="200" height="200" viewBox="0 0 200 200" style={{ overflow: 'visible' }}>
                {/* Outermost compass circle */}
                <circle cx="100" cy="100" r="95" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" opacity="0.4" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="var(--color-gold)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                
                {/* Octagonal Vastu Grid */}
                <polygon points="100,10 163,37 190,100 163,163 100,190 37,163 10,100 37,37" fill="none" stroke="var(--color-gold)" strokeWidth="1" className="vastu-grid-line" opacity="0.3" />
                
                {/* Inner compass ticks & rings */}
                <circle cx="100" cy="100" r="60" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" className="vastu-compass-dial" />
                <circle cx="100" cy="100" r="5" fill="var(--color-gold)" />
                
                {/* Rotating Vastu Compass Grid Lines */}
                <g style={{ transformOrigin: 'center', animation: 'portalSpin 10s linear infinite' }}>
                  <line x1="100" y1="20" x2="100" y2="180" stroke="var(--color-gold)" strokeWidth="1" opacity="0.2" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="var(--color-gold)" strokeWidth="1" opacity="0.2" />
                  <line x1="43" y1="43" x2="157" y2="157" stroke="var(--color-gold)" strokeWidth="1" opacity="0.2" />
                  <line x1="43" y1="157" x2="157" y2="43" stroke="var(--color-gold)" strokeWidth="1" opacity="0.2" />
                </g>

                {/* Compass Direction Labels (Static & readable) */}
                <text x="100" y="32" fill="var(--color-gold)" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-serif)">N</text>
                <text x="100" y="178" fill="var(--color-gold)" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-serif)">S</text>
                <text x="172" y="104" fill="var(--color-gold)" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-serif)">E</text>
                <text x="28" y="104" fill="var(--color-gold)" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-serif)">W</text>
                <text x="145" y="52" fill="var(--color-gold)" fontSize="9" opacity="0.8" textAnchor="middle">NE</text>
                <text x="145" y="156" fill="var(--color-gold)" fontSize="9" opacity="0.8" textAnchor="middle">SE</text>
                <text x="55" y="156" fill="var(--color-gold)" fontSize="9" opacity="0.8" textAnchor="middle">SW</text>
                <text x="55" y="52" fill="var(--color-gold)" fontSize="9" opacity="0.8" textAnchor="middle">NW</text>
              </svg>
              <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', letterSpacing: '0.3em', fontSize: '0.95rem', animation: 'pulse 1.5s infinite alternate' }}>
                CALIBRATING SPACE HARMONY
              </span>
            </div>
          )}

          {/* 2. Astrology Kundli & Constellations Transition */}
          {activeTransition === 'astrology' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <svg width="200" height="200" viewBox="0 0 200 200" style={{ overflow: 'visible' }}>
                {/* Concentric rotating celestial rings */}
                <circle cx="100" cy="100" r="95" fill="none" stroke="var(--color-gold)" strokeWidth="1" strokeDasharray="6 6" style={{ transformOrigin: 'center', animation: 'portalSpin 25s linear infinite' }} />
                <circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-purple)" strokeWidth="1" opacity="0.5" style={{ transformOrigin: 'center', animation: 'portalSpinReverse 18s linear infinite' }} />
                
                {/* Traditional Square Kundli / Horoscope Chart */}
                <rect x="25" y="25" width="150" height="150" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" className="kundli-grid-line" />
                <line x1="25" y1="25" x2="175" y2="175" stroke="var(--color-gold)" strokeWidth="1.2" className="kundli-grid-line" />
                <line x1="25" y1="175" x2="175" y2="25" stroke="var(--color-gold)" strokeWidth="1.2" className="kundli-grid-line" />
                <polygon points="100,25 175,100 100,175 25,100" fill="none" stroke="var(--color-gold)" strokeWidth="1.2" className="kundli-grid-line" />
                
                {/* Sparkling Constellation Stars */}
                <circle cx="100" cy="25" r="4" fill="var(--color-gold)" className="star-point" />
                <circle cx="175" cy="100" r="4" fill="var(--color-gold)" className="star-point" />
                <circle cx="100" cy="175" r="4" fill="var(--color-gold)" className="star-point" />
                <circle cx="25" cy="100" r="4" fill="var(--color-gold)" className="star-point" />
                <circle cx="100" cy="100" r="5" fill="var(--color-purple)" className="star-point" />
              </svg>
              <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', letterSpacing: '0.3em', fontSize: '0.95rem', animation: 'pulse 1.5s infinite alternate' }}>
                ALIGNING COSMIC DESTINY
              </span>
            </div>
          )}

          {/* 3. Solar Eclipse Transit */}
          {activeTransition === 'eclipse' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '200px', height: '200px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Solar Eclipse glowing background starfield */}
                <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(229, 62, 62, 0.4) 0%, transparent 70%)', position: 'absolute' }} />
                
                {/* Glowing Sun */}
                <div className="eclipse-sun" style={{ width: '110px', height: '110px', borderRadius: '50%', background: 'radial-gradient(circle, #E53E3E 0%, #B91C1C 80%)', position: 'absolute' }} />
                
                {/* Sliding Dark Moon */}
                <div className="eclipse-moon" style={{ width: '112px', height: '112px', borderRadius: '50%', background: 'var(--bg-dark)', position: 'absolute', border: '1px solid rgba(229, 62, 62, 0.05)' }} />
                
                {/* Sparkling eclipse diamond ring flare */}
                <div className="eclipse-diamond-flare" style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 25px 10px #fff, 0 0 15px 5px var(--color-gold)', position: 'absolute', top: '48px', right: '48px' }} />
              </div>
              <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', letterSpacing: '0.3em', fontSize: '0.95rem', animation: 'pulse 1.5s infinite alternate' }}>
                SYNCHRONIZING PLANETARY TRANSIT
              </span>
            </div>
          )}

        </div>
      </div>

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div style={{ flex: 1 }} className="page-transition-wrapper" key={displayLocation.pathname}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/yogadhan" element={<Yogadhan />} />
          <Route path="/vastu-tips" element={<VastuTips />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />

      <style>{`
        @keyframes pulse {
          from { opacity: 0.4; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}
