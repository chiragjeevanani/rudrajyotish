import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Moon, User, Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const { login, admin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (admin) {
      navigate('/admin');
    }
  }, [admin, navigate]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const result = await login(username, password);

    setIsSubmitting(false);
    if (result.success) {
      navigate('/admin');
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div style={{
      height: '100vh',
      background: 'var(--bg-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <div className="glass-panel" style={{
        maxWidth: '420px',
        width: '100%',
        padding: '40px 30px',
        borderRadius: '16px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <div style={{
          width: '100px',
          height: '100px',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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

        <h1 style={{
          fontSize: '1.75rem',
          fontFamily: 'var(--font-serif)',
          color: 'var(--text-heading)',
          marginBottom: '6px',
        }} className="gold-gradient-text">
          Rudra Jyotish
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          marginBottom: '30px',
          letterSpacing: '0.05em',
        }}>
          SIGN IN TO ADMINISTRATOR DASHBOARD
        </p>

        {errorMsg && (
          <div style={{
            background: 'rgba(255, 51, 51, 0.08)',
            border: '1px solid rgba(255, 51, 51, 0.25)',
            color: '#ff4d4d',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '0.82rem',
            marginBottom: '20px',
            textAlign: 'left',
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          {/* Username */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: 'var(--color-gold)',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>
                <User size={16} />
              </span>
              <input
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-glass)'}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: 'var(--color-gold)',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 40px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-glass)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: 'var(--color-gold)',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginTop: '10px',
              transition: 'all 0.2s',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Verifying Session...' : 'Sign In Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
