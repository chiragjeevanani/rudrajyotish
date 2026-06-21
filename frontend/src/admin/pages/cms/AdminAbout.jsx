import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  Edit, Save, CheckCircle, AlertCircle, RefreshCw, Eye, Sparkles, Compass, ShieldAlert, Award, Upload
} from 'lucide-react';

export default function AdminAbout() {
  const [activeTab, setActiveTab] = useState('header');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/about');
      setContent(data);
    } catch (error) {
      console.error('Error fetching about content:', error);
      setErrorMsg('Failed to load about page content settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const handleNestedChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleListChange = (section, listField, index, field, value) => {
    setContent(prev => {
      const updatedList = [...prev[section][listField]];
      updatedList[index] = {
        ...updatedList[index],
        [field]: value
      };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [listField]: updatedList
        }
      };
    });
  };

  const addListItem = (section, listField) => {
    setContent(prev => {
      const updatedList = [...prev[section][listField], { title: '', desc: '' }];
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [listField]: updatedList
        }
      };
    });
  };

  const removeListItem = (section, listField, index) => {
    setContent(prev => {
      const updatedList = prev[section][listField].filter((_, idx) => idx !== index);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [listField]: updatedList
        }
      };
    });
  };

  const handleImageUpload = async (e, section) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      setErrorMsg('');
      setSuccessMsg('');
      const { data } = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleNestedChange(section, 'imageUrl', data.url);
      setSuccessMsg('Image uploaded successfully!');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');
      const { data } = await api.put('/about', content);
      setContent(data);
      setSuccessMsg('About page content updated successfully!');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (error) {
      console.error('Failed to save about content:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to update about page settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '100px 0' }}>
        <RefreshCw size={32} className="spin" style={{ display: 'block', margin: '0 auto 16px', animation: 'spin 1.5s linear infinite' }} />
        Loading about page configurations...
      </div>
    );
  }

  if (!content) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', border: '1px solid #ff4d4d' }}>
        <AlertCircle size={40} style={{ color: '#ff4d4d', marginBottom: '16px' }} />
        <h3 style={{ color: '#fff', margin: 0 }}>Error Loading Configurations</h3>
      </div>
    );
  }

  const tabs = [
    { id: 'header', name: 'Page Header', icon: <Eye size={16} /> },
    { id: 'profile', name: 'Founder Profile', icon: <Award size={16} /> },
    { id: 'doDont', name: 'What I Do & Don\'t', icon: <ShieldAlert size={16} /> },
    { id: 'journey', name: 'My Journey', icon: <Compass size={16} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
            CMS: About Page Sections
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Customize all details, do's & don'ts points, founder biography, profile pictures, and headers on the About page.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
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
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1,
            transition: 'all 0.25s'
          }}
        >
          {saving ? <RefreshCw size={16} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} /> : <Save size={16} />}
          Save Settings
        </button>
      </div>

      {successMsg && (
        <div style={{ padding: '12px 18px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--color-indigo)', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={18} /> {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ padding: '12px 18px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ff4d4d', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={18} /> {errorMsg}
        </div>
      )}

      <div className="admin-cms-split-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '8px',
                textAlign: 'left',
                border: activeTab === tab.id ? '1px solid rgba(197, 168, 128, 0.3)' : '1px solid transparent',
                background: activeTab === tab.id ? 'rgba(197, 168, 128, 0.08)' : 'transparent',
                color: activeTab === tab.id ? 'var(--color-gold)' : 'var(--text-muted)',
                fontWeight: activeTab === tab.id ? 'bold' : '600',
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        <div className="glass-panel" style={{ padding: '30px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
          {activeTab === 'header' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>Header Banner Settings</h3>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Badge Title</label>
                <input
                  type="text"
                  value={content.header.badge}
                  onChange={(e) => handleNestedChange('header', 'badge', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Section Main Title</label>
                <input
                  type="text"
                  value={content.header.title}
                  onChange={(e) => handleNestedChange('header', 'title', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Introductory Paragraph</label>
                <textarea
                  rows="4"
                  value={content.header.description}
                  onChange={(e) => handleNestedChange('header', 'description', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>Founder Profile Settings</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Profile Badge</label>
                  <input
                    type="text"
                    value={content.profile.badge}
                    onChange={(e) => handleNestedChange('profile', 'badge', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Full Name / Title</label>
                  <input
                    type="text"
                    value={content.profile.title}
                    onChange={(e) => handleNestedChange('profile', 'title', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Subtitle / Designation</label>
                <input
                  type="text"
                  value={content.profile.subtitle}
                  onChange={(e) => handleNestedChange('profile', 'subtitle', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Profile Image</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={content.profile.imageUrl}
                    onChange={(e) => handleNestedChange('profile', 'imageUrl', e.target.value)}
                    style={{ flex: 1, padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: '600', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                    <Upload size={14} /> Upload
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Biography Paragraph 1</label>
                <textarea
                  rows="4"
                  value={content.profile.desc1}
                  onChange={(e) => handleNestedChange('profile', 'desc1', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Biography Paragraph 2</label>
                <textarea
                  rows="4"
                  value={content.profile.desc2}
                  onChange={(e) => handleNestedChange('profile', 'desc2', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>
            </div>
          )}

          {activeTab === 'doDont' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 12px', fontFamily: 'var(--font-serif)' }}>What I Do Section</h3>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>What I Do Title</label>
                  <input
                    type="text"
                    value={content.doDont.doTitle}
                    onChange={(e) => handleNestedChange('doDont', 'doTitle', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                  {content.doDont.doList.map((item, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 50px', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Bullet Title"
                        value={item.title}
                        onChange={(e) => handleListChange('doDont', 'doList', idx, 'title', e.target.value)}
                        style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff' }}
                      />
                      <input
                        type="text"
                        placeholder="Bullet Description"
                        value={item.desc}
                        onChange={(e) => handleListChange('doDont', 'doList', idx, 'desc', e.target.value)}
                        style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff' }}
                      />
                      <button type="button" onClick={() => removeListItem('doDont', 'doList', idx)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addListItem('doDont', 'doList')} style={{ alignSelf: 'flex-start', padding: '6px 12px', background: 'rgba(197, 168, 128, 0.1)', border: '1px solid var(--border-glass)', color: 'var(--color-gold)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>+ Add Bullet</button>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 12px', fontFamily: 'var(--font-serif)' }}>What I Don't Do Section</h3>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>What I Don't Do Title</label>
                  <input
                    type="text"
                    value={content.doDont.dontTitle}
                    onChange={(e) => handleNestedChange('doDont', 'dontTitle', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                  {content.doDont.dontList.map((item, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 50px', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Bullet Title"
                        value={item.title}
                        onChange={(e) => handleListChange('doDont', 'dontList', idx, 'title', e.target.value)}
                        style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff' }}
                      />
                      <input
                        type="text"
                        placeholder="Bullet Description"
                        value={item.desc}
                        onChange={(e) => handleListChange('doDont', 'dontList', idx, 'desc', e.target.value)}
                        style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff' }}
                      />
                      <button type="button" onClick={() => removeListItem('doDont', 'dontList', idx)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addListItem('doDont', 'dontList')} style={{ alignSelf: 'flex-start', padding: '6px 12px', background: 'rgba(197, 168, 128, 0.1)', border: '1px solid var(--border-glass)', color: 'var(--color-gold)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>+ Add Bullet</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'journey' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>Founder Journey Settings</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Journey Section Badge</label>
                  <input
                    type="text"
                    value={content.journey.badge}
                    onChange={(e) => handleNestedChange('journey', 'badge', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Journey Title</label>
                  <input
                    type="text"
                    value={content.journey.title}
                    onChange={(e) => handleNestedChange('journey', 'title', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Journey Subtitle</label>
                <input
                  type="text"
                  value={content.journey.subtitle}
                  onChange={(e) => handleNestedChange('journey', 'subtitle', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>CTA Button Label</label>
                  <input
                    type="text"
                    value={content.journey.ctaText}
                    onChange={(e) => handleNestedChange('journey', 'ctaText', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Journey Banner Image</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={content.journey.imageUrl}
                      onChange={(e) => handleNestedChange('journey', 'imageUrl', e.target.value)}
                      style={{ flex: 1, padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                    />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: '600', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                      <Upload size={14} /> Upload
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'journey')} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Journey Narrative Paragraph 1</label>
                <textarea
                  rows="3"
                  value={content.journey.desc1}
                  onChange={(e) => handleNestedChange('journey', 'desc1', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Journey Narrative Paragraph 2</label>
                <textarea
                  rows="3"
                  value={content.journey.desc2}
                  onChange={(e) => handleNestedChange('journey', 'desc2', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Journey Narrative Paragraph 3</label>
                <textarea
                  rows="3"
                  value={content.journey.desc3}
                  onChange={(e) => handleNestedChange('journey', 'desc3', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Journey Narrative Paragraph 4</label>
                <textarea
                  rows="3"
                  value={content.journey.desc4}
                  onChange={(e) => handleNestedChange('journey', 'desc4', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
