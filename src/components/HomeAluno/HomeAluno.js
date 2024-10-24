import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import {
  FaExclamationTriangle,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";

const HomeAluno = () => {
  return (
    <Container
      fluid
      style={{
        marginTop: "70px",
        marginLeft: "315px",
        padding: "0px",
        maxWidth: "calc(100% - 320px)",
        height: `calc(100vh - 75px)`,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflowY: "auto",
      }}
    >
      <Container
        style={{
          border: "2px solid blue",
          maxWidth: "100%",
          maxHeight: "35%",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h4 style={{ textAlign: "center", marginBottom: "15px" }}>
          Próximas Avaliações
        </h4>
        <Row>
          <Col>
            <Card style={{ border: "2px solid blue", height: "100%" }}>
              <Card.Body style={{ display: "flex", alignItems: "center" }}>
                <FaExclamationTriangle
                  style={{
                    fontSize: "40px",
                    color: "red",
                    marginRight: "15px",
                  }}
                />
                <div>
                  <Card.Title>Estrutura de Dados</Card.Title>
                  <Card.Text>
                    <strong>Data:</strong> 28/10/2024
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ border: "2px solid blue", height: "100%" }}>
              <Card.Body style={{ display: "flex", alignItems: "center" }}>
                <FaExclamationTriangle
                  style={{
                    fontSize: "40px",
                    color: "red",
                    marginRight: "15px",
                  }}
                />
                <div>
                  <Card.Title>Gestão Ágil de Projetos de Software</Card.Title>
                  <Card.Text>
                    <strong>Data:</strong> 29/10/2024
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ border: "2px solid blue", height: "100%" }}>
              <Card.Body style={{ display: "flex", alignItems: "center" }}>
                <FaExclamationTriangle
                  style={{
                    fontSize: "40px",
                    color: "red",
                    marginRight: "15px",
                  }}
                />
                <div>
                  <Card.Title>Desenvolvimento Web III</Card.Title>
                  <Card.Text>
                    <strong>Data:</strong> 30/10/2024
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container
        style={{
          border: "2px solid blue",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "100%",
          height: "80%",
          overflowY: "auto",
        }}
      >
        <h4 style={{ textAlign: "center", marginBottom: "15px" }}>
          Caixa de Notificações
        </h4>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: "25%" }}>
                <FaUser style={{ marginRight: "5px" }} /> De
              </th>
              <th style={{ width: "60%" }}>
                <FaEnvelope style={{ marginRight: "5px" }} /> Assunto
              </th>
              <th style={{ width: "15%" }}>
                <FaCalendarAlt style={{ marginRight: "5px" }} /> Recebido(a)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mario Sergio</td>
              <td>
                Boas-vindas ao sistema! Estamos felizes em tê-lo conosco.
                Explore as funcionalidades e aproveite a sua jornada acadêmica.
              </td>
              <td>20 Out</td>
            </tr>
            <tr>
              <td>Mario Sergio</td>
              <td>
                Bem-vindo à sua primeira aula! Lembre-se de verificar as datas
                de avaliações do semestre no calendário acadêmico.
              </td>
              <td>21 Out</td>
            </tr>
            <tr>
              <td>Fabiana Alvarenga</td>
              <td>
                Acesse o novo guia de iniciação ao campus. 
              </td>
              <td>22 Out</td>
            </tr>
            <tr>
              <td>Fabiana Alvarenga</td>
              <td>
                Participe da sessão de orientação para novos alunos! Uma ótima
                oportunidade para tirar dúvidas e se integrar à comunidade.
              </td>
              <td>23 Out</td>
            </tr>
            <tr>
              <td>Fabiana Alvarenga</td>
              <td>
                Atualização do Sistema: Nova funcionalidade de feedback foi
                adicionada. 
              </td>
              <td>24 Out</td>
            </tr>
            <tr>
              <td>Mario Sergio</td>
              <td>
                Não se esqueça de acessar os materiais de aula na plataforma.
                Eles são essenciais para o seu aprendizado!
              </td>
              <td>25 Out</td>
            </tr>
            <tr>
              <td>Fabiana Alvarenga</td>
              <td>
                Inscreva-se nas atividades extracurriculares que estão por vir!
                Uma excelente maneira de se envolver mais com a universidade.
              </td>
              <td>26 Out</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default HomeAluno;
