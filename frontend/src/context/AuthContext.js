import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = checking, false = anon, obj = user
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("agastya_token");
    if (!token) {
      setUser(false);
      setInitialised(true);
      return;
    }
    api
      .get("/auth/me")
      .then((r) => setUser(r.data))
      .catch(() => {
        localStorage.removeItem("agastya_token");
        setUser(false);
      })
      .finally(() => setInitialised(true));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("agastya_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("agastya_token");
    setUser(false);
  };

  return (
    <AuthCtx.Provider value={{ user, initialised, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
