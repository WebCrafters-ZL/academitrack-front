import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import AlunoHome from "../pages/AlunoHome";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/aluno-home" element={ <AlunoHome />} />
    </Routes>
  );
};

export default AppRoutes;