import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const HomeAdm = () => {
  return (
    <Container fluid style={{ 
      marginTop: "140px", 
      marginLeft: "305px", 
      padding: "20px",
      maxWidth: "calc(100% - 320px)", 
      height: "calc(100vh - 140px)", 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px",
      overflowY: "auto" 
    }}>
      <Row>
        <Col>
          <Card style={{ border: "2px solid blue", height: "100%" }}>
            <Card.Body>
              <Card.Title>Cadastrar Aluno</Card.Title>
              <Card.Text>
                Este é o conteúdo do primeiro card.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ border: "2px solid blue", height: "100%" }}>
            <Card.Body>
              <Card.Title>Card 2</Card.Title>
              <Card.Text>
                Este é o conteúdo do segundo card.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeAdm;
