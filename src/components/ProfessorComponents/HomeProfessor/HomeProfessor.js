import React from "react";
import { Container } from "react-bootstrap";

const HomeProfessor = () => {
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
        borderRadius: "10px"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Bem-vindo ao AcademiTrack
      </h1>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        Prezado(a) Professor(a),
      </p>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        É com grande satisfação que apresentamos o AcademiTrack, um sistema fantástico desenvolvido para apoiar a gestão acadêmica e administrativa no seu dia a dia. Este portal foi criado com o objetivo de simplificar suas atividades, ajudar no acompanhamento do desempenho dos alunos e promover uma comunicação efetiva com os mesmos e com a coordenação.
      </p>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        Com o AcademiTrack, você poderá:
      </p>
      <ul style={{ padding: "0 20px" }}>
        <li>
          <strong>Gerenciar suas Aulas:</strong> Organize o calendário de aulas, consulte horários e tenha acesso rápido ao conteúdo programático.
        </li>
        <li>
          <strong>Acompanhar o Desempenho dos Alunos:</strong> Visualize relatórios e gráficos que demonstrem o progresso dos alunos, facilitando a identificação dos que necessitam de suporte adicional.
        </li>
        <li>
          <strong>Comunicar-se com Alunos:</strong> Envie mensagens e notificações importantes, garantindo que todos estejam informados sobre atividades e avaliações.
        </li>
        <li>
          <strong>Registrar Notas e Frequência:</strong> Facilite o registro de notas e controle de frequência, tornando a violência administrativa mais eficiente.
        </li>
        <li>
          <strong>Participar em Fóruns e Discussões:</strong> Utilize espaços colaborativos para interagir com seus colegas e compartilhar melhores práticas de ensino.
        </li>
      </ul>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        Acreditamos que, com o uso do AcademiTrack, sua experiência como professor será enriquecida, permitindo que você se concentre no que realmente importa: o sucesso dos alunos. Estamos comprometidos em fornecer todo o suporte necessário para a implementação e utilização do sistema.
      </p>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        Agradecemos a sua dedicação e estamos entusiasmados em acompanhá-lo(a) nesta jornada de inovação e excelência educacional.
      </p>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        Atenciosamente,<br />
        A Equipe do AcademiTrack
      </p>
    </Container>
  );
};

export default HomeProfessor;
