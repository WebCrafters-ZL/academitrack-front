import React from "react";
import { Button, Form } from "react-bootstrap";

const CadastroDisciplinaForm = ({ handleClose }) => {
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
      <h2 style={{ textAlign: "center" }}>Cadastro de Professor</h2>
      
      <Form>
        <Form.Group controlId="formNomeProfessor">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control type="text" placeholder="Digite o nome completo do professor" />
        </Form.Group>

        <Form.Group controlId="formEmailProfessor">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Digite o email do professor" />
        </Form.Group>

        <Form.Group controlId="formCpfProfessor">
          <Form.Label>CPF</Form.Label>
          <Form.Control type="text" placeholder="Digite o CPF do professor" />
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
          <Form.Control type="text" placeholder="Digite o telefone do professor" />
        </Form.Group>

        <Form.Group controlId="formDisciplinasProfessor">
          <Form.Label>Disciplinas</Form.Label>
          <Form.Control as="select" multiple>
            <option>Análise e Desenvolvimento de Sistemas</option>
            <option>Desenvolvimento de Software Multiplataforma</option>
            <option>Engenharia de Software</option>
            <option>Recursos Humanos</option>
            <option>Polímeros</option>
            <option>Comércio Exterior</option>
          </Form.Control>
          <Form.Text className="text-muted">
            Segure a tecla Ctrl (ou Command no Mac) para selecionar várias disciplinas.
          </Form.Text>
        </Form.Group>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button variant="danger" onClick={handleClose} style={{ marginRight: "20px" }}>
            Fechar
          </Button>
          <Button variant="primary" onClick={() => { /* Lógica de salvar pode ser inserida aqui */ }}>
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CadastroDisciplinaForm;
