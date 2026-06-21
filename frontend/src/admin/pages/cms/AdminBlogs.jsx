import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  BookOpen, Plus, Edit, Trash2, X, CheckCircle, AlertCircle, ArrowLeft, Calendar, User, Clock, Upload, RefreshCw
} from 'lucide-react';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Vastu Shastra');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('Rudra Ji');
  const [readTime, setReadTime] = useState('5 Min Read');
  const [imgUrl, setImgUrl] = useState('/vastu_terracotta.png');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const { data } = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImgUrl(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      alert(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState(['']); // array of paragraphs
  const [isPublished, setIsPublished] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/blogs?admin=true');
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setEditingBlog(null);
    setTitle('');
    setCategory('Vastu Shastra');
    setDate(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    setAuthor('Rudra Ji');
    setReadTime('4 Min Read');
    setImgUrl('/vastu_terracotta.png');
    setSummary('');
    setContent(['']);
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (b) => {
    setEditingBlog(b);
    setTitle(b.title);
    setCategory(b.category);
    setDate(b.date || '');
    setAuthor(b.author || 'Rudra Ji');
    setReadTime(b.readTime || '4 Min Read');
    setImgUrl(b.imgUrl || '/vastu_terracotta.png');
    setSummary(b.summary);
    setContent(b.content?.length ? b.content : ['']);
    setIsPublished(b.isPublished);
    setModalOpen(true);
  };

  const handleParagraphChange = (idx, val) => {
    const newContent = [...content];
    newContent[idx] = val;
    setContent(newContent);
  };

  const addParagraph = () => {
    setContent([...content, '']);
  };

  const removeParagraph = (idx) => {
    if (content.length > 1) {
      setContent(content.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !summary || !content.length) {
      alert('Please fill in required fields (Title, Summary, Content paragraphs)');
      return;
    }

    const payload = {
      title,
      category,
      date,
      author,
      readTime,
      imgUrl,
      summary,
      content: content.filter(p => p.trim() !== ''),
      isPublished,
    };

    try {
      if (editingBlog) {
        await api.put(`/blogs/${editingBlog._id}`, payload);
      } else {
        await api.post('/blogs', payload);
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save blog post');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this blog post permanently?')) {
      try {
        await api.delete(`/blogs/${id}`);
        setBlogs(blogs.filter(b => b._id !== id));
      } catch (error) {
        alert('Failed to delete blog post');
      }
    }
  };

  const handleTogglePublish = async (b) => {
    try {
      const { data } = await api.put(`/blogs/${b._id}`, { isPublished: !b.isPublished });
      setBlogs(blogs.map(item => item._id === b._id ? data : item));
    } catch (error) {
      alert('Failed to toggle publication state');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
            CMS: Blog Articles
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Write, modify, or toggled visibility of publications and astrological resources.
          </p>
        </div>

        <button
          onClick={openAddModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'var(--color-gold)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.88rem',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} /> Write Blog Post
        </button>
      </div>

      {/* Blogs Grid */}
      {loading ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>Loading publications archive...</div>
      ) : blogs.length === 0 ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No blogs written yet. Add one!</div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {blogs.map((b) => (
            <div key={b._id} className="glass-panel" style={{
              padding: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              opacity: b.isPublished ? 1 : 0.6,
              borderLeft: `3px solid ${b.isPublished ? 'var(--color-gold)' : '#444'}`,
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-gold)', background: 'rgba(197, 168, 128, 0.08)', padding: '3px 8px', borderRadius: '4px' }}>
                    {b.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Calendar size={12} /> {b.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Clock size={12} /> {b.readTime}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <User size={12} /> By {b.author}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', margin: '10px 0 6px', color: '#fff' }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                  {b.summary}
                </p>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => handleTogglePublish(b)}
                  style={{
                    background: b.isPublished ? 'rgba(197, 168, 128, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${b.isPublished ? 'rgba(197, 168, 128, 0.2)' : 'var(--border-glass)'}`,
                    borderRadius: '6px',
                    color: b.isPublished ? 'var(--color-gold)' : 'var(--text-muted)',
                    padding: '8px 14px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  {b.isPublished ? 'Published' : 'Draft'}
                </button>

                <button
                  onClick={() => openEditModal(b)}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '6px',
                    padding: '8px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  <Edit size={14} />
                </button>

                <button
                  onClick={() => handleDelete(b._id)}
                  style={{
                    background: 'rgba(255, 77, 77, 0.05)',
                    border: '1px solid rgba(255, 77, 77, 0.15)',
                    borderRadius: '6px',
                    padding: '8px',
                    color: '#ff4d4d',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Modal Overlay */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px',
        }}>
          <form onSubmit={handleSubmit} className="glass-panel" style={{
            maxWidth: '680px',
            width: '100%',
            padding: '30px',
            borderRadius: '16px',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            textAlign: 'left',
          }}>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0, borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
              {editingBlog ? 'Edit Blog Publication' : 'Write New Blog Post'}
            </h3>

            {/* Title */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Blog Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. How Vastu Shastra Can Transform Your Home"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
              />
            </div>

            {/* Category & Date Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}
                >
                  <option value="Vastu Shastra">Vastu Shastra</option>
                  <option value="Astrology">Astrology</option>
                  <option value="Numerology">Numerology</option>
                  <option value="Tarot Reading">Tarot Reading</option>
                  <option value="Counselling">Counselling</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Display Date *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. November 18, 2025"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            {/* Author & Read Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Author Signature</label>
                <input
                  type="text"
                  placeholder="e.g. Rudra Ji"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Estimated Read Time</label>
                <input
                  type="text"
                  placeholder="e.g. 4 Min Read"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            {/* Card Image selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Blog Cover Image</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Paste image URL or choose file..."
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
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
              
              {/* Optional Quick Template Select */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Templates:</span>
                {[
                  { name: 'Vastu', val: '/vastu_terracotta.png' },
                  { name: 'Astrology', val: '/astrology_terracotta.png' },
                  { name: 'Numerology', val: '/numerology_terracotta.png' },
                  { name: 'Tarot', val: '/tarot_terracotta.png' },
                  { name: 'Counselling', val: '/relationship_terracotta.png' },
                ].map(t => (
                  <button
                    key={t.val}
                    type="button"
                    onClick={() => setImgUrl(t.val)}
                    style={{
                      background: imgUrl === t.val ? 'rgba(197, 168, 128, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${imgUrl === t.val ? 'var(--color-gold)' : 'var(--border-glass)'}`,
                      borderRadius: '4px',
                      color: imgUrl === t.val ? 'var(--color-gold)' : 'var(--text-muted)',
                      padding: '3px 8px',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Brief Summary / Excerpt *</label>
              <textarea
                required
                rows="2"
                placeholder="Write a short summary that will tease this article in listing view grids..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
              />
            </div>

            {/* Content paragraphs */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '8px' }}>
                Content Paragraphs
                <button
                  type="button"
                  onClick={addParagraph}
                  style={{ background: 'rgba(197, 168, 128, 0.1)', border: '1px solid rgba(197, 168, 128, 0.2)', color: 'var(--color-gold)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}
                >
                  + Add Paragraph
                </button>
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {content.map((para, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <textarea
                      rows="4"
                      required
                      placeholder={`Paragraph ${idx + 1} contents...`}
                      value={para}
                      onChange={(e) => handleParagraphChange(idx, e.target.value)}
                      style={{ flex: 1, padding: '10px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical', fontSize: '0.85rem' }}
                    />
                    <button
                      type="button"
                      disabled={content.length === 1}
                      onClick={() => removeParagraph(idx)}
                      style={{ background: 'rgba(255, 77, 77, 0.05)', border: '1px solid rgba(255, 77, 77, 0.15)', color: '#ff4d4d', borderRadius: '6px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: content.length === 1 ? 'not-allowed' : 'pointer', marginTop: '4px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* IsPublished toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                style={{ cursor: 'pointer', width: '16px', height: '16px' }}
              />
              <label htmlFor="isPublished" style={{ fontSize: '0.85rem', color: 'var(--text-heading)', cursor: 'pointer', fontWeight: 'bold' }}>
                Publish article directly and display on the blog page
              </label>
            </div>

            {/* Submit buttons */}
            <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-glass)', paddingTop: '15px' }}>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-glass)', padding: '12px 24px', borderRadius: '8px', color: 'var(--text-primary)', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ background: 'var(--color-gold)', border: 'none', padding: '12px 30px', borderRadius: '8px', color: '#fff', fontWeight: '700', cursor: 'pointer' }}
              >
                Save Blog Post
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
