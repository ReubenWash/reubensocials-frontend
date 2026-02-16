import api from './axiosConfig';

export const toggleFollow = async (username) => {
  try {
    const response = await api.post(`/accounts/follow/${username}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Follow action failed' };
  }
};

export const getFollowers = async (username) => {
  try {
    const response = await api.get(`/accounts/followers/${username}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch followers' };
  }
};

export const getFollowing = async (username) => {
  try {
    const response = await api.get(`/accounts/following/${username}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch following' };
  }
};

