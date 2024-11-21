import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";  
import Login from "../pages/Login/Login"; 
import ProfessorLayout from "../pages/ProfessorLayout/ProfessorLayout"; 
import HomeProfessor from "../components/ProfessorComponents/HomeProfessor/HomeProfessor"; 
import AlunoNotas from "../components/AlunoComponents/AlunoNotas/AlunoNotas"; 
import AlunoLayout from "../pages/AlunoLayout/AlunoLayout"; 
import HomeAluno from "../components/AlunoComponents/HomeAluno/HomeAluno"; 
import HomeAdm from "../components/AdmComponentes/HomeAdm/HomeAdm";
import AdmLayout from "../pages/AdmLayout/AdmLayout";
import CadastroAlunoForm from "../components/AdmComponentes/CadastroAlunoForm/CadastroAlunoForm";
import EditarAluno from '../components/AdmComponentes/EditarAlunoForm/EditarAlunoForm';
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
import EditarProfessor from "../components/AdmComponentes/EditarProfessorForm/EditarProfessorForm";
import GerenciarCurso from "../components/AdmComponentes/GerenciarCurso/GerenciarCurso";
import GerenciarDisciplina from "../components/AdmComponentes/GerenciarDisciplina/GerenciarDisciplina";
import EditarCursoForm from "../components/AdmComponentes/EditarCursoForm/EditarCursoForm";
import FeedbackSuporte from "../components/AdmComponentes/FeedbackSuporteAdm/FeedbackSuporteAdm"; 
import FeedbackSuporteAluno from "../components/AlunoComponents/FeedbackSuporteAluno/FeedbackSuporteAluno"; // Importando FeedbackSuporteAluno
import EditarDisciplinaForm from "../components/AdmComponentes/EditarDisciplinaForm/EditarDisciplinaForm";
import FeedbackSuporteProfessor from "../components/ProfessorComponents/FeedbackSuporteProfessor/FeedbackSuporteProfessor"; 


const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota da HomePage */}
      <Route path="/" element={<HomePage />} />  {/* Rota da HomePage */}

      {/* Rota de Login */}
      <Route path="/login" element={<Login />} /> {/* Rota de Login */}

      {/* Rotas para Aluno */}
      <Route path="/aluno" element={<AlunoLayout />}>
        <Route element={<PrivateRoute requiredRole="aluno" />}>
          <Route index element={<HomeAluno />} /> {/* Home do Aluno */}
          <Route path="notas" element={<AlunoNotas />} />
          <Route path="faqaluno" element={<FaqAluno />} />
          <Route path="perfilaluno" element={<PerfilAluno />} />
          <Route path="feedback-suporte" element={<FeedbackSuporteAluno />} /> {/* Nova rota para Feedback e Suporte do Aluno */}
        </Route>
      </Route>

      {/* Rotas para ADM */}
      <Route path="/administrador" element={<AdmLayout />}>
        <Route element={<PrivateRoute requiredRole="administrador" />}>
          <Route index element={<HomeAdm />} /> {/* Home do ADM */}
          <Route path="pessoas/gerenciar-aluno" element={<GerenciarAluno />} />
          <Route path="pessoas/gerenciar-aluno/cadastro-aluno" element={<CadastroAlunoForm />} />
          <Route path="pessoas/gerenciar-aluno/editar/:id" element={<EditarAluno />} />
          <Route path="pessoas/gerenciar-professor" element={<GerenciarProfessor />} />
          <Route path="pessoas/gerenciar-professor/cadastro-professor" element={<CadastroProfessorForm />} />
          <Route path="pessoas/gerenciar-professor/editar/:id" element={<EditarProfessor />} />
          <Route path="academico/gerenciar-curso" element={<GerenciarCurso />} />
          <Route path="academico/gerenciar-curso/cadastrar-curso" element={<CadastroCursoForm />} />
          <Route path="academico/gerenciar-curso/editar-curso/:id" element={<EditarCursoForm />} />
          <Route path="academico/gerenciar-disciplina" element={<GerenciarDisciplina />} />
          <Route path="academico/gerenciar-disciplina/cadastrar-disciplina" element={<CadastroDisciplinaForm />} />
          <Route path="academico/gerenciar-disciplina/editar/:id" element={<EditarDisciplinaForm />} />
          <Route path="academico/gerenciar-turma" element={<GerenciarTurma />} />
          <Route path="academico/gerenciar-turma/cadastro-turma" element={<CadastroTurmaForm />} />
          <Route path="faqadm" element={<FAQAdm />} />
          <Route path="perfiladm" element={<PerfilAdm />} />
          <Route path="ajuda" element={<FeedbackSuporte />} /> 
        </Route>
      </Route>

      {/* Rotas para Professor */}
      <Route path="/professor" element={<ProfessorLayout />}>
        <Route element={<PrivateRoute requiredRole="professor" />}>
          <Route index element={<HomeProfessor />} /> {/* Home do Professor */}
          <Route path="teste" element={<AlunoNotas />} />
          <Route path="faqprofessor" element={<FaqProfessor />} />
          <Route path="perfilprofessor" element={<PerfilProfessor />} />
          <Route path="ajuda" element={<FeedbackSuporteProfessor />} /> {/* Nova rota para Feedback e Suporte */}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
