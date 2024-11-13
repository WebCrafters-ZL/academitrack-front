import React, { useEffect } from "react";
import { Container, Navbar, Nav, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  // Adicionar a integração com VLibras no componente
  useEffect(() => {
    // Carregar o script do VLibras
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras.js";
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Header com botão de login */}
      <Navbar bg="light" expand="lg" style={{ padding: "10px 20px" }} aria-label="Navegação principal">
        <Navbar.Brand href="/" style={{ fontWeight: "bold" }} aria-label="AcademiTrack - Página inicial">
          Academi<span style={{ color: "#1976d2" }}>Track</span>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Link to="/login" aria-label="Ir para a página de login">
            <Button variant="outline-primary">Login</Button>
          </Link>
        </Nav>
      </Navbar>

      {/* Imagem estática de fundo ou logo */}
      <Container style={{ marginTop: "30px", textAlign: "center" }}>
        <img
          src="https://via.placeholder.com/1200x400" // Substitua com o link do logo ou imagem de fundo
          alt="Imagem principal"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
        />
      </Container>

      {/* Cards abaixo da imagem estática */}
      <Container style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Row>
          <Col md={4}>
            <Card style={{ marginBottom: "20px" }} aria-labelledby="card1">
              <Card.Body>
                <Card.Title id="card1">Gerenciamento de Alunos</Card.Title>
                <Card.Text>
                  Ferramentas para acompanhar o desempenho dos alunos e simplificar o gerenciamento de atividades.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ marginBottom: "20px" }} aria-labelledby="card2">
              <Card.Body>
                <Card.Title id="card2">Comunicação Eficiente</Card.Title>
                <Card.Text>
                  Envie mensagens e atualizações rapidamente para toda a comunidade acadêmica.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ marginBottom: "20px" }} aria-labelledby="card3">
              <Card.Body>
                <Card.Title id="card3">Organização Simplificada</Card.Title>
                <Card.Text>
                  Uma visão clara e organizada das informações acadêmicas e administrativas.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer style={{ backgroundColor: "#f7f9fc", padding: "20px", textAlign: "center" }} aria-label="Rodapé">
        <p>&copy; 2024 AcademiTrack. Todos os direitos reservados.</p>
      </footer>

      {/* Botão do VLibras */}
      <div id="vlibras-container"></div>
    </div>
  );
};

export default HomePage;
