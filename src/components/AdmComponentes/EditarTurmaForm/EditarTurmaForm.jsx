import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const EditarTurmaForm = ({ handleClose }) => {
  const { id } = useParams();
  const [disciplina, setDisciplina] = useState("");
  const [professor, setProfessor] = useState("");
  const [ano, setAno] = useState(new Date().getFullYear());
  const [semestre, setSemestre] = useState(1);
  const [alunosAssociados, setAlunosAssociados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddAlunosModal, setShowAddAlunosModal] = useState(false);
  const [todosAlunos, setTodosAlunos] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchTurma = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/v1/administrador/turmas/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const turmaData = response.data;
        setDisciplina(turmaData.disciplina);
        setProfessor(turmaData.professor);
        setAlunosAssociados(turmaData.alunos);
        setAno(turmaData.ano);
        setSemestre(turmaData.semestre);
      } catch (error) {
        console.error("Erro ao buscar turma:", error.response?.data || error.message);
        Store.addNotification({
          title: "Erro",
          message: "Erro ao buscar dados da turma. Por favor, tente novamente.",
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
    fetchTurma();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!ano || !semestre) {
      Store.addNotification({
        title: "Erro",
        message: "Todos os campos obrigatórios devem ser preenchidos.",
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
      return;
    }

    const turmaData = {
      ano: Number(ano),
      semestre: Number(semestre)
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/v1/administrador/turmas/${id}`,
        turmaData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Store.addNotification({
          title: "Sucesso!",
          message: "Turma atualizada com sucesso!",
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
      let errorMessage = "Erro ao atualizar a turma. Tente novamente.";
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Todos os campos obrigatórios devem ser preenchidos.";
        } else if (err.response.status === 401) {
          errorMessage = "Não autorizado. Verifique suas credenciais.";
        } else if (err.response.status === 500) {
          errorMessage = "Erro interno do servidor. Tente novamente mais tarde.";
        } else {
          errorMessage = `Erro inesperado: ${err.response.statusText || "Verifique os dados e tente novamente."}`;
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

  const columns = [
    {
      title: "Nome Completo",
      dataIndex: "nomeCompleto",
      key: "nomeCompleto",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Matrícula",
      dataIndex: "matricula",
      key: "matricula",
    },
    {
      title: "Ação",
      key: "acao",
      render: (_, aluno) => (
        <Button
          danger
          onClick={() => handleRemoveAluno(aluno._id)}
          icon={<FontAwesomeIcon icon={faTrash} />}
        />
      ),
    },
  ];  

  const handleAddAluno = async (alunoId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/api/v1/administrador/turmas/${id}/alunos`,
        { alunoId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const alunoAdicionado = todosAlunos.find((aluno) => aluno._id === alunoId);
      setTodosAlunos([...alunosAssociados, alunoAdicionado]);
      Store.addNotification({
        title: "Sucesso!",
        message: "Aluno adicionado com sucesso!",
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
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
      Store.addNotification({
        title: "Erro",
        message: "Erro ao adicionar aluno.",
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

  const handleRemoveAluno = async (alunoId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/v1/administrador/turmas/${id}/alunos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { alunoId },
        }
      );
      setAlunosAssociados(alunosAssociados.filter((aluno) => aluno._id !== alunoId));
      Store.addNotification({
        title: "Sucesso!",
        message: "Aluno removido com sucesso!",
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
    } catch (error) {
      console.error("Erro ao remover aluno:", error);
      Store.addNotification({
        title: "Erro",
        message: "Erro ao remover aluno.",
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

  const columnsTodosAlunos = [
    {
      title: "Nome Completo",
      dataIndex: "nomeCompleto",
      key: "nomeCompleto",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.nomeCompleto.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Matrícula",
      dataIndex: "matricula",
      key: "matricula",
    },
    {
      title: "Ação",
      key: "acao",
      render: (_, aluno) => (
        <Button
          type="primary"
          onClick={() => handleAddAluno(aluno._id)}
          disabled={alunosAssociados.some((a) => a._id === aluno._id)}
        >
          Adicionar
        </Button>
      ),
    },
  ];

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
      <h2 style={{ textAlign: "center" }}>Editar Turma</h2>

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
        <Row>
          <Col sm={8}>
            <Form.Group controlId="formDisciplina">
              <Form.Label>Disciplina</Form.Label>
              <Form.Control
                as="text"
                readOnly
                required
              >
                {disciplina}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formProfessor">
              <Form.Label>Professor</Form.Label>
              <Form.Control
                as="text"
                readOnly
                required
              >
                {professor}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col sm={4}>
            <Form.Group controlId="formAno">
              <Form.Label>Ano</Form.Label>
              <Form.Control
                type="number"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                required
                min={2024}
                max={new Date().getFullYear() + 3}
              />
            </Form.Group>

            <Form.Group controlId="formSemestre">
              <Form.Label>Semestre</Form.Label>
              <Form.Control
                as="select"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                required
              >
                <option value={1}>1º Semestre</option>
                <option value={2}>2º Semestre</option>
                <option value={3}>3º Semestre</option>
                <option value={4}>4º Semestre</option>
                <option value={5}>5º Semestre</option>
                <option value={6}>6º Semestre</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={alunosAssociados}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          size="small"
        />

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button
            type="button"
            onClick={() => setShowAddAlunosModal(true)}
            style={{ marginRight: "20px" }}
          >
            Adicionar Alunos
          </Button>
          <Button
            as={Link}
            to="/administrador/academico/gerenciar-turma"
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

      <Modal
        title="Adicionar Alunos"
        visible={showAddAlunosModal}
        onCancel={() => setShowAddAlunosModal(false)}
        footer={null}
        width={800}
      >
        <Input
          placeholder="Pesquisar alunos"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ marginBottom: "1rem" }}
        />
        <Table
          columns={columnsTodosAlunos}
          dataSource={todosAlunos}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          size="small"
        />
      </Modal>

      {/* Modal de confirmação de exclusão de aluno */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            borderBottom: "none",
          }}
        >
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", padding: "2rem" }}>
          <FontAwesomeIcon
            icon={faTrash}
            size="3x"
            color="#ff5252"
            style={{ marginBottom: "1rem" }}
          />
          <p style={{ fontWeight: 500, fontSize: "1.1rem" }}>
            Tem certeza de que deseja excluir este aluno?
          </p>
          <p style={{ color: "gray", fontSize: "0.9rem" }}>
            Essa ação não poderá ser desfeita.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", borderTop: "none" }}>
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
            style={{ marginRight: "1rem" }}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleRemoveAluno}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default EditarTurmaForm;
