import React from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import users1 from "../../assets/users/users1.png";

const Topbar = () => {
  return (
    <div className="topbar">
      {/* Logo */}
      <div className="topbar-left">
        <img src={logo} alt="ROCIALS" className="topbar-logo" />
      </div>

      {/* Search bar */}
      <div className="topbar-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
        />
      </div>

      {/* Icons */}
      <div className="topbar-right">
        
        <div className="top-icon">
          <i className="fa-regular fa-paper-plane"></i>
        </div>
        
        <div className="top-profile">
          <img src={users1} alt="profile" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
