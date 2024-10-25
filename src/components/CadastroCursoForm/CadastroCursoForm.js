import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const CadastroCursoForm = ({ handleClose }) => {
  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cursoData = {
      nome: nome,          
      descricao: descricao,  
      cargaHoraria: Number(cargaHoraria), 
      categoria: categoria,  
    };

    try {
      // Obter o token do localStorage
      const token = localStorage.getItem("token");
  
      // Enviar os dados ao back-end
      const response = await axios.post("http://localhost:3000/api/v1/administrador/cursos", cursoData, {
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token na header da requisição
        },
      });
  
      console.log("Curso cadastrado com sucesso:", response.data);
      handleClose(); // Fecha o formulário após o sucesso
    } catch (error) {
      console.error("Erro ao cadastrar curso:", error);
      // Aqui você pode adicionar lógica para exibir mensagens de erro ao usuário
    }
  };

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
      <h2 style={{ textAlign: "center" }}>Cadastrar Curso</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCurso">
          <Form.Label>Curso</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do Curso"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCargaHoraria">
          <Form.Label>Carga Horária</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite a carga horária em horas"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(e.target.value)}
            required
            min="1"
            max="2000"
          />
        </Form.Group>

        <Form.Group controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea" 
            placeholder="Digite a descrição do curso"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategoria">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a categoria do curso"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </Form.Group>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button
            variant="danger"
            onClick={handleClose}
            style={{ marginRight: "20px" }}
          >
            Fechar
          </Button>
          <Button
            variant="primary"
            type="submit" // Garantir que o botão "Salvar" submit o formulário
          >
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CadastroCursoForm;
