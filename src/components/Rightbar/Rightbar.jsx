import React, { useState, useEffect } from 'react';
import { discoverUsers } from '../../api/authApi';
import { toggleFollow } from '../../api/followApi';
import { getTrendingPosts } from '../../api/postsApi';
import './Rightbar.css';

const Rightbar = ({ currentUser }) => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadSuggestions();
      loadTrending();
    }
  }, [currentUser]);

  const loadSuggestions = async () => {
    try {
      const data = await discoverUsers();
      // handle both paginated {results:[]} and plain array []
      const users = data.results || data
      setSuggestedUsers(Array.isArray(users) ? users.slice(0, 5) : []);
    } catch (err) {
      console.error('Error loading suggestions:', err);
    }
  };

  const loadTrending = async () => {
    try {
      const data = await getTrendingPosts();
      // handle both paginated {results:[]} and plain array []
      const posts = data.results || data
      setTrendingPosts(Array.isArray(posts) ? posts.slice(0, 6) : []);
    } catch (err) {
      console.error('Error loading trending:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (username) => {
    try {
      await toggleFollow(username);
      await loadSuggestions();
    } catch (err) {
      console.error('Error following user:', err);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="main-rightbar">
      {/* Current User Profile */}
      <div className="rightbar-profile">
        <img
          src={currentUser.profile_picture_url || '/default-avatar.png'}
          alt={currentUser.username}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h4>{currentUser.username}</h4>
          <p>{currentUser.first_name} {currentUser.last_name}</p>
        </div>
      </div>

      {/* Suggestions for you */}
      <div className="rightbar-section">
        <div className="section-header">
          <h3>Suggestions For You</h3>
          <button onClick={() => window.location.href = '/discover'}>See All</button>
        </div>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : suggestedUsers.length === 0 ? (
          <p className="empty-text">No suggestions</p>
        ) : (
          <div className="suggestions-list">
            {suggestedUsers.map(user => (
              <div key={user.id} className="suggestion-item">
                <img
                  src={user.profile_picture_url || '/default-avatar.png'}
                  alt={user.username}
                  onClick={() => window.location.href = `/user/${user.username}`}
                />
                <div className="suggestion-info">
                  <h4 onClick={() => window.location.href = `/user/${user.username}`}>
                    {user.username}
                  </h4>
                  <p>{user.followers_count} followers</p>
                </div>
                <button
                  onClick={() => handleFollow(user.username)}
                  className={user.is_following ? 'unfollow-btn' : 'follow-btn'}
                >
                  {user.is_following ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trending Posts */}
      <div className="rightbar-section">
        <div className="section-header">
          <h3>Trending</h3>
          <button onClick={() => window.location.href = '/explore'}>See All</button>
        </div>

        <div className="trending-grid">
          {trendingPosts.map(post => (
            <div
              key={post.id}
              className="trending-item"
              onClick={() => window.location.href = `/post/${post.id}`}
            >
              {post.media_url && (
                <img src={post.media_url} alt="Trending post" />  
              )}
              <div className="trending-overlay">
                <span>❤️ {post.likes_count}</span>
                <span>💬 {post.comments_count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="rightbar-footer">
        <p>&copy; 2025 Rocials. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Help</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;