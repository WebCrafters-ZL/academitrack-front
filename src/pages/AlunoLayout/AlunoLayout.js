import React from "react";
import { Outlet } from "react-router-dom"; // Usando Outlet para rotas dinâmicas
import BarraSuperiorAluno from "../../components/AlunoComponents/BarraSuperiorAluno/BarraSuperiorAluno";
import BarraLateralAluno from "../../components/AlunoComponents/BarraLateralAluno/BarraLateralAluno";

const AlunoLayout = () => {
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
