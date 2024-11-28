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
import { Store } from "react-notifications-component";
import axios from "axios";

const CaixaDeMensagensAdm = () => {
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
        const response = await axios.get("http://localhost:3000/api/v1/administrador/listar/todas");
        setMessages(response.data);
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
    try {
      // Enviar a mensagem para o backend
      const response = await axios.post("http://localhost:3000/api/v1/administrador/enviar/todas", {
        subject: "Assunto da mensagem", // Você pode pegar esse valor do campo de input, se necessário
        body: message, // Corpo da mensagem
      });
  
      if (response.status === 200) {
        // Exibe notificação de sucesso
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
  
        // Limpa a mensagem após o envio
        setMessage("");
        setShowModal(false);
  
        // Refresca a lista de mensagens após o envio
        const responseMessages = await axios.get("http://localhost:3000/api/v1/administrador/listar/todas");
        setMessages(responseMessages.data);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
  
      // Variáveis para customizar a mensagem de erro
      let errorMessage = "Falha ao enviar a mensagem. Tente novamente.";
  
      if (error.response) {
        // Tratar erros específicos com base no código de status
        if (error.response.status === 400) {
          errorMessage = "Todos os campos obrigatórios devem ser preenchidos.";
        } else if (error.response.status === 401) {
          errorMessage = "Não autorizado. Verifique suas credenciais.";
        } else if (error.response.status === 500) {
          errorMessage = "Erro interno do servidor. Tente novamente mais tarde.";
        } else {
          errorMessage = `Erro inesperado: ${error.response.statusText || "Verifique os dados e tente novamente."}`;
        }
      } else {
        errorMessage = `Erro inesperado: ${error.message}`;
      }
  
      // Exibe notificação de erro
      Store.addNotification({
        title: "Erro",
        message: errorMessage,
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
      await axios.delete(`http://localhost:3000/api/v1/administrador/excluir/todas/${id}`);
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
