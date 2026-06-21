import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  Compass, Home, TriangleAlert, Shield, Calendar, Edit, Trash2, Plus, X, CheckCircle, Sparkles, BookOpen, Upload, RefreshCw
} from 'lucide-react';
import { getImageUrl } from '../../../utils/image';

export default function AdminVastuTips() {
  const [activeTab, setActiveTab] = useState('hero');
  const [data, setData] = useState({
    directions: [],
    mistakes: [],
    remedies: [],
    seasons: [],
    elements: [],
    bookPages: []
  });
  const [heroContent, setHeroContent] = useState(null);
  const [savingHero, setSavingHero] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalType, setModalType] = useState(null); // 'direction', 'mistake', 'remedy', 'season', 'element', 'bookPage'
  const [editingItem, setEditingItem] = useState(null);

  // Form states for Directions
  const [dirName, setDirName] = useState('');
  const [dirDeity, setDirDeity] = useState('');
  const [dirElement, setDirElement] = useState('');
  const [dirFocus, setDirFocus] = useState('');
  const [dirDos, setDirDos] = useState(['']);
  const [dirDonts, setDirDonts] = useState(['']);

  // Form states for Mistakes
  const [mistakeText, setMistakeText] = useState('');
  const [mistakeImpact, setMistakeImpact] = useState('');
  const [mistakeRemedy, setMistakeRemedy] = useState('');
  const [mistakeSeverity, setMistakeSeverity] = useState('medium');
  const [mistakeColor, setMistakeColor] = useState('');

  // Form states for Remedies
  const [remedyTitle, setRemedyTitle] = useState('');
  const [remedyDesc, setRemedyDesc] = useState('');
  const [remedyIcon, setRemedyIcon] = useState('Sparkles');

  // Form states for Seasons
  const [seasonName, setSeasonName] = useState('');
  const [seasonMonths, setSeasonMonths] = useState('');
  const [seasonTips, setSeasonTips] = useState(['']);

  // Form states for Elements
  const [eleName, setEleName] = useState('');
  const [eleZone, setEleZone] = useState('');
  const [eleColorHex, setEleColorHex] = useState('');
  const [eleBgCode, setEleBgCode] = useState('');
  const [eleIconName, setEleIconName] = useState('Sparkles');
  const [eleBenefit, setEleBenefit] = useState('');
  const [eleColors, setEleColors] = useState('');
  const [eleOrder, setEleOrder] = useState(1);

  // Form states for Book Pages
  const [pageImageUrl, setPageImageUrl] = useState('');
  const [pageCaption, setPageCaption] = useState('');
  const [pageOrder, setPageOrder] = useState(0);
  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: vastuData } = await api.get('/vastu-tips');
      setData(vastuData);
      const { data: heroData } = await api.get('/vastu-tips/hero');
      setHeroContent(heroData);
    } catch (error) {
      console.error('Error fetching Vastu Tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHero = async (e) => {
    e.preventDefault();
    try {
      setSavingHero(true);
      const { data: updated } = await api.put('/vastu-tips/hero', heroContent);
      setHeroContent(updated);
      alert('Vastu Tips hero section updated successfully!');
    } catch (error) {
      console.error('Failed to save Vastu Tips hero:', error);
      alert('Failed to update hero settings.');
    } finally {
      setSavingHero(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- SUBMIT HANDLERS ---------------- */
  
  const handleSaveDirection = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: dirName,
        deity: dirDeity,
        element: dirElement,
        focus: dirFocus,
        dos: dirDos.filter(d => d.trim() !== ''),
        donts: dirDonts.filter(d => d.trim() !== ''),
      };
      await api.put(`/vastu-tips/directions/${editingItem.code}`, payload);
      setModalType(null);
      fetchData();
    } catch (error) {
      alert('Failed to save direction changes');
    }
  };



  const handleSaveMistake = async (e) => {
    e.preventDefault();
    try {
      const severityColors = {
        low: 'var(--color-indigo)',
        medium: 'var(--color-yellow)',
        high: 'var(--color-gold)',
        critical: 'var(--color-gold)'
      };
      const payload = {
        mistake: mistakeText,
        impact: mistakeImpact,
        remedy: mistakeRemedy,
        severity: mistakeSeverity,
        color: severityColors[mistakeSeverity]
      };

      if (editingItem) {
        await api.put(`/vastu-tips/mistakes/${editingItem._id}`, payload);
      } else {
        await api.post('/vastu-tips/mistakes', payload);
      }
      setModalType(null);
      fetchData();
    } catch (error) {
      alert('Failed to save mistake changes');
    }
  };

  const handleSaveRemedy = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: remedyTitle,
        desc: remedyDesc,
        icon: remedyIcon,
        color: 'var(--color-purple)',
        bg: 'rgba(59,130,246,0.08)',
        border: 'rgba(59,130,246,0.22)'
      };

      if (editingItem) {
        await api.put(`/vastu-tips/remedies/${editingItem._id}`, payload);
      } else {
        await api.post('/vastu-tips/remedies', payload);
      }
      setModalType(null);
      fetchData();
    } catch (error) {
      alert('Failed to save remedy changes');
    }
  };

  const handleSaveSeason = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        season: seasonName,
        months: seasonMonths,
        tips: seasonTips.filter(t => t.trim() !== '')
      };
      await api.put(`/vastu-tips/seasons/${editingItem._id}`, payload);
      setModalType(null);
      fetchData();
    } catch (error) {
      alert('Failed to save seasonal adjustments');
    }
  };

  const handleSaveElement = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: eleName,
        zone: eleZone,
        colorHex: eleColorHex,
        bgCode: eleBgCode,
        iconName: eleIconName,
        benefit: eleBenefit,
        colors: eleColors,
        order: Number(eleOrder) || 1
      };
      await api.put(`/vastu-tips/elements/${editingItem._id}`, payload);
      setModalType(null);
      fetchData();
    } catch (error) {
      alert('Failed to save element');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const { data: res } = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPageImageUrl(res.url);
    } catch (error) {
      console.error('Upload error:', error);
      alert(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleMetaLogoUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data: res } = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setHeroContent({
        ...heroContent,
        bookMeta: {
          ...heroContent.bookMeta,
          [field]: res.url
        }
      });
    } catch (error) {
      alert('Failed to upload logo');
    }
  };

  const handleSaveBookPage = async (e) => {
    e.preventDefault();
    if (!pageImageUrl) {
      alert('Please upload an image or provide an image URL');
      return;
    }
    try {
      const payload = {
        imageUrl: pageImageUrl,
        caption: pageCaption,
        order: Number(pageOrder) || 0,
      };

      if (editingItem) {
        await api.put(`/vastu-tips/book-pages/${editingItem._id}`, payload);
      } else {
        await api.post('/vastu-tips/book-pages', payload);
      }
      setModalType(null);
      fetchData();
    } catch (error) {
      alert('Failed to save book page');
    }
  };

  const handleDeleteBookPage = async (id) => {
    if (window.confirm('Delete this book page permanently?')) {
      try {
        await api.delete(`/vastu-tips/book-pages/${id}`);
        fetchData();
      } catch (error) {
        alert('Failed to delete book page');
      }
    }
  };

  const openAddBookPage = () => {
    setEditingItem(null);
    setPageImageUrl('');
    setPageCaption('');
    setPageOrder(data.bookPages?.length || 0);
    setModalType('bookPage');
  };

  const openEditBookPage = (page) => {
    setEditingItem(page);
    setPageImageUrl(page.imageUrl);
    setPageCaption(page.caption || '');
    setPageOrder(page.order || 0);
    setModalType('bookPage');
  };

  /* ---------------- DELETE HANDLERS ---------------- */



  const handleDeleteMistake = async (id) => {
    if (window.confirm('Delete this Vastu Dosha mistake?')) {
      try {
        await api.delete(`/vastu-tips/mistakes/${id}`);
        fetchData();
      } catch (error) {
        alert('Failed to delete mistake');
      }
    }
  };

  const handleDeleteRemedy = async (id) => {
    if (window.confirm('Delete this remedy?')) {
      try {
        await api.delete(`/vastu-tips/remedies/${id}`);
        fetchData();
      } catch (error) {
        alert('Failed to delete remedy');
      }
    }
  };

  /* ---------------- OPEN MODAL HELPERS ---------------- */

  const openEditDirection = (dir) => {
    setEditingItem(dir);
    setDirName(dir.name);
    setDirDeity(dir.deity);
    setDirElement(dir.element);
    setDirFocus(dir.focus);
    setDirDos(dir.dos?.length ? dir.dos : ['']);
    setDirDonts(dir.donts?.length ? dir.donts : ['']);
    setModalType('direction');
  };



  const openAddMistake = () => {
    setEditingItem(null);
    setMistakeText('');
    setMistakeImpact('');
    setMistakeRemedy('');
    setMistakeSeverity('medium');
    setModalType('mistake');
  };

  const openEditMistake = (item) => {
    setEditingItem(item);
    setMistakeText(item.mistake);
    setMistakeImpact(item.impact);
    setMistakeRemedy(item.remedy);
    setMistakeSeverity(item.severity);
    setModalType('mistake');
  };

  const openAddRemedy = () => {
    setEditingItem(null);
    setRemedyTitle('');
    setRemedyDesc('');
    setRemedyIcon('Sparkles');
    setModalType('remedy');
  };

  const openEditRemedy = (item) => {
    setEditingItem(item);
    setRemedyTitle(item.title);
    setRemedyDesc(item.desc);
    setRemedyIcon(item.icon || 'Sparkles');
    setModalType('remedy');
  };

  const openEditSeason = (s) => {
    setEditingItem(s);
    setSeasonName(s.season);
    setSeasonMonths(s.months);
    setSeasonTips(s.tips?.length ? s.tips : ['']);
    setModalType('season');
  };

  const openEditElement = (el) => {
    setEditingItem(el);
    setEleName(el.name);
    setEleZone(el.zone);
    setEleColorHex(el.colorHex || el.color);
    setEleBgCode(el.bgCode || el.bg);
    setEleIconName(el.iconName || 'Sparkles');
    setEleBenefit(el.benefit);
    setEleColors(el.colors);
    setEleOrder(el.order || 1);
    setModalType('element');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
          CMS: Vastu Tips Portal
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
          Fully custom CMS for all 6 interactive modules under Vastu Tips page.
        </p>
      </div>

      {/* Tabs list */}
      <div 
        className="admin-tabs-scroll-container"
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-glass)',
          gap: '20px',
          overflowX: 'auto',
          maxWidth: '100%',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          .admin-tabs-scroll-container::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {[
          { id: 'hero', label: 'Hero Section', icon: <Sparkles size={16} /> },
          { id: 'directions', label: 'Compass Directions', icon: <Compass size={16} /> },
          { id: 'seasons', label: 'Seasonal Calendar', icon: <Calendar size={16} /> },
          { id: 'elements', label: '5 Elements', icon: <Sparkles size={16} /> },
          { id: 'bookPages', label: 'Tips Book', icon: <BookOpen size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--color-gold)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--color-gold)' : 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.25s',
              paddingBottom: '14px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content panel */}
      {loading ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>Syncing Vastu guidelines...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* TAB 0: HERO SECTION */}
          {activeTab === 'hero' && heroContent && (
            <form onSubmit={handleSaveHero} className="glass-panel" style={{ padding: '30px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>
                Vastu Tips Hero Section Settings
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Badge Header Text</label>
                  <input
                    type="text"
                    value={heroContent.hero.badge}
                    onChange={(e) => setHeroContent({
                      ...heroContent,
                      hero: { ...heroContent.hero, badge: e.target.value }
                    })}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Title</label>
                  <input
                    type="text"
                    value={heroContent.hero.title}
                    onChange={(e) => setHeroContent({
                      ...heroContent,
                      hero: { ...heroContent.hero, title: e.target.value }
                    })}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Description Paragraph</label>
                  <textarea
                    rows={4}
                    value={heroContent.hero.description}
                    onChange={(e) => setHeroContent({
                      ...heroContent,
                      hero: { ...heroContent.hero, description: e.target.value }
                    })}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="submit"
                  disabled={savingHero}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: 'var(--color-gold)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    cursor: savingHero ? 'not-allowed' : 'pointer',
                    opacity: savingHero ? 0.7 : 1,
                    boxShadow: '0 4px 15px rgba(197, 168, 128, 0.2)',
                    transition: 'all 0.25s'
                  }}
                >
                  {savingHero ? <RefreshCw size={16} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} /> : <Edit size={16} />}
                  {savingHero ? 'Saving...' : 'Save Hero Settings'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 1: DIRECTIONS */}
          {activeTab === 'directions' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {data.directions.map((dir) => (
                <div key={dir._id} className="glass-panel" style={{ padding: '20px', borderTop: `2px solid ${dir.elementColor || 'var(--color-gold)'}` }}>
                  <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '1.2rem', color: '#fff' }}>{dir.code} - {dir.name}</strong>
                    <button
                      onClick={() => openEditDirection(dir)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', padding: '4px' }}
                    >
                      <Edit size={14} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div>Deity: <strong style={{ color: '#aaa' }}>{dir.deity}</strong></div>
                    <div>Element: <strong style={{ color: '#aaa' }}>{dir.element}</strong></div>
                    <div>Focus: <strong style={{ color: '#aaa' }}>{dir.focus}</strong></div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem', marginTop: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-glass)', paddingTop: '10px' }}>
                    <span>Dos: {dir.dos?.length || 0}</span>
                    <span>Donts: {dir.donts?.length || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          )}





          {/* TAB 5: SEASONS */}
          {activeTab === 'seasons' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {data.seasons.map((s) => (
                <div key={s._id} className="glass-panel" style={{ padding: '20px', borderTop: '2px solid var(--color-indigo)' }}>
                  <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#fff' }}>{s.season}</h4>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.months}</span>
                    </div>
                    <button
                      onClick={() => openEditSeason(s)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', padding: '4px' }}
                    >
                      <Edit size={14} />
                    </button>
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '0.8rem', borderTop: '1px solid var(--border-glass)', paddingTop: '10px' }}>
                    <strong style={{ color: '#aaa' }}>Tips List ({s.tips?.length || 0}):</strong>
                    <ul style={{ margin: '4px 0 0', paddingLeft: '16px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {s.tips?.slice(0, 2).map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: ELEMENTS */}
          {activeTab === 'elements' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {data.elements?.map((el) => (
                <div key={el._id} className="glass-panel" style={{ padding: '20px', borderTop: `2px solid ${el.colorHex || 'var(--color-indigo)'}` }}>
                  <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: el.colorHex }}>
                        {el.name} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>(Order: {el.order || 1})</span>
                      </h4>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{el.zone}</span>
                    </div>
                    <button
                      onClick={() => openEditElement(el)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', padding: '4px' }}
                    >
                      <Edit size={14} />
                    </button>
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '0.8rem', borderTop: '1px solid var(--border-glass)', paddingTop: '10px' }}>
                    <p style={{ margin: '0 0 6px', color: 'var(--text-muted)' }}><strong>Benefit:</strong> {el.benefit}</p>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}><strong>Colors:</strong> {el.colors}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: TIPS BOOK */}
          {activeTab === 'bookPages' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {heroContent && heroContent.bookMeta && (
                <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0, fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={18} style={{ color: 'var(--color-gold)' }} />
                    Vastu Book Layout & Covers Config
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {/* Cover Section */}
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ margin: 0, color: 'var(--color-gold)', fontSize: '0.9rem' }}>Front Cover</h4>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>Title (use \n for line breaks)</label>
                        <textarea
                          rows={2}
                          value={heroContent.bookMeta.coverTitle || ''}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            bookMeta: { ...heroContent.bookMeta, coverTitle: e.target.value }
                          })}
                          style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', fontSize: '0.8rem', resize: 'vertical' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>Subtitle</label>
                        <input
                          type="text"
                          value={heroContent.bookMeta.coverSubtitle || ''}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            bookMeta: { ...heroContent.bookMeta, coverSubtitle: e.target.value }
                          })}
                          style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>Cover Logo URL / Upload</label>
                        <input
                          type="text"
                          value={heroContent.bookMeta.coverLogo || ''}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            bookMeta: { ...heroContent.bookMeta, coverLogo: e.target.value }
                          })}
                          style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', fontSize: '0.8rem', marginBottom: '6px' }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleMetaLogoUpload(e, 'coverLogo')}
                          style={{ fontSize: '0.7rem', color: '#aaa' }}
                        />
                      </div>
                    </div>

                    {/* Introduction Section */}
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ margin: 0, color: 'var(--color-gold)', fontSize: '0.9rem' }}>Introduction Page</h4>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>Title</label>
                        <input
                          type="text"
                          value={heroContent.bookMeta.introTitle || ''}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            bookMeta: { ...heroContent.bookMeta, introTitle: e.target.value }
                          })}
                          style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>Content Text</label>
                        <textarea
                          rows={4}
                          value={heroContent.bookMeta.introText || ''}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            bookMeta: { ...heroContent.bookMeta, introText: e.target.value }
                          })}
                          style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', fontSize: '0.8rem', resize: 'vertical' }}
                        />
                      </div>
                    </div>

                    {/* Outro Section */}
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ margin: 0, color: 'var(--color-gold)', fontSize: '0.9rem' }}>Outro Page</h4>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>Title</label>
                        <input
                          type="text"
                          value={heroContent.bookMeta.outroTitle || ''}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            bookMeta: { ...heroContent.bookMeta, outroTitle: e.target.value }
                          })}
                          style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>Content Text</label>
                        <textarea
                          rows={4}
                          value={heroContent.bookMeta.outroText || ''}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            bookMeta: { ...heroContent.bookMeta, outroText: e.target.value }
                          })}
                          style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', fontSize: '0.8rem', resize: 'vertical' }}
                        />
                      </div>
                    </div>

                    {/* End Cover Section */}
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ margin: 0, color: 'var(--color-gold)', fontSize: '0.9rem' }}>Back Cover</h4>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>Title</label>
                        <input
                          type="text"
                          value={heroContent.bookMeta.endTitle || ''}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            bookMeta: { ...heroContent.bookMeta, endTitle: e.target.value }
                          })}
                          style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>Subtitle</label>
                        <input
                          type="text"
                          value={heroContent.bookMeta.endSubtitle || ''}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            bookMeta: { ...heroContent.bookMeta, endSubtitle: e.target.value }
                          })}
                          style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>End Logo URL / Upload</label>
                        <input
                          type="text"
                          value={heroContent.bookMeta.endLogo || ''}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            bookMeta: { ...heroContent.bookMeta, endLogo: e.target.value }
                          })}
                          style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', fontSize: '0.8rem', marginBottom: '6px' }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleMetaLogoUpload(e, 'endLogo')}
                          style={{ fontSize: '0.7rem', color: '#aaa' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button
                      onClick={handleSaveHero}
                      style={{
                        padding: '10px 20px',
                        background: 'var(--color-gold)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 15px rgba(197, 168, 128, 0.2)',
                        transition: 'all 0.25s'
                      }}
                    >
                      <Edit size={14} /> Save Book Metadata
                    </button>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={openAddBookPage}
                  style={{ background: 'var(--color-gold)', border: 'none', padding: '8px 16px', borderRadius: '6px', color: '#fff', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Plus size={14} /> Add Page
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                {data.bookPages?.map((page) => (
                  <div key={page._id} className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden', borderRadius: '6px', background: 'rgba(0,0,0,0.2)' }}>
                      <img 
                        src={getImageUrl(page.imageUrl)} 
                        alt={page.caption || 'Book page'} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                      <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'var(--color-gold)', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>
                        Order: {page.order}
                      </span>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', minHeight: '32px', lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {page.caption || <em style={{ opacity: 0.5 }}>No caption</em>}
                      </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid var(--border-glass)', paddingTop: '10px' }}>
                      <button
                        onClick={() => openEditBookPage(page)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                        title="Edit page"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteBookPage(page._id)}
                        style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '4px' }}
                        title="Delete page"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {(!data.bookPages || data.bookPages.length === 0) && (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No pages in the book yet. Click "Add Page" to begin!
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}

      {/* OVERLAY MODAL */}
      {modalType && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.75)', display: 'flex', alignItems: 'center', justifyCenter: 'center', zIndex: 999, padding: '20px', display: 'flex', justifyContent: 'center' }}>
          
          {/* DIRECTION FORM */}
          {modalType === 'direction' && (
            <form onSubmit={handleSaveDirection} className="glass-panel" style={{ maxWidth: '560px', width: '100%', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-heading)' }}>Edit Direction: {editingItem.code}</h3>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Direction Name</label>
                <input type="text" value={dirName} onChange={(e) => setDirName(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Governing Deity</label>
                  <input type="text" value={dirDeity} onChange={(e) => setDirDeity(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Governing Element</label>
                  <input type="text" value={dirElement} onChange={(e) => setDirElement(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Life Focus Area</label>
                <input type="text" value={dirFocus} onChange={(e) => setDirFocus(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }} />
              </div>

              {/* Dos Bullet points */}
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '6px' }}>
                  Recommended (Do's)
                  <button type="button" onClick={() => setDirDos([...dirDos, ''])} style={{ background: 'rgba(197,168,128,0.1)', border: 'none', color: 'var(--color-gold)', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem' }}>+ Add</button>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {dirDos.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" value={item} onChange={(e) => { const nd = [...dirDos]; nd[i] = e.target.value; setDirDos(nd); }} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', fontSize: '0.8rem' }} />
                      <button type="button" disabled={dirDos.length === 1} onClick={() => setDirDos(dirDos.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donts Bullet points */}
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '6px' }}>
                  Avoid (Don'ts)
                  <button type="button" onClick={() => setDirDonts([...dirDonts, ''])} style={{ background: 'rgba(197,168,128,0.1)', border: 'none', color: 'var(--color-gold)', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem' }}>+ Add</button>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {dirDonts.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" value={item} onChange={(e) => { const nd = [...dirDonts]; nd[i] = e.target.value; setDirDonts(nd); }} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', fontSize: '0.8rem' }} />
                      <button type="button" disabled={dirDonts.length === 1} onClick={() => setDirDonts(dirDonts.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '10px 20px', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: 'var(--color-gold)', border: 'none', padding: '10px 24px', borderRadius: '6px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
              </div>
            </form>
          )}



          {/* MISTAKE FORM */}
          {modalType === 'mistake' && (
            <form onSubmit={handleSaveMistake} className="glass-panel" style={{ maxWidth: '520px', width: '100%', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-heading)' }}>{editingItem ? 'Edit Vastu Dosha' : 'Add Vastu Dosha'}</h3>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Mistake / Description</label>
                  <input type="text" required value={mistakeText} onChange={(e) => setMistakeText(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Severity</label>
                  <select value={mistakeSeverity} onChange={(e) => setMistakeSeverity(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Negative Impact</label>
                <textarea rows="3" required value={mistakeImpact} onChange={(e) => setMistakeImpact(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Elemental Remedy</label>
                <textarea rows="3" required value={mistakeRemedy} onChange={(e) => setMistakeRemedy(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }} />
              </div>

              <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '10px 20px', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: 'var(--color-gold)', border: 'none', padding: '10px 24px', borderRadius: '6px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
              </div>
            </form>
          )}

          {/* REMEDY FORM */}
          {modalType === 'remedy' && (
            <form onSubmit={handleSaveRemedy} className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-heading)' }}>{editingItem ? 'Edit Quick Remedy' : 'Add Quick Remedy'}</h3>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Remedy Title</label>
                <input type="text" required value={remedyTitle} onChange={(e) => setRemedyTitle(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Icon Class (Lucide-react name)</label>
                <select value={remedyIcon} onChange={(e) => setRemedyIcon(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>
                  <option value="Sparkles">Sparkles</option>
                  <option value="Shield">Shield</option>
                  <option value="Leaf">Leaf</option>
                  <option value="Wind">Wind</option>
                  <option value="Sun">Sun</option>
                  <option value="Mountain">Mountain</option>
                  <option value="TrendingUp">TrendingUp</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Remedy Description</label>
                <textarea rows="4" required value={remedyDesc} onChange={(e) => setRemedyDesc(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }} />
              </div>

              <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '10px 20px', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: 'var(--color-gold)', border: 'none', padding: '10px 24px', borderRadius: '6px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
              </div>
            </form>
          )}

          {/* SEASON FORM */}
          {modalType === 'season' && (
            <form onSubmit={handleSaveSeason} className="glass-panel" style={{ maxWidth: '540px', width: '100%', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-heading)' }}>Edit Season: {editingItem.season}</h3>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Season Title</label>
                  <input type="text" required value={seasonName} onChange={(e) => setSeasonName(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Month Range</label>
                  <input type="text" required value={seasonMonths} onChange={(e) => setSeasonMonths(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }} />
                </div>
              </div>

              {/* Season tips */}
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '8px' }}>
                  Seasonal tips guidelines
                  <button type="button" onClick={() => setSeasonTips([...seasonTips, ''])} style={{ background: 'rgba(197,168,128,0.1)', border: 'none', color: 'var(--color-gold)', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem' }}>+ Add Tip</button>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {seasonTips.map((tip, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input type="text" value={tip} onChange={(e) => { const nt = [...seasonTips]; nt[idx] = e.target.value; setSeasonTips(nt); }} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', fontSize: '0.82rem' }} />
                      <button type="button" disabled={seasonTips.length === 1} onClick={() => setSeasonTips(seasonTips.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '10px 20px', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: 'var(--color-gold)', border: 'none', padding: '10px 24px', borderRadius: '6px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
              </div>
            </form>
          )}

          {/* ELEMENT FORM */}
          {modalType === 'element' && (
            <form onSubmit={handleSaveElement} className="glass-panel" style={{ maxWidth: '540px', width: '100%', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-heading)' }}>Edit Element: {editingItem?.name}</h3>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Element Name</label>
                  <input type="text" required value={eleName} onChange={(e) => setEleName(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Zone / Direction</label>
                  <input type="text" required value={eleZone} onChange={(e) => setEleZone(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
                <div>
                   <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gold)' }}>Color Hex/Var</label>
                   <input type="text" required value={eleColorHex} onChange={(e) => setEleColorHex(e.target.value)} style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', fontSize: '0.8rem' }} />
                </div>
                <div>
                   <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gold)' }}>BG Alpha Color</label>
                   <input type="text" required value={eleBgCode} onChange={(e) => setEleBgCode(e.target.value)} style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', fontSize: '0.8rem' }} />
                </div>
                <div>
                   <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gold)' }}>Icon Name</label>
                   <select value={eleIconName} onChange={(e) => setEleIconName(e.target.value)} style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>
                     <option value="Droplets">Droplets</option>
                     <option value="Zap">Zap</option>
                     <option value="Mountain">Mountain</option>
                     <option value="Wind">Wind</option>
                     <option value="Star">Star</option>
                     <option value="Leaf">Leaf</option>
                     <option value="Sun">Sun</option>
                   </select>
                </div>
                <div>
                   <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gold)' }}>Placement Order</label>
                   <input type="number" required min="1" value={eleOrder} onChange={(e) => setEleOrder(e.target.value)} style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', fontSize: '0.8rem' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Benefit / Focus</label>
                <textarea rows="2" required value={eleBenefit} onChange={(e) => setEleBenefit(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Recommended Colors</label>
                <input type="text" required value={eleColors} onChange={(e) => setEleColors(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }} />
              </div>

              <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '10px 20px', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: 'var(--color-gold)', border: 'none', padding: '10px 24px', borderRadius: '6px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
              </div>
            </form>
          )}

          {/* BOOK PAGE FORM */}
          {modalType === 'bookPage' && (
            <form onSubmit={handleSaveBookPage} className="glass-panel" style={{ maxWidth: '540px', width: '100%', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-heading)' }}>
                  {editingItem ? 'Edit Book Page' : 'Add Book Page'}
                </h3>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              {/* Image upload / input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Page Image</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    required
                    placeholder="Paste image URL or choose file..."
                    value={pageImageUrl}
                    onChange={(e) => setPageImageUrl(e.target.value)}
                    style={{ flex: 1, padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '6px',
                    color: 'var(--color-gold)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap'
                  }}>
                    {uploading ? <RefreshCw size={14} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} /> : <Upload size={14} />}
                    {uploading ? 'Uploading...' : 'Upload File'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              {/* Caption */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Caption (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Best directional placement for the master bedroom"
                  value={pageCaption}
                  onChange={(e) => setPageCaption(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              {/* Order */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '4px' }}>Display Order / Page Number</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={pageOrder}
                  onChange={(e) => setPageOrder(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setModalType(null)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '10px 20px', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={uploading} style={{ background: 'var(--color-gold)', border: 'none', padding: '10px 24px', borderRadius: '6px', color: '#fff', fontWeight: 'bold', cursor: uploading ? 'not-allowed' : 'pointer' }}>Save Changes</button>
              </div>
            </form>
          )}

        </div>
      )}

    </div>
  );
}
