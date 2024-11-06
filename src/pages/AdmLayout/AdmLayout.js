import React from "react";
import { Outlet, Navigate } from "react-router-dom"; // Importando Navigate para redirecionamento
import BarraLateralAdm from "../../components/AdmComponentes/BarraLateralAdm/BarraLateralAdm";
import BarraSuperiorAdm from "../../components/AdmComponentes/BarraSuperiorAdm/BarraSuperiorAdm";
import { useAuth } from '../Login/AuthContext';

const AdmLayout = () => {
  const { isAuthenticated } = useAuth(); // Pegando o estado de autenticação

  // Se não estiver autenticado, redirecione para o login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="AdmLayout">
      <BarraSuperiorAdm />
      <div>
        <BarraLateralAdm />
        <div>
          <Outlet /> {/* Onde o conteúdo dinâmico será renderizado */}
        </div>
      </div>
    </div>
  );
};

export default AdmLayout;
