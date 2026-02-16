import React, { useState } from "react";
import "./Post.css";

// ✅ CORRECT IMPORTS - Import individual functions from postsApi
import {
  likePost,
  getPostComments,
  createComment,
  deletePost,
} from "../../api/postsApi";

import { createAddFundsIntent } from "../../api/paymentsApi";

const Post = ({
  username,
  userImg,
  postImg,
  caption,
  postId,
  isExclusive = false,
  hasPaidAccess = false,
  initialLikes = 0,
  initialComments = [],
  currentUser,
  mediaType = "image",
  isInitiallyLiked = false,
  postCreatorId,
  onPostDeleted,
  // Additional props from API
  likesCount,
  commentsCount,
  isLiked: apiIsLiked,
}) => {
  // --- State Management ---
  const [isLiked, setIsLiked] = useState(apiIsLiked || isInitiallyLiked);
  const [likeCount, setLikeCount] = useState(likesCount || initialLikes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Check access status and initialize blurring
  const isLocked = isExclusive && !hasPaidAccess;
  const [isBlurred, setIsBlurred] = useState(isLocked);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  // --- Constants ---
  const emojis = ["😊", "😂", "❤️", "🔥", "👍", "🎉", "😍", "😮", "😢", "🙏"];
  const isPostOwner = currentUser && currentUser.id === postCreatorId;
  const postUrl = `${window.location.origin}/posts/${postId}`;

  // --- Handlers ---

  const handleLike = async () => {
    if (!currentUser) {
      alert("Please login to like posts");
      return;
    }

    try {
      // Optimistic update
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikeCount((prev) => prev + (newLikedState ? 1 : -1));

      // Call API (likePost handles both like and unlike)
      await likePost(postId);
    } catch (error) {
      console.error("Error liking post:", error);
      // Rollback on error
      setIsLiked(!isLiked);
      setLikeCount((prev) => prev + (isLiked ? 1 : -1));
      alert("Failed to process like. Please try again.");
    }
  };

  const handlePurchaseAccess = async () => {
    if (!currentUser) {
      alert("Please login to purchase exclusive content");
      return;
    }

    try {
      setPurchaseLoading(true);

      // Create payment intent with Stripe
      const { client_secret, payment_intent_id } = await createAddFundsIntent(
        postId
      );

      // In a real app, you'd integrate Stripe's payment UI here
      // For now, we'll simulate a successful purchase
      alert(
        "Payment processing... (In production, this would open Stripe payment form)"
      );

      // After successful payment, unblur the content
      setIsBlurred(false);

      alert("Purchase successful! Content unlocked.");
    } catch (error) {
      console.error("Error purchasing access:", error);
      alert(error.error || "Purchase failed. Please try again.");
    } finally {
      setPurchaseLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getPostComments(postId);
      // Handle both direct array and paginated response
      const commentsData = response.results || response;
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const toggleComments = () => {
    if (!currentUser) {
      alert("Please login to view comments");
      return;
    }

    // Fetch comments when opening for the first time
    if (!showComments && comments.length === 0) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Check out ${username}'s post!`,
          url: postUrl,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(postUrl);
      alert("Link copied to clipboard!");
    }
  };

  // --- Post Menu Actions ---

  const handleDeletePost = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this post? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deletePost(postId);

      // Inform parent component
      if (onPostDeleted) {
        onPostDeleted(postId);
      }

      alert("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
    setShowMenu(false);
  };

  const handleReportPost = async () => {
    if (!currentUser) {
      alert("Please login to report content.");
      return;
    }

    // For now, just show an alert (you can implement a report API endpoint later)
    alert("Post reported. Thank you for helping keep our community safe!");
    setShowMenu(false);
  };

  const handleCommentSubmit = async (commentContent, isEmoji = false) => {
    if (!currentUser) return;
    if (!commentContent.trim()) return;

    // Optimistic update
    const tempCommentId = Date.now() + Math.random();
    const optimisticComment = {
      id: tempCommentId,
      user: {
        username: currentUser.username || "You",
        profile_picture: currentUser.profile_picture || userImg,
        id: currentUser.id,
      },
      content: commentContent,
      created_at: new Date().toISOString(),
    };

    setComments((prev) => [...prev, optimisticComment]);
    if (!isEmoji) setNewComment("");
    setShowEmojiPicker(false);

    try {
      await createComment(postId, commentContent);

      // Refresh comments to get the real data from server
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);

      // Rollback
      setComments((prev) => prev.filter((c) => c.id !== tempCommentId));
      alert("Failed to post comment. Please try again.");
    }
  };

  const handleTextComment = (e) => {
    e.preventDefault();
    handleCommentSubmit(newComment.trim(), false);
  };

  const handleEmojiComment = (emoji) => {
    handleCommentSubmit(emoji, true);
  };

  return (
    <div className="post">
      {/* Post Header */}
      <div className="post-header">
        <img src={userImg} alt={username} className="post-user-img" />
        <div className="post-user-info">
          <span className="post-username">
            {username}
            {isPostOwner && <span className="owner-badge"> (You)</span>}
          </span>
          {isExclusive && <span className="exclusive-badge">🔒 Exclusive</span>}
        </div>

        {/* Menu Dropdown */}
        <div className="post-menu-container">
          <button
            className="post-menu-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            ⋯
          </button>
          {showMenu && (
            <div className="post-dropdown-menu">
              {isPostOwner && (
                <button onClick={handleDeletePost}>🗑️ Delete Post</button>
              )}
              {!isPostOwner && currentUser && (
                <button onClick={handleReportPost}>🚩 Report Post</button>
              )}
              <button onClick={handleShare}>🔗 Share/Copy Link</button>
            </div>
          )}
        </div>
      </div>

      {/* Media Section */}
      {postImg && (
        <div className={`post-media-container ${isBlurred ? "blurred" : ""}`}>
          {mediaType === "image" ? (
            <img src={postImg} alt="post" className="post-image" />
          ) : (
            <video controls className="post-video">
              <source src={postImg} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Exclusive Content Overlay */}
          {isBlurred && (
            <div className="exclusive-overlay">
              <div className="exclusive-content">
                <h3>🔒 Exclusive Content</h3>
                <p>
                  {!currentUser
                    ? "Please login to access exclusive content"
                    : "This content is available for premium subscribers only"}
                </p>
                {currentUser ? (
                  <button
                    onClick={handlePurchaseAccess}
                    className="purchase-access-btn"
                    disabled={purchaseLoading}
                  >
                    {purchaseLoading
                      ? "Processing..."
                      : "Unlock Access - $4.99"}
                  </button>
                ) : (
                  <button
                    onClick={() => (window.location.href = "/login")}
                    className="login-btn"
                  >
                    Login to Continue
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Engagement Stats */}
      <div className="post-stats">
        <span className="likes-count">{likeCount} likes</span>
        <span className="comments-count">
          {comments.length || commentsCount || 0} comments
        </span>
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button
          onClick={handleLike}
          className={`action-btn ${isLiked ? "liked" : ""}`}
          disabled={!currentUser}
          title={!currentUser ? "Please login to like" : ""}
        >
          {isLiked ? "❤️" : "🤍"} Like
        </button>
        <button
          onClick={toggleComments}
          className="action-btn"
          disabled={!currentUser}
          title={!currentUser ? "Please login to comment" : ""}
        >
          💬 Comment
        </button>
        <button
          onClick={handleShare}
          className="action-btn"
          disabled={!currentUser}
        >
          🔄 Share
        </button>
      </div>

      {/* Caption */}
      <div className="post-caption">
        <strong>{username}</strong> {caption}
      </div>

      {/* Comments Section */}
      {showComments && currentUser && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <img
                  src={comment.user?.profile_picture || "/default-avatar.png"}
                  alt={comment.user?.username || "User"}
                  className="comment-user-img"
                />
                <div className="comment-content">
                  <strong>
                    {comment.user?.username || "Anonymous"}
                    {currentUser.id === comment.user?.id && (
                      <span className="owner-badge"> (You)</span>
                    )}
                  </strong>
                  <span>{comment.content}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleTextComment} className="comment-form">
            <div className="comment-input-container">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="comment-input"
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="emoji-picker-btn"
              >
                {showEmojiPicker ? "❌" : "😊"}
              </button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="emoji-picker">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleEmojiComment(emoji)}
                    className="emoji-option"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={!newComment.trim()}
              className="post-comment-btn"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
