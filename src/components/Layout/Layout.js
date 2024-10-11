import React from "react";
import Header from "../Header/Header";
import BarraLateral from "../BarraLateral/BarraLateral";
import './Layout.scss';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <Header /> 
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
