import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CadastroAlunoModal from "../CadastroAlunoModal/CadastroAlunoModal"; 
import CadastroProfessorModal from "../CadastroProfessorModal.js/CadastroProfessorModal"; 

const HomeAdm = () => {
  const [showAlunoModal, setShowAlunoModal] = useState(false);
  const [showProfessorModal, setShowProfessorModal] = useState(false);

  const handleShowAlunoModal = () => setShowAlunoModal(true);
  const handleCloseAlunoModal = () => setShowAlunoModal(false);

  const handleShowProfessorModal = () => setShowProfessorModal(true);
  const handleCloseProfessorModal = () => setShowProfessorModal(false);

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
                Este é o conteúdo do card de cadastro de aluno.
              </Card.Text>
              <Button variant="primary" onClick={handleShowAlunoModal}>
                Abrir Cadastro de Aluno
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ border: "2px solid blue", height: "100%" }}>
            <Card.Body>
              <Card.Title>Cadastrar Professor</Card.Title>
              <Card.Text>
                Este é o conteúdo do card de cadastro de professor.
              </Card.Text>
              <Button variant="primary" onClick={handleShowProfessorModal}>
                Abrir Cadastro de Professor
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modais de Cadastro */}
      <CadastroAlunoModal show={showAlunoModal} handleClose={handleCloseAlunoModal} />
      <CadastroProfessorModal show={showProfessorModal} handleClose={handleCloseProfessorModal} />
    </Container>
  );
};

export default HomeAdm;
