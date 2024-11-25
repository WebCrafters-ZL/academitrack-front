import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const Turmas = ({ professorId }) => {
  const [turmas, setTurmas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [turmaIdToView, setTurmaIdToView] = useState(null);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/v1/professor/${professorId}/turmas`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTurmas(response.data);
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        Store.addNotification({
          title: "Erro",
          message: "Erro ao buscar turmas.",
          type: "danger",
          insert: "bottom",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 4000,
            onScreen: true,
          },
        });
      }
    };

    fetchTurmas();
  }, [professorId]);

  const handleViewDetails = (id) => {
    setTurmaIdToView(id);
    // Implement logic to view details (e.g. redirecting to a detailed view or showing a modal)
  };

  const filteredTurmas = turmas.filter((turma) => {
    const disciplinaNome = turma.disciplina?.nome?.toLowerCase() || "";
    const anoStr = turma.ano.toString();
    const semestreStr = turma.semestre.toString();

    return (
      disciplinaNome.includes(searchText.toLowerCase()) ||
      anoStr.includes(searchText) ||
      semestreStr.includes(searchText)
    );
  });

  const columns = [
    {
      title: "Semestre",
      dataIndex: "semestre",
      key: "semestre",
      align: "center",
      render: (semestre) => `${semestre}º`,
      width: 100,
    },
    {
      title: "Disciplina",
      dataIndex: "disciplina",
      key: "disciplina",
    },
    {
      title: "Ano",
      dataIndex: "ano",
      key: "ano",
      align: "center",
      width: 100,
    },
    {
      title: "Ação",
      key: "acao",
      align: "center",
      width: 150,
      render: (_, turma) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button variant="link" onClick={() => handleViewDetails(turma._id)}>
            <FontAwesomeIcon icon={faEye} style={{ color: "blue" }} />
            Visualizar Mais
          </Button>
          <Button as={Link} to={`/presenca/${turma._id}`} variant="secondary">Lançar Presença</Button>
          <Button as={Link} to={`/notas/${turma._id}`} variant="secondary">Lançar Nota</Button>
        </div>
      ),
    },
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
            <div style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10000,
        }}>
        <ReactNotifications />
      </div>
      <h2 style={{ textAlign: "center" }}>Minhas Turmas</h2>

      <Input
        placeholder="Pesquisar turmas..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "16px", width: "300px", alignSelf: "center" }}
      />

      <Table
        dataSource={filteredTurmas.map((turma) => ({
          ...turma,
          key: turma._id,
        }))}
        columns={columns}
        pagination={{
          pageSize: 8,
          showTotal: (total, range) =>
            `${range[0]} a ${range[1]} de ${total} turmas`,
        }}
      />
    </div>
  );
};

export default Turmas;

         
