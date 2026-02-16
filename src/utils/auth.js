export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};

export const getCurrentUserData = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
};
