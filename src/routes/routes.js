import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import AlunoHome from "../pages/AlunoHome/AlunoHome"; // Corrigido o caminho do AlunoHome

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/aluno-home" element={<AlunoHome />}>
        {/* <Route path="outra-rota" element={<OutraComponente />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
