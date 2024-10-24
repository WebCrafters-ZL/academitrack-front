import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const AlunoNotas = ({ handleClose }) => {
  // Dados simulados para as matérias e notas
  const materias = [
    { nome: "Desenvolvimento web III", n1: 8.5, n2: 9.0, n3: 7.0 },
    { nome: "Técnicas de Programação II", n1: 9.0, n2: 10.0, n3: 8.5 },
    { nome: "Álgebra Linear", n1: 7.5, n2: 8.0, n3: 9.2 },
    { nome: "Gestão Ágil de Projetos", n1: 10.0, n2: 9.5, n3: 9.8 },
    { nome: "Banco de Dados - Não Relacional", n1: 8.0, n2: 8.5, n3: 9.0 },
    { nome: "Engenharia de Software II", n1: 9.5, n2: 9.0, n3: 10.0 },
  ];

  return (
    <div style={{
      marginTop: "70px", 
      marginLeft: "315px", 
      padding: "20px",
      maxWidth: "calc(100% - 320px)", 
      height: `calc(100vh - 75px)`, 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px",
      overflowY: "auto",
      border: "2px solid blue",
      borderRadius: "10px"
    }}>
      <h2 style={{ textAlign: "center" }}>Visualizar Notas</h2>

      <Row xs={1} md={2} lg={3} className="g-4">
        {materias.map((materia, index) => (
          <Col key={index}>
            <Card style={{ width: '100%', height: '100%' }}>
              <Card.Body>
                <Card.Title>{materia.nome}</Card.Title>
                <Card.Text>
                  <strong>Notas:</strong>
                  <br />
                  N1: {materia.n1}
                  <br />
                  N2: {materia.n2}
                  <br />
                  N3: {materia.n3}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button variant="danger" onClick={handleClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
};

export default AlunoNotas;
