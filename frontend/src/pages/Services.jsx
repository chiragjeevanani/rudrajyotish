import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Sun, Star, Compass, Heart, Eye, ArrowRight, Radio, ChevronLeft, ChevronRight } from 'lucide-react';

const defaultServices = [
  {
    title: 'Vastu Discussion',
    sub: 'Directions, Placements & Energy Corrections',
    desc: 'Vastu consultation balances the energy of your home or workplace environment. It provides guidance on directions, placements, and necessary corrections. These suggestions help create prosperity, peace, and overall well-being completely without demolition.',
    price: 5100,
    duration: 60,
    note: 'Vastu Consultation fees will decide after discussion',
    imgUrl: '/vastu_terracotta.png',
    list: [
      'Residential Vastu: Peaceful living & family well-being',
      'Office & Showroom Vastu: Enhanced sales & productivity',
      'Factory Vastu: Machinery alignment & operational safety',
      'School & College Vastu: Concentration & academic growth',
      'Hotel & Hospital Vastu: Fast healing & guest comfort'
    ],
    category: 'Vastu Shastra'
  },
  {
    title: 'Numerology Consultation',
    sub: 'Vibrational Frequency & Lo Shu Grid',
    desc: 'Numerology helps you understand how numbers influence your life path and personality. It provides guidance for career, relationships, and financial decisions with deeper clarity, utilizing classic birth grid alignments.',
    price: 3100,
    duration: 30,
    note: 'Lifetime Report + Remedies',
    imgUrl: '/numerology_terracotta.png',
    list: [
      'Name vibration tuning & correction',
      'Birth & Destiny numbers assessment',
      'Personal or corporate branding alignment',
      'Lucky dates, periods & cycle guides'
    ],
    category: 'Numerology'
  },
  {
    title: 'Astrology Consultation',
    sub: 'Kundli Readings & Planetary Cures',
    desc: 'Astrology consultation analyzes your birth chart to understand life challenges and opportunities. It gives clear answers related to career, marriage, health, and personal growth. Effective remedies are suggested to reduce obstacles and bring positivity.',
    price: 4100,
    duration: 45,
    imgUrl: '/astrology_terracotta.png',
    list: [
      'Birth chart (Kundli) assessment',
      'Major period (Dasha) analysis',
      'Practical gemstone & elemental remedies',
      'Negative star alignment corrections'
    ],
    category: 'Astrology'
  },
  {
    title: 'Tarot Reading',
    sub: 'Intuitive Insight & Future Paths',
    desc: 'Tarot reading offers intuitive insights into your present situation and future possibilities. It helps you find answers about love, career, emotions, and important life choices. The session brings clarity, confidence, and peaceful direction to your mind.',
    price: 2100,
    duration: 45,
    imgUrl: '/tarot_terracotta.png',
    list: [
      'Love & relationship emotional insights',
      'Paragraph timing answers',
      'Decision-making clarity guidance',
      'Mindfulness & spiritual grounding'
    ],
    category: 'Tarot Reading'
  },
  {
    title: 'Relationship Counselling',
    sub: 'Mutual Understanding & Connection',
    desc: 'Relationship counselling helps you improve understanding and emotional connection with your partner or family. It focuses on resolving conflicts, misunderstandings, and communication issues effectively.',
    price: 2400,
    duration: 60,
    imgUrl: '/relationship_terracotta.png',
    list: [
      'Couples communication mapping',
      'Resolving family grid conflicts',
      'Overcoming generational misunderstandings',
      'Deepening mutual trust & connection'
    ],
    category: 'Counselling'
  },
  {
    title: 'Aura Scanner',
    sub: 'Energy Vibrations & Environmental Scanning',
    desc: 'Aura scanning evaluates the energy fields around you or your physical properties. By checking the energy of land, homes, and factories, it helps identify blockages, geopathic stress, and positive vibrational hot spots.',
    price: 500,
    note: 'To check energy of land, homes, factories',
    imgUrl: '/vastu_terracotta.png',
    list: [
      'Detecting geopathic stress & energy leaks',
      'Checking energy frequency of lands & plots',
      'Home energy field alignment analysis',
      'Factory machinery & workspace vibe scan'
    ],
    category: 'Aura Scanner'
  }
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [flipState, setFlipState] = useState({ active: false, direction: 'forward', key: 0 });

  const getServiceStyles = (s) => {
    const category = (s.category || '').toLowerCase();
    if (category.includes('vastu')) {
      return {
        colorVar: 'var(--color-indigo)',
        badgeClass: 'badge-earth',
        borderVal: 'rgba(16, 185, 129, 0.3)',
        bgVal: 'rgba(16, 185, 129, 0.08)',
        activeGlow: 'rgba(16, 185, 129, 0.12)',
        icon: <Sun size={22} />
      };
    } else if (category.includes('numerology')) {
      return {
        colorVar: 'var(--color-yellow)',
        badgeClass: 'badge-gold',
        borderVal: 'rgba(251, 191, 36, 0.3)',
        bgVal: 'rgba(251, 191, 36, 0.08)',
        activeGlow: 'rgba(251, 191, 36, 0.12)',
        icon: <Sparkles size={22} />
      };
    } else if (category.includes('astrology')) {
      return {
        colorVar: 'var(--color-purple)',
        badgeClass: 'badge-water',
        borderVal: 'rgba(59, 130, 246, 0.3)',
        bgVal: 'rgba(59, 130, 246, 0.08)',
        activeGlow: 'rgba(59, 130, 246, 0.12)',
        icon: <Compass size={22} />
      };
    } else if (category.includes('tarot')) {
      return {
        colorVar: 'var(--color-gold)',
        badgeClass: 'badge-fire',
        borderVal: 'rgba(255, 51, 51, 0.3)',
        bgVal: 'rgba(255, 51, 51, 0.08)',
        activeGlow: 'rgba(255, 51, 51, 0.12)',
        icon: <Eye size={22} />
      };
    } else if (category.includes('counsel') || category.includes('relationship')) {
      return {
        colorVar: 'var(--color-purple)',
        badgeClass: 'badge-water',
        borderVal: 'rgba(59, 130, 246, 0.3)',
        bgVal: 'rgba(59, 130, 246, 0.08)',
        activeGlow: 'rgba(59, 130, 246, 0.12)',
        icon: <Heart size={22} />
      };
    } else {
      return {
        colorVar: 'var(--color-indigo)',
        badgeClass: 'badge-earth',
        borderVal: 'rgba(16, 185, 129, 0.3)',
        bgVal: 'rgba(16, 185, 129, 0.08)',
        activeGlow: 'rgba(16, 185, 129, 0.12)',
        icon: <Radio size={22} />
      };
    }
  };

  const rawServices = defaultServices;
  
  const fullServices = rawServices.map(s => {
    const styles = getServiceStyles(s);
    return {
      title: s.title,
      sub: s.sub || '',
      desc: s.desc,
      price: s.price,
      duration: s.duration ? `${s.duration} mins` : '',
      note: s.note || '',
      img: s.imgUrl || s.img || '/vastu_terracotta.png',
      list: s.list || [],
      ...styles
    };
  });

  const activeService = fullServices[activeIdx] || fullServices[0];


  const renderCardContent = (service, showArrows = false) => {
    if (!service) return null;
    return (
      <>
        {/* Active Detail Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', height: '100%', justifyContent: 'space-between', zIndex: 1 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: service.colorVar, fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 'bold' }}>
                {service.sub.toUpperCase()}
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginTop: '6px', color: 'var(--text-primary)' }}>
              {service.title}
            </h2>
            <div style={{ width: '50px', height: '2px', backgroundColor: service.colorVar, margin: '10px 0' }}></div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '15px' }}>
              {service.desc}
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '24px', 
              margin: '15px 0', 
              padding: '12px 16px', 
              background: 'rgba(255, 255, 255, 0.02)', 
              borderRadius: '8px', 
              border: '1px solid ' + service.borderVal,
              flexWrap: 'wrap'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Energy Exchange</span>
                <span style={{ color: service.colorVar, fontSize: '1.25rem', fontWeight: 'bold' }}>
                  ₹{service.price}/-
                </span>
              </div>
              {service.duration && (
                <div style={{ borderLeft: '1px solid ' + service.borderVal, paddingLeft: '24px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duration</span>
                  <span style={{ color: service.colorVar, fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {service.duration}
                  </span>
                </div>
              )}
            </div>
            
            {service.note && (
              <div style={{ 
                fontSize: '0.8rem', 
                color: service.colorVar,
                fontStyle: 'italic', 
                background: 'rgba(212, 175, 55, 0.05)', 
                padding: '8px 12px', 
                borderRadius: '6px', 
                borderLeft: '2px solid ' + service.colorVar,
                marginTop: '10px',
                lineHeight: '1.4'
              }}>
                * {service.note}
              </div>
            )}
          </div>

          {/* Scope / Deliverables list */}
          <div>
            <h4 style={{ color: service.colorVar, fontSize: '0.85rem', marginBottom: '8px', letterSpacing: '0.05em' }}>
              Scope & Specialized Offerings
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {service.list.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  <Star size={8} style={{ color: service.colorVar, marginTop: '4px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA action */}
          <div style={{ marginTop: '10px' }}>
            <Link to="/contact" className="cosmic-button" style={{ width: '100%', justifyContent: 'center', padding: '10px 20px', fontSize: '0.85rem' }}>
              Inquire About {service.title}
            </Link>
          </div>
        </div>

        {/* Active Artwork Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '100%', justifyContent: 'center', zIndex: 1 }}>
          <div className="magnetic-hover" style={{ 
            borderRadius: '16px', 
            overflow: 'visible', 
            border: '2px solid rgba(217, 125, 100, 0.3)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(217, 125, 100, 0.1)',
            background: 'var(--bg-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            aspectRatio: '1/1',
            width: '100%'
          }}>
            {showArrows && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const prevIdx = (activeIdx - 1 + fullServices.length) % fullServices.length;
                    handleTabClick(prevIdx, e);
                  }}
                  className="celestial-nav-arrow arrow-left"
                  aria-label="Previous Service"
                  style={{ pointerEvents: 'auto' }}
                >
                  <ChevronLeft size={22} style={{ color: 'var(--color-gold)' }} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextIdx = (activeIdx + 1) % fullServices.length;
                    handleTabClick(nextIdx, e);
                  }}
                  className="celestial-nav-arrow arrow-right"
                  aria-label="Next Service"
                  style={{ pointerEvents: 'auto' }}
                >
                  <ChevronRight size={22} style={{ color: 'var(--color-gold)' }} />
                </button>
              </>
            )}
            <img 
              src={service.img} 
              alt={service.title} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                transition: 'all 0.5s ease',
                padding: '8px'
              }} 
            />
          </div>
          <span style={{ 
            textAlign: 'center', 
            color: 'var(--text-muted)', 
            fontSize: '0.75rem', 
            fontStyle: 'italic',
            letterSpacing: '0.05em'
          }}>
            Official Celestial Artwork for {service.title}
          </span>
        </div>
      </>
    );
  };

  const handleTabClick = (newIdx, e) => {
    if (e && e.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    if (newIdx === activeIdx || flipState.active) return;
    const diff = newIdx - activeIdx;
    const direction = diff > 0 ? 'forward' : 'backward';
    const count = Math.min(Math.abs(diff), 3);
    
    // Calculate the exact service indices to render on each double-sided sheet
    const sheetPages = [];
    if (direction === 'forward') {
      for (let i = 0; i < count; i++) {
        sheetPages.push({
          front: activeIdx + i,
          back: activeIdx + i + 1
        });
      }
    } else {
      for (let i = 0; i < count; i++) {
        sheetPages.push({
          front: activeIdx - 1 - i,
          back: activeIdx - i
        });
      }
    }

    setFlipState({
      active: true,
      direction,
      sheetPages,
      key: Date.now()
    });

    const swapDelay = (count - 1) * 40 + 130;
    const totalDelay = (count - 1) * 40 + 290;

    // Swap content at exactly the vertical midpoint of the last turning page sheet
    setTimeout(() => {
      setActiveIdx(newIdx);
    }, swapDelay);

    setTimeout(() => {
      setFlipState((prev) => ({ ...prev, active: false }));
    }, totalDelay);
  };

  return (
    <div style={{ padding: '45px 20px 60px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Mystical Cosmic Header */}
      <section style={{ textAlign: 'center', marginBottom: '35px' }} className="reveal-zoom-out">
        <span style={{ color: 'var(--color-gold)', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 'bold' }}>THE DIVINE PATH</span>
        <h1 style={{ fontSize: '2.3rem', marginTop: '8px', marginBottom: '10px' }} className="gold-gradient-text">Our Divine Offerings</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.95rem' }}>
          Explore professional, non-demolition consultations structured to align spaces, cosmic planets, numbers, and energies to invite success, peace, and abundance.
        </p>
      </section>

      {/* Main Interactive Showcase Board */}
      <div className="celestial-services-grid">
        
        {/* Left Side: Elegant Selector Menu */}
        <div className="reveal-left reveal-stagger services-selector-container" data-stagger-step="50">
          {fullServices.map((service, index) => {
            const isActive = activeIdx === index;
            return (
              <button
                key={index}
                onClick={(e) => handleTabClick(index, e)}
                style={{
                  background: isActive ? 'linear-gradient(90deg, rgba(217, 125, 100, 0.08) 0%, var(--bg-dark) 100%)' : 'var(--bg-dark)',
                  border: isActive ? '1px solid var(--color-gold)' : '1px solid var(--border-glass)',
                  padding: '12px 16px',
                  boxShadow: isActive ? '0 4px 15px rgba(217, 125, 100, 0.08)' : 'none',
                }}
                className="selector-tab reveal"
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="active-tab-indicator" style={{
                    backgroundColor: service.colorVar
                  }} />
                )}

                {/* Icon Wrapper */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isActive ? 'rgba(217, 125, 100, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: isActive ? '1px solid var(--color-gold)' : '1px solid var(--border-glass)',
                  color: isActive ? 'var(--color-gold)' : 'var(--text-muted)',
                  transition: 'all 0.3s'
                }}>
                  {service.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '0.95rem', 
                    margin: 0, 
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: isActive ? '600' : '400',
                    transition: 'all 0.3s'
                  }}>
                    {service.title}
                  </h3>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    color: isActive ? service.colorVar : 'rgba(148, 163, 184, 0.6)',
                    marginTop: '3px',
                    display: 'block'
                  }}>
                    {service.sub.split(' & ')[0]}
                  </span>
                </div>

                <ArrowRight 
                  size={14} 
                  style={{ 
                    color: isActive ? service.colorVar : 'rgba(255, 255, 255, 0.1)',
                    transform: isActive ? 'translateX(0)' : 'translateX(-5px)',
                    transition: 'all 0.3s'
                  }} 
                />
              </button>
            );
          })}
        </div>

        {/* Right Side: Butter-Smooth 3D Page Flip Board */}
        <div className="celestial-board-wrapper">
          {flipState.active && (
            <div className="book-page-container" key={flipState.key}>
              {flipState.sheetPages.map((sheet, idx) => {
                const frontService = fullServices[sheet.front];
                const backService = fullServices[sheet.back];
                return (
                  <div 
                    key={idx}
                    className={`paper-sheet-overlay flip-page-${flipState.direction}`}
                    style={{
                      animationDelay: `${idx * 40}ms`,
                      zIndex: flipState.direction === 'forward' 
                        ? 200 + (flipState.sheetPages.length - idx) 
                        : 200 + idx
                    }}
                  >
                    <div className="page-face page-face-front celestial-board glow-pulse">
                      {renderCardContent(frontService, false)}
                    </div>
                    <div className="page-face page-face-back celestial-board glow-pulse">
                      {renderCardContent(backService, false)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="celestial-board glow-pulse">
            {renderCardContent(activeService, true)}
          </div>
        </div>

      </div>

    </div>
  );
}

