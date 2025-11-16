// Settings.jsx

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBell, faLock, faCreditCard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Settings.css';

// Define the navigation items
const settingsNav = [
    { id: 'account', label: 'Account Profile', icon: faUserCircle },
    { id: 'notifications', label: 'Notifications', icon: faBell },
    { id: 'privacy', label: 'Privacy & Security', icon: faLock },
    { id: 'payments', label: 'Payment Settings', icon: faCreditCard },
    { id: 'logout', label: 'Logout', icon: faSignOutAlt, isAction: true },
];

// Placeholder component for content (e.g., AccountSettings.jsx)
const ContentPlaceholder = ({ sectionId }) => (
    <div className="settings-content-placeholder">
        <h3>{settingsNav.find(item => item.id === sectionId).label}</h3>
        <p>Content for the **{sectionId}** settings will go here.</p>
        {/* Placeholder for specific forms, toggles, or input fields */}
    </div>
);


const Settings = () => {
    const [activeSection, setActiveSection] = useState('account');
    
    const handleNavClick = (id) => {
        if (id === 'logout') {
            alert('Logging out...'); // Replace with actual logout logic
        } else {
            setActiveSection(id);
        }
    };

    return (
        <div className="settings-page-container">
            <h1 className="settings-main-header">Settings & Privacy</h1>

            <div className="settings-layout">
                {/* 1. Navigation Panel (Desktop Sidebar) */}
                <div className="settings-nav-panel">
                    {settingsNav.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeSection === item.id ? 'active' : ''} ${item.isAction ? 'logout-item' : ''}`}
                            onClick={() => handleNavClick(item.id)}
                        >
                            <FontAwesomeIcon icon={item.icon} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* 2. Content Area */}
                <div className="settings-content-area">
                    <ContentPlaceholder sectionId={activeSection} />
                </div>
            </div>
        </div>
    );
};

export default Settings;