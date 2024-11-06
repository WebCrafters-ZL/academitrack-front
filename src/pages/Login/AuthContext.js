// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Mudança de importação

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    // Decodificando o token
    const decodedToken = jwtDecode(token);
    setUserRole(decodedToken.tipoUsuario); // Aqui você obtém a roled
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
