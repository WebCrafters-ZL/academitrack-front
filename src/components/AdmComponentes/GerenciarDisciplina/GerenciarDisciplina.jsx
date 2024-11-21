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

const GerenciarDisciplina = ({ handleClose }) => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [disciplinaIdToDelete, setDisciplinaIdToDelete] = useState(null);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/administrador/disciplinas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDisciplinas(response.data);
      } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
        Store.addNotification({
          title: "Erro",
          message: "Erro ao buscar disciplinas. Tente novamente mais tarde.",
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

    fetchDisciplinas();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/v1/administrador/disciplinas/${disciplinaIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDisciplinas(disciplinas.filter((disciplina) => disciplina._id !== disciplinaIdToDelete));
      setShowModal(false);
      Store.addNotification({
        title: "Sucesso!",
        message: "Disciplina deletada com sucesso.",
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
    } catch (error) {
      console.error("Erro ao excluir disciplina:", error);
      Store.addNotification({
        title: "Erro",
        message: "Erro ao excluir disciplina. Tente novamente.",
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
    setDisciplinaIdToDelete(id);
    setShowModal(true);
  };

  const filteredDisciplinas = disciplinas.filter(
    (disciplina) =>
      disciplina.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      disciplina.descricao.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Disciplina",
      dataIndex: "nome",
      key: "nome",
      width: 300, // Defina uma largura específica para a coluna de disciplina
    },
    {
      title: "Curso",
      dataIndex: "curso",
      key: "curso",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Carga Horária",
      dataIndex: "cargaHoraria",
      key: "cargaHoraria",
      align: "center",
      width: 50,
    },
    {
      title: "Ação",
      key: "acao",
      align: "center",
      width: 50,
      render: (_, disciplina) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            to={`/administrador/disciplinas/editar/${disciplina._id}`}
            style={{ marginRight: "10px" }}
          >
            <FontAwesomeIcon icon={faPen} style={{ color: "blue" }} />
          </Link>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => confirmDelete(disciplina._id)} // Chama a função confirmDelete ao clicar no ícone de lixeira
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
          position: "relative",
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
        <h2 style={{ textAlign: "center" }}>Gerenciar Disciplinas</h2>
  
        <Input
          placeholder="Pesquisar disciplinas..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: "0px", width: "300px", alignSelf: "center" }}
        />
  
        <Table
          dataSource={filteredDisciplinas.map((disciplina) => ({
            ...disciplina,
            key: disciplina._id,
          }))}
          columns={columns}
          pagination={{
            pageSize: 8,
            showTotal: (total, range) =>
              `${range[0]} a ${range[1]} de ${total} disciplinas`,
          }}
        />
  
        <div style={{ textAlign: "right", marginTop: "0px" }}>
          <Button
            variant="primary"
            as={Link}
            to="/administrador/academico/gerenciar-disciplina/cadastrar-disciplina"
            onClick={handleClose}
          >
            Adicionar Disciplina
          </Button>
        </div>
  
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
        >
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
              Tem certeza de que deseja excluir esta disciplina?
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
  
  export default GerenciarDisciplina;
  