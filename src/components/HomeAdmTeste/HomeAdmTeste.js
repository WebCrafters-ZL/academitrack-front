import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa"; 

const HomeAdmTeste = () => {
  return (
    <Container fluid style={{ 
      marginTop: "70px", 
      marginLeft: "315px", 
      padding: "20px",
      maxWidth: "calc(100% - 320px)", 
      height: `calc(100vh - 75px)`, 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px",
      overflowY: "auto",
      border: "2px solid blue"
    }}>
      
      <Container style={{
        border: "2px solid blue",
        maxWidth: "100%",
        height: "35%", 
        padding: "5px",
        borderRadius: "10px"
      }}>
         <h4 style={{ textAlign: "center", marginBottom: "15px" }}>Avaliações Próximas</h4>
        <Row>
          <Col>
            <Card style={{ border: "2px solid blue", height: "100%" }}>
              <Card.Body style={{ display: "flex", alignItems: "center" }}>
                <FaExclamationTriangle style={{ fontSize: "40px", color: "orange", marginRight: "15px" }} />
                <div>
                  <Card.Title>Avaliação de Matemática</Card.Title>
                  <Card.Text>
                    <strong>Data:</strong> 20/10/2024
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col>
            <Card style={{ border: "2px solid blue", height: "100%" }}>
              <Card.Body style={{ display: "flex", alignItems: "center" }}>
                <FaExclamationTriangle style={{ fontSize: "40px", color: "orange", marginRight: "15px" }} />
                <div>
                  <Card.Title>Avaliação de História</Card.Title>
                  <Card.Text>
                    <strong>Data:</strong> 22/10/2024
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col>
            <Card style={{ border: "2px solid blue", height: "100%" }}>
              <Card.Body style={{ display: "flex", alignItems: "center" }}>
                <FaExclamationTriangle style={{ fontSize: "40px", color: "orange", marginRight: "15px" }} />
                <div>
                  <Card.Title>Avaliação de Biologia</Card.Title>
                  <Card.Text>
                    <strong>Data:</strong> 25/10/2024
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomeAdmTeste;
