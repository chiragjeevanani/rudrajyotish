import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  Sparkles, Plus, Edit, Trash2, X, CheckCircle, AlertCircle, ArrowUp, ArrowDown 
} from 'lucide-react';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Vastu Shastra');
  const [sub, setSub] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [note, setNote] = useState('');
  const [imgUrl, setImgUrl] = useState('/vastu_terracotta.png');
  const [list, setList] = useState(['']); // array of bullet points
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);
  const [activeDays, setActiveDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  const [slots, setSlots] = useState([
    { label: 'Morning slots', times: [] }
  ]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/services?admin=true');
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setTitle('');
    setCategory('Vastu Shastra');
    setSub('');
    setDesc('');
    setPrice('');
    setDuration('');
    setNote('');
    setImgUrl('/vastu_terracotta.png');
    setList(['']);
    setIsActive(true);
    setOrder(services.length);
    setActiveDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    setSlots([
      { label: 'Morning slots', times: ['10:00 AM', '11:15 AM', '11:30 AM'] },
      { label: 'Afternoon slots', times: ['02:00 PM', '03:15 PM', '04:30 PM'] },
      { label: 'Evening slots', times: ['05:45 PM', '06:00 PM', '07:15 PM'] }
    ]);
    setModalOpen(true);
  };

  const openEditModal = (s) => {
    setEditingService(s);
    setTitle(s.title);
    setCategory(s.category);
    setSub(s.sub || '');
    setDesc(s.desc);
    setPrice(s.price);
    setDuration(s.duration);
    setNote(s.note || '');
    setImgUrl(s.imgUrl || '/vastu_terracotta.png');
    setList(s.list?.length ? s.list : ['']);
    setIsActive(s.isActive);
    setOrder(s.order || 0);
    setActiveDays(s.availability?.activeDays?.length ? s.availability.activeDays : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    setSlots(s.availability?.slots?.length ? s.availability.slots : [
      { label: 'Morning slots', times: [] }
    ]);
    setModalOpen(true);
  };

  const handleListChange = (idx, val) => {
    const newList = [...list];
    newList[idx] = val;
    setList(newList);
  };

  const addBulletPoint = () => {
    setList([...list, '']);
  };

  const removeBulletPoint = (idx) => {
    if (list.length > 1) {
      setList(list.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !price || !duration) {
      alert('Please fill in required fields (Title, Description, Price, Duration)');
      return;
    }

    const payload = {
      title,
      category,
      sub,
      desc,
      price: Number(price),
      duration: Number(duration),
      note,
      imgUrl,
      list: list.filter(item => item.trim() !== ''),
      isActive,
      order: Number(order),
      availability: {
        activeDays,
        slots: slots.map(group => ({
          label: group.label,
          times: group.times.filter(t => t.trim() !== '')
        })).filter(group => group.times.length > 0 || group.label.trim() !== '')
      }
    };

    try {
      if (editingService) {
        await api.put(`/services/${editingService._id}`, payload);
      } else {
        await api.post('/services', payload);
      }
      setModalOpen(false);
      fetchServices();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this service permanently? Existing bookings referencing it will remain unaffected.')) {
      try {
        await api.delete(`/services/${id}`);
        setServices(services.filter(s => s._id !== id));
      } catch (error) {
        alert('Failed to delete service');
      }
    }
  };

  const handleToggleActive = async (s) => {
    try {
      const { data } = await api.put(`/services/${s._id}`, { isActive: !s.isActive });
      setServices(services.map(item => item._id === s._id ? data : item));
    } catch (error) {
      alert('Failed to toggle active status');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
            CMS: Services List
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Add, update, or temporarily toggle active consulting options displayed on the front page.
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
          <Plus size={16} /> Add New Service
        </button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>Loading services inventory...</div>
      ) : services.length === 0 ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No services configured. Create one!</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {services.map((s) => (
            <div key={s._id} className="glass-panel" style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px',
              opacity: s.isActive ? 1 : 0.6,
              borderTop: `3px solid ${s.isActive ? 'var(--color-indigo)' : '#444'}`,
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-gold)', background: 'rgba(197, 168, 128, 0.08)', padding: '3px 8px', borderRadius: '4px' }}>
                    {s.category}
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => openEditModal(s)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '4px' }}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', margin: '12px 0 4px', color: '#fff' }}>
                  {s.title}
                </h3>
                {s.sub && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '8px' }}>
                    {s.sub}
                  </div>
                )}
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 16px' }}>
                  {s.desc}
                </p>

                {/* Bullets List preview */}
                {s.list?.length > 0 && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-glass)', paddingTop: '12px' }}>
                    <strong style={{ color: '#aaa', display: 'block', marginBottom: '6px' }}>Features:</strong>
                    <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {s.list.slice(0, 3).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                      {s.list.length > 3 && <li style={{ fontStyle: 'italic' }}>+{s.list.length - 3} more...</li>}
                    </ul>
                  </div>
                )}
              </div>

              {/* Price & Active Toggle */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid var(--border-glass)',
                paddingTop: '14px',
                fontSize: '0.85rem',
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Fee / Session:</span>
                  <strong style={{ color: 'var(--color-gold)', fontSize: '1rem' }}>₹{s.price}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}> ({s.duration} mins)</span>
                </div>

                <button
                  onClick={() => handleToggleActive(s)}
                  style={{
                    background: s.isActive ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${s.isActive ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-glass)'}`,
                    borderRadius: '6px',
                    color: s.isActive ? 'var(--color-indigo)' : 'var(--text-muted)',
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {s.isActive ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                  {s.isActive ? 'Active' : 'Hidden'}
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
            maxWidth: '640px',
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
              {editingService ? 'Edit Consulting Service' : 'Add New Consulting Service'}
            </h3>

            {/* Title & Category Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vastu Discussion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}
                >
                  <option value="Vastu Shastra">Vastu Shastra</option>
                  <option value="Numerology">Numerology</option>
                  <option value="Astrology">Astrology</option>
                  <option value="Tarot Reading">Tarot Reading</option>
                  <option value="Counselling">Counselling</option>
                </select>
              </div>
            </div>

            {/* Subtitle / Focus */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Subtitle Focus</label>
              <input
                type="text"
                placeholder="e.g. Directions, Placements & Energy Corrections"
                value={sub}
                onChange={(e) => setSub(e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Detailed Description *</label>
              <textarea
                required
                rows="4"
                placeholder="Explain the process, consulting flow, and key benefits..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
              />
            </div>

            {/* Pricing, Duration & Display Order */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Session Price (INR) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 5100"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Duration (Mins) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 60"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                />
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

            {/* Note & Image Url */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Service Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Report will send in 48 hours"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '4px' }}>Card Image Template</label>
                <select
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}
                >
                  <option value="/vastu_terracotta.png">Vastu Terracotta (Earth)</option>
                  <option value="/astrology_terracotta.png">Astrology (Planets)</option>
                  <option value="/numerology_terracotta.png">Numerology (Numbers Grid)</option>
                  <option value="/tarot_terracotta.png">Tarot (Mind/Eye)</option>
                  <option value="/relationship_terracotta.png">Relationship (Hearts)</option>
                </select>
              </div>
            </div>

            {/* Bullet list points */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '8px' }}>
                Service Bullet Bullet Points
                <button
                  type="button"
                  onClick={addBulletPoint}
                  style={{ background: 'rgba(197, 168, 128, 0.1)', border: '1px solid rgba(197, 168, 128, 0.2)', color: 'var(--color-gold)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}
                >
                  + Add Point
                </button>
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {list.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder={`Bullet point ${idx + 1}`}
                      value={item}
                      onChange={(e) => handleListChange(idx, e.target.value)}
                      style={{ flex: 1, padding: '10px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', fontSize: '0.85rem' }}
                    />
                    <button
                      type="button"
                      disabled={list.length === 1}
                      onClick={() => removeBulletPoint(idx)}
                      style={{ background: 'rgba(255, 77, 77, 0.05)', border: '1px solid rgba(255, 77, 77, 0.15)', color: '#ff4d4d', borderRadius: '6px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: list.length === 1 ? 'not-allowed' : 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Weekdays checklist */}
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '15px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '8px' }}>Active Weekdays</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                  const isChecked = activeDays.includes(day);
                  return (
                    <label key={day} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#fff', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setActiveDays(activeDays.filter(d => d !== day));
                          } else {
                            setActiveDays([...activeDays, day]);
                          }
                        }}
                        style={{ cursor: 'pointer', width: '15px', height: '15px' }}
                      />
                      {day}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Slots groups constructor */}
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '15px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '8px' }}>
                Booking Time Slots (Categorized Groups)
                <button
                  type="button"
                  onClick={() => setSlots([...slots, { label: 'New Slot Group', times: [''] }])}
                  style={{ background: 'rgba(197, 168, 128, 0.1)', border: '1px solid rgba(197, 168, 128, 0.2)', color: 'var(--color-gold)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}
                >
                  + Add Group
                </button>
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {slots.map((group, groupIdx) => (
                  <div key={groupIdx} className="glass-panel" style={{ padding: '15px', border: '1px solid rgba(255, 255, 255, 0.03)', background: 'rgba(255, 255, 255, 0.01)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Group Label (e.g. Morning slots)"
                        value={group.label}
                        onChange={(e) => {
                          const newSlots = [...slots];
                          newSlots[groupIdx].label = e.target.value;
                          setSlots(newSlots);
                        }}
                        style={{ flex: 1, padding: '6px 10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newSlots = [...slots];
                          newSlots[groupIdx].times.push('');
                          setSlots(newSlots);
                        }}
                        style={{ background: 'rgba(197, 168, 128, 0.08)', border: '1px solid var(--border-glass)', color: 'var(--color-gold)', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 'bold' }}
                      >
                        + Add Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setSlots(slots.filter((_, idx) => idx !== groupIdx))}
                        style={{ background: 'rgba(255, 77, 77, 0.05)', border: '1px solid rgba(255, 77, 77, 0.15)', color: '#ff4d4d', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem' }}
                      >
                        Delete Group
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {group.times.map((time, timeIdx) => (
                        <div key={timeIdx} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-glass)', borderRadius: '4px', padding: '4px 8px' }}>
                          <input
                            type="text"
                            placeholder="e.g. 10:00 AM"
                            value={time}
                            onChange={(e) => {
                              const newSlots = [...slots];
                              newSlots[groupIdx].times[timeIdx] = e.target.value;
                              setSlots(newSlots);
                            }}
                            style={{ width: '85px', background: 'none', border: 'none', color: '#fff', outline: 'none', fontSize: '0.8rem', textAlign: 'center' }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newSlots = [...slots];
                              newSlots[groupIdx].times = newSlots[groupIdx].times.filter((_, idx) => idx !== timeIdx);
                              setSlots(newSlots);
                            }}
                            style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '0 2px', fontSize: '0.75rem', fontWeight: 'bold' }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IsActive Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                style={{ cursor: 'pointer', width: '16px', height: '16px' }}
              />
              <label htmlFor="isActive" style={{ fontSize: '0.85rem', color: 'var(--text-heading)', cursor: 'pointer', fontWeight: 'bold' }}>
                Make service active and display on public listings
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
                Save service Changes
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
