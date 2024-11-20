import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const CadastroProfessorForm = ({ handleClose }) => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [formacaoAcademica, setFormacaoAcademica] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanCpf = cpf.replace(/[^\d]/g, "");

    const professorData = {
      nomeCompleto,
      email,
      senha,
      matricula,
      cpf: cleanCpf,
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
        Store.addNotification({
          title: "Sucesso!",
          message: response.data.message || "Professor cadastrado com sucesso!",
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

      let errorMessage = "Erro ao cadastrar professor. Tente novamente.";

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
      <h2 style={{ textAlign: "center" }}>Cadastro de Professor</h2>

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
              style={{ paddingRight: "40px" }}
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

        <Row>
          <Col sm={6}>
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
          </Col>

          <Col sm={6}>
            <Form.Group controlId="formCpfProfessor">
              <Form.Label>CPF</Form.Label>
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              >
                {() => (
                  <Form.Control
                    placeholder="Digite o CPF do professor"
                    required
                  />
                )}
              </InputMask>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={6}>
            <Form.Group controlId="formDataNascimentoProfessor">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
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
          </Col>
        </Row>

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
            as={Link}
            to="/administrador/pessoas/gerenciar-professor"
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

export default CadastroProfessorForm;
