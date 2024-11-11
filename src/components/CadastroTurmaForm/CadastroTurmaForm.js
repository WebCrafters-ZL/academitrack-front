import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const CadastroTurmaForm = ({ handleClose }) => {
  const [disciplina, setDisciplina] = useState("");
  const [professor, setProfessor] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [selectedAlunos, setSelectedAlunos] = useState([]);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [semestre, setSemestre] = useState(1); // 1-6 para os semestres
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [todosAlunos, setTodosAlunos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [disciplinasResponse, professoresResponse, alunosResponse] = await Promise.all([
          axios.get("/api/v1/disciplinas"),
          axios.get("/api/v1/professores"),
          axios.get("/api/v1/alunos"),
        ]);

        setDisciplinas(disciplinasResponse.data);
        setProfessores(professoresResponse.data);
        setTodosAlunos(alunosResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novaTurma = {
      disciplina,
      professor,
      alunos: selectedAlunos,
      ano,
      semestre,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/v1/turmas", novaTurma, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success("Turma cadastrada com sucesso!", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        
        // Limpa os campos do formulário
        setDisciplina("");
        setProfessor("");
        setSelectedAlunos([]);
        setAno(new Date().getFullYear());
        setSemestre(1);
        
        if (typeof handleClose === "function") handleClose();
      }
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
      toast.error("Erro ao cadastrar turma. Por favor, tente novamente.", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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
      <h2 style={{ textAlign: "center" }}>Cadastro de Turma</h2>

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
 
      <Form onSubmit={handleSubmit}>
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
              {p.nome}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formAlunos">
        <Form.Label>Alunos</Form.Label>
        <Form.Control
          as="select"
          multiple
          value={selectedAlunos}
          onChange={(e) => {
            const options = e.target.options;
            const value = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
            if (value.length <= 40) { // Limitar a seleção a 40 alunos
              setSelectedAlunos(value);
            } else {
              alert("Você só pode selecionar até 40 alunos.");
            }
          }}
          required
        >
          {todosAlunos.map((a) => (
            <option key={a._id} value={a._id}>
              {a.nome}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formAno">
        <Form.Label>Ano</Form.Label>
        <Form.Control
          type="number"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        />
      </Form.Group>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button
          as={Link}
          to="/adm-home/academico/gerenciar-turma"
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

    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
      transition="bounce"
    />
  </div>
);
};

export default CadastroTurmaForm;
