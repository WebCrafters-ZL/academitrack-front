import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import {
  FaExclamationTriangle,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import styled from 'styled-components';

const NotificationContainer = styled(Container)`
  border: 2px solid blue;
  padding: 10px;
  border-radius: 10px;
  max-width: 100%;
  height: 80%;
  overflow-y: auto;
  background-color: #f9f9f9; /* Fundo mais suave */
`;

const StyledTable = styled(Table)`
  th {
    background-color: #007bff; /* Cor de fundo para o cabeçalho */
    color: white;
    text-align: center;
  }

  tbody tr {
    cursor: pointer; /* Muda o cursor para indicar que a linha é clicável */
  }

  tbody tr:hover {
    background-color: #e9ecef; /* Efeito ao passar o mouse */
  }
`;

const HomeAluno = () => {
  const handleRowClick = (message) => {
    alert(`Mensagem: ${message}`);
  };

  const notifications = [
    {
      from: 'Mario Sergio',
      subject: 'Boas-vindas ao sistema! Estamos felizes em tê-lo conosco. Explore as funcionalidades e aproveite a sua jornada acadêmica.',
      received: '20 Out',
    },
    {
      from: 'Mario Sergio',
      subject: 'Bem-vindo à sua primeira aula! Lembre-se de verificar as datas de avaliações do semestre no calendário acadêmico.',
      received: '21 Out',
    },
    {
      from: 'Fabiana Alvarenga',
      subject: 'Acesse o novo guia de iniciação ao campus.',
      received: '22 Out',
    },
    {
      from: 'Fabiana Alvarenga',
      subject: 'Participe da sessão de orientação para novos alunos! Uma ótima oportunidade para tirar dúvidas e se integrar à comunidade.',
      received: '23 Out',
    },
    {
      from: 'Fabiana Alvarenga',
      subject: 'Atualização do Sistema: Nova funcionalidade de feedback foi adicionada.',
      received: '24 Out',
    },
    {
      from: 'Mario Sergio',
      subject: 'Não se esqueça de acessar os materiais de aula na plataforma. Eles são essenciais para o seu aprendizado!',
      received: '25 Out',
    },
    {
      from: 'Fabiana Alvarenga',
      subject: 'Inscreva-se nas atividades extracurriculares que estão por vir! Uma excelente maneira de se envolver mais com a universidade.',
      received: '26 Out',
    },
  ];

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

      <NotificationContainer>
        <h4 style={{ textAlign: "center", marginBottom: "15px" }}>
          Caixa de Notificações
        </h4>

        <StyledTable striped bordered hover responsive>
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
            {notifications.map((notification, index) => (
              <tr key={index} onClick={() => handleRowClick(notification.subject)}>
                <td>{notification.from}</td>
                <td>{notification.subject}</td>
                <td>{notification.received}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </NotificationContainer>
    </Container>
  );
};

export default HomeAluno;

