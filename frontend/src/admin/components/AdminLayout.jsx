import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from './AdminSidebar';
import { Menu } from 'lucide-react';

export default function AdminLayout() {
  const { admin, loading } = useAuth();
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'dark');
  const [isCollapsed, setIsCollapsed] = React.useState(() => {
    return localStorage.getItem('adminSidebarCollapsed') === 'true';
  });
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSidebar = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('adminSidebarCollapsed', String(next));
      return next;
    });
  };

  // Redirect to login if not authenticated
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        background: '#070709',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        color: 'var(--color-gold)',
        fontFamily: 'var(--font-serif)',
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '2px solid rgba(197, 168, 128, 0.1)',
          borderTopColor: 'var(--color-gold)',
          borderRadius: '50%',
          animation: 'portalSpin 1s linear infinite',
        }} />
        <span style={{ letterSpacing: '0.2em', fontSize: '0.9rem' }}>LOADING ADMINISTRATION</span>
      </div>
    );
  }

  return (
    <div className="admin-layout-container" style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: '100vh',
      background: 'var(--bg-dark)',
      color: 'var(--text-primary)',
      width: '100%',
      position: 'relative',
    }}>
      {/* Mobile Top Header */}
      {isMobile && (
        <div style={{
          height: '60px',
          background: theme === 'light' ? '#f3ebd9' : '#0d0d0f',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          position: 'sticky',
          top: 0,
          zIndex: 900,
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsMobileOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
              }}
            >
              <Menu size={24} />
            </button>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              color: 'var(--text-heading)',
            }}>
              RUDRA ADMIN
            </span>
          </div>
        </div>
      )}

      {/* Backdrop for Mobile Sidebar */}
      {isMobile && isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      <AdminSidebar
        theme={theme}
        toggleTheme={toggleTheme}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div style={{
        flex: 1,
        padding: isMobile ? '20px' : '40px',
        height: isMobile ? 'calc(100vh - 60px)' : '100vh',
        overflowY: 'auto',
        boxSizing: 'border-box',
        transition: 'padding 0.3s ease',
      }}>
        <Outlet />
      </div>
    </div>
  );
}
