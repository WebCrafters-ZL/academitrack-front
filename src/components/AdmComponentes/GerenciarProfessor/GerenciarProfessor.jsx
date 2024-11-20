import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const GerenciarProfessor = ({ handleClose }) => {
  const [professores, setProfessores] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false); // Controle do modal
  const [professorIdToDelete, setProfessorIdToDelete] = useState(null); // ID do professor a ser deletado

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token being used:", token);
        const response = await axios.get(
          "http://localhost:3000/api/v1/administrador/professores",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfessores(response.data); // Armazenar os dados retornados
      } catch (error) {
        console.error("Erro ao buscar professores:", error); // Log de erro
      }
    };

    fetchProfessores(); // Chama a função para buscar os professores
  }, []);

  // Definindo as colunas da tabela
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
      align: 'center',
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
      align: 'center',
      render: (status) => {
        const color = status === "ativo" ? "green" : "red"; // Define a cor com base na situação
        return (
          <span style={{ color }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ); // Formatação e exibição
      },
    },
    {
      title: "Matrícula",
      dataIndex: "matricula",
      key: "matricula",
      width: 150, 
      align: 'center',
    },
    {
      title: "Ação",
      key: "acao",
      width: 100, 
      align: 'center',
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
            {/* Ícone de lápis */}
          </Link>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => confirmDelete(professor._id)} // Abre o modal de confirmação ao clicar no ícone de lixeira
          />
        </div>
      ),
    },
  ];

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/v1/administrador/professores/${professorIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envio do token na requisição
          },
        }
      );

      // Atualize a lista de professores após a exclusão
      setProfessores(
        professores.filter((professor) => professor._id !== professorIdToDelete)
      );
      console.log(
        `Professor com ID: ${professorIdToDelete} deletado com sucesso.`
      );
      setShowModal(false); // Fecha o modal após a confirmação
    } catch (error) {
      console.error("Erro ao excluir professor:", error); // Mensagem de erro ao deletar
    }
  };

  // Função para abrir o modal de confirmação
  const confirmDelete = (id) => {
    setProfessorIdToDelete(id); // Armazena o ID do professor a ser deletado
    setShowModal(true); // Abre o modal
  };

  const filteredProfessores = professores.filter(
    (professor) =>
      professor.nomeCompleto.toLowerCase().includes(searchText.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchText.toLowerCase()) ||
      professor.cpf.includes(searchText)
  );

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
      <h2 style={{ textAlign: "center" }}>Gerenciar Professores</h2>

      <Input
        placeholder="Pesquisar professores..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} // Atualiza o estado com o texto da pesquisa
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
        centered // Centraliza o modal na tela
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
            Tem certeza de que deseja excluir este professor??
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
