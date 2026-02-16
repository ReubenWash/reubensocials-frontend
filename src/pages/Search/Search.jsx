// ============================================
// UPDATED FILE: src/pages/Search/Search.jsx
// ============================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../../api/authApi";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce search
  const [timeoutId, setTimeoutId] = useState(null);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchUsers(searchQuery);
      setUsers(data.results || data);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous timeout
    if (timeoutId) clearTimeout(timeoutId);

    // Set new timeout for debounced search
    const newTimeoutId = setTimeout(() => {
      handleSearch(value);
    }, 500); // Wait 500ms after user stops typing

    setTimeoutId(newTimeoutId);
  };

  const handleUserClick = (username) => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users by username..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
      </div>

      {query === "" ? (
        <p className="hint-text">Start typing to find users 🔍</p>
      ) : loading ? (
        <p className="hint-text">Searching...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="results-section">
          <div className="results-block">
            <h3>Users</h3>
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="user-card"
                  onClick={() => handleUserClick(user.username)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="avatar">
                    {user.profile_picture ? (
                      <img
                        src={user.profile_picture}
                        alt={user.username}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          background: "#008080",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="user-name">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="username">@{user.username}</p>
                    {user.bio && (
                      <p className="user-bio" style={{ fontSize: "12px", color: "#666" }}>
                        {user.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">No users found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;