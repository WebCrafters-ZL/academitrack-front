import React from "react";
import { Container, Accordion } from "react-bootstrap";

const FaqProfessor = () => {
  // Exemplo de perguntas e respostas para professores
  const faqData = [
    {
      question: "Como lançar notas dos alunos?",
      answer: "Para lançar as notas, vá até a seção 'Lançamento de Notas', selecione a turma e a disciplina e insira as notas de cada aluno conforme necessário."
    },
    {
      question: "Como posso atualizar o conteúdo das aulas?",
      answer: "Acesse a seção 'Conteúdo das Aulas', selecione a disciplina e edite os materiais disponíveis, incluindo slides, documentos e links de recursos."
    },
    {
      question: "Como envio mensagens para os alunos?",
      answer: "Você pode enviar mensagens pela seção 'Comunicação' no painel do professor, onde é possível selecionar turmas específicas ou enviar mensagens individuais."
    },
    {
      question: "Como criar uma nova atividade de avaliação?",
      answer: "Na seção 'Avaliações', clique em 'Criar Nova Avaliação', preencha os detalhes, como tipo, data e descrição, e atribua-a às turmas desejadas."
    },
    {
      question: "Posso acessar relatórios de desempenho dos alunos?",
      answer: "Sim, acesse 'Relatórios de Desempenho' no painel para visualizar o progresso dos alunos com gráficos e estatísticas detalhadas."
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

export default FaqProfessor;
