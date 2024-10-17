import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const BarraProfessor = () => {
  return (
    <Container fluid style={{ 
      position: "fixed", 
      top: "85px", 
      left: "310px", 
      height: "50px", 
      maxWidth: "calc(100% - 320px)", 
      backgroundColor: "#1976d2", 
      color: "white", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "10px 20px", 
      borderRadius: "20px", 
      zIndex: "999" 
    }}>
      <Row className="w-100">
        <Col xs={5}> 
          <div style={{ 
            fontSize: "1.5rem",
            fontWeight: "bold", 
            color: "white" 
          }}>
            Administrador
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BarraProfessor;
