"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api"; // your axios instance
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// Context
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Load user on mount (CSR)
  useEffect(() => {
    async function loadUser() {

      try {
        // setAuthLoading(true)
        const res = await api.get("/auth/me")
        setUser(res.data.user);
        console.log(res);
        
      } catch (err) {
        // console.error("Failed to load user:", err);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    loadUser();
  }, []);

  // Login
  async function login(email, password) {
    try {
      const res = await api.post("/auth/login", { email, password });

      const { accessToken, user } = res.data;
      setUser(user);

      return user;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err);
      throw err.response?.data || err;
    }
  }

  // Logout
  async function logout() {
    try {
      await api.post("/auth/logout");
      setUser(null);
      router.push("/login");

    } catch (err) {
      console.error(err);
    }
    
  }

  const hasPermission = (perm) => {
    return user?.permissions?.includes(perm);
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (!Array.isArray(roles)) roles = [roles];
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{ user,setUser, authLoading, login, logout, hasPermission, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export const useAuth = () => useContext(AuthContext);
