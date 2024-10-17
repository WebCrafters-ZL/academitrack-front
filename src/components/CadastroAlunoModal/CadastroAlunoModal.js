import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CadastroAlunoModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Aluno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNomeAluno">
            <Form.Label>Nome do Aluno</Form.Label>
            <Form.Control type="text" placeholder="Digite o nome do aluno" />
          </Form.Group>
          <Form.Group controlId="formEmailAluno">
            <Form.Label>Email do Aluno</Form.Label>
            <Form.Control type="email" placeholder="Digite o email do aluno" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CadastroAlunoModal;
