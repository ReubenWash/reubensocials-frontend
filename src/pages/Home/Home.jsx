// Home.jsx

import React, { useState } from "react"; 
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import Rightbar from "../../components/Rightbar/Rightbar";
import Topbar from "../../components/Topbar/Topbar";
import MobileNav from "../../components/MobileNav/MobileNav";

// 🆕 Panels & Modals
import NewPostModal from "../../pages/NewPost/NewPostModal";
import NotificationPanel from "../../pages/Notification/NotificationPanel";

// ✅ Image Imports
import users1 from "../../assets/users/users1.png";
import swag from "../../assets/posts/swag.jpg";
import swag1 from "../../assets/posts/swag1.jpg";
import swag3 from "../../assets/posts/swag3.jpg";

import "./Home.css";

const Home = () => {
    // 🔹 State for modals & panels
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    // 🔹 Helper to close all modals/panels
    const closeAllModals = () => {
        setIsPostModalOpen(false);
        setIsNotificationsOpen(false);
    };

    // 🔹 Handlers
    const handleOpenPostModal = () => {
        closeAllModals();
        setIsPostModalOpen(true);
    };

    const handleOpenMessages = () => {
        window.location.href = "/messages";
    };

    const handleOpenNotifications = () => {
        closeAllModals();
        setIsNotificationsOpen(true);
    };

    return (
        <div className="home">
            {/* 🔸 TOPBAR */}
            <Topbar 
                onOpenMessages={handleOpenMessages} 
                onOpenNotifications={handleOpenNotifications}
            />
            
            <div className="home-container">
                {/* 🔸 SIDEBAR */}
                <Sidebar 
                    onOpenPostModal={handleOpenPostModal}
                    onOpenNotifications={handleOpenNotifications}
                />
                
                {/* 🔸 FEED SECTION */}
                <div className="feed">
                    <Post username="jenna" userImg={users1} postImg={swag} caption="Enjoying the sunset 🌅" />
                    <Post username="mike" userImg={users1} postImg={swag1} caption="Weekend vibes 😎" />
                    <Post username="sara" userImg={users1} postImg={swag3} caption="Just chilling 💧" />
                </div>
                
                {/* 🔸 RIGHTBAR */}
                <Rightbar />
            </div>

            {/* 🔸 MODALS & PANELS */}
            <NewPostModal 
                isVisible={isPostModalOpen} 
                onClose={() => setIsPostModalOpen(false)} 
            />

            <NotificationPanel 
                isVisible={isNotificationsOpen} 
                onClose={() => setIsNotificationsOpen(false)} 
            />

            {/* 🔸 MOBILE NAV */}
            <MobileNav onOpenPostModal={handleOpenPostModal} />
        </div>
    );
};

export default Home;
