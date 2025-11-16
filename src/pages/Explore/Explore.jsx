// Explore.jsx

import React, { useState } from "react";
import "./Explore.css";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import MobileNav from "../../components/MobileNav/MobileNav";
import ExploreModal from "./ExploreModal"; // ✅ Import modal

// ✅ Import sample images
import explore1 from "../../assets/posts/swag.jpg";
import explore2 from "../../assets/posts/swag1.jpg";
import explore3 from "../../assets/posts/swag3.jpg";
import explore4 from "../../assets/posts/swag.jpg";
import explore5 from "../../assets/posts/swag1.jpg";
import explore6 from "../../assets/posts/swag3.jpg";

const Explore = () => {
  const [posts, setPosts] = useState([
    { id: 1, image: explore1, user: "jenna" },
    { id: 2, image: explore2, user: "mike" },
    { id: 3, image: explore3, user: "sara" },
    { id: 4, image: explore4, user: "joseph" },
    { id: 5, image: explore5, user: "kevin" },
    { id: 6, image: explore6, user: "rita" },
  ]);

  const [selectedPost, setSelectedPost] = useState(null);

  // ✅ Open modal when a post is clicked
  const handlePostClick = (post) => setSelectedPost(post);

  // ✅ Delete post
  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
    setSelectedPost(null); // close modal after delete
  };

  return (
    <div className="explore-page">
      <Topbar />
      <div className="explore-container">
        <Sidebar />
        <div className="explore-feed">
          <h2 className="explore-title">Explore</h2>
          <div className="explore-grid">
            {posts.map((post) => (
              <div
                key={post.id}
                className="explore-item"
                onClick={() => handlePostClick(post)}
              >
                <img src={post.image} alt={`Post ${post.id}`} />
              </div>
            ))}
          </div>
        </div>
        <Rightbar />
      </div>

      {/* ✅ Modal opens when selectedPost is not null */}
      {selectedPost && (
        <ExploreModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onDelete={handleDeletePost}
        />
      )}

      <MobileNav />
    </div>
  );
};

export default Explore;
