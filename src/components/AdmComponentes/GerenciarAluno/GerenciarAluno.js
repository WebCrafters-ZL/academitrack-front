import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css"; // Importando tema do Grid.js

const GerenciarAluno = ({ handleClose }) => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/administrador/alunos");
        setAlunos(response.data); // Presumindo que a resposta contém a lista de alunos
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    fetchAlunos(); // Chama a função para buscar os dados quando o componente é montado
  }, []);

  const data = alunos.map((aluno) => [
    aluno.nomeCompleto,
    aluno.email,
    aluno.cpf,
    aluno.situacaoMatricula,
    aluno.matricula,
    `<button style="color: blue; background: none; border: none; cursor: pointer;">Ver mais</button>
     <button style="background: none; border: none; cursor: pointer;">✏️</button>
     <button style="background: none; border: none; cursor: pointer;">🗑️</button>`,
  ]);

  return (
    <div
      style={{
        marginTop: "70px",
        marginLeft: "315px",
        padding: "20px",
        maxWidth: "calc(100% - 320px)",
        height: `calc(100vh - 75px)`,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflowY: "auto",
        border: "2px solid blue",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Gerenciar Alunos</h2>

      <Grid
        data={data}
        columns={['Nome', 'Email', 'CPF', 'Situação', 'Matrícula', 'Ação']}
        sort={true} 
        search={{
          placeholder: '🔍 Procurar...' 
        }}
        pagination={{
          limit: 5,
        }}
        language={{
          search: {
            placeholder: '🔍 Procurar...'
          },
          pagination: {
            previous: 'Anterior',
            next: 'Proxima',
            results: () => 'Registros',
          }
        }}
        style={{
          table: {},
          th: {
            backgroundColor: "#f8f9fa",
          },
        }}
      />

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button
          variant="primary"
          as={Link}
          to="/adm-home/pessoas/gerenciar-aluno/cadastro-aluno"
          onClick={handleClose}
        >
          Adicionar Aluno
        </Button>
      </div>
    </div>
  );
};

export default GerenciarAluno;
