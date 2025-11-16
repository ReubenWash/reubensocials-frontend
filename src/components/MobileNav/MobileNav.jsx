// MobileNav.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faSearch, 
    faBell, 
    faUser, 
    faCog,
    faPlus 
} from '@fortawesome/free-solid-svg-icons';
import './MobileNav.css';

// This component is only rendered when the screen is small
const MobileNav = ({ onOpenPostModal }) => {
    
    // Define the core navigation items
    const navItems = [
        { path: "/home", icon: faHome, label: "Home" },
        { path: "/explore", icon: faSearch, label: "Search" },
        { path: "#", icon: faPlus, label: "Create", action: onOpenPostModal, isCreate: true },
        { path: "/notifications", icon: faBell, label: "Alerts" },
        { path: "/user/profile", icon: faUser, label: "Profile" },
    ];

    return (
        <div className="mobile-nav-bar">
            {navItems.map((item, index) => (
                <div key={index} className={`nav-item-wrapper ${item.isCreate ? 'create-btn-wrapper' : ''}`}>
                    {item.isCreate ? (
                        <button className="create-fab primary-teal-btn" onClick={item.action}>
                            <FontAwesomeIcon icon={item.icon} />
                        </button>
                    ) : (
                        <Link 
                            to={item.path} 
                            className="nav-link"
                            // Placeholder for active link class
                            // className={window.location.pathname === item.path ? 'active' : ''} 
                        >
                            <FontAwesomeIcon icon={item.icon} />
                            <span className="nav-label">{item.label}</span>
                        </Link>
                        
                    )}
                </div>
            ))}
            {/* Example item for Settings */}
          <Link to="/settings" className="nav-link">
              <FontAwesomeIcon icon={faCog} />
             <span className="nav-label">Settings</span>
           </Link>
        </div>
    );
};

export default MobileNav;