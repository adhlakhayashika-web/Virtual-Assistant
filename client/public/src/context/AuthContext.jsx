import React, { createContext, useState } from 'react';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('virtuo_user');
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('virtuo_token'));

  function login(u, t) {
    setUser(u); setToken(t);
    localStorage.setItem('virtuo_user', JSON.stringify(u));
    localStorage.setItem('virtuo_token', t);
  }
  function logout() {
    setUser(null); setToken(null);
    localStorage.removeItem('virtuo_user');
    localStorage.removeItem('virtuo_token');
  }
  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}
