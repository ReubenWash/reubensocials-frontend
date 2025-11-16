import React from "react";
import "./Rightbar.css";
import users1 from "../../assets/users/users1.png";

const suggestions = [
  { id: 1, name: "mark", avatar: "/assets/users/user4.jpg" },
  { id: 2, name: "emily", avatar: "/assets/users/user5.jpg" },
  { id: 3, name: "michael", avatar: "/assets/users/user6.jpg" },
];

const Rightbar = () => {
  return (
    <div className="rightbar">
      {/* Profile summary */}
      <div className="profile-preview">
        <img src={users1} alt="user" className="profile-avatar" />
        <div className="profile-info">
          <h4>asiedu_reuben</h4>
          <span>Reuben Wash</span>
        </div>
        <button className="switch-btn">Switch</button>
      </div>

      {/* Suggestions */}
      <div className="suggestions">
        <div className="suggestions-header">
          <h4>Suggestions for you</h4>
          <button>See All</button>
        </div>

        {suggestions.map((user) => (
          <div className="suggestion-item" key={user.id}>
            <div className="suggestion-user">
              <img src={users1} alt={user.name} />
              <div>
                <h5>{user.name}</h5>
                <span>New to ROCIALS</span>
              </div>
            </div>
            <button className="follow-btn">Follow</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="rightbar-footer">
        <p>
          About · Help · Privacy · Terms <br /> © 2025 ROCIALS
        </p>
      </div>
    </div>
  );
};

export default Rightbar;
