import React, { useState } from 'react';
import BASE_URL from '../config/api';

const API_URL = BASE_URL;

export default function AuthScreen({ onLogin }) {
  const [tab, setTab] = useState('login'); // 'login' | 'signup'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [remember, setRemember] = useState(false);

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Login failed');
      if (remember) localStorage.setItem('tap2give_user', JSON.stringify(data.user));
      else sessionStorage.setItem('tap2give_user', JSON.stringify(data.user));
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!signupName || !signupEmail || !signupPassword || !signupConfirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (signupPassword !== signupConfirm) {
      setError('Passwords do not match.');
      return;
    }
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Signup failed');
      // Auto-login after signup
      sessionStorage.setItem('tap2give_user', JSON.stringify(data.user));
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t) => {
    if (t === tab) return;
    setTab(t);
    setError(null);
  };

  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  const styles = {
    bg: '#F5F2EE',
    brand: '#1A4D3E',
    brandLight: '#2A6B56',
    brandGlow: 'rgba(26, 77, 62, 0.18)',
    text: '#1C1C1E',
    textMuted: '#7A7A7A',
    textLight: '#A8A8A8',
    border: '#E2DEDA',
    white: '#FFFFFF',
    radius: 18,
    radiusSm: 12,
  };

  const inputStyle = {
    width: '100%',
    height: 48,
    border: `1.5px solid ${styles.border}`,
    borderRadius: styles.radiusSm,
    background: styles.white,
    padding: '0 14px 0 40px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    color: styles.text,
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    WebkitAppearance: 'none',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin {
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        .auth-input:focus {
          border-color: #1A4D3E !important;
          box-shadow: 0 0 0 4px rgba(26, 77, 62, 0.18) !important;
        }
        .auth-input::placeholder { color: #A8A8A8; font-size: 14px; }
        .auth-btn:hover { background: #2A6B56 !important; box-shadow: 0 8px 24px rgba(26, 77, 62, 0.3); transform: translateY(-1px); }
        .auth-btn:active { transform: scale(0.98) !important; box-shadow: none !important; }
        .auth-illustration { animation: floatBob 5s ease-in-out infinite; }
        @media (max-width: 768px) {
          .auth-page { grid-template-columns: 1fr !important; }
          .auth-left { display: none !important; }
          .auth-right { padding: 32px 20px !important; min-height: 100vh; align-items: flex-start !important; padding-top: 48px !important; }
          .auth-card { padding: 36px 28px 28px !important; }
          .auth-card-title { font-size: 24px !important; }
        }
      `}</style>

      <div className="auth-page" style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* ── Left Panel ── */}
        <div className="auth-left" style={{
          background: styles.brand,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 56px',
          animation: 'fadeSlideLeft 0.8s cubic-bezier(0.4,0,0.2,1) both',
        }}>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 380, width: '100%' }}>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 56 }}>
              <div style={{
                width: 38, height: 38, background: 'rgba(255,255,255,0.12)',
                borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>🤝</div>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: '#fff', letterSpacing: -0.3 }}>TapToGive</span>
            </div>

            {/* SVG Illustration */}
            <svg className="auth-illustration" viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', marginBottom: 48 }}>
              <circle cx="180" cy="130" r="110" fill="rgba(255,255,255,0.04)" />
              <circle cx="180" cy="130" r="80" fill="rgba(255,255,255,0.04)" />
              <ellipse cx="180" cy="210" rx="100" ry="14" fill="rgba(255,255,255,0.05)" />
              <circle cx="108" cy="108" r="18" fill="rgba(255,255,255,0.12)" />
              <path d="M90 140 Q108 132 126 140 L130 190 H86 Z" fill="rgba(255,255,255,0.09)" />
              <circle cx="180" cy="96" r="22" fill="rgba(255,255,255,0.18)" />
              <path d="M156 132 Q180 122 204 132 L210 196 H150 Z" fill="rgba(255,255,255,0.13)" />
              <circle cx="252" cy="108" r="18" fill="rgba(255,255,255,0.12)" />
              <path d="M234 140 Q252 132 270 140 L274 190 H230 Z" fill="rgba(255,255,255,0.09)" />
              <path d="M172 78 C172 74 176 70 180 74 C184 70 188 74 188 78 C188 86 180 92 180 92 C180 92 172 86 172 78Z" fill="rgba(255,255,255,0.55)" />
              <path d="M148 158 Q165 148 180 160 Q195 148 212 158" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="130" cy="76" r="3" fill="rgba(255,255,255,0.3)" />
              <circle cx="232" cy="72" r="2.5" fill="rgba(255,255,255,0.25)" />
              <circle cx="155" cy="58" r="2" fill="rgba(255,255,255,0.2)" />
              <circle cx="218" cy="88" r="2" fill="rgba(255,255,255,0.2)" />
            </svg>

            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, lineHeight: 1.2, color: '#fff', marginBottom: 16, letterSpacing: -0.5 }}>
              Give with purpose,<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.65)' }}>change a life today.</em>
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
              TapToGive connects generous hearts with the causes that matter most — quickly, safely, and meaningfully.
            </p>

            <div style={{
              display: 'flex', gap: 32, marginTop: 48, paddingTop: 32,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}>
              {[['$2.4M', 'Raised'], ['18K+', 'Donors'], ['340', 'Causes']].map(([num, lbl]) => (
                <div key={lbl} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: '#fff' }}>{num}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="auth-right" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '48px 32px',
          background: styles.bg,
          animation: 'fadeSlideRight 0.8s 0.1s cubic-bezier(0.4,0,0.2,1) both',
        }}>
          <div className="auth-card" style={{
            background: styles.white,
            borderRadius: styles.radius,
            boxShadow: '0 4px 6px rgba(0,0,0,0.03), 0 20px 60px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            padding: '44px 40px 36px',
            width: '100%',
            maxWidth: 420,
          }}>
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <h2 className="auth-card-title" style={{
                fontFamily: "'DM Serif Display', serif", fontSize: 28,
                letterSpacing: -0.5, color: styles.text, marginBottom: 6,
              }}>Welcome to TapToGive</h2>
              <p style={{ fontSize: 14, color: styles.textMuted, fontWeight: 300 }}>
                Make an impact in seconds.
              </p>
            </div>

            {/* Tabs */}
            <div style={{
              display: 'flex', background: styles.bg, borderRadius: 12,
              padding: 4, marginBottom: 28, position: 'relative',
            }}>
              {/* Indicator */}
              <div style={{
                position: 'absolute', top: 4, left: 4,
                width: 'calc(50% - 4px)', height: 'calc(100% - 8px)',
                background: styles.white, borderRadius: 9,
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: tab === 'signup' ? 'translateX(100%)' : 'translateX(0)',
                pointerEvents: 'none',
              }} />
              <button onClick={() => switchTab('login')} style={{
                flex: 1, background: 'none', border: 'none', cursor: 'pointer',
                padding: '9px 0', fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                fontWeight: 500, color: tab === 'login' ? styles.text : styles.textMuted,
                position: 'relative', zIndex: 1, borderRadius: 9,
                transition: 'color 0.25s',
              }}>Login</button>
              <button onClick={() => switchTab('signup')} style={{
                flex: 1, background: 'none', border: 'none', cursor: 'pointer',
                padding: '9px 0', fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                fontWeight: 500, color: tab === 'signup' ? styles.text : styles.textMuted,
                position: 'relative', zIndex: 1, borderRadius: 9,
                transition: 'color 0.25s',
              }}>Sign Up</button>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10,
                padding: '10px 14px', fontSize: 13, color: '#dc2626', marginBottom: 16,
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* ── LOGIN FORM ── */}
            {tab === 'login' && (
              <div>
                {/* Email */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: styles.textMuted, marginBottom: 7, letterSpacing: 0.3, textTransform: 'uppercase' }}>
                    Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      className="auth-input"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      style={inputStyle}
                      onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    />
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: styles.textLight, pointerEvents: 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    </span>
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: styles.textMuted, marginBottom: 7, letterSpacing: 0.3, textTransform: 'uppercase' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      className="auth-input"
                      type={showLoginPw ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      style={inputStyle}
                      onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    />
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: styles.textLight, pointerEvents: 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    </span>
                    <button type="button" onClick={() => setShowLoginPw(!showLoginPw)} style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                      color: styles.textLight, display: 'flex', alignItems: 'center',
                    }}>
                      {showLoginPw ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, marginTop: 4 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13.5, color: styles.textMuted, userSelect: 'none' }}>
                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ width: 16, height: 16, borderRadius: 5, cursor: 'pointer', accentColor: styles.brand }} />
                    Remember me
                  </label>
                  <span style={{ fontSize: 13.5, color: styles.brand, fontWeight: 500, cursor: 'pointer' }}>Forgot password?</span>
                </div>

                {/* Login Button */}
                <button
                  className="auth-btn"
                  onClick={handleLogin}
                  disabled={loading}
                  style={{
                    width: '100%', height: 50, background: styles.brand, color: '#fff',
                    border: 'none', borderRadius: styles.radiusSm,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
                    cursor: loading ? 'default' : 'pointer', letterSpacing: 0.2,
                    transition: 'background 0.25s, box-shadow 0.25s, transform 0.1s',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {loading ? (
                    <div style={{
                      width: 20, height: 20, border: '2.5px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite',
                      margin: '0 auto',
                    }} />
                  ) : 'Login'}
                </button>
              </div>
            )}

            {/* ── SIGNUP FORM ── */}
            {tab === 'signup' && (
              <div>
                {/* Full Name */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: styles.textMuted, marginBottom: 7, letterSpacing: 0.3, textTransform: 'uppercase' }}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <input className="auth-input" type="text" placeholder="Jane Smith" value={signupName} onChange={e => setSignupName(e.target.value)} style={inputStyle} onKeyDown={e => e.key === 'Enter' && handleSignup()} />
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: styles.textLight, pointerEvents: 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: styles.textMuted, marginBottom: 7, letterSpacing: 0.3, textTransform: 'uppercase' }}>Email</label>
                  <div style={{ position: 'relative' }}>
                    <input className="auth-input" type="email" placeholder="you@example.com" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} style={inputStyle} onKeyDown={e => e.key === 'Enter' && handleSignup()} />
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: styles.textLight, pointerEvents: 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    </span>
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: styles.textMuted, marginBottom: 7, letterSpacing: 0.3, textTransform: 'uppercase' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input className="auth-input" type={showSignupPw ? 'text' : 'password'} placeholder="Create a password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} style={inputStyle} onKeyDown={e => e.key === 'Enter' && handleSignup()} />
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: styles.textLight, pointerEvents: 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    </span>
                    <button type="button" onClick={() => setShowSignupPw(!showSignupPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: styles.textLight, display: 'flex', alignItems: 'center' }}>
                      {showSignupPw ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: styles.textMuted, marginBottom: 7, letterSpacing: 0.3, textTransform: 'uppercase' }}>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <input className="auth-input" type={showConfirmPw ? 'text' : 'password'} placeholder="Repeat your password" value={signupConfirm} onChange={e => setSignupConfirm(e.target.value)} style={inputStyle} onKeyDown={e => e.key === 'Enter' && handleSignup()} />
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: styles.textLight, pointerEvents: 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: styles.textLight, display: 'flex', alignItems: 'center' }}>
                      {showConfirmPw ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                <div style={{ height: 6 }} />

                {/* Signup Button */}
                <button
                  className="auth-btn"
                  onClick={handleSignup}
                  disabled={loading}
                  style={{
                    width: '100%', height: 50, background: styles.brand, color: '#fff',
                    border: 'none', borderRadius: styles.radiusSm,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
                    cursor: loading ? 'default' : 'pointer', letterSpacing: 0.2,
                    transition: 'background 0.25s, box-shadow 0.25s, transform 0.1s',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {loading ? (
                    <div style={{
                      width: 20, height: 20, border: '2.5px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite',
                      margin: '0 auto',
                    }} />
                  ) : 'Create Account'}
                </button>
              </div>
            )}

            {/* Trust Footer */}
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12.5, color: styles.textLight }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Your donations are secure and protected.
            </div>
            <div style={{ marginTop: 14, textAlign: 'center', fontSize: 12, color: styles.textLight }}>
              <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ margin: '0 6px', opacity: 0.5 }}>·</span>
              <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
