// MessagingSystem.jsx - Main container component

import React from 'react';
import MessageSidebar from './MessageSidebar';
import ChatArea from './ChatArea';
import './MessagingSystem.css';

const MessagingSystem = () => {
    return (
        <div className="messaging-system-container">
            <MessageSidebar />
            <ChatArea />
        </div>
    );
};

export default MessagingSystem;