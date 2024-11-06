import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import ProfessorLayout from "../pages/ProfessorLayout/ProfessorLayout"; 
import HomeProfessor from "../components/ProfessorComponents/HomeProfessor/HomeProfessor"; 
import AlunoNotas from "../components/AlunoComponents/AlunoNotas/AlunoNotas"; 
import AlunoLayout from "../pages/AlunoLayout/AlunoLayout"; 
import HomeAluno from "../components/AlunoComponents/HomeAluno/HomeAluno"; 
import HomeAdm from "../components/AdmComponentes/HomeAdm/HomeAdm";
import AdmLayout from "../pages/AdmLayout/AdmLayout";
import CadastroAlunoForm from "../components/AdmComponentes/CadastroAlunoForm/CadastroAlunoForm";
import CadastroProfessorForm from "../components/AdmComponentes/CadastroProfessorForm/CadastroProfessorForm";
import CadastroDisciplinaForm from "../components/AdmComponentes/CadastroDisciplinaForm/CadastroDisciplinaForm";
import CadastroCursoForm from "../components/AdmComponentes/CadastroCursoForm/CadastroCursoForm";
import PrivateRoute from "../pages/Login/PrivateRoute"; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Rota de Login */}

      {/* Rotas para Aluno */}
      <Route path="/aluno-home" element={<AlunoLayout />}>
        <Route element={<PrivateRoute requiredRole="aluno" />}>
          <Route index element={<HomeAluno />} /> {/* Home do Aluno */}
          <Route path="notas" element={<AlunoNotas />} /> {/* Rota para Notas do Aluno */}
        </Route>
      </Route>

      {/* Rotas para ADM */}
      <Route path="/adm-home" element={<AdmLayout />}>
        <Route element={<PrivateRoute requiredRole="administrador" />}>
          <Route index element={<HomeAdm />} /> {/* Home do ADM */}
          <Route path="pessoas/cadastrar-aluno" element={<CadastroAlunoForm />} />
          <Route path="pessoas/cadastrar-professor" element={<CadastroProfessorForm />} />
          <Route path="academico/cadastrar-curso" element={<CadastroCursoForm />} />
          <Route path="academico/cadastrar-disciplina" element={<CadastroDisciplinaForm />} />
        </Route>
      </Route>

      {/* Rotas para Professor */}
      <Route path="/professor-home" element={<ProfessorLayout />}>
        <Route element={<PrivateRoute requiredRole="professor" />}>
          <Route index element={<HomeProfessor />} /> {/* Home do Professor */}
          <Route path="teste" element={<AlunoNotas />} /> {/* Rota exemplo para Professor */}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
