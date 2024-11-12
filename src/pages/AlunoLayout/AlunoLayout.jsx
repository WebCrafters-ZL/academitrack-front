import React from "react";
import { Outlet, Navigate } from "react-router-dom"; // Importando Navigate para redirecionamento
import BarraSuperiorAluno from "../../components/AlunoComponents/BarraSuperiorAluno/BarraSuperiorAluno";
import BarraLateralAluno from "../../components/AlunoComponents/BarraLateralAluno/BarraLateralAluno";
import { useAuth } from '../Login/AuthContext';

const AlunoLayout = () => {
  const { isAuthenticated } = useAuth(); // Pegando o estado de autenticação

  // Se não estiver autenticado, redirecione para o login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="AlunoLayout">
      <BarraSuperiorAluno />
      <div>
        <BarraLateralAluno />
        <div>
          <Outlet /> {/* Onde o conteúdo dinâmico será renderizado */}
        </div>
      </div>
    </div>
  );
};

export default AlunoLayout;
