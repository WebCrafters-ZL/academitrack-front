import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CadastroCursoForm = ({ handleClose }) => {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cursoData = {
      nome,
      codigo,
      descricao,
      cargaHoraria,
      categoria,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/administrador/cursos",
        cursoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message || "Curso cadastrado com sucesso!");

        if (typeof handleClose === "function") handleClose();

        // Limpar campos do formulário
        setNome("");
        setCodigo("");
        setDescricao("");
        setCargaHoraria("");
        setCategoria(""); 
      }
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
      if (err.response) {
        if (err.response.status === 400) {
          toast.error("Todos os campos obrigatórios devem ser preenchidos.");
        } else if (err.response.status === 401) {
          toast.error("Não autorizado. Verifique suas credenciais.");
        } else if (err.response.status === 500) {
          toast.error("Erro interno do servidor. Tente novamente mais tarde.");
        } else {
          toast.error(
            `Erro inesperado: ${
              err.response.statusText || "Verifique os dados e tente novamente."
            }`
          );
        }
      } else if (err.request) {
        toast.error("Erro de conexão: Não foi possível conectar ao servidor. Verifique sua rede.");
      } else {
        toast.error(`Erro inesperado: ${err.message}`);
      }
    }
  };
  return (
    <div
      style={{
        marginTop: "70px",
        marginLeft: "315px",
        padding: "20px",
        maxWidth: "calc(100% - 320px)",
        height: "calc(100vh - 75px)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflowY: "auto",
        border: "2px solid blue",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Cadastro de Curso</h2>

      <ToastContainer 
        position="bottom-center" 
        autoClose={5000} 
        hideProgressBar={false} 
        closeOnClick 
        type="default"
        theme="colored"
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNomeCurso">
          <Form.Label>Nome do Curso</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do curso"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>

        <Row>
          <Col sm={4}>
            <Form.Group controlId="formCodigoCurso">
              <Form.Label>Código do Curso</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o código do curso"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col sm={4}>
            <Form.Group controlId="formCategoriaCurso">
              <Form.Label>Categoria do Curso</Form.Label>
              <Form.Control
                as="select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="Bacharelado">Bacharelado</option>
                <option value="Tecnólogo">Tecnólogo</option>
                <option value="Licenciatura">Licenciatura</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col sm={4}>
            <Form.Group controlId="formCargaHorariaCurso">
              <Form.Label>Carga Horária do Curso</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite a carga horária do curso"
                value={cargaHoraria}
                onChange={(e) => setCargaHoraria(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formDescricaoCurso">
          <Form.Label>Descrição do Curso</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Digite a descrição do curso"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </Form.Group>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button
            variant="danger"
            onClick={() => handleClose && handleClose()}
            style={{ marginRight: "20px" }}
          >
            Fechar
          </Button>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CadastroCursoForm;
