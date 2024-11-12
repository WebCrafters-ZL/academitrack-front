import React from "react";
import { Container, Accordion } from "react-bootstrap";

const FaqAluno = () => {
  // Exemplo de perguntas e respostas para alunos
  const faqData = [
    {
      question: "Como faço para acessar minhas notas?",
      answer: "Para acessar suas notas, vá até a seção 'Notas' no painel de controle e selecione o período letivo desejado."
    },
    {
      question: "Como me inscrever em uma nova disciplina?",
      answer: "Acesse a seção 'Matrícula', selecione as disciplinas disponíveis e clique em 'Confirmar Inscrição'. Certifique-se de que cumpre os pré-requisitos."
    },
    {
      question: "Posso alterar meus dados pessoais?",
      answer: "Sim, você pode editar suas informações pessoais na seção 'Perfil'. Alguns dados podem necessitar de validação pela secretaria."
    },
    {
      question: "Como posso entrar em contato com um professor?",
      answer: "Na seção 'Contatos' ou 'Minhas Turmas', você encontrará as informações de contato dos professores e poderá enviar mensagens através do sistema."
    },
    {
      question: "O que fazer se eu esquecer minha senha?",
      answer: "Clique em 'Esqueceu a senha?' na página de login e siga as instruções para redefini-la por meio de seu e-mail cadastrado."
    }
  ];

  return (
    <Container 
      fluid 
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
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        FAQ - Perguntas e Respostas
      </h1>
      
      <Accordion defaultActiveKey="0">
        {faqData.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{item.question}</Accordion.Header>
            <Accordion.Body>{item.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default FaqAluno;
