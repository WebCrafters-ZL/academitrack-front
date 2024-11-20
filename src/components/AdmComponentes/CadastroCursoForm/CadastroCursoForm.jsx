import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

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
        Store.addNotification({
          title: "Sucesso!",
          message: response.data.message || "Curso cadastrado com sucesso!",
          type: "success",
          insert: "bottom",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 4000,
            onScreen: true,
          },
        });

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

      let errorMessage = "Erro ao cadastrar curso. Tente novamente.";

      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Todos os campos obrigatórios devem ser preenchidos.";
        } else if (err.response.status === 401) {
          errorMessage = "Não autorizado. Verifique suas credenciais.";
        } else if (err.response.status === 500) {
          errorMessage = "Erro interno do servidor. Tente novamente mais tarde.";
        } else {
          errorMessage = `Erro inesperado: ${
            err.response.statusText || "Verifique os dados e tente novamente."
          }`;
        }
      } else if (err.request) {
        errorMessage = "Erro de conexão: Não foi possível conectar ao servidor. Verifique sua rede.";
      } else {
        errorMessage = `Erro inesperado: ${err.message}`;
      }

      Store.addNotification({
        title: "Erro",
        message: errorMessage,
        type: "danger",
        insert: "bottom",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true,
        },
      });
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
        position: "relative"
      }}
    >
      <h2 style={{ textAlign: "center" }}>Cadastro de Curso</h2>

      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10000
        }}
      >
        <ReactNotifications />
      </div>

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
            as={Link}
            to="/administrador/academico/gerenciar-curso"
            variant="danger"
            onClick={handleClose}
            style={{ marginRight: "20px" }}
          >
            Voltar
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
