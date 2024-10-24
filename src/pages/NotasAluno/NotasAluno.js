import React from "react";
import BarraLateralAluno from "../../components/BarraLateralAluno/BarraLateralAluno";
import BarraSuperiorAluno from "../../components/BarraSuperiorAluno/BarraSuperiorAluno";
import AlunoNotas from "../../components/AlunoNotas/AlunoNotas";


const NotasAluno = () => {
  return (
    <div className="AlunoHome">
      <BarraSuperiorAluno></BarraSuperiorAluno>
      <BarraLateralAluno></BarraLateralAluno>
      <AlunoNotas></AlunoNotas>
    </div>
  );
};

export default NotasAluno;
