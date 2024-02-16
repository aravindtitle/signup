// AuthContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory hook for redirecting

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const history = useHistory(); // Get history object for redirection

  useEffect(() => {
    sessionStorage.setItem("token", token);
  }, [token]);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
    history.push("/auth"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
