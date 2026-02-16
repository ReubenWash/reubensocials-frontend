import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import MobileNav from "../../components/MobileNav/MobileNav";
import PostGridItem from "../../components/PostGrid/PostGridItem";
import "./UserProfilePage.css";
import { getUserByUsername, getCurrentUser } from "../../api/authApi";
import { getUserPosts } from "../../api/postsApi";
import { toggleFollow } from "../../api/followApi";

const UserProfilePage = () => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("Posts");
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [allPosts, setAllPosts] = useState([]); // Store ALL posts
  const [displayedPosts, setDisplayedPosts] = useState([]); // Posts to show based on tab
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  // Load current logged-in user
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const userData = await getCurrentUser();
        console.log("Current user loaded:", userData);
        setCurrentUser(userData);
      } catch (err) {
        console.error("Error loading current user:", err);
      }
    };
    loadCurrentUser();
  }, []);

  // Load profile user data whenever username changes
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        console.log("Loading profile for username:", username);
        const userData = await getUserByUsername(username);
        console.log("Profile user loaded:", userData);
        setUser(userData);
      } catch (err) {
        console.error("Error loading user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadUserData();
    }
  }, [username]);

  // Load ALL posts when user is loaded
  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const postsData = await getUserPosts(username);
        console.log("All posts loaded:", postsData);
        
        // Handle both array and paginated response
        const postsArray = Array.isArray(postsData) 
          ? postsData 
          : (postsData.results || []);
        
        setAllPosts(postsArray); // Store all posts as array
      } catch (err) {
        console.error("Error loading posts:", err);
        setAllPosts([]);
      }
    };

    fetchPosts();
  }, [user, username]);

  // Filter posts based on active tab
  useEffect(() => {
    if (activeTab === "Exclusive") {
      // Show only exclusive posts
      const exclusivePosts = allPosts.filter((p) => p.is_exclusive);
      setDisplayedPosts(exclusivePosts);
    } else {
      // Show only non-exclusive posts
      const regularPosts = allPosts.filter((p) => !p.is_exclusive);
      setDisplayedPosts(regularPosts);
    }
  }, [activeTab, allPosts]);

  const handleFollowToggle = async () => {
    if (!user) return;

    try {
      setFollowLoading(true);
      await toggleFollow(username);
      const updatedUser = await getUserByUsername(username);
      setUser(updatedUser);
    } catch (err) {
      console.error("Error toggling follow:", err);
    } finally {
      setFollowLoading(false);
    }
  };

  const renderActionButtons = () => {
    if (!currentUser || !user) return null;

    const isOwner = currentUser.username === user.username;

    if (isOwner) {
      return (
        <button
          className="profile-secondary-btn"
          onClick={() => (window.location.href = "/settings")}
        >
          Edit Profile
        </button>
      );
    }

    return (
      <>
        <button
          className="profile-primary-btn"
          onClick={handleFollowToggle}
          disabled={followLoading}
        >
          {followLoading
            ? "Loading..."
            : user.is_following
            ? "Unfollow"
            : "Follow"}
        </button>
        <button
          className="profile-secondary-btn"
          onClick={() => (window.location.href = "/messages")}
        >
          Message
        </button>
      </>
    );
  };

  // Check if current user has access to exclusive content
  const hasAccessToExclusive = (post) => {
    if (!currentUser || !post.is_exclusive) return true;
    
    // Owner always has access
    if (currentUser.username === user.username) return true;
    
    // Check if user has purchased access (you'll need to add this to your API)
    return post.has_access || false;
  };

  if (loading) {
    return (
      <div className="main-layout">
        <Sidebar currentUser={currentUser} />
        <div className="main-content-area">
          <Topbar currentUser={currentUser} />
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Loading profile...
          </div>
        </div>
        <Rightbar currentUser={currentUser} />
        <MobileNav />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="main-layout">
        <Sidebar currentUser={currentUser} />
        <div className="main-content-area">
          <Topbar currentUser={currentUser} />
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <h2>User not found</h2>
            <p>The user @{username} does not exist.</p>
            <button
              onClick={() => (window.location.href = "/home")}
              style={{
                padding: "10px 20px",
                background: "#008080",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
        <Rightbar currentUser={currentUser} />
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <Sidebar currentUser={currentUser} />

      {/* Main Content */}
      <div className="main-content-area">
        <Topbar currentUser={currentUser} />

        <div className="profile-page-container">
          <div className="profile-banner">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt="Cover"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>

          <div className="profile-header-area">
            <div className="profile-info-and-actions">
              <img
                src={user.profile_picture || "/default-avatar.png"}
                alt={`${user.username}'s profile`}
                className="profile-photo"
              />

              <div className="profile-details">
                <h1 className="username">@{user.username}</h1>
                <p className="user-bio">{user.bio || "No bio yet"}</p>

                <div className="stats">
                  <span className="stat-item">
                    <strong>{user.followers_count || 0}</strong> Followers
                  </span>
                  <span className="stat-item">
                    <strong>{user.following_count || 0}</strong> Following
                  </span>
                  <span className="stat-item">
                    {/* Show total posts count from user object OR count all posts */}
                    <strong>{user.posts_count || allPosts.length}</strong> Posts
                  </span>
                </div>

                {(user.website || user.twitter || user.instagram) && (
                  <div className="social-links" style={{ marginTop: "10px" }}>
                    {user.website && (
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🌐 Website
                      </a>
                    )}
                    {user.twitter && (
                      <a
                        href={`https://twitter.com/${user.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🐦 Twitter
                      </a>
                    )}
                    {user.instagram && (
                      <a
                        href={`https://instagram.com/${user.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📷 Instagram
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="profile-action-btns">{renderActionButtons()}</div>
            </div>
          </div>

          <div className="profile-nav-tabs-container">
            <div className="profile-nav-tabs">
              {["Posts", "Exclusive"].map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  <span className="tab-count">
                    ({tab === "Exclusive" 
                      ? allPosts.filter(p => p.is_exclusive).length
                      : allPosts.filter(p => !p.is_exclusive).length
                    })
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="content-grid">
            {displayedPosts.length === 0 ? (
              <p style={{ textAlign: "center", padding: "20px", width: "100%" }}>
                {activeTab === "Exclusive" 
                  ? "No exclusive posts yet" 
                  : "No posts yet"}
              </p>
            ) : (
              displayedPosts.map((post) => (
                <PostGridItem
                  key={post.id}
                  postUrl={post.media_file || post.thumbnail}
                  altText={post.content}
                  postId={post.id}
                  isExclusive={post.is_exclusive}
                  hasAccess={hasAccessToExclusive(post)}
                  likesCount={post.likes_count}
                  commentsCount={post.comments_count}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Rightbar */}
      <Rightbar currentUser={currentUser} />

      {/* Mobile Nav */}
      <MobileNav />
    </div>
  );
};

export default UserProfilePage;