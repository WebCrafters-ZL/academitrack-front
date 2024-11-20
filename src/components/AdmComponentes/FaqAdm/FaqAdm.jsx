import React from "react";
import { Container, Accordion } from "react-bootstrap";

const FaqAdm = () => {
  const faqData = [
    {
      question: "Como adicionar um novo usuário no sistema?",
      answer: "Para adicionar um novo usuário, vá até a seção 'Usuários' no menu, clique em 'Adicionar Usuário' e preencha as informações necessárias."
    },
    {
      question: "Como redefinir a senha de um usuário?",
      answer: "Acesse a área de 'Gestão de Usuários', selecione o usuário desejado e clique em 'Redefinir Senha'. Você poderá definir uma nova senha temporária."
    },
    {
      question: "Posso exportar os dados dos alunos?",
      answer: "Sim, há uma opção de exportação na seção 'Relatórios'. Você pode exportar os dados dos alunos em formatos como CSV ou PDF."
    },
    {
      question: "Como visualizar o histórico de acesso dos usuários?",
      answer: "No painel de administração, vá para 'Logs de Atividade' para visualizar o histórico de acessos e ações dos usuários no sistema."
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

export default FaqAdm;
