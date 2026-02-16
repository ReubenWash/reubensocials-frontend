// src/components/Messaging/ChatSidebarItem.jsx
import React from "react";

const ChatSidebarItem = ({ conversation, active, onClick }) => {
  return (
    <div
      className={`chat-sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="participant-name">{conversation.participant_name}</div>
      <div className="last-message">
        {conversation.last_message?.slice(0, 25) || "No messages yet"}
      </div>
    </div>
  );
};

export default ChatSidebarItem;
