import React from "react";
import './BarraCurso.scss';

 const BarraCurso = () => {
  return (
    <div className="barra-curso">
      <div className="curso-info">
        <span>Curso:</span>
        <strong>Bacharelado presencial</strong>
      </div>
      <div className="curso-nome">
        <span>Curso:</span>
        <strong>Desenvolvimento de Software Multiplataforma</strong>
      </div>
      <div className="semestre">
        <span>Semestre:</span>
        <strong>3/6</strong>
      </div>
    </div>
  );
 };

 export default BarraCurso;