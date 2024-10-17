import React from "react";
import HeaderTeste from "../../components/HeaderTeste/HeaderTeste";
import BarraLateralAdm from "../../components/BarraLateralAdm/BarraLateralAdm";
import BarraProfessor from "../../components/BarraProfessor/BarraProfessor";
import HomeAdm from "../../components/HomeAdm/HomeAdm";

const AdmHome = () => {
  return (
    <div className="AdmHome">
      <HeaderTeste></HeaderTeste>
      <BarraProfessor> </BarraProfessor>
      <BarraLateralAdm></BarraLateralAdm>
      <HomeAdm></HomeAdm>
    </div>
  );
};


export default AdmHome;