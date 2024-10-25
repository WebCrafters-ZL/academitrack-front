import React from "react";
import { Outlet } from "react-router-dom"; // Usando Outlet para rotas dinâmicas
import BarraLateralAdm from "../../components/BarraLateralAdm/BarraLateralAdm";
import BarraSuperiorAdm from "../../components/BarraSuperiorAdm/BarraSuperiorAdm";

const AdmLayout = () => {
  return (
    <div className="AdmLayout">
      <BarraSuperiorAdm />
      <div>
        <BarraLateralAdm/>
        <div>
          <Outlet /> {/* Onde o conteúdo dinâmico será renderizado */}
        </div>
      </div>
    </div>
  );
};

export default AdmLayout;
