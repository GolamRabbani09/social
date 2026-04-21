import React, { createContext, useState, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [loading, setLoading] = useState(false);

  const login = useCallback((userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("access_token", token);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    setUser,
    setLoading,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
