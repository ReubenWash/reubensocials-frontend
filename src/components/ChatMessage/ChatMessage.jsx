// src/components/Messaging/ChatMessage.jsx
import React from "react";

const ChatMessage = ({ message }) => {
  return (
    <div className={`message ${message.is_sender ? "outgoing" : "incoming"}`}>
      {message.content}
    </div>
  );
};

export default ChatMessage;
