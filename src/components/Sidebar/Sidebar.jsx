// Sidebar.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

// 🧩 Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faCompass,
  faMessage,
  faBell,
  faUser,
  faCog,
  faDollarSign,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ onOpenPostModal, onOpenNotifications }) => {
  // Dummy unread notification count (later connect to backend)
  const unreadCount = 3; // Example: 3 unread notifications

  const navItems = [
    { path: "/home", icon: faHome, label: "Home" },
    { path: "/search", icon: faSearch, label: "Search" },
    { path: "/explore", icon: faCompass, label: "Explore" },
    { path: "/messages", icon: faMessage, label: "Messages" },
    { path: "/notifications", icon: faBell, label: "Notifications" },
    { path: "/user/:username", icon: faUser, label: "Profile" },
    { path: "/payments", icon: faDollarSign, label: "Payments" },
    { path: "/settings", icon: faCog, label: "Settings" },
  ];

  const isActive = (path) =>
    path === window.location.pathname ? "active" : "";

  return (
    <div className="sidebar">
      <nav className="sidebar-menu">
        {navItems.map((item) => {
          const isNotification = item.label === "Notifications";

          return (
            <Link
              key={item.path}
              to={
                isNotification
                  ? "#"
                  : item.path.includes(":")
                  ? "/user/creatorname"
                  : item.path
              }
              className={isActive(item.path)}
              onClick={(e) => {
                if (isNotification) {
                  e.preventDefault();
                  if (onOpenNotifications) onOpenNotifications();
                }
              }}
            >
              <div className="icon-container">
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                {/* 🔴 Notification Badge */}
                {isNotification && unreadCount > 0 && (
                  <span className="notif-badge">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
              {item.label}
            </Link>
          );
        })}
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
