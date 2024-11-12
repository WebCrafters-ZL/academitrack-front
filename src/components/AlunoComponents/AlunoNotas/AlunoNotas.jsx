import React from "react";
import { Card, Button, Row, Col, Table } from "react-bootstrap";

const AlunoNotas = ({ handleClose }) => {
  // Dados simulados para as matérias e notas
  const materias = [
    { nome: "Desenvolvimento web III", n1: 8.5, n2: 9.0, n3: 7.0 },
    { nome: "Técnicas de Programação II", n1: 9.0, n2: 10.0, n3: 8.5 },
    { nome: "Álgebra Linear", n1: 7.5, n2: 8.0, n3: 9.2 },
    { nome: "Gestão Ágil de Projetos", n1: 10.0, n2: 9.5, n3: 9.8 },
    { nome: "Banco de Dados - Não Relacional", n1: 8.0, n2: 8.5, n3: 9.0 },
    { nome: "Engenharia de Software II", n1: 9.5, n2: 9.0, n3: 10.0 },
  ];

  // Função para calcular a média final
  const calcularMediaFinal = (n1, n2, n3) => {
    const menorNota = Math.min(n1, n2); // Identificando a menor nota entre N1 e N2
    const novaN3 = n3; // A nota N3
    const mediaFinal =
      (n1 + n2 + (novaN3 !== menorNota ? novaN3 : 0) - menorNota) / 2;
    return mediaFinal.toFixed(2); // Retorna a média com duas casas decimais
  };

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
      <h2 style={{ textAlign: "center" }}>Visualizar Notas</h2>

      <Row xs={1} md={2} lg={3} className="g-4">
        {materias.map((materia, index) => (
          <Col key={index}>
            <Card style={{ height: "100%" }}>
              <Card.Body>
                <Card.Title>{materia.nome}</Card.Title>
                <Table striped bordered hover variant="white">
                  <thead>
                    <tr>
                      <th>Avaliação</th>
                      <th>Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>N1</td>
                      <td>{materia.n1}</td>
                    </tr>
                    <tr>
                      <td>N2</td>
                      <td>{materia.n2}</td>
                    </tr>
                    <tr>
                      <td>N3</td>
                      <td>{materia.n3}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Média Final</strong>
                      </td>
                      <td>
                        <strong>
                          {calcularMediaFinal(
                            materia.n1,
                            materia.n2,
                            materia.n3
                          )}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <div
                  style={{
                    color: "blue",
                    fontSize: "0.8rem",
                    marginTop: "5px",
                    textAlign: "center",
                  }}
                >
                  Cálculo da Média: (N1 + N2 + N3) - menor(N1, N2) / 2
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button variant="danger" onClick={handleClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
};

export default AlunoNotas;
