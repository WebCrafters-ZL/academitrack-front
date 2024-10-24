import React from "react";
import BarraLateralAdm from "../../components/BarraLateralAdm/BarraLateralAdm";
import BarraSuperiorAdm from "../../components/BarraSuperiorAdm/BarraSuperiorAdm";
import CadastroDisciplinaForm from "../../components/CadastroDisciplinaForm/CadastroDisciplinaForm";


const CadastroDisciplina = () => {
  return (
    <div className="CadastroProfessor">
      <BarraSuperiorAdm> </BarraSuperiorAdm>
      <BarraLateralAdm></BarraLateralAdm>
      <CadastroDisciplinaForm></CadastroDisciplinaForm>
    </div>
  );
};

export default CadastroDisciplina;