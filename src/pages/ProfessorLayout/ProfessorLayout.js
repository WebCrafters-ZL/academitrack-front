import React from "react";
import { Outlet } from "react-router-dom"; // Usando Outlet para rotas dinâmicas
import BarraSuperiorProfessor from "../../components/BarraSuperiorProfessor/BarraSuperiorProfessor";
import BarraLateralProfessor from "../../components/BarraLateralProfessor/BarraLateralProfessor";

const ProfessorLayout = () => {
  return (
    <div className="ProfessorLayout">
      <BarraSuperiorProfessor />
      <div >
        <BarraLateralProfessor />
        <div>
          <Outlet /> {/* Onde o conteúdo dinâmico será renderizado */}
        </div>
      </div>
    </div>
  );
};

export default ProfessorLayout;
