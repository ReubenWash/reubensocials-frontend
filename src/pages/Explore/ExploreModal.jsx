// ExploreModal.jsx

import React, { useState } from "react";
import "./ExploreModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faTrash,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const ExploreModal = ({ post, onClose, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 500) + 1);
  const [comments, setComments] = useState([
    { id: 1, user: "fan_01", text: "🔥🔥 love this!" },
    { id: 2, user: "reubensocial", text: "Nice shot 😍" },
  ]);
  const [newComment, setNewComment] = useState("");

  if (!post) return null;

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, user: "You", text: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="explore-modal-backdrop" onClick={onClose}>
      <div className="explore-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="modal-header">
          <div className="user-info">
            <img
              src={post.userImg || "/assets/users/default.png"}
              alt="user"
              className="user-avatar"
            />
            <h3>@{post.user}</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* IMAGE */}
        <div className="modal-body">
          <img src={post.image} alt="Post" className="modal-img" />
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <div className="footer-actions">
            <FontAwesomeIcon
              icon={liked ? solidHeart : regularHeart}
              className={`icon heart ${liked ? "liked" : ""}`}
              onClick={handleLike}
            />
            <FontAwesomeIcon icon={faCommentDots} className="icon" />
            <FontAwesomeIcon
              icon={faTrash}
              className="icon delete"
              onClick={() => onDelete(post.id)}
            />
          </div>

          <p className="likes-count">{likes} likes</p>

          {/* COMMENTS SECTION */}
          <div className="comments-section">
            {comments.map((comment) => (
              <p key={comment.id}>
                <strong>{comment.user}</strong> {comment.text}
              </p>
            ))}
          </div>

          {/* COMMENT INPUT */}
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>

          <button className="view-post-btn">View full post</button>
        </div>
      </div>
    </div>
  );
};

export default ExploreModal;
