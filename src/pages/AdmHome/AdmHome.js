import React from "react";
import BarraLateralAdm from "../../components/BarraLateralAdm/BarraLateralAdm";
import HomeAdm from "../../components/HomeAdm/HomeAdm";
import BarraSuperiorAdm from "../../components/BarraSuperiorAdm/BarraSuperiorAdm";

const AdmHome = () => {
  return (
    <div className="AdmHome">
      <BarraSuperiorAdm> </BarraSuperiorAdm>
      <BarraLateralAdm></BarraLateralAdm>
      <HomeAdm></HomeAdm>
    </div>
  );
};


export default AdmHome;