import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Star, Compass, Heart, Eye, ArrowLeft, Calendar, User, Clock, MessageSquare, ArrowRight } from 'lucide-react';

const defaultBlogPosts = [
  {
    id: 'vastu-shastra',
    title: 'How Vastu Shastra Can Transform Your Home and Life',
    category: 'Vastu Shastra',
    date: 'November 18, 2025',
    author: 'Rudra Ji',
    readTime: '4 Min Read',
    img: '/vastu_terracotta.png',
    summary: 'Vastu Shastra is an ancient Indian science that focuses on balancing the five elements—earth, water, fire, air, and space—within your living environment. Every home and workplace carries energy, and when this energy flows in the right direction, it brings peace, health, and prosperity.',
    content: [
      'Vastu Shastra is an ancient Indian science that focuses on balancing the five elements—earth, water, fire, air, and space—within your living environment. Every home and workplace carries energy, and when this energy flows in the right direction, it brings peace, health, and prosperity. Many people experience stress, financial blocks, or relationship problems simply because the energy structure of their space is disturbed. Vastu helps to identify these imbalances and correct them through simple yet powerful changes.',
      'The entrance of a house, placement of kitchen, bedroom direction, and even the position of mirrors play a major role in shaping your daily life. For example, sleeping in the wrong direction can cause anxiety and health issues, while an improper kitchen placement can affect finances and family harmony. Vastu does not demand expensive reconstruction; most corrections are done through rearranging furniture, colors, symbols, and energy remedies completely without demolition.',
      'Modern life has made people ignore the connection between space and mind. When your surroundings are aligned with natural laws, your thoughts become calmer and opportunities start flowing easily. Many clients have seen improvement in business growth, marriage harmony, and children’s education after following vastu guidance. Vastu is not superstition—it is practical energy management for better living.',
      'If you feel stuck despite hard work, your home energy might be the hidden reason. A professional vastu consultation analyzes your floor plan, directions, and personal problems to give customized solutions. Creating a vastu-balanced space is like opening a door for success to enter naturally.'
    ]
  },
  {
    id: 'astrology-gps',
    title: 'Astrology – A Spiritual GPS for Your Life',
    category: 'Astrology',
    date: 'November 18, 2025',
    author: 'Rudra Ji',
    readTime: '3 Min Read',
    img: '/astrology_terracotta.png',
    summary: 'Astrology is often misunderstood as predicting the future, but its true purpose is to serve as a spiritual GPS. By analyzing the planetary positions at the time of your birth, astrology reveals your strengths, life purpose, and potential hurdles.',
    content: [
      'Astrology is often misunderstood as predicting the future, but its true purpose is to serve as a spiritual GPS. By analyzing the planetary positions at the time of your birth, astrology reveals your strengths, life purpose, and potential hurdles. It helps you navigate career shifts, relationship dynamics, and spiritual growth with clarity.',
      'Your birth chart (Kundli) is a map of the heavens at the exact millisecond you drew your first breath. It contains planetary angles that represent karma, subconscious desires, and energy grids. When planetary periods (Dashas) align, specific events or opportunities emerge. Knowing this timing lets you prepare instead of struggling blindly against cosmic tides.',
      'Through practical, simple remedies—such as wearing selected crystals, performing sound chanting, or balancing cosmic elements with water or fire—you can pacify active planets and strengthen weak ones. Astrology doesn\'t restrict your free will; it empowers you with divine foresight to make choices that align with your ultimate cosmic design.'
    ]
  },
  {
    id: 'tarot-reading',
    title: 'Tarot Reading – Listening to Your Inner Voice',
    category: 'Tarot Reading',
    date: 'November 18, 2025',
    author: 'Rudra Ji',
    readTime: '3 Min Read',
    img: '/tarot_terracotta.png',
    summary: 'Tarot cards are powerful mirrors reflecting your subconscious mind. A tarot session doesn\'t just reveal what lies ahead; it unlocks your deep inner wisdom to help you solve present dilemmas, heal relationships, and restore mental peace.',
    content: [
      'Tarot cards are powerful mirrors reflecting your subconscious mind. A tarot session doesn\'t just reveal what lies ahead; it unlocks your deep inner wisdom to help you solve present dilemmas, heal relationships, and restore mental peace.',
      'Every tarot card holds archetype symbols, colors, and astrological frequencies. The cards chosen during a session represent energy grids in your life right now. By interpreting these symbols, a professional reader acts as a guide, revealing blocks or hidden paths that your active mind has missed.',
      'Whether you are at a crossroad in your career, feeling a distance in your relationships, or seeking spiritual clarity, Tarot reading brings a feeling of deep relief and absolute peace, allowing you to walk forward with strong purpose and renewed power.'
    ]
  },
  {
    id: 'relationship-counselling',
    title: 'Relationship Counselling – Healing Hearts, Not Just Problems',
    category: 'Counselling',
    date: 'November 18, 2025',
    author: 'Rudra Ji',
    readTime: '4 Min Read',
    img: '/relationship_terracotta.png',
    summary: 'Relationships are built on delicate energetic and emotional connections. Relationship counselling focuses on looking beneath arguments to heal deep communication filters, resolve core planetary/emotional blocks, and restore mutual trust.',
    content: [
      'Relationships are built on delicate energetic and emotional connections. Relationship counselling focuses on looking beneath arguments to heal deep communication filters, resolve core planetary/emotional blocks, and restore mutual trust.',
      'When communication breaks down, partners start reacting from childhood patterns or planetary imbalances in their birth charts. Counselling creates a safe, neutral portal where both sides can speak and actually be heard without judgment or defensive walls.',
      'By combining emotional mapping, empathetic communication training, and spiritual space clearing (such as cleansing Vastu energy grids), relationships can undergo a massive transformation, converting daily tension into deep mutual respect and divine connection.'
    ]
  },
  {
    id: 'numerology-numbers',
    title: 'Numerology – The Secret Language of Numbers',
    category: 'Numerology',
    date: 'November 18, 2025',
    author: 'Rudra Ji',
    readTime: '3 Min Read',
    img: '/numerology_terracotta.png',
    summary: 'Numbers are not just symbols for counting; they are active energetic vibrations. Numerology analyzes your name and birth date coordinates to map your personality traits, potential successes, and ideal cosmic frequencies.',
    content: [
      'Numbers are not just symbols for counting; they are active energetic vibrations. Numerology analyzes your name and birth date coordinates to map your personality traits, potential successes, and ideal cosmic frequencies.',
      'Using classic grids like the Lo Shu Grid, we analyze missing numbers and dominant frequencies. Your name vibration is incredibly powerful—a simple name correction or spelling shift can align your frequency with lucky numbers, unlocking career progression, luxury attraction, and deep harmony.',
      'Understanding your life path number and personal cycle numbers lets you sync with nature\'s seasons. Instead of pushing when the universe says "rest", or resting when opportunity gates are wide open, you learn to step forward in perfect numeric timing.'
    ]
  }
];

export default function Blog() {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const getBlogIcon = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('vastu')) {
      return <Sun size={20} style={{ color: 'var(--color-gold)' }} />;
    } else if (cat.includes('astrology')) {
      return <Compass size={20} style={{ color: 'var(--color-gold)' }} />;
    } else if (cat.includes('tarot')) {
      return <Eye size={20} style={{ color: 'var(--color-gold)' }} />;
    } else if (cat.includes('counsel') || cat.includes('relationship')) {
      return <Heart size={20} style={{ color: 'var(--color-gold)' }} />;
    } else {
      return <Sparkles size={20} style={{ color: 'var(--color-gold)' }} />;
    }
  };

  const rawBlogs = defaultBlogPosts;

  const blogPosts = rawBlogs.map(p => ({
    id: p._id || p.id,
    title: p.title,
    category: p.category,
    date: p.date || new Date(p.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    author: p.author || 'Rudra Ji',
    readTime: p.readTime || '3 Min Read',
    img: p.imgUrl || p.img || '/vastu_terracotta.png',
    summary: p.summary,
    content: p.content,
    icon: getBlogIcon(p.category)
  }));

  const selectedPost = blogPosts.find(p => p.id === selectedPostId);


  return (
    <div style={{ padding: '45px 20px 60px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Dynamic Detail View */}
      {selectedPost ? (
        <div style={{ animation: 'fadeInContent 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards' }}>
          {/* Back button */}
          <button
            onClick={() => setSelectedPostId(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-gold)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              marginBottom: '30px',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            <ArrowLeft size={18} /> Back to Cosmic Blog
          </button>

          {/* Article Panel */}
          <article className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
            
            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-muted)', fontSize: '0.8rem', flexWrap: 'wrap', marginBottom: '15px' }}>
              <span style={{ background: 'rgba(229, 62, 62, 0.1)', color: 'var(--color-gold)', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                {selectedPost.category}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={14} /> {selectedPost.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={14} /> {selectedPost.readTime}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <User size={14} /> By {selectedPost.author}
              </span>
            </div>

            <h1 style={{ fontSize: '2.1rem', fontFamily: 'var(--font-serif)', lineHeight: '1.3', marginBottom: '20px', color: 'var(--text-primary)' }}>
              {selectedPost.title}
            </h1>

            {/* Split layout for article contents */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'start' }}>
              
              {/* Image Column */}
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(229, 62, 62, 0.25)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', background: 'var(--bg-dark)' }}>
                <img 
                  src={selectedPost.img} 
                  alt={selectedPost.title} 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                />
              </div>

              {/* Text Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {selectedPost.content.map((pText, idx) => (
                  <p key={idx} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                    {pText}
                  </p>
                ))}
              </div>

            </div>

          </article>
        </div>
      ) : (
        /* Blog List View */
        <div style={{ animation: 'fadeInContent 0.8s ease forwards' }}>
          
          {/* Header */}
          <section style={{ textAlign: 'center', marginBottom: '35px' }}>
            <span style={{ color: 'var(--color-gold)', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 'bold' }}>CELESTIAL INSIGHTS</span>
            <h1 style={{ fontSize: '2.3rem', marginTop: '8px', marginBottom: '10px' }} className="gold-gradient-text">The Sacred Chronicles</h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.95rem' }}>
              Dive deep into expert guidance, mystical calculations, and spiritual energy mappings curated by Rudra Ji to align your life's compass.
            </p>
          </section>

          {/* Grid Layout of Posts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {blogPosts.map((post) => (
              <div 
                key={post.id} 
                className="sleek-card"
                onClick={() => setSelectedPostId(post.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Image Wrap */}
                <div className="sleek-card-img-wrap" style={{ height: '220px' }}>
                  <img src={post.img} alt={post.title} />
                  <div className="sleek-card-overlay"></div>
                  
                  {/* Category floating badge */}
                  <span style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'var(--bg-dark)',
                    border: '1px solid var(--color-gold)',
                    color: 'var(--color-gold)',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                    zIndex: 2
                  }}>
                    {post.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="sleek-card-body" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
                  
                  <div>
                    {/* Meta info */}
                    <div style={{ display: 'flex', gap: '15px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', lineHeight: '1.4', margin: '0 0 10px' }}>
                      {post.title}
                    </h3>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                      {post.summary}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-gold)', marginTop: '10px' }}>
                    <span>Read Article</span>
                    <ArrowRight size={14} className="arrow-icon" style={{ transition: 'transform 0.3s' }} />
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Hover visual adjustments */}
      <style>{`
        .sleek-card:hover .arrow-icon {
          transform: translateX(5px);
        }
      `}</style>

    </div>
  );
}
