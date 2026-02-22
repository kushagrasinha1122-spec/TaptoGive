import React, { useState, useEffect } from 'react';
import { DONOR_FEED } from '../data/donors';

export default function DonorToast() {
  const [visible, setVisible] = useState(false);
  const [donor, setDonor] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const show = () => {
      setDonor(DONOR_FEED[index % DONOR_FEED.length]);
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
      setIndex(i => i + 1);
    };

    const timeout = setTimeout(show, 1200);
    const interval = setInterval(show, 6000);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [index]);

  if (!donor) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 100,
      left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
      opacity: visible ? 1 : 0,
      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      zIndex: 999,
      pointerEvents: 'none',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 14,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        minWidth: 200,
        border: '1px solid #e8f5e9',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#2d7a4f',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
            {donor.name} donated ₹{donor.amount}
          </div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>just now</div>
        </div>
      </div>
    </div>
  );
}
