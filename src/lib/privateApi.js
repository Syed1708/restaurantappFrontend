import axios from "axios";
import { getAccessToken } from "./authHelpers"; // a function that reads context token in client code or you can set header per-request

const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

// Instead of interceptor reading context (complex), pass token per-call or set header when token updates.
// Example interceptor that reads from window.__ACCESS_TOKEN set by your context:
privateApi.interceptors.request.use((cfg) => {
  const token = window.__ACCESS_TOKEN; // when context updates, set window.__ACCESS_TOKEN = token
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default privateApi;
