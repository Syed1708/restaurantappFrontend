

import axios from "axios";
import { getSession } from "next-auth/react";

// Create base instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

// Helper to attach token on client side
api.interceptors.request.use(async (config) => {
  // Get session from NextAuth
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

export default apiClient;
