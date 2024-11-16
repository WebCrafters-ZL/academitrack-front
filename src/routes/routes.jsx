import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";  // Adicionando a HomePage
import Login from "../pages/Login/Login"; 
import ProfessorLayout from "../pages/ProfessorLayout/ProfessorLayout"; 
import HomeProfessor from "../components/ProfessorComponents/HomeProfessor/HomeProfessor"; 
import AlunoNotas from "../components/AlunoComponents/AlunoNotas/AlunoNotas"; 
import AlunoLayout from "../pages/AlunoLayout/AlunoLayout"; 
import HomeAluno from "../components/AlunoComponents/HomeAluno/HomeAluno"; 
import HomeAdm from "../components/AdmComponentes/HomeAdm/HomeAdm";
import AdmLayout from "../pages/AdmLayout/AdmLayout";
import CadastroAlunoForm from "../components/AdmComponentes/CadastroAlunoForm/CadastroAlunoForm";
import EditarAluno from '../components/AdmComponentes/EditarAluno/EditarAluno';
import CadastroProfessorForm from "../components/AdmComponentes/CadastroProfessorForm/CadastroProfessorForm";
import CadastroDisciplinaForm from "../components/AdmComponentes/CadastroDisciplinaForm/CadastroDisciplinaForm";
import CadastroCursoForm from "../components/AdmComponentes/CadastroCursoForm/CadastroCursoForm";
import PrivateRoute from "../pages/Login/PrivateRoute"; 
import FAQAdm from "../components/AdmComponentes/FaqAdm/FaqAdm";
import PerfilAdm from "../components/AdmComponentes/PerfilAdm/PerfilAdm";
import GerenciarAluno from "../components/AdmComponentes/GerenciarAluno/GerenciarAluno";
import FaqAluno from "../components/AlunoComponents/FaqAluno/FaqAluno";
import GerenciarProfessor from "../components/AdmComponentes/GerenciarProfessor/GerenciarProfessor";
import FaqProfessor from "../components/ProfessorComponents/FaqProfessor/FaqProfessor";
import PerfilProfessor from "../components/ProfessorComponents/PerfilProfessor/PerfilProfessor";
import GerenciarTurma from "../components/AdmComponentes/GerenciarTurma/GerenciarTurma";

import PerfilAluno from "../components/AlunoComponents/PerfilAluno/PerfilAluno";
import CadastroTurmaForm from "../components/AdmComponentes/CadastroTurmaForm/CadastroTurmaForm";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota da HomePage */}
      <Route path="/" element={<HomePage />} />  {/* Rota da HomePage */}

      {/* Rota de Login */}
      <Route path="/login" element={<Login />} /> {/* Rota de Login */}

      {/* Rotas para Aluno */}
      <Route path="/aluno-home" element={<AlunoLayout />}>
        <Route element={<PrivateRoute requiredRole="aluno" />}>
          <Route index element={<HomeAluno />} /> {/* Home do Aluno */}
          <Route path="notas" element={<AlunoNotas />} /> 
          <Route path="faqaluno" element={<FaqAluno/>} />
          <Route path="perfilaluno" element={<PerfilAluno/>} /> 
        </Route>
      </Route>

      {/* Rotas para ADM */}
      <Route path="/adm-home" element={<AdmLayout />}>
        <Route element={<PrivateRoute requiredRole="administrador" />}>
          <Route index element={<HomeAdm />} /> {/* Home do ADM */}
          <Route path="pessoas/gerenciar-aluno" element={<GerenciarAluno />} />
          <Route path="pessoas/gerenciar-aluno/cadastro-aluno" element={<CadastroAlunoForm />} />
          <Route path="pessoas/gerenciar-aluno/editar/:id" element={<EditarAluno />} /> 
          <Route path="pessoas/gerenciar-professor" element={<GerenciarProfessor />} />
          <Route path="pessoas/gerenciar-professor/cadastro-professor" element={<CadastroProfessorForm />} />
          <Route path="academico/cadastrar-curso" element={<CadastroCursoForm />} />
          <Route path="academico/cadastrar-disciplina" element={<CadastroDisciplinaForm />} />
          <Route path="academico/gerenciar-turma" element={<GerenciarTurma /> } />
          <Route path="academico/gerenciar-turma/cadastro-turma" element={<CadastroTurmaForm /> } />
          <Route path="faqadm" element={<FAQAdm/>} />
          <Route path="perfiladm" element={<PerfilAdm/>} />
        </Route>
      </Route>

      {/* Rotas para Professor */}
      <Route path="/professor-home" element={<ProfessorLayout />}>
        <Route element={<PrivateRoute requiredRole="professor" />}>
          <Route index element={<HomeProfessor />} /> {/* Home do Professor */}
          <Route path="teste" element={<AlunoNotas />} /> 
          <Route path="faqprofessor" element={<FaqProfessor/>} />
          <Route path="perfilprofessor" element={<PerfilProfessor/>} /> 
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
