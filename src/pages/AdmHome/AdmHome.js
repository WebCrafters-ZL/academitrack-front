import React from "react";
import BarraLateralAdm from "../../components/BarraLateralAdm/BarraLateralAdm";
import HomeAdm from "../../components/HomeAdm/HomeAdm";
import BarraSuperiorAdm from "../../components/BarraSuperiorAdm/BarraSuperiorAdm";
import HomeAdmTeste from "../../components/HomeAdmTeste/HomeAdmTeste";

const AdmHome = () => {
  return (
    <div className="AdmHome">
      <BarraSuperiorAdm> </BarraSuperiorAdm>
      <BarraLateralAdm></BarraLateralAdm>
      <HomeAdmTeste></HomeAdmTeste>
      {/* <HomeAdm></HomeAdm> */}
    </div>
  );
};


export default AdmHome;