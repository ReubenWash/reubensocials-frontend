  import api from './axiosConfig';

export const getNotifications = async () => {
  try {
    const response = await api.get('/notifications/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch notifications' };
  }
};

export const markNotificationRead = async (notificationId) => {
  try {
    const response = await api.post(`/notifications/${notificationId}/read/`);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const markAllNotificationsRead = async () => {
  try {
    const response = await api.post('/notifications/read-all/');
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getUnreadCount = async () => {
  try {
    const response = await api.get('/notifications/unread-count/');
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};