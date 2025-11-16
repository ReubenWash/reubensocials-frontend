import React from "react";
import "./Post.css";

const Post = ({ username, userImg, postImg, caption }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img src={userImg} alt={username} className="post-user-img" />
        <span className="post-username">{username}</span>
      </div>

      <div className="post-image">
        <img src={postImg} alt="post" />
      </div>

      <div className="post-actions">
        <button>❤️</button>
        <button>💬</button>
        <button>📤</button>
      </div>

      <div className="post-caption">
        <strong>{username}</strong> {caption}
      </div>
    </div>
  );
};

export default Post;
