import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaSearch,
  FaPlus,
  FaPaperPlane,
  FaTrashAlt,
} from "react-icons/fa";
import {
  InputGroup,
  FormControl,
  Button,
  Modal,
  Form,
  Pagination,
} from "react-bootstrap";
import { Table } from "antd";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import axios from "axios";

const CaixaDeMensagensAdm = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [showModal, setShowModal] = useState(false);
  const [assunto, setAssunto] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/administrador/mensagens/listar/todas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setMessages(response.data);
        console.log("Dados das Mensagens:", response.data);
        setFilteredMessages(response.data); // Inicializa as mensagens filtradas
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
        Store.addNotification({
          title: "Erro",
          message: "Erro ao buscar mensagens. Tente novamente mais tarde.",
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

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/administrador/mensagens/enviar/todas",
        {
          assunto,
          conteudo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Store.addNotification({
          title: "Sucesso!",
          message: "Mensagem enviada com sucesso!",
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
        setAssunto("");
        setConteudo("");
        setShowModal(false);

        const responseMessages = await axios.get(
          "http://localhost:3000/api/v1/administrador/mensagens/listar/todas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(responseMessages.data);
        setFilteredMessages(responseMessages.data);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      Store.addNotification({
        title: "Erro",
        message: "Erro ao enviar mensagem. Tente novamente mais tarde.",
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

  const handleDeleteMessage = async (id) => {
    // Função para excluir uma mensagem
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/v1/administrador/mensagens/excluir/todas/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(messages.filter((message) => message.id !== id)); // Atualiza o estado local após a exclusão
    } catch (error) {
      console.error("Erro ao excluir mensagem:", error);
      Store.addNotification({
        title: "Erro",
        message: "Falha ao excluir a mensagem. Tente novamente.",
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

  const handleSearch = () => {
    const filtered = messages.filter((message) => {
      const remetente = message.remetente?.nome?.toLowerCase() || "";
      const assunto = message.assunto?.toLowerCase() || "";
      const dataEnvio = new Date(message.dataEnvio).toLocaleDateString();

      return (
        remetente.includes(searchText.toLowerCase()) ||
        assunto.includes(searchText.toLowerCase()) ||
        dataEnvio.includes(searchText)
      );
    });
    setFilteredMessages(filtered);
  };
  const handleWriteMessage = () => {
    setShowModal(true);
  };

  

  const columns = [
    {
      title: "De",
      dataIndex: "remetente", 
      key: "remetente",
      render: (remetente) => (
        <span style={{ fontWeight: "bold" }}>
          <FaUser style={{ marginRight: "5px" }} />
          {remetente}
        </span>
      ),
      width: "25%",
    },
    {
      title: "Assunto",
      dataIndex: "assunto", // Campo assunto do modelo
      key: "assunto",
      render: (assunto) => (
        <span>
          <FaEnvelope style={{ marginRight: "5px" }} />
          {assunto}
        </span>
      ),
      width: "60%",
    },
    {
      title: "Recebido(a)",
      dataIndex: "dataEnvio", // Usando dataEnvio como a data de recebimento
      key: "dataEnvio",
      render: (dataEnvio) => (
        <span>
          <FaCalendarAlt style={{ marginRight: "5px" }} />
          {new Date(dataEnvio).toLocaleDateString()} {/* Formatando a data */}
        </span>
      ),
      width: "15%",
    },
    {
      title: "Ação",
      key: "acao",
      align: "center",
      render: (_, message) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaTrashAlt
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleDeleteMessage(message.id)}
          />
        </div>
      ),
      width: 100,
    },
  ];

  return (
    <div
      style={{
        marginTop: "70px",
        marginLeft: "315px",
        padding: "20px",
        maxWidth: "calc(100% - 320px)",
        height: "calc(100vh - 75px)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflowY: "auto",
        border: "2px solid blue",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Caixa de Mensagens
      </h2>

      <InputGroup
        style={{
          marginBottom: "20px",
          border: "2px solid rgba(0, 123, 255, 0.5)",
          borderRadius: "25px",
        }}
      >
        <InputGroup.Text
          style={{
            border: "none",
            backgroundColor: "transparent",
            padding: "0 10px",
            cursor: "pointer",
          }}
          onClick={handleSearch}
        >
          <FaSearch style={{ fontSize: "18px" }} />
        </InputGroup.Text>
        <FormControl
          style={{
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
            boxShadow: "none",
          }}
          placeholder="Pesquisar email"
          aria-label="Pesquisar email"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>

      <Table
        dataSource={filteredMessages.map((msg) => ({ ...msg, key: msg.id }))}
        columns={columns}
        pagination={{
          pageSize,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
        }}
      />

      <Button
        variant="primary"
        onClick={handleWriteMessage}
        style={{ alignSelf: "flex-end", marginTop: "10px" }}
      >
        <FaPlus style={{ marginRight: "5px" }} /> Escrever Mensagem
      </Button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        style={{ borderRadius: "8px" }}
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            borderBottom: "none",
          }}
        >
          <Modal.Title>Escrever Mensagem para Turmas</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Form.Group controlId="formAssunto">
            <FormControl
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              placeholder="Adicionar um assunto"
              style={{
                border: "none",
                borderBottom: "1px solid #ddd",
                borderRadius: "0",
                fontSize: "16px",
                padding: "10px",
              }}
            />
          </Form.Group>

          <Form.Group controlId="formConteudo">
            <Form.Control
              as="textarea"
              rows={10}
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              placeholder="Escreva sua mensagem aqui..."
              style={{
                border: "none",
                borderBottom: "1px solid #ddd",
                fontSize: "14px",
                padding: "10px",
                resize: "none",
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
           <Button
            variant="primary"
            onClick={handleSendMessage}
            style={{
              backgroundColor: "#007bff",
              width: "100px",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
            }}
          >
            <FaPaperPlane style={{ marginRight: "5px" }} /> Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CaixaDeMensagensAdm;
