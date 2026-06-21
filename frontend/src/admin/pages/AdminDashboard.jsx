import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { 
  Calendar, Mail, Landmark, Sparkles, TrendingUp, RefreshCw, Clock, ArrowRight, User 
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    newContacts: 0,
    activeServicesCount: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      
      // Fetch bookings (first page)
      const { data: bookingsData } = await api.get('/bookings');
      // Fetch contacts
      const { data: contactsData } = await api.get('/contacts');
      // Fetch payments
      const { data: paymentsData } = await api.get('/payments');
      // Fetch services
      const { data: servicesData } = await api.get('/services?admin=true');

      // Calculate stats
      const paidBookingsCount = bookingsData.total || 0;
      
      const revenue = paymentsData
        .filter(p => p.status === 'captured')
        .reduce((sum, p) => sum + p.amount, 0);

      const pending = bookingsData.bookings?.filter(b => b.paymentStatus === 'pending').length || 0;
      
      const newInquiries = contactsData.filter(c => c.status === 'new').length;

      setStats({
        totalBookings: paidBookingsCount,
        totalRevenue: revenue,
        pendingPayments: pending,
        newContacts: newInquiries,
        activeServicesCount: servicesData.filter(s => s.isActive).length,
      });

      // Get recents
      setRecentBookings(bookingsData.bookings?.slice(0, 5) || []);
      setRecentContacts(contactsData.slice(0, 5));
      
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--color-gold)' }}>
        <RefreshCw size={24} className="spin" style={{ marginRight: '10px' }} /> Loading dashboard insights...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
            Dashboard Overview
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Welcome back! Here's a live summary of your consulting metrics.
          </p>
        </div>
        
        <button
          onClick={fetchDashboardData}
          disabled={refreshing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-glass)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-glass)'}
        >
          <RefreshCw size={14} className={refreshing ? 'spin' : ''} />
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
      }}>
        {/* Revenue Card */}
        <div className="glass-panel" style={{ padding: '24px', borderLeft: '3px solid var(--color-gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                Total Revenue
              </span>
              <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', margin: '8px 0 0', color: 'var(--color-gold)' }}>
                ₹{stats.totalRevenue.toLocaleString()}
              </h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(197, 168, 128, 0.1)', color: 'var(--color-gold)' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
            Gross processed transactions
          </div>
        </div>

        {/* Bookings Card */}
        <div className="glass-panel" style={{ padding: '24px', borderLeft: '3px solid var(--color-indigo)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                Total Bookings
              </span>
              <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', margin: '8px 0 0', color: 'var(--color-indigo)' }}>
                {stats.totalBookings}
              </h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-indigo)' }}>
              <Calendar size={20} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
            Bookings registered in database
          </div>
        </div>

        {/* Contact inquiries */}
        <div className="glass-panel" style={{ padding: '24px', borderLeft: '3px solid var(--color-purple)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                New Inquiries
              </span>
              <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', margin: '8px 0 0', color: 'var(--color-purple)' }}>
                {stats.newContacts}
              </h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-purple)' }}>
              <Mail size={20} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
            Unread form submissions
          </div>
        </div>

        {/* Services */}
        <div className="glass-panel" style={{ padding: '24px', borderLeft: '3px solid var(--color-yellow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                Active Services
              </span>
              <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', margin: '8px 0 0', color: 'var(--color-yellow)' }}>
                {stats.activeServicesCount}
              </h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(251, 191, 36, 0.1)', color: 'var(--color-yellow)' }}>
              <Sparkles size={20} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
            Services displayed on homepage
          </div>
        </div>
      </div>

      {/* Main Grid for recent lists */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '30px',
      }}>
        {/* Recent Bookings Panel */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} style={{ color: 'var(--color-gold)' }} />
              Recent Bookings
            </h3>
            <Link to="/admin/bookings" style={{ color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentBookings.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '20px' }}>
                No recent bookings recorded.
              </div>
            ) : (
              recentBookings.map((b) => (
                <div key={b._id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {b.customer.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {b.service.title} | {new Date(b.appointmentDate).toLocaleDateString()} at {b.timeSlot}
                    </div>
                  </div>
                  
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: b.paymentStatus === 'paid' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(251, 191, 36, 0.08)',
                    color: b.paymentStatus === 'paid' ? 'var(--color-indigo)' : 'var(--color-yellow)',
                    border: `1px solid ${b.paymentStatus === 'paid' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(251, 191, 36, 0.15)'}`,
                  }}>
                    {b.paymentStatus}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Inquiries Panel */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} style={{ color: 'var(--color-gold)' }} />
              Recent Inquiries
            </h3>
            <Link to="/admin/contacts" style={{ color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentContacts.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '20px' }}>
                No contact form submissions recorded.
              </div>
            ) : (
              recentContacts.map((c) => (
                <div key={c._id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                }}>
                  <div style={{ width: '70%' }}>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {c.name}
                      {c.status === 'new' && (
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4d4d' }} />
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      "{c.message}"
                    </div>
                  </div>
                  
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: c.status === 'resolved' ? 'rgba(16, 185, 129, 0.08)' : c.status === 'read' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255, 51, 51, 0.08)',
                    color: c.status === 'resolved' ? 'var(--color-indigo)' : c.status === 'read' ? '#3B82F6' : '#FF3333',
                    border: `1px solid ${c.status === 'resolved' ? 'rgba(16, 185, 129, 0.15)' : c.status === 'read' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 51, 51, 0.15)'}`,
                  }}>
                    {c.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
