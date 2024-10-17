import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const CadastroProfessorModal = ({ show, handleClose }) => {
  const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState([]);

  const handleDisciplinasChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setDisciplinasSelecionadas(selected);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Professor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNomeProfessor">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type="text" placeholder="Digite o nome completo" />
          </Form.Group>

          <Form.Group controlId="formEmailProfessor">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Digite o email" />
          </Form.Group>

          <Form.Group controlId="formCpfProfessor">
            <Form.Label>CPF</Form.Label>
            <Form.Control type="text" placeholder="Digite o CPF" />
          </Form.Group>

          <Form.Group controlId="formDepartamento">
            <Form.Label>Departamento</Form.Label>
            <Form.Control as="select">
              <option>Selecione o departamento</option>
              <option>Matemática</option>
              <option>Física</option>
              <option>Tecnologia da Informação</option>
              <option>Química</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDataNascimentoProfessor">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <Form.Group controlId="formTelefoneProfessor">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" placeholder="Digite o telefone" />
          </Form.Group>

          <Form.Group controlId="formDisciplinasProfessor">
            <Form.Label>Disciplinas</Form.Label>
            <Form.Control as="select" multiple onChange={handleDisciplinasChange}>
              <option>Análise e Desenvolvimento de Sistemas</option>
              <option>Desenvolvimento de Software Multiplataforma</option>
              <option>Engenharia de Software</option>
              <option>Recursos Humanos</option>
              <option>Polimeros</option>
              <option>Comercio Exterior</option>
            </Form.Control>
            <Form.Text className="text-muted">
              Segure a tecla Ctrl (ou Command no Mac) para selecionar várias disciplinas.
            </Form.Text>
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

export default CadastroProfessorModal;
