import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CadastroDisciplinaForm = ({ handleClose }) => {
  const [curso, setCurso] = useState("");
  const [materia, setMateria] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [descricao, setDescricao] = useState("");

  const cursos = [
    "Desenvolvimento de Software Multiplataforma",
    "Análise e Desenvolvimento de Software",
  ];

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
      <h2 style={{ textAlign: "center" }}>Cadastrar Disciplina</h2>

      <Form>
        <Form.Group controlId="formCurso">
          <Form.Label>Curso</Form.Label>
          <Form.Control
            as="select"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
          >
            <option value="">Selecione um curso</option>
            {cursos.map((curso, index) => (
              <option key={index} value={curso}>
                {curso}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formMateria">
          <Form.Label>Disciplina</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome da disciplina"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
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
            max="60"
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
              console.log(`Adicionando ${materia} ao curso ${curso}.`);
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

export default CadastroDisciplinaForm;
