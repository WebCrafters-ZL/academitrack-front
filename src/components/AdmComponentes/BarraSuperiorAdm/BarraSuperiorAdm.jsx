import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const BarraSuperiorAdm = () => {
  return (
    <Container
      fluid
      style={{
        position: "fixed",
        top: "5px",
        left: "310px",
        height: "55px",
        maxWidth: "calc(100% - 315px)",
        backgroundColor: "#1976d2",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderRadius: "10px",
        zIndex: "999",
      }}
    >
       <Row className="w-100 text-center" style={{ flexGrow: 1 }}>
      <Col xs={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <span style={{ fontSize: "1.5rem", marginRight: '10px', whiteSpace: 'nowrap' }}>
          <strong>Administrador</strong>
        </span>
      </Col>
      <Col xs={6} style={{ display: 'flex', justifyContent: 'right' }}>
        <span style={{ fontSize: "1.5rem", margin: '0 10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Unidade: <strong>Fatec Zona Leste</strong>
        </span>
      </Col>
    </Row>
    </Container>
  );
};

export default BarraSuperiorAdm;
