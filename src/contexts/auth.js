import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storagedUser = localStorage.getItem("user");
      const storagedToken = localStorage.getItem("token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;
        setLoading(false);
      }
    }

    loadStorage();
  }, []);

  async function Login(username, password) {
    const { data } = await api.get(
      `login?usuario=${username}&senha=${password}`
    );

    setUser(data.user);
    api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  }

  async function Logout() {
    localStorage.clear();
    setUser(null);
  }

  if (loading) {
    return <h1>Loading data...</h1>;
  }

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
