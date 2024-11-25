import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const GerenciarTurma = ({ handleClose }) => {
  const [turmas, setTurmas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [turmaIdToDelete, setTurmaIdToDelete] = useState(null);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/administrador/turmas",
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
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/v1/administrador/turmas/${turmaIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTurmas(
        turmas.filter((turma) => turma._id !== turmaIdToDelete)
      );
      Store.addNotification({
        title: "Sucesso!",
        message: `Turma deletada com sucesso.`,
        type: "success",
        insert: "bottom",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true,
        },
      });
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao excluir turma:", error);
      Store.addNotification({
        title: "Erro",
        message: "Erro ao excluir turma. Tente novamente.",
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

  const confirmDelete = (id) => {
    setTurmaIdToDelete(id);
    setShowModal(true);
  };

  const filteredTurmas = turmas.filter((turma) => {
    const disciplinaNome = turma.disciplina?.nome?.toLowerCase() || "";
    const professorNome = turma.professor?.nomeCompleto?.toLowerCase() || "";
    const anoStr = turma.ano.toString();
    const semestreStr = turma.semestre.toString();

    return (
      disciplinaNome.includes(searchText.toLowerCase()) ||
      professorNome.includes(searchText.toLowerCase()) ||
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
      title: "Professor",
      dataIndex: "professor",
      key: "professor",
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
      width: 100,
      render: (_, turma) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            to={`/administrador/academico/gerenciar-turma/editar/${turma._id}`}
            style={{ marginRight: "10px" }}
          >
            <FontAwesomeIcon icon={faPen} style={{ color: "blue" }} />
          </Link>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => confirmDelete(turma._id)}
          />
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
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10000,
        }}
      >
        <ReactNotifications />
      </div>
      <h2 style={{ textAlign: "center" }}>Gerenciar Turmas</h2>

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

      <div style={{ textAlign: "right", marginTop: "0px" }}>
        <Button
          variant="primary"
          as={Link}
          to="/administrador/academico/gerenciar-turma/cadastro-turma"
          onClick={handleClose}
        >
          Adicionar Turma
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            borderBottom: "none",
          }}
        >
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", padding: "2rem" }}>
          <FontAwesomeIcon
            icon={faTrash}
            size="3x"
            color="#ff5252"
            style={{ marginBottom: "1rem" }}
          />
          <p style={{ fontWeight: 500, fontSize: "1.1rem" }}>
            Tem certeza de que deseja excluir esta turma?
          </p>
          <p style={{ color: "gray", fontSize: "0.9rem" }}>
            Essa ação não poderá ser desfeita.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", borderTop: "none" }}>
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
            style={{ marginRight: "1rem" }}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GerenciarTurma;