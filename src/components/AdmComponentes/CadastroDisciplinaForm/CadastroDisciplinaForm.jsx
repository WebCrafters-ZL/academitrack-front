import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CadastroDisciplinaForm = ({ handleClose }) => {
  const [curso, setCurso] = useState("");
  const [materia, setMateria] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cursos, setCursos] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Efeito para buscar a lista de cursos
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/administrador/cursos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCursos(response.data); // Armazenar a lista de cursos
      } catch (err) {
        console.error("Erro ao buscar cursos:", err);
        setMessageType("error");
        setMessage("Erro ao carregar cursos. Tente novamente mais tarde.");
        toast.error("Erro ao carregar cursos. Tente novamente mais tarde."); // Notificação de erro
      }
    };

    fetchCursos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    const disciplinaData = {
      nome: materia,
      descricao,
      cargaHoraria,
      curso_id: curso,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/administrador/disciplinas",
        disciplinaData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      if (response.status === 201) {
        toast.success(response.data.message || "Disciplina cadastrada com sucesso!");
        if (typeof handleClose === "function") handleClose();

        // Resetar os campos do formulário
        setCurso("");
        setMateria("");
        setCargaHoraria("");
        setDescricao("");
      }
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
      setMessageType("error");

      if (err.response) {
        if (err.response.status === 400) {
          setMessage("Todos os campos obrigatórios devem ser preenchidos.");
        } else if (err.response.status === 401) {
          setMessage("Não autorizado. Verifique suas credenciais.");
        } else if (err.response.status === 404) {
          setMessage("Curso não encontrado.");
        } else if (err.response.status === 500) {
          setMessage("Erro interno do servidor. Tente novamente mais tarde.");
        } else {
          setMessage(`Erro inesperado: ${err.response.statusText || "Verifique os dados e tente novamente."}`);
        }
      } else if (err.request) {
        setMessage("Erro de conexão: Não foi possível conectar ao servidor. Verifique sua rede.");
      } else {
        setMessage(`Erro inesperado: ${err.message}`);
      }
      toast.error(message || "Erro ao cadastrar disciplina. Tente novamente.", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
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
        height: `calc(100vh - 75px)`,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflowY: "auto",
        border: "2px solid blue",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Cadastrar Disciplina</h2>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        theme="colored"
      />

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCurso">
          <Form.Label>Curso</Form.Label>
          <Form.Control
            as="select"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            required
          >
            <option value="">Selecione um curso</option>
            {cursos.map((curso, index) => (
              <option key={index} value={curso._id}>
                {curso.nome}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Row>
          <Col sm={8}>
            <Form.Group controlId="formMateria">
              <Form.Label>Disciplina</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome da disciplina"
                value={materia}
                onChange={(e) => setMateria(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col sm={4}>
            <Form.Group controlId="formCargaHoraria">
              <Form.Label>Carga Horária</Form.Label>
              <Form.Control
                type="number"
                placeholder="Horas"
                value={cargaHoraria}
                onChange={(e) => setCargaHoraria(e.target.value)}
                required
                min="1"
                max="60"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Digite a descrição da disciplina"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
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
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CadastroDisciplinaForm;
