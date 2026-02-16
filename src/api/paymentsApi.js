// src/api/paymentsApi.js
import axios from "axios";

// --- Vite Environment Variables ---
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// --- Create Axios Instance ---
const api = axios.create({
  baseURL: API_BASE_URL,
});

// --- Attach Authorization Token ---
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- API Functions ---

// Wallet Balance
export const getWalletBalance = async () => {
  try {
    const response = await api.get("/payments/wallet/balance/");
    return response.data; // { balance: "12.34", user: 1 }
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    throw error.response?.data || error;
  }
};

// Wallet Transactions
export const getWalletTransactions = async () => {
  try {
    const response = await api.get("/payments/wallet/transactions/");
    return response.data; // { results: [...] }
  } catch (error) {
    console.error("Error fetching wallet transactions:", error);
    throw error.response?.data || error;
  }
};

// User Purchases
export const getUserPurchases = async () => {
  try {
    const response = await api.get("/payments/history/");
    return response.data; // { results: [...] }
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    throw error.response?.data || error;
  }
};

// Create Add Funds Payment Intent
export const createAddFundsIntent = async (amount) => {
  try {
    const response = await api.post("/payments/add-funds/", { amount });
    return response.data; // { client_secret, payment_intent_id, amount }
  } catch (error) {
    console.error("Error creating add funds intent:", error);
    throw error.response?.data || error;
  }
};

// Confirm Payment
export const confirmPayment = async (paymentIntentId, postId = null) => {
  try {
    const response = await api.post("/payments/confirm/", {
      payment_intent_id: paymentIntentId,
      post_id: postId,
    });
    return response.data; // { success, new_balance, message, etc. }
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error.response?.data || error;
  }
};

// Helper to confirm payment AND fetch updated wallet balance
export const confirmPaymentAndFetchBalance = async (paymentIntentId) => {
  const confirm = await confirmPayment(paymentIntentId);
  const wallet = await getWalletBalance();
  return { confirm, wallet };
};

// Check Post Access
export const checkPostAccess = async (postId) => {
  try {
    const response = await api.get(`/payments/check-access/${postId}/`);
    return response.data; // { has_access, reason, price }
  } catch (error) {
    console.error("Error checking post access:", error);
    throw error.response?.data || error;
  }
};

// Default export for easier imports
export default {
  getWalletBalance,
  getWalletTransactions,
  getUserPurchases,
  createAddFundsIntent,
  confirmPayment,
  confirmPaymentAndFetchBalance,
  checkPostAccess,
};
