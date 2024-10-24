import React from "react";
import BarraLateralAdm from "../../components/BarraLateralAdm/BarraLateralAdm";
import BarraSuperiorAdm from "../../components/BarraSuperiorAdm/BarraSuperiorAdm";
import CadastroCursoForm from "../../components/CadastroCursoForm/CadastroCursoForm";


const CadastroCurso = () => {
  return (
    <div className="CadastroProfessor">
      <BarraSuperiorAdm> </BarraSuperiorAdm>
      <BarraLateralAdm></BarraLateralAdm>
      <CadastroCursoForm></CadastroCursoForm>
    </div>
  );
};

export default CadastroCurso;