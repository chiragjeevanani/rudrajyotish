import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Sun, Star, Award, Compass, ChevronRight, Check, AlertCircle, Quote } from 'lucide-react';
import { getImageUrl } from '../utils/image';

const iconMapper = {
  Compass: <Compass size={22} />,
  Sparkles: <Sparkles size={22} />,
  Sun: <Sun size={22} />,
  Star: <Star size={22} />,
  Award: <Award size={22} />
};

const defaultHomeContent = {
  hero: {
    badge: 'CELESTIAL HARMONY',
    titleLine1: 'Rudra Jyotish',
    titleLine2: 'Transforming Spaces & Destiny',
    description: 'Unlock peace, wealth, and abundance through logical, scientific Vastu alignments and supportive numerological frequency corrections.',
    imageUrl: '/home_hero_jyotish.png',
    ctaText: 'Book a Consultation',
    compassCtaText: 'Align Your Compass'
  },
  compass: {
    badge: 'INTERACTIVE STABILITY',
    title: 'Test Your Energy Direction',
    description: 'Our universe works through direct currents. Tap the Vastu Chakra on the left to rotate and align the spatial flow. In ancient Vastu, each of the 16 sectors governs a key area of life.',
    successText: 'Vastu Energy Flow Fully Calibrated!',
    instructionText: 'Tap the Vastu Chakra to calibrate space flow.'
  },
  methodology: {
    title: 'Our Three-Step Scientific Flow',
    steps: [
      { num: '01', title: 'Energy Mapping', desc: 'We map the precise directional layout of your premises against the cosmic horoscope coordinates of the primary resident.', icon: 'Compass' },
      { num: '02', title: 'No-Demolition Balancing', desc: 'Imbalances are rectified using natural colors, specific metal rods, or celestial crystals. 0% structural changes required.', icon: 'Sparkles' },
      { num: '03', title: 'Progressive Remedies', desc: 'We introduce subtle remedies and personal name corrections to align the environment’s frequency with supportive forces.', icon: 'Sun' }
    ]
  },
  whyUs: {
    badge: 'TRUST PRINCIPLES',
    title: 'Why Align With Us?',
    description: 'We provide clear, practical guides that adapt Vastu and Numerology principles to contemporary living standards.',
    benefits: [
      { text: '100% Scientific directional mapping', color: 'var(--color-purple)' },
      { text: 'Custom-tailored Lo Shu grid numerology analysis', color: 'var(--color-yellow)' },
      { text: 'Practical, modern Vastu guidelines (0% demolition)', color: 'var(--color-indigo)' },
      { text: 'Experienced consulting with direct remote guidance', color: 'var(--color-gold)' }
    ],
    stats: [
      { target: 98, suffix: '%', text: 'Harmony Success Rate', border: 'var(--color-purple)', shadow: 'rgba(59, 130, 246, 0.12)' },
      { target: 0, suffix: '%', text: 'Construction Demolitions', border: 'var(--color-indigo)', shadow: 'rgba(16, 185, 129, 0.12)' },
      { target: 16, suffix: '', text: 'Directions Balanced', border: 'var(--color-yellow)', shadow: 'rgba(251, 191, 36, 0.12)' },
      { target: 1500, suffix: '+', text: 'Homes & Offices Cured', border: 'var(--color-gold)', shadow: 'rgba(255, 51, 51, 0.12)' }
    ]
  },
  testimonialSpotlight: {
    quote: '"Through your guidance in Vastu, Astrology, and Numerology, I not only received the right direction but also gained confidence and mental peace. Your suggestions led to absolute clarity, balance, and positive changes in my life."',
    author: 'POOJA KASHYAP',
    role: 'Client & Testimony',
    ctaText: 'Read More Reviews'
  },
  ctaSection: {
    title: 'Ready to Align Your Life?',
    description: 'Take the first step towards a balanced environment. Request your directional mapping consult today.',
    ctaText: 'Schedule Consultation Now'
  }
};

export default function Home() {
  const [compassAngle, setCompassAngle] = useState(0);
  const [calibrated, setCalibrated] = useState(false);

  const activeContent = defaultHomeContent;


  const vastuDirections = [
    { name: 'NORTH', angle: 0, color: '#3B82F6', element: 'Water', attribute: 'Money, Career & Opportunities', line1: 'Money &', line2: 'Opportunities', deity: 'Bhudhar / Soma', bg: 'rgba(59, 130, 246, 0.25)' },
    { name: 'NNE', angle: 22.5, color: '#3B82F6', element: 'Water', attribute: 'Health & Immunity', line1: 'Health &', line2: 'Immunity', deity: 'Bhujag / Aditi', bg: 'rgba(59, 130, 246, 0.18)' },
    { name: 'NE', angle: 45, color: '#06B6D4', element: 'Water/Air', attribute: 'Ideas, Vision & Wisdom', line1: 'Ideas &', line2: 'Vision', deity: 'Shikhi / Apah', bg: 'rgba(6, 182, 212, 0.22)' },
    { name: 'ENE', angle: 67.5, color: '#10B981', element: 'Air', attribute: 'Recreation, Fun & Joy', line1: 'Fun &', line2: 'Recreation', deity: 'Parjanya / Jayanti', bg: 'rgba(16, 185, 129, 0.18)' },
    { name: 'EAST', angle: 90, color: '#10B981', element: 'Air', attribute: 'Social Connections & Associations', line1: 'Social', line2: 'Connect', deity: 'Mahendra / Aditya', bg: 'rgba(16, 185, 129, 0.28)' },
    { name: 'ESE', angle: 112.5, color: '#10B981', element: 'Air/Fire', attribute: 'Analysis & Churning (Anxiety)', line1: 'Analysis &', line2: 'Churning', deity: 'Satya / Bhrisha', bg: 'rgba(16, 185, 129, 0.18)' },
    { name: 'SE', angle: 135, color: '#EF4444', element: 'Fire', attribute: 'Cash Flow & Liquidity', line1: 'Cash &', line2: 'Liquidity', deity: 'Antariksha / Anil', bg: 'rgba(239, 68, 68, 0.22)' },
    { name: 'SSE', angle: 157.5, color: '#EF4444', element: 'Fire', attribute: 'Confidence, Power & Strength', line1: 'Power &', line2: 'Confidence', deity: 'Pusha / Vitatha', bg: 'rgba(239, 68, 68, 0.26)' },
    { name: 'SOUTH', angle: 180, color: '#EF4444', element: 'Fire', attribute: 'Relaxation, Fame & Peace', line1: 'Fame &', line2: 'Relaxation', deity: 'Yama / Vivaswan', bg: 'rgba(239, 68, 68, 0.32)' },
    { name: 'SSW', angle: 202.5, color: '#F59E0B', element: 'Earth', attribute: 'Waste Disposal & Let-Go', line1: 'Disposal', line2: '(Let-Go)', deity: 'Gandharva / Bhrish', bg: 'rgba(245, 158, 11, 0.18)' },
    { name: 'SW', angle: 225, color: '#F59E0B', element: 'Earth', attribute: 'Relationships & Family Skills', line1: 'Relations &', line2: 'Skills', deity: 'Bhringraj / Pitra', bg: 'rgba(245, 158, 11, 0.28)' },
    { name: 'WSW', angle: 247.5, color: '#9CA3AF', element: 'Space', attribute: 'Savings, Education & Studies', line1: 'Savings &', line2: 'Education', deity: 'Dauwarik / Pushpadant', bg: 'rgba(156, 163, 175, 0.18)' },
    { name: 'WEST', angle: 270, color: '#9CA3AF', element: 'Space', attribute: 'Gains, Profits & Desires', line1: 'Gains &', line2: 'Profits', deity: 'Sugreev / Varun', bg: 'rgba(156, 163, 175, 0.28)' },
    { name: 'WNW', angle: 292.5, color: '#9CA3AF', element: 'Space', attribute: 'Depression & Detoxification', line1: 'Depression', line2: '& Detox', deity: 'Asur / Sosha', bg: 'rgba(156, 163, 175, 0.18)' },
    { name: 'NW', angle: 315, color: '#9CA3AF', element: 'Space', attribute: 'Support, Help & Banking', line1: 'Support &', line2: 'Banking', deity: 'Roga / Papa-Yakshma', bg: 'rgba(156, 163, 175, 0.22)' },
    { name: 'NNW', angle: 337.5, color: '#3B82F6', element: 'Water/Space', attribute: 'Attraction, Relationships & Sex', line1: 'Attraction', line2: '& Sex', deity: 'Rudra / Kurma', bg: 'rgba(59, 130, 246, 0.18)' }
  ];

  const rotateCompass = () => {
    const nextAngle = compassAngle + 22.5;
    setCompassAngle(nextAngle);
    if (nextAngle >= 360) {
      setCalibrated(true);
    }
  };

  const activeIndex = Math.round((360 - (compassAngle % 360)) / 22.5) % 16;
  const currentDir = vastuDirections[activeIndex];

  const renderChakra = () => {
    // Coordinates center: (240, 240) inside 480x480 viewport
    const cx = 240;
    const cy = 240;
    
    // Radii of concentric layers (from outside to inside)
    const R_ticks_outer = 228;
    const R_ticks_inner = 216;
    const R_attributes = 201; // Money, Health, Social...
    const R_organs = 182;     // Bladder, Liver, Heart...
    const R_directions = 158; // NORTH, NNE, NE...
    const R_subsectors = 132; // N1, N2, N3... (32 sectors)
    const R_deities2 = 104;    // Soma, Bhujag, Aditi...
    const R_deities1 = 76;     // Bhudhar, Aryama, Vivaswan, Mitra
    const R_center = 48;      // Brahmasthan center boundary

    // 1. Draw outer degree scale ticks (every 1 degree, numbers every 10 degrees)
    const ticks = [];
    const tickTexts = [];
    for (let a = 0; a < 360; a += 2) {
      const isMajor = a % 10 === 0;
      const isMedium = a % 5 === 0 && !isMajor;
      const tickLength = isMajor ? 12 : isMedium ? 8 : 4;
      
      const rad = ((a - 90) * Math.PI) / 180;
      const x1 = cx + R_ticks_outer * Math.cos(rad);
      const y1 = cy + R_ticks_outer * Math.sin(rad);
      const x2 = cx + (R_ticks_outer - tickLength) * Math.cos(rad);
      const y2 = cy + (R_ticks_outer - tickLength) * Math.sin(rad);
      
      ticks.push(
        <line 
          key={`tick-${a}`} 
          x1={x1} y1={y1} x2={x2} y2={y2} 
          stroke={isMajor ? 'var(--color-gold)' : 'rgba(217, 125, 100, 0.35)'} 
          strokeWidth={isMajor ? 1.2 : 0.6} 
        />
      );

      if (isMajor) {
        // Draw number labels at 10, 20...
        const labelRad = ((a - 90) * Math.PI) / 180;
        const lx = cx + (R_ticks_outer + 10) * Math.cos(labelRad);
        const ly = cy + (R_ticks_outer + 10) * Math.sin(labelRad);
        tickTexts.push(
          <text
            key={`degree-lbl-${a}`}
            x={lx}
            y={ly}
            fill="var(--color-gold)"
            fontSize="6.5"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${a}, ${lx}, ${ly})`}
          >
            {a}°
          </text>
        );
      }
    }



    // Deities 1 quadrants definitions
    const quadrants = [
      { name: 'BHUDHAR', startAngle: 315, endAngle: 45, color: 'rgba(59, 130, 246, 0.08)' },
      { name: 'ARYAMA', startAngle: 45, endAngle: 135, color: 'rgba(16, 185, 129, 0.08)' },
      { name: 'VIVASWAN', startAngle: 135, endAngle: 225, color: 'rgba(239, 68, 68, 0.08)' },
      { name: 'MITRA', startAngle: 225, endAngle: 315, color: 'rgba(245, 158, 11, 0.08)' }
    ];
    return (
      <svg width="480" height="480" viewBox="0 0 480 480" style={{ transform: `rotate(${compassAngle}deg)`, transition: 'transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)' }}>
        
        {/* Dynamic 16 direction slices (R_center to R_ticks_inner) */}
        {vastuDirections.map((d, index) => {
          const startAngle = d.angle - 11.25;
          const endAngle = d.angle + 11.25;
          
          const radStart = ((startAngle - 90) * Math.PI) / 180;
          const radEnd = ((endAngle - 90) * Math.PI) / 180;
          
          const xStartOuter = cx + R_ticks_inner * Math.cos(radStart);
          const yStartOuter = cy + R_ticks_inner * Math.sin(radStart);
          const xEndOuter = cx + R_ticks_inner * Math.cos(radEnd);
          const yEndOuter = cy + R_ticks_inner * Math.sin(radEnd);

          const pathOuter = `M ${cx} ${cy} L ${xStartOuter} ${yStartOuter} A ${R_ticks_inner} ${R_ticks_inner} 0 0 1 ${xEndOuter} ${yEndOuter} Z`;
          
          const radText = ((d.angle - 90) * Math.PI) / 180;
          
          const xDir = cx + ((R_directions + R_organs) / 2) * Math.cos(radText);
          const yDir = cy + ((R_directions + R_organs) / 2) * Math.sin(radText);
          
          const xAttr = cx + ((R_organs + R_ticks_inner) / 2) * Math.cos(radText);
          const yAttr = cy + ((R_organs + R_ticks_inner) / 2) * Math.sin(radText);

          const xOrgan = cx + ((R_directions + R_organs) / 2 + 11) * Math.cos(radText);
          const yOrgan = cy + ((R_directions + R_organs) / 2 + 11) * Math.sin(radText);

          const xDeity2 = cx + ((R_subsectors + R_directions) / 2 - 13) * Math.cos(radText);
          const yDeity2 = cy + ((R_subsectors + R_directions) / 2 - 13) * Math.sin(radText);

          const isSelected = activeIndex === index;

          return (
            <g key={d.name}>
              <path 
                d={pathOuter} 
                fill={d.bg} 
                stroke={isSelected ? '#FBBF24' : 'rgba(217, 125, 100, 0.2)'} 
                strokeWidth={isSelected ? '2.5' : '0.5'}
                style={{ cursor: 'pointer' }}
              />

              <text 
                x={xAttr} 
                y={yAttr} 
                fill={isSelected ? '#FFFFFF' : '#CBD5E1'} 
                fontSize="6" 
                fontWeight={isSelected ? 'bold' : '600'}
                textAnchor="middle" 
                dominantBaseline="middle"
                transform={`rotate(${d.angle}, ${xAttr}, ${yAttr})`}
              >
                <tspan x={xAttr} dy="-3.5">{d.line1}</tspan>
                <tspan x={xAttr} dy="7.5">{d.line2}</tspan>
              </text>



              <text 
                x={xDir} 
                y={yDir} 
                fill={isSelected ? '#FBBF24' : '#FFFFFF'} 
                fontSize="10" 
                fontWeight="800" 
                textAnchor="middle" 
                dominantBaseline="middle"
                transform={`rotate(${d.angle}, ${xDir}, ${yDir})`}
              >
                {d.name}
              </text>

              <text 
                x={xDeity2} 
                y={yDeity2} 
                fill="#FBBF24" 
                fontSize="7" 
                fontWeight="600"
                textAnchor="middle" 
                dominantBaseline="middle"
                transform={`rotate(${d.angle}, ${xDeity2}, ${yDeity2})`}
              >
                {d.deity.split(' / ')[0]}
              </text>
            </g>
          );
        })}

        {Array.from({ length: 32 }).map((_, i) => {
          const startAngle = 315 + i * 11.25;
          const endAngle = startAngle + 11.25;
          const midAngle = startAngle + 5.625;

          const radStart = ((startAngle - 90) * Math.PI) / 180;
          const radEnd = ((endAngle - 90) * Math.PI) / 180;
          const radMid = ((midAngle - 90) * Math.PI) / 180;

          const xStart = cx + R_directions * Math.cos(radStart);
          const yStart = cy + R_directions * Math.sin(radStart);

          const xMidText = cx + ((R_subsectors + R_directions) / 2) * Math.cos(radMid);
          const yMidText = cy + ((R_subsectors + R_directions) / 2) * Math.sin(radMid);

          let sectorName = '';
          if (i < 8) sectorName = `N${i + 1}`;
          else if (i < 16) sectorName = `E${i - 7}`;
          else if (i < 24) sectorName = `S${i - 15}`;
          else sectorName = `W${i - 23}`;

          return (
            <g key={`subsector-${i}`}>
              <line 
                x1={cx + R_subsectors * Math.cos(radStart)} 
                y1={cy + R_subsectors * Math.sin(radStart)} 
                x2={xStart} 
                y2={yStart} 
                stroke="rgba(217, 125, 100, 0.4)" 
                strokeWidth="0.8" 
              />
              <text 
                x={xMidText} 
                y={yMidText} 
                fill="#F8FAFC" 
                fontSize="7.5" 
                fontWeight="bold"
                textAnchor="middle" 
                dominantBaseline="middle"
                transform={`rotate(${midAngle}, ${xMidText}, ${yMidText})`}
              >
                {sectorName}
              </text>
            </g>
          );
        })}

        {quadrants.map((q, idx) => {
          const radStart = ((q.startAngle - 90) * Math.PI) / 180;
          const radEnd = ((q.endAngle - 90) * Math.PI) / 180;
          
          const midAngle = q.startAngle + 45;
          const radMid = ((midAngle - 90) * Math.PI) / 180;

          const xStart = cx + R_deities2 * Math.cos(radStart);
          const yStart = cy + R_deities2 * Math.sin(radStart);

          const xText = cx + ((R_deities1 + R_deities2) / 2) * Math.cos(radMid);
          const yText = cy + ((R_deities1 + R_deities2) / 2) * Math.sin(radMid);

          return (
            <g key={q.name}>
              <line 
                x1={cx + R_deities1 * Math.cos(radStart)} 
                y1={cy + R_deities1 * Math.sin(radStart)} 
                x2={xStart} 
                y2={yStart} 
                stroke="#FBBF24" 
                strokeWidth="1.2" 
              />
              <text
                x={xText}
                y={yText}
                fill="#FBBF24"
                fontSize="8"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${midAngle}, ${xText}, ${yText})`}
              >
                {q.name}
              </text>
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r={R_ticks_inner} fill="none" stroke="#FBBF24" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={R_directions} fill="none" stroke="rgba(217, 125, 100, 0.5)" strokeWidth="1.2" />
        <circle cx={cx} cy={cy} r={R_subsectors} fill="none" stroke="rgba(217, 125, 100, 0.4)" strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r={R_deities2} fill="none" stroke="#FBBF24" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={R_deities1} fill="none" stroke="#FBBF24" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={R_center} fill="none" stroke="#FBBF24" strokeWidth="1.5" />

        {ticks}
        {tickTexts}

        <circle cx={cx} cy={cy} r={R_center} fill="#1E1B24" stroke="#FBBF24" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="32" fill="none" stroke="rgba(245, 158, 11, 0.25)" strokeDasharray="3,3" strokeWidth="1" />
        
        <g transform={`translate(${cx}, ${cy})`}>
          <path d="M 0 -22 L 4 -4 L 22 0 L 4 4 L 0 22 L -4 4 L -22 0 L -4 -4 Z" fill="#FBBF24" />
          <circle cx="0" cy="0" r="3.5" fill="#1E1B24" />
        </g>

        {/* Concentric paths for Brahmasthan & Sudarshan Chakra text */}
        <path id="brahmaTopPath" d="M 202 240 A 38 38 0 0 1 278 240" fill="none" />
        <path id="brahmaBottomPath" d="M 278 240 A 38 38 0 0 1 202 240" fill="none" />
        
        <text fontSize="5.5" fontWeight="900" fill="#FBBF24" letterSpacing="0.06em">
          <textPath href="#brahmaTopPath" startOffset="50%" textAnchor="middle">
            BRAHMASTHAN
          </textPath>
        </text>
        <text fontSize="4.8" fontWeight="800" fill="rgba(251, 191, 36, 0.75)" letterSpacing="0.05em">
          <textPath href="#brahmaBottomPath" startOffset="50%" textAnchor="middle">
            SUDARSHAN CHAKRA
          </textPath>
        </text>
      </svg>
    );
  };

  const steps = activeContent.methodology.steps.map(st => ({
    ...st,
    color: st.icon === 'Compass' ? 'var(--color-purple)' : st.icon === 'Sparkles' ? 'var(--color-indigo)' : 'var(--color-gold)',
    bg: st.icon === 'Compass' ? 'rgba(59, 130, 246, 0.08)' : st.icon === 'Sparkles' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 51, 51, 0.08)',
    border: st.icon === 'Compass' ? 'rgba(59, 130, 246, 0.25)' : st.icon === 'Sparkles' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 51, 51, 0.25)',
    glow: st.icon === 'Compass' ? 'rgba(59, 130, 246, 0.12)' : st.icon === 'Sparkles' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 51, 51, 0.12)',
    icon: iconMapper[st.icon] || <Compass size={22} />
  }));

  const benefits = activeContent.whyUs.benefits;


  const renderTextReveal = (text, delayStart = 0) => {
    return text.split(' ').map((word, wordIdx) => (
      <span key={wordIdx} style={{ display: 'inline-block', marginRight: '0.25em' }}>
        {word.split('').map((char, charIdx) => {
          const overallIndex = delayStart + (wordIdx * 4) + charIdx;
          return (
            <span
              key={charIdx}
              className="reveal-blur inline-block in-view"
              style={{
                animationDelay: `${overallIndex * 35}ms`,
                transitionDelay: `${overallIndex * 35}ms`
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    ));
  };

  return (
    <div style={{ padding: '45px 20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* 1. Hero Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center', minHeight: '80vh', padding: '0 0 40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div 
            className="reveal-zoom-out"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', width: 'fit-content' }}
          >
            <Sparkles size={14} style={{ color: 'var(--color-purple)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', color: 'var(--color-purple)' }}>{activeContent.hero.badge}</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', lineHeight: '1.1', fontWeight: '800' }}>
            <span className="gold-gradient-text reveal-blur inline-block in-view" style={{ animationDelay: '0ms' }}>{activeContent.hero.titleLine1}</span><br />
            {renderTextReveal(activeContent.hero.titleLine2, 12)}
          </h1>
          
          <p className="reveal delay-300" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '500px' }}>
            {activeContent.hero.description}
          </p>

          <div className="reveal delay-400" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
            <Link to="/contact" className="cosmic-button">
              {activeContent.hero.ctaText} <ChevronRight size={18} />
            </Link>
            <a href="#compass" className="gold-button">
              {activeContent.hero.compassCtaText}
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }} className="reveal-blur delay-200">
          <div className="glass-panel magnetic-hover" style={{ width: '100%', maxWidth: '440px', overflow: 'hidden', padding: '12px', border: '1.5px solid var(--color-purple)', boxShadow: '0 8px 32px rgba(59, 130, 246, 0.12)' }}>
            <img 
              src={getImageUrl(activeContent.hero.imageUrl)} 
              alt="Rudra Jyotish Hero" 
              style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', height: '480px' }}
            />
          </div>
        </div>
      </section>

      {/* 2. Interactive Compass Tool Section */}
      <section id="compass" style={{ padding: '80px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }} className="reveal-left">
          <div 
            className="compass-container" 
            onClick={rotateCompass}
            style={{ 
              transform: `scale(${window.innerWidth < 480 ? 0.65 : window.innerWidth < 768 ? 0.8 : 1})`,
              boxShadow: '0 15px 50px rgba(0,0,0,0.5)',
              background: 'radial-gradient(circle, #2C2736 0%, #1E1B24 100%)',
              borderRadius: '50%',
              padding: '10px',
              border: '2px solid var(--color-gold)'
            }}
          >
            {renderChakra()}
            
            {/* Compass indicator needle overlay */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '4px',
                height: '380px',
                background: 'linear-gradient(to bottom, #EF4444 50%, transparent 50%)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 10,
                borderRadius: '2px',
                opacity: 0.85
              }}
            />
            {/* North pointing indicator arrowhead */}
            <div 
              style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '12px solid #EF4444',
                pointerEvents: 'none',
                zIndex: 11
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="reveal-right">
          <span style={{ color: 'var(--color-indigo)', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 'bold' }}>{activeContent.compass.badge}</span>
          <h2 style={{ fontSize: '2.2rem' }} className="gold-gradient-text">{activeContent.compass.title}</h2>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            {activeContent.compass.description}
          </p>

          {/* Active Direction Live Readout */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderColor: 'rgba(217, 125, 100, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Active Directional Sector</span>
                <h3 style={{ fontSize: '1.8rem', color: currentDir.color, fontFamily: 'var(--font-serif)', margin: '4px 0 0' }}>{currentDir.name}</h3>
              </div>
              <div style={{ padding: '6px 12px', borderRadius: '8px', background: `${currentDir.color}15`, border: `1px solid ${currentDir.color}40`, color: currentDir.color, fontSize: '0.8rem', fontWeight: 'bold' }}>
                {currentDir.element} Element
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(217, 125, 100, 0.1)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Governed Life Aspect</span>
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>{currentDir.attribute}</p>
            </div>

            <div style={{ borderTop: '1px solid rgba(217, 125, 100, 0.1)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Deity Grid Energy</span>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-gold)', fontFamily: 'monospace' }}>{currentDir.deity}</p>
            </div>
          </div>

          <div style={{ padding: '16px 20px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.05)', border: '1.5px dashed var(--color-indigo)' }}>
            {calibrated ? (
              <p style={{ color: 'var(--color-indigo)', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', margin: 0 }}>
                <Check size={20} /> {activeContent.compass.successText}
              </p>
            ) : (
              <p style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                <AlertCircle size={20} style={{ color: 'var(--color-indigo)' }} /> {activeContent.compass.instructionText}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3. Detailed 3-Step Methodology */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-glass)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }} className="reveal">
          <span style={{ color: 'var(--color-gold)', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: 'bold' }}>METHODOLOGY</span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '10px' }} className="gold-gradient-text">{activeContent.methodology.title}</h2>
        </div>

        <div className="reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {steps.map((st, index) => (
            <div 
              key={index} 
              className="glass-panel reveal magnetic-hover" 
              style={{ 
                padding: '35px 30px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '18px', 
                borderColor: st.border, 
                boxShadow: `0 8px 32px 0 ${st.glow}`,
                position: 'relative'
              }}
            >
              {/* Header with animated icon and step label */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '12px', 
                  background: st.bg, 
                  border: `1.5px solid ${st.border}`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: st.color,
                  transition: 'transform 0.5s ease'
                }}
                className="step-icon-container"
                >
                  {st.icon}
                </div>
                
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: '800', 
                  color: st.color, 
                  background: st.bg, 
                  border: `1px solid ${st.border}`, 
                  padding: '4px 12px', 
                  borderRadius: '30px',
                  letterSpacing: '0.05em'
                }}>
                  STEP {st.num}
                </span>
              </div>
              
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginTop: '5px', color: 'var(--text-heading)' }}>
                {st.title}
              </h3>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Us & Beautiful Stats */}
      <section style={{ padding: '80px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="reveal-left">
          <span style={{ color: 'var(--color-gold)', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: 'bold' }}>{activeContent.whyUs.badge}</span>
          <h2 style={{ fontSize: '2.2rem' }} className="gold-gradient-text">{activeContent.whyUs.title}</h2>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            {activeContent.whyUs.description}
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {benefits.map((ben, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: `${ben.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${ben.color}` }}>
                  <Check size={10} style={{ color: ben.color }} />
                </div>
                <span>{ben.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-stagger" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {activeContent.whyUs.stats.map((stat, i) => (
            <div key={i} className="glass-panel reveal magnetic-hover" style={{ padding: '30px', textAlign: 'center', borderColor: stat.border, boxShadow: `0 8px 20px ${stat.shadow}` }}>
              <h3 style={{ fontSize: '2.5rem', color: stat.border, fontFamily: 'var(--font-serif)' }}>
                <span className="count-up" data-target={stat.target} data-suffix={stat.suffix}>0{stat.suffix}</span>
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>{stat.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Highlight Testimonial Spotlight */}
      <section style={{ padding: '80px 0' }} className="reveal-flip">
        <div className="glass-panel" style={{ padding: '50px 40px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center', borderColor: 'var(--color-purple)', boxShadow: '0 8px 32px rgba(59, 130, 246, 0.12)' }}>
          <Quote size={40} style={{ color: 'rgba(59, 130, 246, 0.15)' }} />
          <p style={{ fontSize: '1.25rem', lineHeight: '1.7', fontStyle: 'italic', maxWidth: '800px', color: 'var(--text-primary)' }}>
            {activeContent.testimonialSpotlight.quote}
          </p>
          <div>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--color-purple)', fontFamily: 'var(--font-serif)' }}>{activeContent.testimonialSpotlight.author}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{activeContent.testimonialSpotlight.role}</p>
          </div>
          <Link to="/testimonials" className="gold-button" style={{ border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            {activeContent.testimonialSpotlight.ctaText}
          </Link>
        </div>
      </section>

      {/* 6. High-Converting CTA */}
      <section style={{ padding: '60px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }} className="reveal">
        <h2 style={{ fontSize: '2.5rem' }} className="gold-gradient-text">{activeContent.ctaSection.title}</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', lineHeight: '1.6' }}>
          {activeContent.ctaSection.description}
        </p>
        <Link to="/contact" className="cosmic-button" style={{ fontSize: '1.1rem', padding: '14px 36px' }}>
          {activeContent.ctaSection.ctaText} <ChevronRight size={20} />
        </Link>
      </section>

    </div>
  );
}
