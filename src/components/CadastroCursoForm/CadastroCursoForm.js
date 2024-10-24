import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CadastroCursoForm = ({ handleClose }) => {
  const [curso, setCurso] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  return (
    <div
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
      <h2 style={{ textAlign: "center" }}>Cadastrar Curso</h2>

      <Form>
        <Form.Group controlId="formCurso">
          <Form.Label>Curso</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do Curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCargaHoraria">
          <Form.Label>Carga Horária</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite a carga horária em horas"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(e.target.value)}
            required
            min="1"
            max="2000"
          />
        </Form.Group>

        <Form.Group controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea" 
            placeholder="Digite a descrição da disciplina"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategoria">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a categoria do curso"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </Form.Group>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button
            variant="danger"
            onClick={handleClose}
            style={{ marginRight: "20px" }}
          >
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              console.log(`Adicionando o curso ${curso}.`);
              // Aqui você pode adicionar lógica para salvar a nova disciplina
            }}
          >
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CadastroCursoForm;
