import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

const GerenciarAluno = ({ handleClose }) => {
  // Estado para armazenar os alunos
  const [alunos, setAlunos] = useState([]);
 
  // Carregar dados de alunos do back-end
  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/administrador/alunos");
        setAlunos(response.data); // Presumindo que a resposta contém a lista de alunos
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        // Aqui você pode adicionar lógica para exibir mensagens de erro ao usuário
      }
    };

    fetchAlunos(); // Chama a função para buscar os dados quando o componente é montado
  }, []);
  
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

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Matrícula</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.matricula}>
              <td>{aluno.nomeCompleto}</td>
              <td>{aluno.email}</td>
              <td>{aluno.cpf}</td>
              <td>{new Date(aluno.dataNascimento).toLocaleDateString()}</td>
              <td>{aluno.telefone}</td>
              <td>{aluno.endereco}</td>
              <td>{aluno.matricula}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button variant="danger" onClick={handleClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
};

export default GerenciarAluno;
