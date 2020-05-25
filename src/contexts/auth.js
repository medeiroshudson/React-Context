import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storagedUser = localStorage.getItem('user');
      const storagedToken = localStorage.getItem('token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function Login(username, password) {
    api
      .get(`login?usuario=${username}&senha=${password}`)
      .then((response) => setUser(response.data.user))
      .then((response) => (api.defaults.headers.Authorization = `Bearer ${JSON.parse(response.data.token)}`))
      .then((response) => localStorage.setItem('user', JSON.stringify(response.data.user)))
      .then((response) => localStorage.setItem('token', response.data.token))
      .catch((error) => (error.status = 400 ? alert('server unreachable') : alert(error.data)));
  }

  async function Logout() {
    localStorage.clear();
    setUser(null);
  }

  if (loading) {
    return <h1>Loading data...</h1>;
  }

  return <AuthContext.Provider value={{ authenticated: !!user, user, Login, Logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
