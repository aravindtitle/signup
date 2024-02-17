import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    if (token) {
      const timer = setTimeout(logout, 5 * 60 * 1000); // 5 minutes in milliseconds
      setLogoutTimer(timer);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token]);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    clearTimeout(logoutTimer);
  };

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    const timer = setTimeout(logout, 5 * 60 * 1000); // 5 minutes in milliseconds
    setLogoutTimer(timer);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, resetLogoutTimer }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
