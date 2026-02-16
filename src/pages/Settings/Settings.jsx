// Settings.jsx

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserCircle, faEdit, faShieldAlt, faCheckCircle, 
    faBell, faCrown, faLock, faBan, faMapMarkerAlt, faSignOutAlt, faChevronLeft 
} from '@fortawesome/free-solid-svg-icons';
import './Settings.css';


// Define the expanded navigation items (UNCHANGED)
const settingsNav = [
    { id: 'account', label: 'Account Settings', icon: faUserCircle, group: 'Account' },
    { id: 'edit-profile', label: 'Edit Profile', icon: faEdit, group: 'Account' },
    { id: 'security', label: 'Security Settings', icon: faShieldAlt, group: 'Account' },
    { id: 'verification', label: 'Verification', icon: faCheckCircle, group: 'Account' },
    { id: 'notifications', label: 'Notification Settings', icon: faBell, group: 'Preferences' },
    { id: 'membership', label: 'Membership', icon: faCrown, group: 'Preferences' },
    { id: 'privacy', label: 'Privacy', icon: faLock, group: 'Privacy' },
    { id: 'blocking', label: 'Blocking', icon: faBan, group: 'Privacy' },
    { id: 'addresses', label: 'Your Addresses', icon: faMapMarkerAlt, group: 'Privacy' },
    { id: 'logout', label: 'Logout', icon: faSignOutAlt, isAction: true, group: 'Action' },
];

const groupedSettings = settingsNav.reduce((acc, item) => {
    const group = item.group || 'General';
    if (!acc[group]) {
        acc[group] = [];
    }
    acc[group].push(item);
    return acc;
}, {});

const ContentPlaceholder = ({ sectionId }) => (
    <div className="settings-content-placeholder">
        <h3>{settingsNav.find(item => item.id === sectionId).label}</h3>
        <p>Content for the **{sectionId}** settings will go here.</p>
    </div>
);


const Settings = () => {
    const [activeSection, setActiveSection] = useState(settingsNav[0].id);
    const [isDetailView, setIsDetailView] = useState(false); // 🔑 New state for mobile view
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check initial width

    // Check window size on load and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    // Reset detail view when resizing back to desktop
    useEffect(() => {
        if (!isMobile) {
            setIsDetailView(false);
        }
    }, [isMobile]);

    const handleNavClick = (id) => {
        if (id === 'logout') {
            alert('Logging out...'); // Replace with actual logout logic
        } else {
            setActiveSection(id);
            if (isMobile) {
                setIsDetailView(true); // Switch to detail view on mobile
            }
        }
    };
    
    const handleBackClick = () => {
        setIsDetailView(false); // Switch back to master list view
    };
    
    // Determine the current heading title
    const headerTitle = isMobile && isDetailView 
        ? settingsNav.find(item => item.id === activeSection).label 
        : 'Settings & Privacy';

    // Determine if the Master List or Detail Content should be displayed
    const shouldShowMaster = !isMobile || (isMobile && !isDetailView);
    const shouldShowDetail = !isMobile || (isMobile && isDetailView);

    return (
        <div className={`settings-page-container ${isMobile ? 'mobile-mode' : 'desktop-mode'}`}>
            
            <div className="settings-header-wrapper">
                {isMobile && isDetailView && (
                    <button className="back-button" onClick={handleBackClick}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                )}
                <h1 className="settings-main-header">{headerTitle}</h1>
            </div>

            <div className="settings-layout">
                
                {/* 1. Master View (The List) */}
                {shouldShowMaster && (
                    <div className="settings-nav-panel">
                        {Object.keys(groupedSettings).map(groupName => (
                            <div key={groupName} className="settings-nav-group">
                                <h4 className="group-header">{groupName}</h4>
                                
                                {groupedSettings[groupName].map((item) => (
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
                        ))}
                    </div>
                )}

                {/* 2. Detail View (The Content) */}
                {shouldShowDetail && (
                    <div className="settings-content-area">
                        <ContentPlaceholder sectionId={activeSection} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;