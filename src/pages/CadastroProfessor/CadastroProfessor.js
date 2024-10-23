import React from "react";
import BarraLateralAdm from "../../components/BarraLateralAdm/BarraLateralAdm";
import BarraSuperiorAdm from "../../components/BarraSuperiorAdm/BarraSuperiorAdm";
import CadastroProfessorForm from "../../components/CadastroProfessorForm.js/CadastroProfessorForm";


const CadastroProfessor = () => {
  return (
    <div className="CadastroProfessor">
      <BarraSuperiorAdm> </BarraSuperiorAdm>
      <BarraLateralAdm></BarraLateralAdm>
      <CadastroProfessorForm></CadastroProfessorForm>
    </div>
  );
};

export default CadastroProfessor;