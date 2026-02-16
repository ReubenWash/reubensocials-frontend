// Sidebar.jsx - FIXED FOR MISSING USERNAME

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faCrown,
  faUserCircle,
  faCog,
  faWallet,
  faPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ onOpenPostModal, currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // Get username from various possible locations in the user object
  const getUsername = () => {
    if (!currentUser) return null;
    
    // Check all possible locations for username
    return (
      currentUser.username ||
      currentUser.user?.username ||
      currentUser.email?.split('@')[0] || // Fallback to email prefix
      currentUser.id?.toString() // Last resort: use user ID
    );
  };

  // Handle profile click
  const handleProfileClick = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert("Loading user data... Please wait a moment.");
      return;
    }

    const username = getUsername();
    
    if (!username) {
      console.error("Cannot find username in user object:", currentUser);
      alert("Error: Cannot load profile. Please contact support or try logging in again.");
      return;
    }

    console.log("Navigating to profile:", `/user/${username}`);
    navigate(`/user/${username}`);
  };

  const username = getUsername();

  return (
    <div className="sidebar">
      <nav className="sidebar-menu">
        {/* Home */}
        <Link to="/home" className={`sidebar-btn ${isActive("/home")}`}>
          <div className="icon-container">
            <FontAwesomeIcon icon={faHome} className="nav-icon" />
          </div>
          Home
        </Link>

        {/* Explore */}
        <Link to="/explore" className={`sidebar-btn ${isActive("/explore")}`}>
          <div className="icon-container">
            <FontAwesomeIcon icon={faCompass} className="nav-icon" />
          </div>
          Explore
        </Link>

        {/* Profile - FIXED */}
        {currentUser && username ? (
          <Link
            to={`/user/${username}`}
            className={`sidebar-btn ${isActive(`/user/${username}`)}`}
          >
            <div className="icon-container">
              <FontAwesomeIcon icon={faUserCircle} className="nav-icon" />
            </div>
            Profile
          </Link>
        ) : (
          <button 
            className="sidebar-btn" 
            onClick={handleProfileClick}
            style={{
              textAlign: 'left',
              opacity: currentUser ? 1 : 0.5,
              cursor: currentUser ? 'pointer' : 'not-allowed'
            }}
          >
            <div className="icon-container">
              <FontAwesomeIcon icon={faUserCircle} className="nav-icon" />
            </div>
            Profile {!currentUser && "(Loading...)"}
          </button>
        )}

        {/* Upgrade to Pro */}
        <button
          className="sidebar-btn"
          onClick={() => alert("Upgrade feature coming soon!")}
        >
          <div className="icon-container">
            <FontAwesomeIcon icon={faCrown} className="nav-icon" />
          </div>
          Upgrade to Pro
        </button>

        {/* Wallet */}
        <Link to="/wallet" className={`sidebar-btn ${isActive("/wallet")}`}>
          <div className="icon-container">
            <FontAwesomeIcon icon={faWallet} className="nav-icon" />
          </div>
          Wallet
        </Link>

        {/* Settings */}
        <Link to="/settings" className={`sidebar-btn ${isActive("/settings")}`}>
          <div className="icon-container">
            <FontAwesomeIcon icon={faCog} className="nav-icon" />
          </div>
          Settings
        </Link>

        {/* Logout */}
        <button className="sidebar-btn" onClick={handleLogout}>
          <div className="icon-container">
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
          </div>
          Logout
        </button>
      </nav>

      <div className="sidebar-footer">
        <button
          className="create-btn primary-teal-btn"
          onClick={onOpenPostModal}
        >
          <FontAwesomeIcon icon={faPlus} /> Create Post
        </button>
      </div>
    </div>
  );
};

export default Sidebar;