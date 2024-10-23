import React from "react";
import BarraLateralAdm from "../../components/BarraLateralAdm/BarraLateralAdm";
import BarraSuperiorAdm from "../../components/BarraSuperiorAdm/BarraSuperiorAdm";
import CadastroAlunoForm from "../../components/CadastroAlunoForm/CadastroAlunoForm";

const CadastroAluno = () => {
  return (
    <div className="CadastroAluno">
      <BarraSuperiorAdm> </BarraSuperiorAdm>
      <BarraLateralAdm></BarraLateralAdm>
      <CadastroAlunoForm></CadastroAlunoForm>
    </div>
  );
};

export default CadastroAluno;