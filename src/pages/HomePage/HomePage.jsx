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
        const utterance = new SpeechSynthesisUtterance("Bem-vindo ao AcademiTrack! Este é um sistema de gerenciamento acadêmico para simplificar a vida acadêmica.");
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
    <div>
      {/* Navbar com botão de login alinhado à direita */}
      <Navbar bg="light" expand="lg" style={{ padding: "10px 20px" }} aria-label="Navegação principal">
        <Navbar.Brand href="/" style={{ fontWeight: "bold" }} aria-label="AcademiTrack - Página inicial">
          Academi<span style={{ color: "#1976d2" }}>Track</span>
        </Navbar.Brand>
        <Nav className="ml-auto" style={{ marginLeft: "auto" }}>
          <Link to="/login" aria-label="Ir para a página de login">
            <Button
              variant="primary"
              style={{ backgroundColor: "#0056b3", borderColor: "#004a9f" }}
            >
              Login
            </Button>
          </Link>
        </Nav>
      </Navbar>

      {/* Conteúdo Principal */}
      <Container style={{ marginTop: "30px", textAlign: "center" }}>
        <img
          src={FotoHome}
          alt="Imagem principal de apresentação"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </Container>

      {/* Botão para ativar/parar narração com ícone de acessibilidade */}
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

      {/* Cards com bordas alinhadas */}
      <Container style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Row>
          <Col md={4}>
            <Card style={{ marginBottom: "20px", border: "1px solid #ccc" }}>
              <Card.Body>
                <Card.Title>Gerenciamento de Alunos</Card.Title>
                <Card.Text>
                  Ferramentas para acompanhar o desempenho dos alunos e simplificar o gerenciamento de atividades.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ marginBottom: "20px", border: "1px solid #ccc" }}>
              <Card.Body>
                <Card.Title>Comunicação Eficiente</Card.Title>
                <Card.Text>
                  Envie mensagens e atualizações rapidamente para toda a comunidade acadêmica.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ marginBottom: "20px", border: "1px solid #ccc" }}>
              <Card.Body>
                <Card.Title>Organização Simplificada</Card.Title>
                <Card.Text>
                  Uma visão clara e organizada das informações acadêmicas e administrativas.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Rodapé */}
      <footer style={{ backgroundColor: "#f7f9fc", padding: "20px", textAlign: "center" }} aria-label="Rodapé">
        <p>&copy; 2024 AcademiTrack. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
