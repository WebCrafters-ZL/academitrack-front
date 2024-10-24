import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { FaUser, FaEnvelope } from "react-icons/fa"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const enviarFormulario = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email,
          senha,
        }
      );

      // Se a autenticação for bem-sucedida, armazene o token
      const { token } = response.data; // Supondo que o token seja retornado assim
      localStorage.setItem("token", token);

      // Redireciona para a página inicial do administrador
      navigate("/admhome");
    } catch (err) {
      setError("Credenciais inválidas! Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div
      className="login-background"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container
        style={{
          maxWidth: "400px",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid blue",
          backgroundColor: "white",
        }}
      >
        <h1
          className="text-center"
          style={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          Academi<span style={{ color: "#1976d2" }}>Track</span>
        </h1>

        {error && (
          <div
            style={{ color: "red", textAlign: "center", marginBottom: "10px" }}
          >
            {error}
          </div>
        )}

        <Form onSubmit={enviarFormulario}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSenha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            style={{ width: "100%", marginTop: "20px" }}
          >
            Entrar
          </Button>
        </Form>

        <Row style={{ marginTop: "15px" }}>
          <Col className="text-center">
            <a
              href="#"
              style={{ textDecoration: "none", color: "#1976d2" }}
              aria-label="Link para recuperar senha"
            >
              Esqueci minha senha.
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
