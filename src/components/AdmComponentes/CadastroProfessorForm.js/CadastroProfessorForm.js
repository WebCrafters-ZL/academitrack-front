import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CadastroProfessorForm = ({ handleClose }) => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [formacaoAcademica, setFormacaoAcademica] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [error, setError] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false); // Estado para controlar a visibilidade da senha

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const professorData = {
      nomeCompleto,
      email,
      senha,
      matricula,
      cpf,
      dataNascimento,
      formacaoAcademica,
      especialidade,
    };

    try {
      // Obter o token do localStorage
      const token = localStorage.getItem("token");

      // Substitua esta URL pela URL correta para o seu back-end
      const response = await axios.post(
        "http://localhost:3000/api/v1/administrador/professores",
        professorData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Inclui o token na header da requisição
          },
        }
      );

      console.log(response.data); // Aqui você pode adicionar lógica após o cadastro
      handleClose(); // Fecha o formulário após o sucesso
    } catch (err) {
      console.error(err);
      setError(
        "Erro ao cadastrar professor. Verifique os dados e tente novamente."
      );
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
      <h2 style={{ textAlign: "center" }}>Cadastro de Professor</h2>

      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNomeProfessor">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do professor"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmailProfessor">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite o email do professor"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSenhaProfessor">
          <Form.Label>Senha</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type={senhaVisivel ? "text" : "password"}
              placeholder="Digite a senha do professor"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{ paddingRight: "40px" }} // Adiciona espaçamento à direita para o ícone
            />
            <button
              type="button"
              onClick={toggleSenhaVisivel}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                opacity: 0.6,
                color: "black",
              }}
            >
              {senhaVisivel ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </Form.Group>

        <Form.Group controlId="formMatricula">
          <Form.Label>Matrícula</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a matrícula do aluno"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCpfProfessor">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CPF do professor"
            onChange={(e) => setCpf(e.target.value)}
            value={cpf}
          />
        </Form.Group>

        <Form.Group controlId="formDataNascimentoProfessor">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </Form.Group>


        <Form.Group controlId="formFormacaoAcademica">
          <Form.Label>Formação Academica</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a formação academica do professor"
            value={formacaoAcademica}
            onChange={(e) => setFormacaoAcademica(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEspecialidade">
          <Form.Label>Especialidade</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a especialidade do professor"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
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
          <Button variant="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CadastroProfessorForm;
