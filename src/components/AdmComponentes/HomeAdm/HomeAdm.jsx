import React from "react";
import { Container } from "react-bootstrap";

const HomeAdm = () => {
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
        border: "2px solid blue", // Mantendo a borda azul
        borderRadius: "10px", // Adicionando bordas arredondadas
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Bem-vindo ao AcademiTrack
      </h1>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        Prezado(a) Coordenador(a) de Curso,
      </p>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        É com grande satisfação que apresentamos o AcademiTrack, um sistema inovador desenvolvido para facilitar a gestão acadêmica e administrativa de cursos. Este portal foi projetado como uma ferramenta intuitiva e eficiente que visa aprimorar a interação entre professores, alunos e a coordenação.
      </p>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        O AcademiTrack oferece uma série de funcionalidades que visam melhorar a organização do seu curso, possibilitando um acompanhamento detalhado do desempenho dos alunos, gerenciamento de atividades acadêmicas e comunicação ágil com toda a comunidade educacional.
      </p>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        Acreditamos que com o uso do AcademiTrack, você terá uma visão clara do progresso educativo dos alunos, além de facilitar a gestão das informações acadêmicas e administrativas. Este sistema foi desenvolvido com o objetivo de oferecer uma solução prática e acessível para atender as necessidades do seu curso.
      </p>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        Estamos comprometidos em apoiar você e sua equipe durante a implementação e utilização do sistema, garantindo que todos possam explorar ao máximo as suas funcionalidades.
      </p>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        Agradecemos a sua confiança e estamos ansiosos para acompanhá-lo nesta nova jornada, promovendo uma educação de qualidade e alcançando resultados positivos para todos.
      </p>
      <p style={{ textAlign: "justify", padding: "0 20px" }}>
        Atenciosamente,<br />
        A Equipe do AcademiTrack
      </p>
    </Container>
  );
};

export default HomeAdm;
