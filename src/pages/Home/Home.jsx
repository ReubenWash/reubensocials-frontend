// src/pages/Home/Home.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import Rightbar from "../../components/Rightbar/Rightbar";
import Topbar from "../../components/Topbar/Topbar";
import MobileNav from "../../components/MobileNav/MobileNav";
import NewPostModal from "../NewPost/NewPostModal";
import NotificationPanel from "../Notification/NotificationPanel";

import { getFeedPosts } from "../../api/postsApi";
import { getCurrentUser } from "../../api/authApi";
import "./Home.css";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    loadCurrentUser();
    loadFeedPosts();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const userData = await getCurrentUser();
      setCurrentUser(userData);
    } catch (err) {
      console.error("Error loading user:", err);
    }
  };

  const loadFeedPosts = async () => {
    try {
      setLoading(true);
      const response = await getFeedPosts();
      setPosts(response.results || response);
      setError(null);
    } catch (err) {
      console.error("Error loading posts:", err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    loadFeedPosts();
    setIsPostModalOpen(false);
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts(prev => prev.filter(p => p.id !== deletedPostId));
  };

  return (
    <div className="main-layout">
      {/* Sidebar - Fixed Left */}
      <Sidebar 
        currentUser={currentUser}
        onOpenPostModal={() => setIsPostModalOpen(true)} 
      />

      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Desktop Topbar with Notifications & Messages */}
        <Topbar
          onOpenMessages={() => window.location.href = "/messages"}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          currentUser={currentUser}
        />

        {/* Feed */}
        <div className="feed-container">
          {loading && <p className="text-center p-20">Loading...</p>}
          {error && <p className="text-center p-20" style={{color: 'red'}}>{error}</p>}
          
          {!loading && !error && posts.length === 0 && (
            <p className="text-center p-20">
              No posts yet. Follow users to see their posts!
            </p>
          )}

          {!loading && !error && posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              username={post.author.username}
              userImg={post.author.profile_picture_url || "/default-avatar.png"} // ✅ Updated
              postImg={post.media_url || "/placeholder-post.png"} // ✅ Updated
              caption={post.content}
              currentUser={currentUser}
              postCreatorId={post.author.id}
              likesCount={post.likes_count}
              commentsCount={post.comments_count}
              isLiked={post.is_liked}
              mediaType={post.post_type}
              onPostDeleted={handlePostDeleted}
            />
          ))}
        </div>
      </div>

      {/* Rightbar - Fixed Right */}
      <Rightbar currentUser={currentUser} />

      {/* Modals */}
      <NewPostModal
        isVisible={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onPostCreated={handlePostCreated}
      />

      <NotificationPanel
        isVisible={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Mobile Nav */}
      <MobileNav onOpenPostModal={() => setIsPostModalOpen(true)} />
    </div>
  );
};

export default Home;