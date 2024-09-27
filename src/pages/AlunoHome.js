import React from "react";
import BarraLateral from "../components/BarraLateral";
import '../styles/AlunoHome.scss';


const AlunoHome = () => {
  return (
  <div className="pagina-aluno">
    <BarraLateral />
    <div className="conteudo-aluno">
      <h1> Bem vindo a pagina Home de Aluno, Nelson!</h1>
      <p>Aqui ficara as informações principais do Aluno Nelson</p>
    </div>
  </div>    
  );
};

export default AlunoHome;