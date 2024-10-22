import React from "react";
import BarraLateralAdm from "../../components/BarraLateralAdm/BarraLateralAdm";
import BarraProfessor from "../../components/BarraProfessor/BarraProfessor";
import HomeAdm from "../../components/HomeAdm/HomeAdm";

const AdmHome = () => {
  return (
    <div className="AdmHome">
      <BarraProfessor> </BarraProfessor>
      <BarraLateralAdm></BarraLateralAdm>
      <HomeAdm></HomeAdm>
    </div>
  );
};


export default AdmHome;