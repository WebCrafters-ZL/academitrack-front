import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const EditarCursoForm = ({ handleClose }) => {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/api/v1/administrador/cursos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const cursoData = response.data;
        setNome(cursoData.nome);
        setCodigo(cursoData.codigo);
        setDescricao(cursoData.descricao);
        setCargaHoraria(cursoData.cargaHoraria);
        setCategoria(cursoData.categoria);
      } catch (error) {
        console.error("Erro ao buscar curso:", error);
        Store.addNotification({
          title: "Erro",
          message: "Erro ao buscar dados do curso.",
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

    fetchCurso();
  }, [id]);

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
      const response = await axios.put(
        `http://localhost:3000/api/v1/administrador/cursos/${id}`,
        cursoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Store.addNotification({
          title: "Sucesso!",
          message: "Curso atualizado com sucesso!",
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
      }
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);

      let errorMessage = "Erro ao atualizar o curso. Tente novamente.";
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Todos os campos obrigatórios devem ser preenchidos.";
        } else if (err.response.status === 401) {
          errorMessage = "Não autorizado. Verifique suas credenciais.";
        } else if (err.response.status === 500) {
          errorMessage =
            "Erro interno do servidor. Tente novamente mais tarde.";
        } else {
          errorMessage = `Erro inesperado: ${
            err.response.statusText || "Verifique os dados e tente novamente."
          }`;
        }
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
      }}
    >
      <h2 style={{ textAlign: "center" }}>Editar Curso</h2>

      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10000,
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

        <Form.Group controlId="formDescricaoCurso">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Digite a descrição do curso"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCargaHorariaCurso">
          <Form.Label>Carga Horária</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite a carga horária do curso"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(e.target.value)}
            required
            min="1"
            max="1600" 
          />
        </Form.Group>

        <Form.Group controlId="formCategoriaCurso">
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

export default EditarCursoForm;
