import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// Get stored JWT token safely (prevents SSR issues)
const getAuthHeaders = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {}; // Return empty headers if running on the server
};

// Signup API
export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, { email, password });
    return response.data;
  } catch (error) {
    console.error(" Signup API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Login API
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error(" Login API Error:", error.response?.data || error.message);
    throw error;
  }
};

//  Fetch Google Sheets Data
export const fetchSheetData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/sheets`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error(" Fetch Sheets Error:", error.response?.data || error.message);
    throw error;
  }
};

//  Add Data to Google Sheets
export const addSheetData = async (values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/sheets`, { values }, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error(" Add Sheets Data Error:", error.response?.data || error.message);
    throw error;
  }
};

//  Fetch Live Updates (Simulated for real-time updates)
export const fetchLiveUpdates = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/sheets/live`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error(" Live Updates Error:", error.response?.data || error.message);
    throw error;
  }
};

//  Create Table (Google Sheets Integration)
export const createTable = async (columns) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/sheets/create-table`, { columns }, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error(" Create Table Error:", error.response?.data || error.message);
    throw error;
  }
};

//  Logout function (Prevents SSR issues)
export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  }
};
