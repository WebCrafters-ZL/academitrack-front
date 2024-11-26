import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Registrar os elementos necessários
ChartJS.register(ArcElement, Tooltip, Legend);

const GerarGrafico = () => {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/v1/administrador/turmas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTurmas(response.data); // Armazenando os dados das turmas
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchTurmas();
  }, []);

  // Processar dados do gráfico
  const semestresCount = turmas.reduce((acc, turma) => {
    const semestre = turma.semestre;
    acc[semestre] = (acc[semestre] || 0) + 1; // Contando quantas turmas existem por semestre
    return acc;
  }, {});

  const data = {
    labels: Object.keys(semestresCount).map(sem => `${sem}º Semestre`),
    datasets: [
      {
        label: "# de Turmas",
        data: Object.values(semestresCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",  // Cor para o 1º semestre
          "rgba(54, 162, 235, 0.6)",   // Cor para o 2º semestre
          "rgba(255, 206, 86, 0.6)",    // Cor para o 3º semestre
          "rgba(75, 192, 192, 0.6)",    // Cor para o 4º semestre
          "rgba(153, 102, 255, 0.6)",   // Cor para o 5º semestre
          "rgba(255, 159, 64, 0.6)",     // Cor para o 6º semestre
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",  // Cor para o 1º semestre
          "rgba(54, 162, 235, 1)",   // Cor para o 2º semestre
          "rgba(255, 206, 86, 1)",    // Cor para o 3º semestre
          "rgba(75, 192, 192, 1)",    // Cor para o 4º semestre
          "rgba(153, 102, 255, 1)",   // Cor para o 5º semestre
          "rgba(255, 159, 64, 1)",     // Cor para o 6º semestre
        ],
        borderWidth: 1,
      },
    ],
  };


  const handleBack = () => {
    navigate(-1); // Navega para a página anterior
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibir uma mensagem de carregamento enquanto os dados estão sendo buscados
  }

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
        Gráfico de Turmas por Semestre
      </h1>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
        <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} style={{ maxHeight: "300px", maxWidth: "300px" }} />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button variant="primary" onClick={handleBack}>
          Voltar
        </Button>
      </div>
    </Container>
  );
};

export default GerarGrafico;
