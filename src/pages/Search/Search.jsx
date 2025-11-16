import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");

  // Dummy data - replace later with real backend/API data
  const users = [
    { id: 1, name: "Reuben Wash", username: "@reubenwash" },
    { id: 2, name: "Ama K.", username: "@amak" },
    { id: 3, name: "Kwesi Dev", username: "@kwesidev" },
  ];

  const posts = [
    { id: 1, caption: "Beach vibes 🌊" },
    { id: 2, caption: "Teal outfit of the day 💚" },
    { id: 3, caption: "Ghana Jollof supremacy 🍛" },
  ];

  // Filter both users and posts by search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPosts = posts.filter((post) =>
    post.caption.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users or posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {query === "" ? (
        <p className="hint-text">Start typing to find users or posts 🔍</p>
      ) : (
        <div className="results-section">
          <div className="results-block">
            <h3>Users</h3>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="avatar">{user.name.charAt(0)}</div>
                  <div>
                    <p className="user-name">{user.name}</p>
                    <p className="username">{user.username}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">No users found.</p>
            )}
          </div>

          <div className="results-block">
            <h3>Posts</h3>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.id} className="post-card">
                  <p>{post.caption}</p>
                </div>
              ))
            ) : (
              <p className="no-results">No posts found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
