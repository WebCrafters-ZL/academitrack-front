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
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type="text" placeholder="Digite o nome completo do aluno" />
          </Form.Group>

          <Form.Group controlId="formEmailAluno">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Digite o email do aluno" />
          </Form.Group>

          <Form.Group controlId="formCpfAluno">
            <Form.Label>CPF</Form.Label>
            <Form.Control type="text" placeholder="Digite o CPF do aluno" />
          </Form.Group>

          <Form.Group controlId="formDataNascimentoAluno">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <Form.Group controlId="formTelefoneAluno">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" placeholder="Digite o telefone do aluno" />
          </Form.Group>

          <Form.Group controlId="formEnderecoAluno">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" placeholder="Digite o endereço do aluno" />
          </Form.Group>

          <Form.Group controlId="formCursoAluno">
            <Form.Label>Curso</Form.Label>
            <Form.Control type="text" placeholder="Digite o curso do aluno" />
          </Form.Group>

          <Form.Group controlId="formPeriodoAluno">
            <Form.Label>Período</Form.Label>
            <Form.Control as="select">
              <option value="1">Manhã</option>
              <option value="2">Tarde</option>
              <option value="3">Noite</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={() => {  }}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CadastroAlunoModal;
