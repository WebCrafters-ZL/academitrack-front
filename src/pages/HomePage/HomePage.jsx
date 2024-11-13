import React, { useEffect } from "react";
import { Container, Navbar, Nav, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FotoHome from "../../assets/fotohome.webp"

const HomePage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    };

    script.onerror = () => {
      console.error("Erro ao carregar o script do VLibras.");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
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

      <Container style={{ marginTop: "30px", textAlign: "center" }}>
        <img
          src={FotoHome}
          alt="Imagem principal"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
        />
      </Container>

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

      <footer style={{ backgroundColor: "#f7f9fc", padding: "20px", textAlign: "center" }} aria-label="Rodapé">
        <p>&copy; 2024 AcademiTrack. Todos os direitos reservados.</p>
      </footer>

      <div id="vlibras-container"></div>
    </div>
  );
};

export default HomePage;
