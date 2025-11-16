// ChatArea.jsx

import React from 'react';

const ChatArea = () => {
    // Dummy message data (Replace with API data)
    const messages = [
        { id: 1, text: 'Hey there! Loved your latest photo set.', sender: 'other' },
        { id: 2, text: 'Thank you so much! Glad you enjoyed it.', sender: 'me' },
        { id: 3, text: 'When is the next exclusive drop?', sender: 'other' },
        { id: 4, text: 'Next week! Keep an eye on your notifications.', sender: 'me' },
    ];

    return (
        <div className="chat-area">
            <div className="chat-header">
                <span className="chat-user-name">Asiedu_Reuben</span>
            </div>

            <div className="message-list">
                {messages.map(msg => (
                    <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="chat-input-area">
                <input type="text" placeholder="Send a message..." />
                <button className="send-btn">Send</button>
            </div>
        </div>
    );
};

export default ChatArea;