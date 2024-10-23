import React from "react";
import { Button, Form } from "react-bootstrap";

const CadastroAlunoForm = ({ handleClose }) => {
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
      <h2 style={{ textAlign: "center" }}>Cadastro de Aluno</h2>
      
      <Form>
        <Form.Group controlId="formNomeAluno">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control type="text" placeholder="Digite o nome completo do aluno" />
        </Form.Group>

        <Form.Group controlId="formEmailAluno">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Digite o email do aluno" />
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

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button variant="secondary" onClick={handleClose} style={{ marginRight: "10px" }}>
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

export default CadastroAlunoForm;
