import React, { useEffect } from "react";
import { Container, Navbar, Nav, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FotoHome from "../../assets/fotohome.webp";

const HomePage = () => {
  // Função para narração utilizando a API Web Speech
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      window.speechSynthesis.cancel(); // Cancela qualquer fala em andamento antes de iniciar uma nova
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Navegador não suporta a API Web Speech.");
    }
  };

  useEffect(() => {
    // Integração com a API de LIBRAS (VLibras)
    const scriptVLibras = document.createElement("script");
    scriptVLibras.src = "https://vlibras.gov.br/app/vlibras.js";
    scriptVLibras.async = true;
    document.body.appendChild(scriptVLibras);

    scriptVLibras.onload = () => {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    };

    scriptVLibras.onerror = () => {
      console.error("Erro ao carregar o script do VLibras.");
    };

    // Integração com a API ARIA (Melhoria da acessibilidade)
    const setAriaAttributes = () => {
      const elements = document.querySelectorAll("[data-aria-label]");
      elements.forEach((element) => {
        element.setAttribute("aria-label", element.getAttribute("data-aria-label"));
      });
    };

    setAriaAttributes();

    // Cleanup: Remover o script do VLibras quando o componente for desmontado
    return () => {
      document.body.removeChild(scriptVLibras);
    };
  }, []);

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
              onMouseEnter={() => speakText("Botão de login")}
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
          onMouseEnter={() => speakText("Imagem principal de apresentação do AcademiTrack")}
          data-aria-label="Imagem principal de apresentação do AcademiTrack"
        />
      </Container>

      {/* Cards com bordas alinhadas */}
      <Container style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Row>
          <Col md={4}>
            <Card
              style={{ marginBottom: "20px", border: "1px solid #ccc" }}
              aria-labelledby="card1"
              data-aria-label="Gerenciamento de Alunos"
            >
              <Card.Body onMouseEnter={() => speakText("Gerenciamento de Alunos. Ferramentas para acompanhar o desempenho dos alunos e simplificar o gerenciamento de atividades.")}>
                <Card.Title id="card1">Gerenciamento de Alunos</Card.Title>
                <Card.Text>
                  Ferramentas para acompanhar o desempenho dos alunos e simplificar o gerenciamento de atividades.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              style={{ marginBottom: "20px", border: "1px solid #ccc" }}
              aria-labelledby="card2"
              data-aria-label="Comunicação Eficiente"
            >
              <Card.Body onMouseEnter={() => speakText("Comunicação Eficiente. Envie mensagens e atualizações rapidamente para toda a comunidade acadêmica.")}>
                <Card.Title id="card2">Comunicação Eficiente</Card.Title>
                <Card.Text>
                  Envie mensagens e atualizações rapidamente para toda a comunidade acadêmica.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              style={{ marginBottom: "20px", border: "1px solid #ccc" }}
              aria-labelledby="card3"
              data-aria-label="Organização Simplificada"
            >
              <Card.Body onMouseEnter={() => speakText("Organização Simplificada. Uma visão clara e organizada das informações acadêmicas e administrativas.")}>
                <Card.Title id="card3">Organização Simplificada</Card.Title>
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
        <p onMouseEnter={() => speakText("Todos os direitos reservados. 2024 AcademiTrack.")}>&copy; 2024 AcademiTrack. Todos os direitos reservados.</p>
      </footer>

      {/* Container para o widget VLibras */}
      <div id="vlibras-container"></div>
    </div>
  );
};

export default HomePage;
