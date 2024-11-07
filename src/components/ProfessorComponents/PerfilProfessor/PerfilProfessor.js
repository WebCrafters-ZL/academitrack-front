import React from "react";
import { Container } from "react-bootstrap";

const PerfilProfessor = () => {
  return (
    <Container 
      fluid 
      style={{ 
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
        borderRadius: "10px", 
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Perfil Professor
      </h1>
      
    </Container>
  );
};

export default PerfilProfessor;
