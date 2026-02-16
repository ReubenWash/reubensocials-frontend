import React, { useState } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"

// 🔑 Assuming you have fixed the Font Awesome imports as suggested previously:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComment } from "@fortawesome/free-solid-svg-icons"; 
// Note: If you prefer the 'regular' version, change the import path to 'free-regular-svg-icons'

// 🔑 Import the Notification Panel component
import NotificationPanel from "../../pages/Notification/NotificationPanel";

const Topbar = () => {
    // 🔑 State to manage the visibility of the notification panel
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(prev => !prev);
    };

    return (
        <div className="topbar"> 
            {/* Logo */}
            <div className="topbar-left">
                <Link to="/home" className="logo-link">
                    <img src={logo} alt="ROCIALS" className="topbar-logo" />
                </Link>
            </div>

            {/* Search bar */}
            <Link to="/search" className="search-link">
                <div className="topbar-center">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                />
              </div>
            

            </Link>
           
            {/* Icons */}
            <div className="topbar-right">
                
                {/* 1. Notification Icon (Now handles click to TOGGLE the panel) */}
                {/* We use a div/button instead of Link */}
                <div 
                    className="topbar-icon-wrapper" 
                    onClick={toggleNotifications}
                >
                    <div className="top-icon">
                        <FontAwesomeIcon icon={faBell} />
                    </div>
                </div>
                
                {/* 2. Message Icon (Still uses Link to navigate to Messages page) */}
                <Link to="/messages" className="topbar-link">
                    <div className="top-icon">
                        <FontAwesomeIcon icon={faComment} />
                    </div>
                </Link>

            </div>

            {/* 🔑 Render the NotificationPanel conditionally */}
            <NotificationPanel 
                isVisible={showNotifications} 
                onClose={() => setShowNotifications(false)} 
            />
        </div>
    );
};

export default Topbar;