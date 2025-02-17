import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookieUser = Cookies.get('user');
    if (cookieUser) {
      try {
        setUser(JSON.parse(cookieUser));
      } catch (e) {
        console.error('Failed to parse user cookie:', e);
        Cookies.remove('user');
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 1 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
