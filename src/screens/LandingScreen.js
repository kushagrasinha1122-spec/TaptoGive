import React from 'react';
import DonorToast from '../components/DonorToast';

export default function LandingScreen({ onDonate, user, onLogout }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0ede6',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 480,
      margin: '0 auto',
      position: 'relative',
    }}>

      
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: '#2d7a4f',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>T</span>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.1 }}>Tap2Give</div>
           
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onDonate}
            style={{
              background: '#2d7a4f',
              color: '#fff',
              border: 'none',
              borderRadius: 24,
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Donate Now
          </button>
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                background: 'transparent',
                color: '#6b7280',
                border: '1px solid #d1d5db',
                borderRadius: 24,
                padding: '10px 16px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: '8px 20px',
        flexWrap: 'wrap',
      }}>
        {[
          { icon: '✓', label: '100% Verified' },
          { icon: '🔒', label: 'Secure Payments' },
          { icon: '📄', label: 'Instant 80G Receipt' },
        ].map(b => (
          <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ color: '#2d7a4f', fontSize: 12, fontWeight: 700 }}>{b.icon}</span>
            <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>{b.label}</span>
          </div>
        ))}
      </div>

     
      <div style={{
        margin: '12px 20px',
        background: '#f7f4ed',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img
          src="/hero.png"
          alt="Mother feeding child"
          style={{
            width: '100%',
            display: 'block',
            borderRadius: 20,
          }}
        />
      </div>

     
      <div style={{ padding: '4px 20px 0' }}>
        <div style={{
          display: 'inline-block',
          background: '#e8f5e9',
          color: '#2d7a4f',
          fontSize: 12,
          fontWeight: 600,
          padding: '4px 12px',
          borderRadius: 20,
          marginBottom: 14,
        }}>
          ₹30 = 1 Meal
        </div>
        <h1 style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: 36,
          lineHeight: 1.15,
          color: '#1a1a1a',
          marginBottom: 12,
        }}>
          Your ₹30 Can Feed a<br />
          <span style={{ color: '#2d7a4f' }}>Child Today</span>
        </h1>
        <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 24 }}>
          Every rupee is tracked. Every meal is accounted for.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <button
            onClick={onDonate}
            style={{
              background: '#2d7a4f',
              color: '#fff',
              border: 'none',
              borderRadius: 14,
              padding: '15px 32px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 4px 16px rgba(45,122,79,0.35)',
            }}
            onMouseDown={e => e.target.style.transform = 'scale(0.97)'}
            onMouseUp={e => e.target.style.transform = 'scale(1)'}
          >
            Donate Now
          </button>
          
        </div>
      </div>

      <DonorToast />
    </div>
  );
}
