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
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false); // Estado para controlar a visibilidade da senha

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

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
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/v1/administrador/professores",
        professorData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMessageType("success");
        setMessage(response.data.message || "Professor cadastrado com sucesso!");

        // Chama handleClose se for uma função
        if (typeof handleClose === "function") handleClose();

        // Limpa os campos do formulário
        setNomeCompleto("");
        setEmail("");
        setSenha("");
        setMatricula("");
        setCpf("");
        setDataNascimento("");
        setFormacaoAcademica("");
        setEspecialidade("");
      }
    } catch (err) {
      console.error("Erro ao cadastrar professor:", err);
      setMessageType("error");

      if (err.response) {
        if (err.response.status === 400) {
          setMessage("Todos os campos obrigatórios devem ser preenchidos.");
        } else if (err.response.status === 401) {
          setMessage("Não autorizado. Verifique suas credenciais.");
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

      {message && (
        <div style={{ color: messageType === "success" ? "green" : "red", textAlign: "center" }}>
          {message}
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNomeProfessor">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do professor"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            required
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
            placeholder="Digite a matrícula do professor"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCpfProfessor">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CPF do professor"
            onChange={(e) => setCpf(e.target.value)}
            value={cpf}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDataNascimentoProfessor">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFormacaoAcademica">
          <Form.Label>Formação Acadêmica</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a formação acadêmica do professor"
            value={formacaoAcademica}
            onChange={(e) => setFormacaoAcademica(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEspecialidade">
          <Form.Label>Especialidade</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a especialidade do professor"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
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

export default CadastroProfessorForm;
