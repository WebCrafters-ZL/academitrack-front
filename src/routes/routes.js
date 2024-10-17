import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import AlunoHome from "../pages/AlunoHome/AlunoHome"; 
import AdmHome from "../pages/AdmHome/AdmHome";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/aluno-home" element={<AlunoHome />}>
      </Route>
      <Route path="/admhome" element={<AdmHome />} />
    </Routes>
  );
};

export default AppRoutes;
