import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Explore.css';
import { getExplorePosts, getTrendingPosts } from '../../api/postsApi';
import PostGridItem from '../../components/PostGrid/PostGridItem';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import Rightbar from '../../components/Rightbar/Rightbar';
import MobileNav from '../../components/MobileNav/MobileNav';
import { getCurrentUser } from '../../api/authApi';

const Explore = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Load current user
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const userData = await getCurrentUser();
        setCurrentUser(userData);
      } catch (err) {
        console.error('Error loading current user:', err);
      }
    };
    loadCurrentUser();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [activeTab]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      let data;
      
      if (activeTab === 'trending') {
        data = await getTrendingPosts();
      } else {
        data = await getExplorePosts();
      }
      
      // Convert to array if it's an object with results
      const postsArray = Array.isArray(data) ? data : (data.results || []);
      
      // Filter out text-only posts - only show posts with media
      const mediaPosts = postsArray.filter(post => {
        // Keep only posts that have media_file or thumbnail
        // And are either image or video type
        return (post.media_file || post.thumbnail) && 
               (post.post_type === 'image' || post.post_type === 'video');
      });
      
      setPosts(mediaPosts);
    } catch (err) {
      console.error("Error loading posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <Sidebar currentUser={currentUser} />

      {/* Main Content */}
      <div className="main-content-area">
        <Topbar currentUser={currentUser} />
        
        <div className="explore-page">
          <div className="explore-header">
            <h2>Explore</h2>
            <div className="explore-tabs">
              <button 
                className={activeTab === 'explore' ? 'active' : ''}
                onClick={() => setActiveTab('explore')}
              >
                For You
              </button>
              <button 
                className={activeTab === 'trending' ? 'active' : ''}
                onClick={() => setActiveTab('trending')}
              >
                🔥 Trending
              </button>
            </div>
          </div>

          {loading ? (
            <div className="explore-loading">
              <div className="loading-spinner"></div>
              <p>Loading amazing content...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="explore-empty">
              <div className="empty-icon">📸</div>
              <h3>No media posts found</h3>
              <p>Check back later for new photos and videos!</p>
            </div>
          ) : (
            <div className="explore-grid">
              {posts.map(post => (
                <PostGridItem
                  key={post.id}
                  postUrl={post.media_file || post.thumbnail}
                  altText={post.content}
                  postId={post.id}
                  likesCount={post.likes_count}
                  commentsCount={post.comments_count}
                  isExclusive={post.is_exclusive}
                  mediaType={post.post_type}
                  onClick={() => handlePostClick(post.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Rightbar */}
      <Rightbar currentUser={currentUser} />

      {/* Mobile Nav */}
      <MobileNav />
    </div>
  );
};

export default Explore;