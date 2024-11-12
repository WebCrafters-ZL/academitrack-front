import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';

const PrivateRoute = ({ requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth();

  // Verifica a autenticação e a role do usuário
  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redireciona para a página de login se não estiver autenticado
  }
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />; // Redireciona se não tiver a permissão correta
  }
  return <Outlet />; // Renderiza as rotas filhas se autenticado e autorizado
};

export default PrivateRoute;
