// src/pages/SinglePost/SinglePost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import Rightbar from '../../components/Rightbar/Rightbar';
import MobileNav from '../../components/MobileNav/MobileNav';
import Post from '../../components/Post/Post';
import { getPostById } from '../../api/postsApi';
import { getCurrentUser } from '../../api/authApi';
import './SinglePost.css';

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCurrentUser();
    loadPost();
  }, [postId]);

  const loadCurrentUser = async () => {
    try {
      const userData = await getCurrentUser();
      setCurrentUser(userData);
    } catch (err) {
      console.error('Error loading current user:', err);
    }
  };

  const loadPost = async () => {
    try {
      setLoading(true);
      const postData = await getPostById(postId);
      setPost(postData);
    } catch (err) {
      console.error('Error loading post:', err);
      setError('Post not found');
    } finally {
      setLoading(false);
    }
  };

  const handlePostDeleted = () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <div className="main-layout">
        <Sidebar currentUser={currentUser} />
        <div className="main-content-area">
          <Topbar currentUser={currentUser} />
          <div className="single-post-loading">
            <div className="loading-spinner"></div>
            <p>Loading post...</p>
          </div>
        </div>
        <Rightbar currentUser={currentUser} />
        <MobileNav />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="main-layout">
        <Sidebar currentUser={currentUser} />
        <div className="main-content-area">
          <Topbar currentUser={currentUser} />
          <div className="single-post-error">
            <h2>😕 Post Not Found</h2>
            <p>The post you're looking for doesn't exist or has been deleted.</p>
            <button onClick={() => navigate('/home')} className="back-btn">
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
      <Sidebar currentUser={currentUser} />
      
      <div className="main-content-area">
        <Topbar currentUser={currentUser} />
        
        <div className="single-post-container">
          <button onClick={() => navigate(-1)} className="back-nav-btn">
            ← Back
          </button>
          
          <Post
            postId={post.id}
            username={post.author.username}
            userImg={post.author.profile_picture_url || "/default-avatar.png"}
            postImg={post.media_url}  // Updated
            caption={post.content}
            currentUser={currentUser}
            postCreatorId={post.author.id}
            likesCount={post.likes_count}
            commentsCount={post.comments_count}
            isLiked={post.is_liked}
            mediaType={post.post_type}
            isExclusive={post.is_exclusive}
            hasPaidAccess={post.has_access}
            onPostDeleted={handlePostDeleted}
          />
        </div>
      </div>
      
      <Rightbar currentUser={currentUser} />
      <MobileNav />
    </div>
  );
};

export default SinglePost;