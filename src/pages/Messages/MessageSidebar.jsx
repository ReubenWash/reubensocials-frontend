// MessageSidebar.jsx

import React from 'react';

const MessageSidebar = () => {
    // Dummy thread data (Replace with API data)
    const threads = [
        { id: 1, user: 'Asiedu_Reuben', lastMessage: 'Great work on the latest post!', unread: true },
        { id: 2, user: 'Michael_P', lastMessage: 'Check your exclusive folder.', unread: false },
        { id: 3, user: 'Fan_Account_01', lastMessage: 'Are you taking commissions?', unread: true },
    ];

    return (
        <div className="message-sidebar">
            <h2 className="sidebar-header">Messages</h2>
            {threads.map(thread => (
                <div 
                    key={thread.id} 
                    className={`thread-item ${thread.unread ? 'unread' : ''} ${thread.id === 1 ? 'active' : ''}`}
                >
                    {thread.unread && <span className="unread-dot"></span>}
                    <div className="thread-avatar"></div> {/* Placeholder for user avatar */}
                    <div className="thread-content">
                        <div className="thread-user">{thread.user}</div>
                        <div className="thread-preview">{thread.lastMessage}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageSidebar;