import React from "react";
import Header from "../Header/Header";
import BarraLateral from "../BarraLateral/BarraLateral";
import './Layout.scss';
import { Outlet } from "react-router-dom";
import BarraCurso from "../BarraCurso/BarraCurso";

const Layout = () => {
  return (
    <div className="layout">
      <Header /> 
      <BarraCurso /> 
      <div className="layout-body">
        <BarraLateral /> 
        <div className="layout-content">
          <div className="content-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
