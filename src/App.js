import React, { useState, useEffect } from 'react';
import AuthScreen from './screens/AuthScreen';
import LandingScreen from './screens/LandingScreen';
import DonationModal from './screens/DonationModal';

export default function App() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Check for saved user session on mount
  useEffect(() => {
    const saved = localStorage.getItem('tap2give_user') || sessionStorage.getItem('tap2give_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tap2give_user');
    sessionStorage.removeItem('tap2give_user');
  };

  // Not logged in → show auth screen
  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0ede6' }}>
      <LandingScreen onDonate={() => setModalOpen(true)} user={user} onLogout={handleLogout} />
      {modalOpen && (
        <DonationModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
