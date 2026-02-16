import api from './axiosConfig';

export const getFeedPosts = async () => {
  try {
    const response = await api.get('/posts/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch posts' };
  }
};

export const getTrendingPosts = async () => {
  try {
    const response = await api.get('/posts/trending/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch trending' };
  }
};

export const getExplorePosts = async () => {
  try {
    const response = await api.get('/posts/explore/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch explore' };
  }
};

export const getUserPosts = async (username) => {
  try {
    const response = await api.get(`/posts/user/${username}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch posts' };
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Post not found' };
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts/', postData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to create post' };
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const response = await api.put(`/posts/${postId}/`, postData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to update post' };
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to delete post' };
  }
};

export const likePost = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/like/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to like post' };
  }
};

export const sharePost = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/share/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to share post' };
  }
};

export const getPostComments = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch comments' };
  }
};

// Get single post by ID
export const getPostByid = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createComment = async (postId, content) => {
  try {
    const response = await api.post(`/posts/${postId}/comments/`, { content });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to create comment' };
  }
};

