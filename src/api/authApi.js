import api from './axiosConfig';

/**
 * Register new user with profile picture
 */
export const registerUser = async (formData) => {
  try {
    const response = await api.post('/accounts/register/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Registration failed' };
  }
};

/**
 * Login user
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/accounts/login/', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Login failed' };
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    await api.post('/accounts/logout/');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.clear();
    window.location.href = '/login';
  }
};

/**
 * Get current user - FIXED!
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/accounts/me/'); // ⬅️ CHANGED FROM /profile/ to /me/
    console.log('✅ getCurrentUser response:', response.data); // Debug
    
    // Verify username exists
    if (!response.data.username) {
      console.error('⚠️ Username missing from response:', response.data);
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ getCurrentUser error:', error);
    throw error.response?.data || { detail: 'Failed to fetch user' };
  }
};

/**
 * Update profile
 */
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/accounts/profile/', profileData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Update failed' };
  }
};

/**
 * Get user by username
 */
export const getUserByUsername = async (username) => {
  try {
    const response = await api.get(`/accounts/user/${username}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'User not found' };
  }
};

/**
 * Search users
 */
export const searchUsers = async (query) => {
  try {
    const response = await api.get(`/accounts/search/?q=${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Search failed' };
  }
};

/**
 * Discover users
 */
export const discoverUsers = async () => {
  try {
    const response = await api.get('/accounts/discover/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to load users' };
  }
};