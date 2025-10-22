

import axios from "axios";
import { getSession } from "next-auth/react";

// Create base instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/",
  withCredentials: true,
});

// Helper to attach token on client sid

export default api;
