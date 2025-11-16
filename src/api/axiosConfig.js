import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Your Django backend API
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to every request (if available)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access"); // stored after login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
