import React, { useState } from 'react';
import { logoutUser } from '../../api/authApi';
import './LogoutButton.css';

const LogoutButton = ({ className = '', buttonText = 'Logout' }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setLoading(true);
      await logoutUser();
      // User will be redirected by logoutUser function
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      disabled={loading}
      className={`logout-btn ${className}`}
    >
      {loading ? 'Logging out...' : buttonText}
    </button>
  );
};

export default LogoutButton;