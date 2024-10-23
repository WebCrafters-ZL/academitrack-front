import React from "react";
import BarraSuperiorProfessor from "../../components/BarraSuperiorProfessor/BarraSuperiorProfessor";
import BarraLateralProfessor from "../../components/BarraLateralProfessor/BarraLateralProfessor";
import HomeProfessor from "../../components/HomeProfessor/HomeProfessor";

const ProfessorHome = () => {
  return (
    <div className="ProfessorHome">
      <BarraSuperiorProfessor> </BarraSuperiorProfessor>
      <BarraLateralProfessor></BarraLateralProfessor>
       <HomeProfessor></HomeProfessor> 
    </div>
  );
};

export default ProfessorHome;