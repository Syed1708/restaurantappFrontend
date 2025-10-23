

import axios from "axios";

// Create base instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

// Helper to attach token on client sid

export default api;
