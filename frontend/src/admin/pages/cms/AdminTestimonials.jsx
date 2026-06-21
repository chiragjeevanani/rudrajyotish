import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  MessageSquare, Plus, Edit, Trash2, X, Star, CheckCircle, AlertCircle 
} from 'lucide-react';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  // Form Fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('Consultation Client');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [isVisible, setIsVisible] = useState(true);
  const [order, setOrder] = useState(0);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/testimonials?admin=true');
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAddModal = () => {
    setEditingTestimonial(null);
    setName('');
    setRole('Consultation Client');
    setText('');
    setRating(5);
    setIsVisible(true);
    setOrder(testimonials.length);
    setModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditingTestimonial(t);
    setName(t.name);
    setRole(t.role || '');
    setText(t.text);
    setRating(t.rating);
    setIsVisible(t.isVisible);
    setOrder(t.order || 0);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !text) {
      alert('Please fill in required fields (Name, Review Text)');
      return;
    }

    const payload = {
      name,
      role,
      text,
      rating: Number(rating),
      isVisible,
      order: Number(order),
    };

    try {
      if (editingTestimonial) {
        await api.put(`/testimonials/${editingTestimonial._id}`, payload);
      } else {
        await api.post('/testimonials', payload);
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this testimonial permanently?')) {
      try {
        await api.delete(`/testimonials/${id}`);
        setTestimonials(testimonials.filter(t => t._id !== id));
      } catch (error) {
        alert('Failed to delete testimonial');
      }
    }
  };

  const handleToggleVisible = async (t) => {
    try {
      const { data } = await api.put(`/testimonials/${t._id}`, { isVisible: !t.isVisible });
      setTestimonials(testimonials.map(item => item._id === t._id ? data : item));
    } catch (error) {
      alert('Failed to toggle visibility status');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
            CMS: Testimonials
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Manage client feedback, testimonial details, star ratings, and reorder listings.
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
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {/* Testimonials Listing */}
      {loading ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>Loading reviews catalog...</div>
      ) : testimonials.length === 0 ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No reviews recorded. Add one!</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {testimonials.map((t) => (
            <div key={t._id} className="glass-panel" style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px',
              opacity: t.isVisible ? 1 : 0.6,
              borderTop: `2px solid ${t.isVisible ? 'var(--color-gold)' : '#444'}`,
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '2px', color: 'var(--color-gold)' }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => openEditModal(t)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '4px' }}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  lineHeight: '1.6',
                  fontStyle: 'italic',
                  margin: '12px 0',
                }}>
                  "{t.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid var(--border-glass)',
                paddingTop: '14px',
              }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-serif)', margin: 0, color: '#fff' }}>
                    {t.name}
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {t.role}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleVisible(t)}
                  style={{
                    background: t.isVisible ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${t.isVisible ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-glass)'}`,
                    borderRadius: '6px',
                    color: t.isVisible ? 'var(--color-indigo)' : 'var(--text-muted)',
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  {t.isVisible ? 'Visible' : 'Hidden'}
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
            maxWidth: '520px',
            width: '100%',
            padding: '30px',
            borderRadius: '16px',
            position: 'relative',
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
              {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>

            {/* Client Name & Role */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Subtitle / Role</label>
                <input
                  type="text"
                  placeholder="e.g. Business Owner"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            {/* Star Rating & Display Order */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Star Rating *</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Display Order</label>
                <input
                  type="number"
                  placeholder="e.g. 0"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            {/* Testimonial Text */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Client Feedback Text *</label>
              <textarea
                required
                rows="5"
                placeholder="Paste the testimonial message here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
              />
            </div>

            {/* IsVisible Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '5px 0' }}>
              <input
                type="checkbox"
                id="isVisible"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
                style={{ cursor: 'pointer', width: '16px', height: '16px' }}
              />
              <label htmlFor="isVisible" style={{ fontSize: '0.85rem', color: 'var(--text-heading)', cursor: 'pointer', fontWeight: 'bold' }}>
                Display feedback on website testimonials page
              </label>
            </div>

            {/* Submit Footer */}
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
                Save Review
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
