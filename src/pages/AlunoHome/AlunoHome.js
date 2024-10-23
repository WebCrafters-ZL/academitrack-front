import React from "react";
import BarraLateralAluno from "../../components/BarraLateralAluno/BarraLateralAluno";
import BarraSuperiorAluno from "../../components/BarraSuperiorAluno/BarraSuperiorAluno";
import HomeAluno from "../../components/HomeAluno/HomeAluno";

const AlunoHome = () => {
  return (
    <div className="AlunoHome">
      <BarraSuperiorAluno></BarraSuperiorAluno>
      <BarraLateralAluno></BarraLateralAluno>
      <HomeAluno></HomeAluno>
    </div>
  );
};

export default AlunoHome;
