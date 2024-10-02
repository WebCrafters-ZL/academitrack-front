import React from "react";
import Header from "../Header/Header";
import BarraLateral from "../BarraLateral/BarraLateral";
import './Layout.scss';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header /> 
      <div className="layout-body">
        <BarraLateral /> 
        <div className="layout-content">
          {children} 
        </div>
      </div>
    </div>
  );
};

export default Layout;
