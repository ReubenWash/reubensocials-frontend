import api from "./axiosConfig";

// ==========================
// REGISTER USER
// ==========================
export const registerUser = async (userData) => {
  try {
    const response = await api.post("accounts/register/", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Registration failed" };
  }
};

// ==========================
// LOGIN USER
// ==========================
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("token/", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Login failed" };
  }
};

// ==========================
// REFRESH ACCESS TOKEN
// ==========================
export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh");

    const response = await api.post("token/refresh/", { refresh });

    // update token in localStorage
    if (response.data?.access) {
      localStorage.setItem("access", response.data.access);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Token refresh failed" };
  }
};
