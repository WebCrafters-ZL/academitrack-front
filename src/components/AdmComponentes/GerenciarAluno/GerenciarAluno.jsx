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

const GerenciarAluno = ({ handleClose }) => {
  const [alunos, setAlunos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [alunoIdToDelete, setAlunoIdToDelete] = useState(null);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/administrador/alunos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAlunos(response.data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        Store.addNotification({
          title: "Erro",
          message: "Erro ao buscar alunos. Tente novamente mais tarde.",
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

    fetchAlunos();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/v1/administrador/alunos/${alunoIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlunos(alunos.filter((aluno) => aluno._id !== alunoIdToDelete));
      setShowModal(false);
      Store.addNotification({
        title: "Sucesso!",
        message: "Aluno deletado com sucesso.",
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
      console.error("Erro ao excluir aluno:", error);
      Store.addNotification({
        title: "Erro",
        message: "Erro ao excluir aluno. Tente novamente.",
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
    setAlunoIdToDelete(id);
    setShowModal(true);
  };

  const filteredAlunos = alunos.filter(
    (aluno) =>
      aluno.nomeCompleto.toLowerCase().includes(searchText.toLowerCase()) ||
      aluno.email.toLowerCase().includes(searchText.toLowerCase()) ||
      aluno.cpf.includes(searchText)
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
      align: "center",
    },
    {
      title: "Ação",
      key: "acao",
      align: "center",
      render: (_, aluno) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            to={`/adm-home/pessoas/gerenciar-aluno/editar/${aluno._id}`}
            style={{ marginRight: "10px" }}
          >
            <FontAwesomeIcon icon={faPen} style={{ color: "blue" }} />
          </Link>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => confirmDelete(aluno._id)} 
          />{" "}
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
      <h2 style={{ textAlign: "center" }}>Gerenciar Alunos</h2>

      <Input
        placeholder="Pesquisar alunos..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "0px", width: "300px", alignSelf: "center" }}
      />

      <Table
        dataSource={filteredAlunos.map((aluno) => ({
          ...aluno,
          key: aluno._id,
        }))}
        columns={columns}
        pagination={{
          pageSize: 8,
          showTotal: (total, range) =>
            `${range[0]} a ${range[1]} de ${total} alunos`,
        }}
      />

      <div style={{ textAlign: "right", marginTop: "0px" }}>
        <Button
          variant="primary"
          as={Link}
          to="/administrador/pessoas/gerenciar-aluno/cadastro-aluno"
          onClick={handleClose}
        >
          Adicionar Aluno
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
            Tem certeza de que deseja excluir este aluno?
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

export default GerenciarAluno;
