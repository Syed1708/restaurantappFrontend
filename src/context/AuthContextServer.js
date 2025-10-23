// simplified version of earlier AuthContext but WITHOUT localStorage
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "@/lib/api"; // api has withCredentials:true

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // on mount: ask server for current session (uses refresh cookie)
  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const res = await api.get("/auth/me"); // backend returns { user, accessToken }
        if (!mounted) return;
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      } catch (err) {
        setUser(null);
        setAccessToken(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    init();
    return () => { mounted = false; };
  }, []);

  // login: call backend; backend will set refresh cookie
  const login = useCallback(async (email, password) => {
    const res = await api.post("/auth/login", { email, password }); // withCredentials true -> set cookie
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await api.post("/auth/logout");
    setUser(null);
    setAccessToken(null);
  }, []);

  // auto-refresh on 401 can be implemented in api interceptor (below)
  return <AuthContext.Provider value={{ user, accessToken, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
