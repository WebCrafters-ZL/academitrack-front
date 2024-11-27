import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../Login/AuthContext";
import { jwtDecode } from "jwt-decode";
import FotoHome from "../../assets/fotohome.webp";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
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

      login(token);

      const decodedToken = jwtDecode(token);
      const userType = decodedToken.tipoUsuario;

      if (userType === "administrador") {
        navigate("/administrador");
      } else if (userType === "professor") {
        navigate("/professor");
      } else if (userType === "aluno") {
        navigate("/aluno");
      } else {
        console.log("User role not recognized, not redirecting.");
      }
    } catch (err) {
      setError("Credenciais inválidas! Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div style={styles.homePage}>
      {/* Barra Lateral de Login */}
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>
            <span style={styles.academi}>Academi</span>
            <span style={styles.track}>Track</span>
          </h1>
        </div>

        <Container style={styles.loginContainer}>
          {error && <div style={styles.errorMessage}>{error}</div>}
          <Form onSubmit={enviarFormulario}>
            <Form.Group controlId="formEmail">
              <Form.Label>
                <FaEnvelope /> E-mail
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu e-mail"
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
              style={styles.loginButton}
            >
              Entrar
            </Button>
          </Form>
        </Container>
      </div>

      {/* Conteúdo Principal */}
      <div style={styles.mainContent}>
        <div style={styles.contentContainer}>
          <h1 style={styles.welcomeTitle}>Bem-vindo ao AcademiTrack</h1>

          <Container style={styles.cardsContainer}>
            <Row className="g-4">
              <Col>
                <Card style={styles.featureCard}>
                  <Card.Body>
                    <Card.Title style={styles.featureTitle}>
                    Administração Eficiente
                    </Card.Title>
                    <Card.Text>
                    Gerencie processos acadêmicos e administrativos de forma ágil e centralizada, promovendo uma gestão mais organizada e produtiva.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={styles.featureCard}>
                  <Card.Body>
                    <Card.Title style={styles.featureTitle}>
                      Area do Aluno
                    </Card.Title>
                    <Card.Text>
                    Acesse suas informações acadêmicas, acompanhe seu desempenho e organize suas atividades de maneira simples e prática.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={styles.featureCard}>
                  <Card.Body>
                    <Card.Title style={styles.featureTitle}>
                      Portal do Professor
                    </Card.Title>
                    <Card.Text>
                    Gerencie suas aulas, acompanhe o progresso dos alunos e facilite a comunicação com a comunidade acadêmica.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

const styles = {
  homePage: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f0f4f8",
  },
  sidebar: {
    width: "400px", 
    backgroundColor: "#1976d2",
    color: "white",
    padding: "40px",
    position: "fixed",
    height: "100%",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: "30px",
    textAlign: "center",
  },
  logo: {
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  academi: {
    color: "black",
  },
  track: {
    color: "white",
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginTop: "100px",
    width: "90%", 
  },
  errorMessage: {
    color: "red",
    marginBottom: "10px",
  },
  loginButton: {
    width: "100%",
    marginTop: "20px",
    backgroundColor: "#1565c0",
    border: "none",
  },
  mainContent: {
    flexGrow: 1,
    marginLeft: "400px", 
    backgroundImage: `url(${FotoHome})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "80px 40px",
    position: "relative",
  },
  contentContainer: {
    textAlign: "center",
    marginTop: "50px",
  },
  welcomeTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    textShadow: "4px 4px 6px rgba(0, 0, 0, 0.7)",
  },
  cardsContainer: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    displayflex:"0,0,20,0"
  },
  featureCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    textAlign: "center",
    padding: "20px",
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    height:"100%",
    minHeight: "150px",
  },
  featureTitle: {
    color: "#1976d2",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
};

export default HomePage;
