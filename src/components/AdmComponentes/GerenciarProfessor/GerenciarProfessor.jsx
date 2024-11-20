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

const GerenciarProfessor = ({ handleClose }) => {
  const [professores, setProfessores] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [professorIdToDelete, setProfessorIdToDelete] = useState(null);

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/administrador/professores",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfessores(response.data);
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
        Store.addNotification({
          title: "Erro",
          message: "Erro ao buscar professores. Tente novamente mais tarde.",
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

    fetchProfessores();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/v1/administrador/professores/${professorIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfessores(
        professores.filter((professor) => professor._id !== professorIdToDelete)
      );
      Store.addNotification({
        title: "Sucesso!",
        message: `Professor deletado com sucesso.`,
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
      console.error("Erro ao excluir professor:", error);
      Store.addNotification({
        title: "Erro",
        message: "Erro ao excluir professor. Tente novamente.",
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
    setProfessorIdToDelete(id);
    setShowModal(true);
  };

  const filteredProfessores = professores.filter(
    (professor) =>
      professor.nomeCompleto.toLowerCase().includes(searchText.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchText.toLowerCase()) ||
      professor.cpf.includes(searchText)
  );

  const columns = [
    {
      title: "Nome",
      dataIndex: "nomeCompleto",
      key: "nomeCompleto",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
      width: 150,
      align: "center",
      render: (cpf) => {
        return (
          <span>
            {cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
          </span>
        );
      },
    },
    {
      title: "Situação",
      dataIndex: "status",
      key: "status",
      width: 100,
      align: "center",
      render: (status) => {
        const color = status === "ativo" ? "green" : "red";
        return (
          <span style={{ color }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ); 
      },
    },
    {
      title: "Matrícula",
      dataIndex: "matricula",
      key: "matricula",
      width: 150,
      align: "center",
    },
    {
      title: "Ação",
      key: "acao",
      width: 100,
      align: "center",
      render: (_, professor) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            to={`/adm-home/pessoas/gerenciar-professor/editar/${professor._id}`}
            style={{ marginRight: "10px" }}
          >
            <FontAwesomeIcon icon={faPen} style={{ color: "blue" }} />{" "}
          </Link>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => confirmDelete(professor._id)} 
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
      <h2 style={{ textAlign: "center" }}>Gerenciar Professores</h2>

      <Input
        placeholder="Pesquisar professores..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "16px", width: "300px", alignSelf: "center" }}
      />

      <Table
        dataSource={filteredProfessores.map((professor) => ({
          ...professor,
          key: professor._id,
        }))}
        columns={columns}
        pagination={{
          pageSize: 8,
          showTotal: (total, range) =>
            `${range[0]} - ${range[1]} de ${total} professores`,
        }}
      />

      <div style={{ textAlign: "right", marginTop: "0px" }}>
        <Button
          variant="primary"
          as={Link}
          to="/adm-home/pessoas/gerenciar-professor/cadastro-professor"
          onClick={handleClose}
        >
          Adicionar Professor
        </Button>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#1976d2", color: "white", borderBottom: "none" }}
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
            Tem certeza de que deseja excluir este professor?
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

export default GerenciarProfessor;
