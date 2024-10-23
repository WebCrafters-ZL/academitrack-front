import React from "react";
import BarraCurso from "../../components/BarraCurso/BarraCurso";
import HomeAluno from "../../components/HomeAluno/HomeAluno";
import "./AlunoHome.scss";
import BarraLateralAluno from "../../components/BarraLateralAluno/BarraLateralAluno";

const AlunoHome = () => {
  return (
    <div className="AlunoHome">
      <BarraCurso></BarraCurso>
      <BarraLateralAluno></BarraLateralAluno>
      <HomeAluno></HomeAluno>
    </div>
  );
};

export default AlunoHome;
