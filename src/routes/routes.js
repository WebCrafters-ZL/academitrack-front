import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import AlunoHome from "../pages/AlunoHome/AlunoHome"; 
import AdmHome from "../pages/AdmHome/AdmHome"; 
import CadastroAluno from "../pages/CadastroAluno/CadastroAluno"; 
import CadastroProfessor from "../pages/CadastroProfessor/CadastroProfessor";
import ProfessorHome from "../pages/ProfessorHome/ProfessorHome";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/aluno-home" element={<AlunoHome />} />
      <Route path="/admhome" element={<AdmHome />} />
      <Route path="/adm/pessoas/cadastrar-aluno" element={<CadastroAluno />} />
      <Route path="/adm/pessoas/cadastrar-professor" element={<CadastroProfessor/>} />
      <Route path="/professor-home" element={<ProfessorHome />} />
    </Routes>
  );
};

export default AppRoutes;
