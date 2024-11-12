import React from "react";
import { Outlet, Navigate } from "react-router-dom"; // Importando Navigate para redirecionamento
import BarraSuperiorProfessor from "../../components/ProfessorComponents/BarraSuperiorProfessor/BarraSuperiorProfessor";
import BarraLateralProfessor from "../../components/ProfessorComponents/BarraLateralProfessor/BarraLateralProfessor";
import { useAuth } from '../Login/AuthContext';

const ProfessorLayout = () => {
  const { isAuthenticated } = useAuth(); // Pegando o estado de autenticação

  // Se não estiver autenticado, redirecione para o login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="ProfessorLayout">
      <BarraSuperiorProfessor />
      <div>
        <BarraLateralProfessor />
        <div>
          <Outlet /> {/* Onde o conteúdo dinâmico será renderizado */}
        </div>
      </div>
    </div>
  );
};

export default ProfessorLayout;
