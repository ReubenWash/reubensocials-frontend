import api from './axiosConfig';

export const getConversations = async () => {
  try {
    const response = await api.get('/messaging/conversations/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch conversations' };
  }
};

export const createConversation = async (username) => {
  try {
    const response = await api.post('/messaging/conversations/create/', { username });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to create conversation' };
  }
};

export const getMessages = async (conversationId) => {
  try {
    const response = await api.get(`/messaging/conversations/${conversationId}/messages/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch messages' };
  }
};

export const sendMessage = async (conversationId, content) => {
  try {
    const response = await api.post(`/messaging/conversations/${conversationId}/messages/`, { content });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to send message' };
  }
};

export const markMessagesRead = async (conversationId) => {
  try {
    const response = await api.post(`/messaging/conversations/${conversationId}/read/`);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};