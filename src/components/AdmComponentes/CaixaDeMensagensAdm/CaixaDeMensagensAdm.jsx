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
  Table,
  InputGroup,
  FormControl,
  Button,
  Modal,
  Form,
  Pagination,
} from "react-bootstrap";
import axios from "axios"; // Para fazer as requisições HTTP

const CaixaDeMensagensAdm = ({ show, handleClose, handleSend }) => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    // Função para buscar as mensagens
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/messages"); // Modifique a URL conforme a rota no backend
        setMessages(response.data); // Supondo que a resposta seja uma lista de mensagens
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleSearch = () => {
    alert("Realizando pesquisa...");
  };

  const handleWriteMessage = () => {
    setShowModal(true);
  };

  const handleRowClick = (id) => {
    setSelectedRow(id);
  };

  const handleSendMessage = async () => {
    // Função para enviar a mensagem para o backend
    try {
      await axios.post("/api/messages", {
        subject: "Assunto da mensagem", // Aqui você pode pegar o valor do campo de assunto
        body: message, // Corpo da mensagem
        // Adicionar outros dados necessários
      });
      setShowModal(false);
      setMessage(""); // Limpa a mensagem após o envio
      alert("Mensagem enviada com sucesso!");
      // Refresca a lista de mensagens após o envio
      const response = await axios.get("/api/messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Falha ao enviar a mensagem.");
    }
  };

  const handleDeleteMessage = async (id) => {
    // Função para excluir uma mensagem
    try {
      await axios.delete(`/api/messages/${id}`);
      setMessages(messages.filter((message) => message.id !== id)); // Atualiza o estado local após a exclusão
    } catch (error) {
      console.error("Erro ao excluir mensagem:", error);
      alert("Falha ao excluir a mensagem.");
    }
  };

  const totalMessages = messages.length;
  const displayedMessages = messages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(totalMessages / pageSize);

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
      <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
        Caixa de Mensagens
      </h4>

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
        />
      </InputGroup>

      <Table striped bordered hover responsive style={{ textAlign: "left" }}>
        <thead style={{ backgroundColor: "#f5f5f5", color: "#333" }}>
          <tr>
            <th style={{ width: "25%" }}>
              <FaUser style={{ marginRight: "5px" }} /> De
            </th>
            <th style={{ width: "60%" }}>
              <FaEnvelope style={{ marginRight: "5px" }} /> Assunto
            </th>
            <th style={{ width: "15%" }}>
              <FaCalendarAlt style={{ marginRight: "5px" }} /> Recebido(a)
            </th>
          </tr>
        </thead>

        <tbody>
          {displayedMessages.map((message) => (
            <tr
              key={message.id}
              onClick={() => handleRowClick(message.id)}
              style={{
                position: "relative",
                cursor: "pointer",
                backgroundColor:
                  selectedRow === message.id ? "#e6f7ff" : "transparent",
                borderBottom: "1px solid #ddd",
              }}
            >
              <td style={{ position: "relative", paddingLeft: "10px" }}>
                {selectedRow === message.id && (
                  <div
                    style={{
                      content: "",
                      width: "4px",
                      height: "100%",
                      backgroundColor: "#007bff",
                      position: "absolute",
                      left: "0",
                      top: "0",
                    }}
                  />
                )}
                <span style={{ fontWeight: "bold" }}>{message.from}</span>
              </td>
              <td>{message.subject}</td>
              <td>{message.received}</td>
              <td>
                <FaTrashAlt
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleDeleteMessage(message.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination style={{ justifyContent: "flex-end" }}>
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>

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
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f1f1f1",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Button
            variant="primary"
            onClick={handleSend}
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
          <div style={{ display: "flex", gap: "10px" }}>
            <FaTrashAlt
              style={{ fontSize: "24px", cursor: "pointer", color: "red" }}
              onClick={() => setShowModal(false)}
            />
          </div>
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
          <Form.Group style={{ position: "relative", marginBottom: "15px" }}>
            <InputGroup>
              <InputGroup.Text
                style={{
                  backgroundColor: "#f1f1f1",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                Para
              </InputGroup.Text>
              <FormControl
                placeholder="Digite o destinatário"
                style={{
                  border: "none",
                  borderBottom: "1px solid #ddd",
                  borderRadius: "0",
                }}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <FormControl
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

          <Form.Group>
            <Form.Control
              as="textarea"
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
      </Modal>
    </div>
  );
};

export default CaixaDeMensagensAdm;
