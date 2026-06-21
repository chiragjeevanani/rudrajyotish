import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Calendar, Mail, Landmark, Sparkles, BookOpen, MessageSquare, Compass, 
  LogOut, Moon, Sun, Home, GraduationCap, Info, Phone, ChevronLeft, ChevronRight, X, User
} from 'lucide-react';

export default function AdminSidebar({ 
  theme, 
  toggleTheme, 
  isCollapsed, 
  toggleSidebar, 
  isMobile, 
  isMobileOpen, 
  setIsMobileOpen 
}) {
  const { logout, admin } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <Calendar size={18} /> },
    { name: 'Yogdan Bookings', path: '/admin/yogdan-bookings', icon: <Calendar size={18} /> },
    { name: 'Contacts', path: '/admin/contacts', icon: <Mail size={18} /> },
    { name: 'Teaching Applicants', path: '/admin/teaching', icon: <GraduationCap size={18} /> },
    { name: 'Payments', path: '/admin/payments', icon: <Landmark size={18} /> },
  ];

  const cmsItems = [
    { name: 'Home Page', path: '/admin/cms/home', icon: <Home size={18} /> },
    { name: 'About Us', path: '/admin/cms/about', icon: <Info size={18} /> },
    { name: 'Services', path: '/admin/cms/services', icon: <Sparkles size={18} /> },
    { name: 'Yogadhan', path: '/admin/cms/yogadhan', icon: <Compass size={18} /> },
    { name: 'Vastu Tips', path: '/admin/cms/vastu-tips', icon: <Compass size={18} /> },
    { name: 'Blogs', path: '/admin/cms/blogs', icon: <BookOpen size={18} /> },
    { name: 'Testimonials', path: '/admin/cms/testimonials', icon: <MessageSquare size={18} /> },
    { name: 'Contact Info', path: '/admin/cms/contact-info', icon: <Phone size={18} /> },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
    gap: isCollapsed && !isMobile ? '0px' : '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: isActive(path) ? 'var(--color-gold)' : 'var(--text-muted)',
    background: isActive(path) ? 'rgba(197, 168, 128, 0.08)' : 'transparent',
    border: `1px solid ${isActive(path) ? 'rgba(197, 168, 128, 0.2)' : 'transparent'}`,
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.25s',
    width: '100%',
    boxSizing: 'border-box',
  });

  // Calculate sidebar width based on layout
  let sidebarWidth = '260px';
  if (isMobile) {
    sidebarWidth = '280px';
  } else if (isCollapsed) {
    sidebarWidth = '76px';
  }

  return (
    <div style={{
      width: sidebarWidth,
      background: theme === 'light' ? '#f3ebd9' : '#0d0d0f',
      borderRight: '1px solid var(--border-glass)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: isMobile ? 'fixed' : 'sticky',
      top: 0,
      left: 0,
      zIndex: isMobile ? 999 : 100,
      padding: isCollapsed && !isMobile ? '24px 10px' : '24px 16px',
      boxSizing: 'border-box',
      transform: isMobile ? (isMobileOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease',
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '24px', 
        padding: '0 4px',
        position: 'relative'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <img 
              src="/rudrajyotishlogo.png" 
              alt="Logo" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
          {(!isCollapsed || isMobile) && (
            <div style={{ transition: 'opacity 0.2s', opacity: 1, whiteSpace: 'nowrap' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 'bold', letterSpacing: '0.05em', color: 'var(--text-heading)', margin: 0 }}>
                RUDRA
              </h2>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: '700', letterSpacing: '0.1em' }}>
                ADMIN PORTAL
              </span>
            </div>
          )}
        </div>

        {/* Toggle / Close Buttons */}
        {isMobile ? (
          <button
            onClick={() => setIsMobileOpen(false)}
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
            <X size={20} />
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-glass)',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'background 0.2s',
              position: isCollapsed ? 'absolute' : 'relative',
              left: isCollapsed ? '50%' : 'auto',
              transform: isCollapsed ? 'translateX(-50%) translateY(40px)' : 'none',
              zIndex: 10,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {/* Admin details */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-glass)',
        borderRadius: '8px',
        padding: isCollapsed && !isMobile ? '12px 6px' : '12px',
        marginBottom: '24px',
        fontSize: '0.8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCollapsed && !isMobile ? 'center' : 'stretch',
        transition: 'padding 0.3s ease',
        marginTop: isCollapsed && !isMobile ? '24px' : '0px',
      }}
      title={admin?.username || 'Administrator'}
      >
        {isCollapsed && !isMobile ? (
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'var(--border-glass)',
            color: 'var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.9rem',
          }}>
            {admin?.username ? admin.username.charAt(0).toUpperCase() : <User size={14} />}
          </div>
        ) : (
          <>
            <div style={{ color: 'var(--text-muted)' }}>Logged in as:</div>
            <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '0.85rem', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {admin?.username || 'Administrator'}
            </div>
          </>
        )}
      </div>

      {/* Scrollable Menus Container */}
      <div 
        style={{ 
          flex: 1, 
          minHeight: 0,
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px', 
          marginBottom: '20px', 
          paddingRight: isCollapsed && !isMobile ? '0px' : '4px',
          scrollbarWidth: 'thin'
        }} 
        className="sidebar-scrollable-menu"
      >
        {/* Main menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {(!isCollapsed || isMobile) && (
            <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', color: 'var(--text-muted)', paddingLeft: '8px', textTransform: 'uppercase' }}>
              Main Operations
            </span>
          )}
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              style={linkStyle(item.path)} 
              title={isCollapsed && !isMobile ? item.name : undefined}
              onClick={() => isMobile && setIsMobileOpen(false)}
            >
              {item.icon}
              {(!isCollapsed || isMobile) && <span>{item.name}</span>}
            </Link>
          ))}
        </div>

        {/* CMS menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {(!isCollapsed || isMobile) && (
            <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', color: 'var(--text-muted)', paddingLeft: '8px', textTransform: 'uppercase' }}>
              Content Management (CMS)
            </span>
          )}
          {cmsItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              style={linkStyle(item.path)} 
              title={isCollapsed && !isMobile ? item.name : undefined}
              onClick={() => isMobile && setIsMobileOpen(false)}
            >
              {item.icon}
              {(!isCollapsed || isMobile) && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .sidebar-scrollable-menu::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-scrollable-menu::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scrollable-menu::-webkit-scrollbar-thumb {
          background: rgba(197, 168, 128, 0.2);
          border-radius: 4px;
        }
        .sidebar-scrollable-menu::-webkit-scrollbar-thumb:hover {
          background: rgba(197, 168, 128, 0.4);
        }
      `}</style>

      {/* Footer */}
      <div style={{ 
        marginTop: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px',
        alignItems: isCollapsed && !isMobile ? 'center' : 'stretch',
      }}>
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
            gap: isCollapsed && !isMobile ? '0px' : '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            background: theme === 'light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme === 'light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.02)';
          }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          {(!isCollapsed || isMobile) && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        <button
          onClick={logout}
          title="Logout Session"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
            gap: isCollapsed && !isMobile ? '0px' : '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(255, 51, 51, 0.05)',
            border: '1px solid rgba(255, 51, 51, 0.15)',
            color: '#ff4d4d',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 51, 51, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 51, 51, 0.05)';
          }}
        >
          <LogOut size={18} />
          {(!isCollapsed || isMobile) && <span>Logout Session</span>}
        </button>
      </div>
    </div>
  );
}

