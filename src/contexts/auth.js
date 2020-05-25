import React, { createContext, useState, useEffect, useContext } from 'react';
import ContextDevTool from 'react-context-devtool';
import decode from 'jwt-decode';
import api from '../services/api';

import Loading from '../pages/Loading';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [expiredToken, setExpiredToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storagedToken = localStorage.getItem('token');

      if (storagedToken) {
        const decodedToken = decode(storagedToken);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        // if token expiry date is lower than actual date
        if (decodedToken.exp <= Math.floor(new Date() / 1000)) setExpiredToken(true);

        setAuthenticated(true);
        setToken(decodedToken);
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function Login(username, password) {
    const { data } = await api.get(`login?usuario=${username}&senha=${password}`);
    const decodedToken = decode(data.token);

    setAuthenticated(true);
    setToken(decodedToken);
    api.defaults.headers['Authorization'] = `Bearer ${data.token}`;
    localStorage.setItem('token', data.token);
  }

  async function refreshToken() {
    console.log('token refreshed');
  }

  async function Logout() {
    localStorage.clear();
    setAuthenticated(false);
    setToken('');
  }

  while (loading) return <Loading />;

  if (expiredToken) {
    refreshToken();
    setExpiredToken(false);
  }

  return (
    <AuthContext.Provider value={{ authenticated, token, expiredToken, Login, Logout }}>
      <ContextDevTool context={AuthContext} id="auth" displayName="Authentication Context" />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
