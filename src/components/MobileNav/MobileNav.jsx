// MobileNav.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faCompass,
    faWallet,
    faPlus, 
} from '@fortawesome/free-solid-svg-icons';

import './MobileNav.css';
import Menu from '../../components/Menu/Menu'; // Ensure this is imported correctly


// This component is only rendered when the screen is small
const MobileNav = ({ onOpenPostModal }) => {
    
    // Define the core navigation items
    const navItems = [
        // Ensure no 'id' property is needed here, as it is not used in the map below
        { path: "/home", icon: faHome, label: "Home" },
        { path: "/explore", icon: faCompass, label: "Explore" },
        { path:{}, icon: faPlus, label: "Create", action: onOpenPostModal, isCreate: true },
        { path: "/wallet", icon: faWallet, label: "Wallet"}
    ];

    return (
        <div className="mobile-nav-bar">
            {navItems.map((item, index) => (
                // Using 'index' for key is acceptable here since navItems order is static
                <div key={index} className={`nav-item-wrapper ${item.isCreate ? 'create-btn-wrapper' : ''}`}>
                    {item.isCreate ? (
                        <button className="create-fab primary-teal-btn" onClick={item.action}>
                            <FontAwesomeIcon icon={item.icon} />
                        </button>
                    ) : (
                        <Link 
                            to={item.path} 
                            className="nav-link"
                            // If you intended to use 'id' here for styling or accessibility, 
                            // you should use the 'label' or 'index' instead.
                        >
                            <FontAwesomeIcon icon={item.icon} />
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    )}
                </div>
            ))}
            
            {/* Menu Component (Correctly integrated) */}
            <div className="nav-item-wrapper menu-wrapper">
                <Menu />
            </div>
            
        </div>
    );
};

export default MobileNav;