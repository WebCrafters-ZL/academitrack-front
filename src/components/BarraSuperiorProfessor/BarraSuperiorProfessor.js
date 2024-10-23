import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const BarraSuperiorProfessor = () => {
  return (
    <Container fluid style={{ 
      position: "fixed", 
      top: "5px", 
      left: "310px", 
      height: "55px", 
      maxWidth: "calc(100% - 315px)", 
      backgroundColor: "#1976d2", 
      color: "white", 
      display: "flex", 
      alignItems: "center", 
      padding: "10px 20px", 
      borderRadius: "10px", 
      zIndex: "999" 
    }}>
      <Row className="w-100 text-center" style={{ flexGrow: 1 }}>
        <Col xs={4} style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <span style={{ fontSize: "1.4rem", marginRight: '10px' }}>
            <strong>Professor</strong>
          </span>
        </Col>
        <Col xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontSize: "1.4rem", margin: '0 10px', whiteSpace: 'nowrap' }}>
            Unidade: <strong>Fatec Zona Leste</strong>
          </span>
        </Col>
        <Col xs={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: "1.4rem", marginLeft: '10px' }}>
            Turma: <strong>3º DSM</strong>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default BarraSuperiorProfessor;
