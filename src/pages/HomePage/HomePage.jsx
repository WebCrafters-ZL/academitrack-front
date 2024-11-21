import React, { useState } from "react";
import { Container, Navbar, Nav, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaAccessibleIcon, FaStopCircle } from "react-icons/fa"; // Importando ícones
import FotoHome from "../../assets/fotohome.webp";

const HomePage = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Função para ativar/desativar a narração utilizando a API Web Speech
  const toggleNarration = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Parar narração se estiver ativa
      setIsSpeaking(false);
    } else {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(
          "Bem-vindo ao AcademiTrack! Este é um sistema de gerenciamento acadêmico para simplificar a vida acadêmica."
        );
        utterance.lang = "pt-BR";
        utterance.onend = () => setIsSpeaking(false); // Reseta estado quando a fala termina
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      } else {
        console.warn("Navegador não suporta a API Web Speech.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <Navbar
        expand="lg"
        style={{ padding: "10px 20px", backgroundColor: "#1976d2" }}
        aria-label="Navegação principal"
      >
        <Navbar.Brand
          href="/"
          style={{
            fontWeight: "bold",
            color: "#ffffff",
            fontSize: "2rem",
          }}
          aria-label="AcademiTrack - Página inicial"
        >
          <span style={{ color: "#000000" }}>Academi</span>
          <span style={{ color: "#FFFFFF" }}>Track</span>
        </Navbar.Brand>
        <Nav className="ml-auto" style={{ marginLeft: "auto" }}>
          <Link to="/login" aria-label="Ir para a página de login">
            <Button
              style={{
                fontWeight: "bold",
                backgroundColor: "#ffffff",
                color: "#1976d2",
                borderColor: "#004a9f",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#000000";
                e.target.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.color = "#1976d2";
              }}
            >
              Login
            </Button>
          </Link>
        </Nav>
      </Navbar>

     
      <div
        style={{
          backgroundImage: `url(${FotoHome})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "calc(100vh - 60px)",  
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontSize: "4rem", 
            textShadow: "4px 4px 6px rgba(0, 0, 0, 0.7)", 
            fontFamily: "'Roboto', sans-serif", 
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Bem-vindo ao AcademiTrack
        </h1>
      </div>

      {/* Cards sobrepondo o fundo */}
      <Container
        style={{
          marginTop: "-50px", 
          zIndex: 10,
          position: "relative",
          flex: "1",
        }}
      >
        <Row>
          <Col md={4}>
            <Card style={{ marginBottom: "20px", border: "1px solid #ccc", backgroundColor: "#e3f2fd" }}>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "#1976d2" }}>
                  Gerenciamento de Alunos
                </Card.Title>
                <Card.Text>
                  Ferramentas para acompanhar o desempenho dos alunos e simplificar o gerenciamento de atividades.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ marginBottom: "20px", border: "1px solid #ccc", backgroundColor: "#e3f2fd" }}>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "#1976d2" }}>
                  Comunicação Eficiente
                </Card.Title>
                <Card.Text>
                  Envie mensagens e atualizações rapidamente para toda a comunidade acadêmica.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ marginBottom: "20px", border: "1px solid #ccc", backgroundColor: "#e3f2fd" }}>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "#1976d2" }}>
                  Organização Simplificada
                </Card.Title>
                <Card.Text>
                  Uma visão clara e organizada das informações acadêmicas e administrativas.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Botão para ativar/parar narração */}
      <Button
        variant="primary"
        onClick={toggleNarration}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#1976d2",
          borderColor: "#145a8b",
          color: "#fff",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          borderRadius: "50%",
        }}
        aria-label={isSpeaking ? "Parar narração" : "Ativar narração para acessibilidade"}
      >
        {isSpeaking ? <FaStopCircle size={24} /> : <FaAccessibleIcon size={24} />}
      </Button>

      {/* Rodapé */}
      <footer
        style={{
          backgroundColor: "#1976d2",
          padding: "20px",
          textAlign: "center",
          color: "#ffffff",
        }}
        aria-label="Rodapé"
      >
        <p>&copy; 2024 AcademiTrack. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
