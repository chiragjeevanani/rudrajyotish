import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import './VastuBook.css';
import { getImageUrl } from '../utils/image';

export default function VastuBook({ pages = [], bookMeta = {} }) {
  const [activeLeaf, setActiveLeaf] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobilePage, setMobilePage] = useState(0); // For mobile sequential sliding
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const meta = {
    coverTitle: bookMeta.coverTitle || 'Vastu Shastra\nTips Book',
    coverSubtitle: bookMeta.coverSubtitle || 'Sacred Wisdom',
    coverLogo: bookMeta.coverLogo || '/rudralogodark.png',
    introTitle: bookMeta.introTitle || 'Introduction',
    introText: bookMeta.introText || '"Harmonize your environment to balance the five natural elements, opening the doors to happiness and health."',
    outroTitle: bookMeta.outroTitle || 'Rudra Jyotish',
    outroText: bookMeta.outroText || 'Bringing ancient cosmic wisdom to contemporary homes and offices.',
    endTitle: bookMeta.endTitle || 'RUDRA JYOTISH',
    endSubtitle: bookMeta.endSubtitle || 'PEACE • WEALTH • HARMONY',
    endLogo: bookMeta.endLogo || '/rudralogodark.png'
  };

  const coverLogoUrl = getImageUrl(meta.coverLogo);
  const endLogoUrl = getImageUrl(meta.endLogo);

  if (pages.length === 0) {
    return (
      <section id="section-0" className="vastu-book-section">
        <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '20px', background: 'rgba(197,168,128,0.1)', border: '1px solid rgba(197,168,128,0.25)', marginBottom: '16px' }}>
            <BookOpen size={13} style={{ color: 'var(--color-gold)' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', color: 'var(--color-gold)' }}>VASTU WISDOM BOOK</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '12px' }} className="gold-gradient-text">
            Tips Book
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.92rem' }}>
            Our curated Vastu tips book is being prepared. Please check back soon for beautifully illustrated guidance.
          </p>
        </div>
      </section>
    );
  }

  // Define leaves structure for Desktop
  const leaves = [];

  // 1. Cover Leaf (Leaf 0)
  leaves.push({
    isCover: true,
    front: (
      <div className="leaf-page leaf-page-front">
        <div className="book-cover-border" />
        <div className="book-cover-badge" style={{ width: '100px', height: '100px' }}>
          <img 
            src={coverLogoUrl} 
            alt="Cover Logo" 
            style={{ width: '75px', height: '75px', objectFit: 'contain' }} 
          />
        </div>
        <h2 className="book-cover-title" style={{ whiteSpace: 'pre-line' }}>{meta.coverTitle}</h2>
        <div style={{ width: '60px', height: '2px', background: 'var(--book-gold)', margin: '15px 0' }} />
        <span className="book-cover-subtitle">{meta.coverSubtitle}</span>
        <span className="book-cover-hint">— tap to open book —</span>
      </div>
    ),
    back: (
      <div className="leaf-page leaf-page-back inside-liner">
        <div className="inside-liner-pattern">
          <BookOpen size={48} style={{ color: 'rgba(139, 69, 19, 0.25)', marginBottom: '15px' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', color: '#5c4c38', fontSize: '1.25rem', margin: '0 0 8px', textAlign: 'center' }}>{meta.introTitle}</h3>
          <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: '#7a6a54', textAlign: 'center', width: '80%', lineHeight: '1.6', margin: 0 }}>
            {meta.introText}
          </p>
        </div>
      </div>
    )
  });

  // 2. Data leaves
  for (let i = 0; i < pages.length; i += 2) {
    const p1 = pages[i];
    const p2 = pages[i + 1];

    leaves.push({
      isCover: false,
      front: (
        <div className="leaf-page leaf-page-front">
          {p1 ? (
            <>
              <div className="book-page-image-container">
                <img src={getImageUrl(p1.imageUrl)} alt={p1.caption} className="book-page-image" />
              </div>
              <p className="book-page-caption">{p1.caption}</p>
              <span className="book-page-number">Page {i + 1}</span>
            </>
          ) : (
            <div style={{ opacity: 0.15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <BookOpen size={48} />
              <span style={{ fontSize: '0.8rem', marginTop: '10px' }}>End of wisdom</span>
            </div>
          )}
        </div>
      ),
      back: (
        <div className="leaf-page leaf-page-back">
          {p2 ? (
            <>
              <div className="book-page-image-container">
                <img src={getImageUrl(p2.imageUrl)} alt={p2.caption} className="book-page-image" />
              </div>
              <p className="book-page-caption">{p2.caption}</p>
              <span className="book-page-number">Page {i + 2}</span>
            </>
          ) : (
            <div style={{ opacity: 0.15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <BookOpen size={48} />
              <span style={{ fontSize: '0.8rem', marginTop: '10px' }}>End of wisdom</span>
            </div>
          )}
        </div>
      )
    });
  }

  // 3. Back Cover Leaf (Leaf totalLeaves - 1)
  leaves.push({
    isCover: true,
    front: (
      <div className="leaf-page leaf-page-front inside-liner">
        <div className="inside-liner-pattern">
          <Sparkles size={40} style={{ color: 'rgba(139, 69, 19, 0.25)', marginBottom: '15px' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', color: '#5c4c38', fontSize: '1.25rem', margin: '0 0 8px', textAlign: 'center' }}>{meta.outroTitle}</h3>
          <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: '#7a6a54', textAlign: 'center', width: '80%', lineHeight: '1.6', margin: 0 }}>
            {meta.outroText}
          </p>
        </div>
      </div>
    ),
    back: (
      <div className="leaf-page leaf-page-back">
        <div className="book-cover-border" />
        <img 
          src={endLogoUrl} 
          alt="End Cover Logo" 
          style={{ width: '120px', height: '120px', objectFit: 'contain', marginBottom: '15px' }} 
        />
        <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--book-gold)', fontSize: '1.3rem', marginTop: '10px', letterSpacing: '0.08em', textAlign: 'center' }}>{meta.endTitle}</h3>
        <span style={{ fontSize: '0.65rem', color: 'rgba(229, 193, 88, 0.4)', marginTop: '30px', letterSpacing: '0.15em' }}>{meta.endSubtitle}</span>
      </div>
    )
  });

  const totalLeaves = leaves.length;

  const handleNext = () => {
    if (activeLeaf < totalLeaves) {
      setActiveLeaf(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeLeaf > 0) {
      setActiveLeaf(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setActiveLeaf(0);
  };

  // Determine viewport class depending on open/closed state
  let viewportClass = 'open';
  if (activeLeaf === 0) {
    viewportClass = 'closed-front';
  } else if (activeLeaf === totalLeaves) {
    viewportClass = 'closed-back';
  }

  /* ─────────── MOBILE CARD SLIDER FLOW ─────────── */
  const mobilePages = [];

  // 1. Cover Leaf - Front (Front Cover)
  mobilePages.push({
    type: 'cover',
    label: 'Cover',
    content: (
      <div className="mobile-book-card cover-page">
        <div className="book-cover-border" />
        <div className="book-cover-badge" style={{ width: '85px', height: '85px' }}>
          <img 
            src={coverLogoUrl} 
            alt="Cover Logo" 
            style={{ width: '65px', height: '65px', objectFit: 'contain' }} 
          />
        </div>
        <h2 className="book-cover-title" style={{ fontSize: '1.65rem', whiteSpace: 'pre-line' }}>{meta.coverTitle}</h2>
        <div style={{ width: '50px', height: '1.5px', background: 'var(--book-gold)', margin: '15px 0' }} />
        <span className="book-cover-subtitle" style={{ fontSize: '0.75rem' }}>{meta.coverSubtitle}</span>
        <span className="book-cover-hint" style={{ marginTop: '20px' }}>— swipe to read —</span>
      </div>
    )
  });

  // 2. Cover Leaf - Back (Introduction)
  mobilePages.push({
    type: 'intro',
    label: 'Introduction',
    content: (
      <div className="mobile-book-card inside-liner">
        <div className="inside-liner-pattern">
          <BookOpen size={40} style={{ color: 'rgba(139, 69, 19, 0.25)', marginBottom: '15px' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', color: '#5c4c38', fontSize: '1.2rem', margin: '0 0 8px', textAlign: 'center' }}>{meta.introTitle}</h3>
          <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: '#7a6a54', textAlign: 'center', width: '80%', lineHeight: '1.6', margin: 0 }}>
            {meta.introText}
          </p>
        </div>
      </div>
    )
  });

  // 3. Tip Pages
  pages.forEach((page, index) => {
    mobilePages.push({
      type: 'tip',
      label: `Page ${index + 1}`,
      content: (
        <div className="mobile-book-card inner-page">
          <div className="book-page-image-container">
            <img src={getImageUrl(page.imageUrl)} alt={page.caption} className="book-page-image" />
          </div>
          <p className="book-page-caption" style={{ fontSize: '0.82rem', paddingBottom: '5px' }}>
            {page.caption}
          </p>
          <span className="book-page-number" style={{ position: 'static', marginTop: '10px' }}>
            Page {index + 1} of {pages.length}
          </span>
        </div>
      )
    });
  });

  // 4. Back Cover Leaf - Front (Outro / Inside Back Cover)
  mobilePages.push({
    type: 'outro',
    label: 'Outro',
    content: (
      <div className="mobile-book-card inside-liner">
        <div className="inside-liner-pattern">
          <Sparkles size={36} style={{ color: 'rgba(139, 69, 19, 0.25)', marginBottom: '15px' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', color: '#5c4c38', fontSize: '1.2rem', margin: '0 0 8px', textAlign: 'center' }}>{meta.outroTitle}</h3>
          <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: '#7a6a54', textAlign: 'center', width: '80%', lineHeight: '1.6', margin: 0 }}>
            {meta.outroText}
          </p>
        </div>
      </div>
    )
  });

  // 5. Back Cover Leaf - Back (Back Cover)
  mobilePages.push({
    type: 'back-cover',
    label: 'End',
    content: (
      <div className="mobile-book-card cover-page">
        <div className="book-cover-border" />
        <img 
          src={endLogoUrl} 
          alt="End Cover Logo" 
          style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '15px' }} 
        />
        <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--book-gold)', fontSize: '1.25rem', marginTop: '10px', letterSpacing: '0.08em', textAlign: 'center' }}>{meta.endTitle}</h3>
        <span style={{ fontSize: '0.6rem', color: 'rgba(229, 193, 88, 0.4)', marginTop: '20px', letterSpacing: '0.15em' }}>{meta.endSubtitle}</span>
      </div>
    )
  });

  const mobileTotalSteps = mobilePages.length;

  const goMobileNext = () => {
    if (mobilePage < mobileTotalSteps - 1) {
      setMobilePage(prev => prev + 1);
    }
  };

  const goMobilePrev = () => {
    if (mobilePage > 0) {
      setMobilePage(prev => prev - 1);
    }
  };

  const goMobileReset = () => {
    setMobilePage(0);
  };

  // Touch handlers for swipe on mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goMobileNext();
    }
    if (isRightSwipe) {
      goMobilePrev();
    }
  };

  // Render Mobile Layout
  if (isMobile) {
    const currentPage = mobilePages[mobilePage];
    const isMobileBackCover = mobilePage === mobileTotalSteps - 1;

    return (
      <section id="section-0" className="vastu-book-section">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '20px', background: 'rgba(197,168,128,0.1)', border: '1px solid rgba(197,168,128,0.25)', marginBottom: '16px' }}>
            <BookOpen size={13} style={{ color: 'var(--color-gold)' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', color: 'var(--color-gold)' }}>VASTU WISDOM BOOK</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '12px' }} className="gold-gradient-text">
            Explore the Tips Book
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.92rem' }}>
            Swipe or tap arrows below to turn pages and explore Vastu guidelines.
          </p>
        </div>

        {/* Mobile Page Display Card */}
        <div 
          className="mobile-book-card-container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {currentPage ? currentPage.content : null}
        </div>

        {/* Mobile Navigation controls */}
        <div className="book-navigation-controls" style={{ marginTop: '25px' }}>
          <button
            className="book-nav-btn"
            onClick={goMobilePrev}
            disabled={mobilePage === 0}
            aria-label="Previous Page"
          >
            <ChevronLeft size={20} />
          </button>

          {isMobileBackCover ? (
            <button
              className="book-nav-btn"
              onClick={goMobileReset}
              style={{ borderRadius: '24px', width: 'auto', padding: '0 20px', gap: '8px' }}
              title="Read again"
            >
              <RotateCcw size={14} />
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Reset</span>
            </button>
          ) : (
            <div className="book-status-indicator" style={{ minWidth: '90px' }}>
              {currentPage ? currentPage.label : ''}
            </div>
          )}

          <button
            className="book-nav-btn"
            onClick={goMobileNext}
            disabled={mobilePage === mobileTotalSteps - 1}
            aria-label="Next Page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    );
  }

  // Render Desktop Layout (Default 3D Page flip)
  return (
    <section id="section-0" className="vastu-book-section">
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '20px', background: 'rgba(197,168,128,0.1)', border: '1px solid rgba(197,168,128,0.25)', marginBottom: '16px' }}>
          <BookOpen size={13} style={{ color: 'var(--color-gold)' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', color: 'var(--color-gold)' }}>VASTU WISDOM BOOK</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '12px' }} className="gold-gradient-text">
          Explore the Tips Book
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.92rem' }}>
          {activeLeaf === 0
            ? 'Tap or click on the cover to open and flip pages.'
            : activeLeaf === totalLeaves
            ? 'You have reached the end of the tips book. Press reset or previous to read again.'
            : 'Click the arrows or tap pages directly to flip back and forth.'}
        </p>
      </div>

      {/* Book Scene */}
      <div className="book-scene">
        <div className={`book-viewport ${viewportClass}`}>
          {leaves.map((leaf, index) => {
            const isFlipped = index < activeLeaf;
            const zIndex = isFlipped ? index : totalLeaves - index;
            
            // Cover leaves get a special size scale
            const isCoverLeaf = leaf.isCover;
            const leafClass = `book-leaf ${isCoverLeaf ? 'cover-leaf' : 'page-leaf'} ${isFlipped ? 'flipped' : ''}`;

            return (
              <div
                key={index}
                className={leafClass}
                style={{
                  zIndex: zIndex,
                  transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                }}
                onClick={(e) => {
                  // If clicking directly on a page, turn page organically
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  
                  if (isFlipped) {
                    // Page is on the left side, clicking inside it flips it back right
                    handlePrev();
                  } else {
                    // Page is on the right side, clicking inside it flips it left
                    handleNext();
                  }
                  e.stopPropagation();
                }}
              >
                {/* Front Side */}
                {leaf.front}

                {/* Back Side */}
                {leaf.back}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="book-navigation-controls">
        <button
          className="book-nav-btn"
          onClick={handlePrev}
          disabled={activeLeaf === 0}
          aria-label="Previous Page"
        >
          <ChevronLeft size={22} />
        </button>

        {activeLeaf === totalLeaves ? (
          <button
            className="book-nav-btn"
            onClick={handleReset}
            style={{ borderRadius: '24px', width: 'auto', padding: '0 20px', gap: '8px' }}
            title="Read again"
          >
            <RotateCcw size={16} />
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Reset</span>
          </button>
        ) : (
          <div className="book-status-indicator">
            {activeLeaf === 0 
              ? 'Cover' 
              : activeLeaf === totalLeaves
              ? 'End'
              : `Page ${activeLeaf * 2 - 1} - ${activeLeaf * 2}`}
          </div>
        )}

        <button
          className="book-nav-btn"
          onClick={handleNext}
          disabled={activeLeaf === totalLeaves}
          aria-label="Next Page"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
