// UserProfilePage.jsx

import React, { useState } from 'react';
import PostGridItem from '../../components/PostGrid/PostGridItem'; // Import the grid item component
import './UserProfilePage.css';
import profile from '../../assets/images/profile.png';

import photo1 from '../../assets/images/photo1.png';
import photo2 from '../../assets/images/photo2.png';
import photo3 from '../../assets/images/photo3.png';
import photo4 from '../../assets/images/photo4.png';
import photo5 from '../../assets/images/photo5.png';
import photo6 from '../../assets/images/photo6.png';


// Dummy data for posts
const userPosts = [
    { id: 1, url: photo1, alt: "Photo 1" },
    { id: 2, url: photo2, alt: "Photo 2" },
    { id: 3, url: photo3, alt: "Photo 3" },
    { id: 4, url: photo4, alt: "Photo 4" },
    { id: 5, url: photo5, alt: "Photo 5" },
    { id: 6, url: photo6, alt: "Photo 6" },
];

// NOTE: Ensure your CSS variables are defined in your global styles (e.g., :root in index.css)
const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState('Posts');

    const renderActionButtons = (isOwner) => {
        if (isOwner) {
            return (
                <button className="profile-secondary-btn">Edit Profile</button>
            );
        }
        return (
            <>
                <button className="profile-primary-btn">Follow</button>
                <button className="profile-secondary-btn">Message</button>
            </>
        );
    };

    return (
        <div className="profile-page-container">

            {/* 1. Profile Banner Area */}
            <div className="profile-banner">
                {/* Banner Image goes here */}
            </div>
            
            {/* 2. Header and Action Buttons */}
            <div className="profile-header-area">
                <div className="profile-info-and-actions">
                    
                    <img src={profile} alt="User Profile Picture" className="profile-photo" />

                    <div className="profile-details">
                        <h1 className="username">@CreatorName</h1>
                        <p className="user-bio">Digital artist, photographer, and exclusive content creator on Rocials.</p>
                        
                        <div className="stats">
                            <span className="stat-item"><strong>12.5K</strong> Followers</span>
                            <span className="stat-item"><strong>85</strong> Posts</span>
                            <span className="stat-item">Joined 2024</span>
                        </div>
                    </div>

                    <div className="profile-action-btns">
                        {renderActionButtons(false)} {/* Change to true to see 'Edit Profile' */}
                    </div>
                </div>
            </div>

            {/* 3. Navigation Tabs */}
            <div className="profile-nav-tabs-container">
                <div className="profile-nav-tabs">
                    {['Posts', 'Exclusive', 'Saved'].map(tab => (
                        <button 
                            key={tab} 
                            className={activeTab === tab ? 'active' : ''}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* 4. Content Grid */}
            <div className="content-grid">
                {activeTab === 'Posts' && userPosts.map(post => (
                    <PostGridItem key={post.id} postUrl={post.url} altText={post.alt} />
                ))}
                {/* Add rendering logic for 'Exclusive' and 'Saved' */}
            </div>

        </div>
    );
};

export default UserProfilePage;