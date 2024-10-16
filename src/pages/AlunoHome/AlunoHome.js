import React from "react";
import Header from "../../components/Header/Header";
import BarraLateral from "../../components/BarraLateral/BarraLateral";
import BarraCurso from "../../components/BarraCurso/BarraCurso";
import HomeAluno from "../../components/HomeAluno/HomeAluno";
import './AlunoHome.scss';

const AlunoHome = () => {
  return (
    <div className="AlunoHome">
      <Header></Header>
      <BarraCurso></BarraCurso>
      <BarraLateral></BarraLateral>
      <HomeAluno></HomeAluno>
    </div>
  );
};

export default AlunoHome;
