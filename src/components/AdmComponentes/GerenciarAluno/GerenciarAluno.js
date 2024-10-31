import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid } from "gridjs-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "gridjs/dist/theme/mermaid.css"; 

const GerenciarAluno = ({ handleClose }) => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => { 
    const fetchAlunos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/v1/administrador/alunos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
      });
        setAlunos(response.data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    fetchAlunos();
  }, []);

  const data = alunos.map((aluno) => [
    aluno.nomeCompleto,
    aluno.email,
    aluno.cpf,
    aluno.status.charAt(0).toUpperCase() + aluno.status.slice(1), 
    aluno.matricula,
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
          previous: () => (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faChevronLeft} /> Anterior
            </span>
          ),
          next: () => (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              Próximo <FontAwesomeIcon icon={faChevronRight} />
            </span>
          )
        }}
        language={{
          search: {
            placeholder: '🔍 Procurar...'
          },
          pagination: {
            previous: 'Anterior',
            next: 'Próximo',
            showing: (from, to, total) => `Exibindo ${from} a ${to} de ${total}`,
            results: () => 'Registros'
          },
          noRecords: "Nenhum registro encontrado",
        }}
        style={{
          table: {},
          th: {
            backgroundColor: "#f8f9fa",
          },
        }}
      />

      <div style={{ textAlign: "right", marginTop: "0px" }}>
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
