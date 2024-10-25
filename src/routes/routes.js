import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import ProfessorLayout from "../pages/ProfessorLayout/ProfessorLayout"; 
import HomeProfessor from "../components/HomeProfessor/HomeProfessor"; 
import AlunoNotas from "../components/AlunoNotas/AlunoNotas"; 
import AlunoLayout from "../pages/AlunoLayout/AlunoLayout"; 
import HomeAluno from "../components/HomeAluno/HomeAluno"; 
import HomeAdm from "../components/HomeAdm/HomeAdm";
import AdmLayout from "../pages/AdmLayout/AdmLayout";
import CadastroAlunoForm from "../components/CadastroAlunoForm/CadastroAlunoForm";
import CadastroProfessorForm from "../components/CadastroProfessorForm.js/CadastroProfessorForm";
import CadastroDisciplinaForm from "../components/CadastroDisciplinaForm/CadastroDisciplinaForm";
import CadastroCursoForm from "../components/CadastroCursoForm/CadastroCursoForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Rotas para Aluno */}
      <Route path="/aluno-home" element={<AlunoLayout />}>
        <Route index element={<HomeAluno />} /> {/* Componente padrão para o aluno */}
        <Route path="notas" element={<AlunoNotas />} /> {/* Rota para Notas do Aluno */}
      </Route>

      {/* Rotas para ADM */}
      <Route path="/adm-home" element={<AdmLayout />}>
        <Route index element={<HomeAdm />} /> {/* Home do ADM */}
        <Route path="pessoas/cadastrar-aluno" element={<CadastroAlunoForm />} />
        <Route path="pessoas/cadastrar-professor" element={<CadastroProfessorForm />} />
        <Route path="academico/cadastrar-curso" element={<CadastroCursoForm />} />
        <Route path="academico/cadastrar-disciplina" element={<CadastroDisciplinaForm />} />

        {/* Outras rotas específicas do ADM */}
      </Route>

      {/* Rotas para Professor */}
      <Route path="/professor-home" element={<ProfessorLayout />}>
        <Route index element={<HomeProfessor />} /> {/* Componente padrão para o professor */}
        <Route path="teste" element={<AlunoNotas />} /> {/* Rota para AlunoNotas */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
