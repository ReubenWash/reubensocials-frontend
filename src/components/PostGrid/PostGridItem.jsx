// src/components/PostGrid/PostGridItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PostGridItem.css';

const PostGridItem = ({ 
  postUrl, 
  altText, 
  postId,
  isExclusive = false,
  hasAccess = true,
  likesCount = 0,
  commentsCount = 0,
  mediaType = 'image',
  onClick
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/post/${postId}`);
    }
  };

  return (
    <div className="post-grid-item" onClick={handleClick}>
      <div className={`post-grid-image-container ${isExclusive && !hasAccess ? 'blurred' : ''}`}>
        {mediaType === 'video' ? (
          <video className="post-grid-image" muted>
            <source src={postUrl} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={postUrl} 
            alt={altText || 'Post'} 
            className="post-grid-image"
          />
        )}
        
        {/* Video Play Icon */}
        {mediaType === 'video' && (
          <div className="video-play-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        )}
        
        {/* Exclusive Lock Overlay */}
        {isExclusive && !hasAccess && (
          <div className="exclusive-lock-overlay">
            <div className="lock-icon">🔒</div>
            <p className="lock-text">Exclusive</p>
          </div>
        )}

        {/* Post Stats Overlay */}
        <div className="post-grid-overlay">
          <div className="post-grid-stats">
            <span className="stat-item">
              <span className="stat-icon">❤️</span>
              {likesCount}
            </span>
            <span className="stat-item">
              <span className="stat-icon">💬</span>
              {commentsCount}
            </span>
          </div>
        </div>

        {/* Exclusive Badge */}
        {isExclusive && (
          <div className="exclusive-badge">
            🔒 Exclusive
          </div>
        )}
      </div>
    </div>
  );
};

export default PostGridItem;