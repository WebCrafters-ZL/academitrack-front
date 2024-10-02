import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import AlunoHome from "../pages/AlunoHome/AlunoHome";
import Layout from "../components/Layout/Layout"; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} /> 
      <Route element={<Layout />}> 
        <Route path="/aluno-home" element={<AlunoHome />} /> 
      </Route>
    </Routes>
  );
};

export default AppRoutes;