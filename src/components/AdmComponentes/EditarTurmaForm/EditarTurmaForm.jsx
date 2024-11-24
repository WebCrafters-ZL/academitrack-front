import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { Table } from "antd";

const EditarTurmaForm = ({ handleClose }) => {
  const { id } = useParams();
  const [disciplina, setDisciplina] = useState("");
  const [professor, setProfessor] = useState("");
  const [selectedAlunos, setSelectedAlunos] = useState([]);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [semestre, setSemestre] = useState(1);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [todosAlunos, setTodosAlunos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { headers: { Authorization: `Bearer ${token}` } };

        const [disciplinasResponse, professoresResponse, alunosResponse] =
          await Promise.all([
            axios.get(
              "http://localhost:3000/api/v1/administrador/disciplinas",
              headers
            ),
            axios.get(
              "http://localhost:3000/api/v1/administrador/professores",
              headers
            ),
            axios.get(
              "http://localhost:3000/api/v1/administrador/alunos",
              headers
            ),
          ]);

        setDisciplinas(disciplinasResponse.data);
        setProfessores(professoresResponse.data);
        setTodosAlunos(alunosResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        Store.addNotification({
          title: "Erro",
          message: "Erro ao carregar dados. Tente novamente mais tarde.",
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
        setDisciplina(turmaData.disciplina_id);
        setProfessor(turmaData.professor_id);
        setSelectedAlunos(turmaData.alunos_id); // Assume que alunos_id é um array
        setAno(turmaData.ano);
        setSemestre(turmaData.semestre);
      } catch (error) {
        console.error("Erro ao buscar turma:", error);
        Store.addNotification({
          title: "Erro",
          message: "Erro ao buscar dados da turma.",
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

    fetchData();
    fetchTurma();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!disciplina || !professor || selectedAlunos.length === 0 || !ano || !semestre) {
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
      return; // Sai da função se algum campo estiver vazio
    }

    const turmaData = {
      disciplina_id: disciplina, // ID da disciplina selecionada
      professor_id: professor,   // ID do professor selecionado
      alunos_id: selectedAlunos,  // IDs dos alunos selecionados
      ano: Number(ano),          // Converte para número
      semestre: Number(semestre), // Converte para número
    };

    console.log("Dados da turma a serem atualizados:", turmaData); // Para debug

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
          message: response.data.message || "Turma atualizada com sucesso!",
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

        // Resetar os campos do formulário
        setDisciplina("");
        setProfessor("");
        setSelectedAlunos([]);
        setAno(new Date().getFullYear());
        setSemestre(1);
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

  // Definição das colunas da tabela
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
  ];

  // Configuração da seleção de linhas da tabela
  const rowSelection = {
    selectedRowKeys: selectedAlunos,
    onChange: (selectedRowKeys) => {
      if (selectedRowKeys.length <= 40) {
        setSelectedAlunos(selectedRowKeys);
      } else {
        Store.addNotification({
          title: "Aviso",
          message: "Você só pode selecionar até 40 alunos.",
          type: "warning",
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
    },
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
                as="select"
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                required
              >
                <option value="">Selecione uma disciplina</option>
                {disciplinas.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.nome}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formProfessor">
              <Form.Label>Professor</Form.Label>
              <Form.Control
                as="select"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                required
              >
                <option value="">Selecione um professor</option>
                {professores.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.nomeCompleto}
                  </option>
                ))}
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

        <Form.Group controlId="formAlunos" style={{ marginTop: "20px" }}>
          <Form.Label>Selecione Alunos (max: 40)</Form.Label>
          <Table
            rowSelection={rowSelection} // Certifique-se que rowSelection está definido corretamente
            columns={columns}
            dataSource={todosAlunos.map((a) => ({ ...a, key: a._id }))}
            pagination={{ pageSize: 5 }}
            size="small"
          />
        </Form.Group>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
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
    </div>
  );
};

export default EditarTurmaForm;
