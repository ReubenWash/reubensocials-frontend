import React, { useState, useEffect, useRef } from 'react';
import './NotificationPanel.css';
import { 
  getNotifications, 
  markNotificationRead, 
  markAllNotificationsRead 
} from '../../api/notificationsApi';

const NotificationPanel = ({ isVisible, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);

  const token = localStorage.getItem('accessToken');

  // Load notifications when panel opens
  useEffect(() => {
    if (isVisible){ 
      loadNotifications();

      // Auto-refresh every 10 seconds
    const interval = setInterval(loadNotifications, 10000); 
    return () => clearInterval(interval);
    }

  },  [isVisible]);

  // Setup WebSocket connection
  useEffect(() => {
    if (!token) return;

    const connectWebSocket = () => {
      ws.current = new WebSocket(`ws://localhost:8000/ws/notifications/?token=${token}`);

      ws.current.onopen = () => console.log('✅ WebSocket connected');
      
      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setNotifications(prev => [data, ...prev]);
      };

      ws.current.onclose = () => {
        console.log('❌ WebSocket closed, attempting reconnect in 3s');
        reconnectTimeout.current = setTimeout(connectWebSocket, 3000);
      };

      ws.current.onerror = (err) => {
        console.error('⚠️ WebSocket error:', err);
        ws.current.close();
      };
    };

    connectWebSocket();

    return () => {
      if (ws.current) ws.current.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, [token]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      setNotifications(data.results || data);
      setError(null);
    } catch (err) {
      console.error('Error loading notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'follow': return '👤';
      case 'message': return '✉️';
      case 'purchase': return '💳';
      default: return '🔔';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (!isVisible) return null;

  return (
    <div className="notification-backdrop" onClick={onClose}>
      <div className="notification-panel" onClick={e => e.stopPropagation()}>
        <div className="panel-header">
          <h2>Notifications</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="notification-list">
          {loading && <p className="center-text">Loading...</p>}
          {error && <p className="center-text error-text">{error}</p>}
          {!loading && !error && notifications.length === 0 &&
            <p className="center-text">No notifications yet</p>
          }

          {!loading && notifications.map(notif => (
            <div
              key={notif.id}
              className={`notification-item ${notif.is_read ? 'read' : 'unread'}`}
              onClick={() => !notif.is_read && handleMarkAsRead(notif.id)}
            >
              {!notif.is_read && <span className="unread-dot"></span>}
              <div className="notif-avatar">{getNotificationIcon(notif.notification_type)}</div>
              <div className="notif-content">
                <p>
                  {notif.sender && <strong className="notif-user">{notif.sender.username}</strong>}
                  {' '}{notif.content}
                </p>
                <span className="notif-time">{formatTime(notif.created_at)}</span>
              </div>
            </div>
          ))}
        </div>

        {notifications.length > 0 && (
          <div className="panel-footer">
            <button className="mark-all-btn" onClick={handleMarkAllAsRead}>
              Mark All Read
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
