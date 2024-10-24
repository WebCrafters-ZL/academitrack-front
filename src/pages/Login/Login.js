import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import {FaEnvelope, FaLock } from "react-icons/fa"; 

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

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/admhome");
    } catch (err) {
      setError("Credenciais inválidas! Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f7f9fc",
      }}
    >
      <Container
        style={{
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >
        <h1 className="text-center" style={{ fontWeight: "bold", marginBottom: "20px" }}>
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
            <Form.Label>
              <FaEnvelope /> Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSenha">
            <Form.Label>
              <FaLock /> Senha
            </Form.Label>
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
