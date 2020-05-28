import React, { createContext, useState, useEffect, useContext } from 'react';
import ContextDevTool from 'react-context-devtool';
import decode from 'jwt-decode';
import api from '../services/api';

import Loading from '../pages/loading';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storagedToken = localStorage.getItem('token');

      if (storagedToken) {
        const { unique_name: user, given_name: name, role } = decode(storagedToken);

        setAuthenticated(true);
        setUser({ user, name, role });
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function Login(username, password) {
    const { data } = await api.get(`login?usuario=${username}&senha=${password}`);
    const { unique_name: user, given_name: name, role } = decode(data.token);

    setAuthenticated(true);
    setUser({ user, name, role });
    api.defaults.headers['Authorization'] = `Bearer ${data.token}`;
    localStorage.setItem('token', data.token);
  }

  async function Logout() {
    localStorage.clear();
    setAuthenticated(false);
    setUser({});
  }

  while (loading) return <Loading />;

  return (
    <AuthContext.Provider value={{ authenticated, user, Login, Logout }}>
      <ContextDevTool context={AuthContext} id="auth" displayName="Authentication Context" />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
