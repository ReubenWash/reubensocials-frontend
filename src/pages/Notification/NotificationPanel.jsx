// NotificationPanel.jsx

import React from 'react';
import './NotificationPanel.css';

const NotificationPanel = ({ isVisible, onClose }) => {
    // Dummy notification data
    const notifications = [
        { id: 1, type: 'Follow', user: 'Asiedu_Reuben', content: 'started following you.', time: '2m ago', read: false },
        { id: 2, type: 'Like', user: 'Michael_P', content: 'liked your latest post.', time: '1h ago', read: false },
        { id: 3, type: 'Comment', user: 'Fan_Account_01', content: 'commented on your photo: "Amazing work!"', time: '5h ago', read: true },
        { id: 4, type: 'Payment', user: 'System', content: 'Your exclusive content payment was processed.', time: '1d ago', read: true },
    ];

    if (!isVisible) return null;

    return (
        <div className="notification-backdrop" onClick={onClose}>
            <div className="notification-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2>Notifications</h2>
                    <button onClick={onClose} className="close-btn">×</button>
                </div>
                
                <div className="notification-list">
                    {notifications.map(notif => (
                        <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
                            {/* Teal dot for unread status */}
                            {!notif.read && <span className="unread-dot"></span>}
                            
                            <div className="notif-avatar"></div> 
                            
                            <div className="notif-content">
                                <p>
                                    <strong className="notif-user">{notif.user}</strong> {notif.content}
                                </p>
                                <span className="notif-time">{notif.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="panel-footer">
                    <button className="mark-all-btn">Mark All Read</button>
                </div>
            </div>
        </div>
    );
};

export default NotificationPanel;