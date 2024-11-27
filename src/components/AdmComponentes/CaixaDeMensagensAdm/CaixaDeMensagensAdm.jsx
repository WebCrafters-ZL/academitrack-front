import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaSearch,
} from "react-icons/fa";
import { Table, InputGroup, FormControl, Button, Pagination } from "react-bootstrap";
import styled from "styled-components";

const MessageContainer = styled.div`
  margin-top: 70px;
  margin-left: 315px;
  padding: 20px;
  max-width: calc(100% - 320px);
  height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  border: 2px solid #dcdcdc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled(Table)`
  thead {
    background-color: #f5f5f5;
    color: #333;
    text-align: left;
  }

  tbody tr {
    cursor: pointer;
    transition: background-color 0.1s ease;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }

  td {
    vertical-align: middle;
    padding: 15px;
  }

  td:first-child {
    font-weight: bold;
  }
`;

const SearchBar = styled(InputGroup)`
  margin-bottom: 20px;
  border: 2px solid rgba(0, 123, 255, 0.5); 
  border-radius: 25px;

  /* Efeito de borda ao focar */
  &:focus-within {
    border-color: rgba(0, 123, 255, 0.5) !important; 
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5) !important; 
  }
`;

const SearchInput = styled(FormControl)`
  border: none !important; /* Remove a borda padrão do FormControl */
  background-color: transparent; 

  &:focus {
    outline: none; 
    box-shadow: none; 
  }
`;

const SearchIcon = styled(FaSearch)`
  font-size: 18px;
  cursor: pointer;
`;

const CaixaDeMensagensAdm = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: "John Doe", subject: "Assunto da Mensagem", received: "20 Out" },
    { id: 2, from: "Jane Smith", subject: "Reunião marcada", received: "21 Out" },
    { id: 3, from: "Carlos Silva", subject: "Atualização de projeto", received: "22 Out" },
    { id: 4, from: "Alice Johnson", subject: "Novo projeto iniciado", received: "23 Out" },
    { id: 5, from: "Bob Brown", subject: "Reunião agendada", received: "24 Out" },
    { id: 6, from: "Charlie Green", subject: "Feedback solicitado", received: "25 Out" },
    { id: 7, from: "Diana Prince", subject: "Status do projeto", received: "26 Out" },
    { id: 8, from: "Evan White", subject: "Consulta sobre requisitos", received: "27 Out" },
    { id: 9, from: "Fiona Black", subject: "Atualização de sistema", received: "28 Out" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handleRowClick = (subject) => {
    alert(`Abrindo mensagem: ${subject}`);
  };

  const handleSearch = () => {
    alert("Realizando pesquisa...");
  };

  const handleWriteMessage = () => {
    alert("Escrever nova mensagem...");
  };

  // Paginação
  const totalMessages = messages.length;
  const displayedMessages = messages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(totalMessages / pageSize);

  return (
    <MessageContainer>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Caixa de Mensagens</h2>

      <SearchBar>
        <InputGroup>
          <InputGroup.Text
            style={{
              border: "none",
              backgroundColor: "transparent", 
              padding: "0 10px", 
            }}
            onClick={handleSearch} 
          >
            <SearchIcon />
          </InputGroup.Text>
          <SearchInput
            placeholder="Pesquisar email"
            aria-label="Pesquisar email"
          />
        </InputGroup>
      </SearchBar>

      <StyledTable striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: "22%" }}>
              <FaUser style={{ marginRight: "5px" }} /> De
            </th>
            <th style={{ width: "60%" }}>
              <FaEnvelope style={{ marginRight: "5px" }} /> Assunto
            </th>
            <th style={{ width: "10%" }}>
              <FaCalendarAlt style={{ marginRight: "5px" }} /> Data
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedMessages.map((message) => (
            <tr key={message.id} onClick={() => handleRowClick(message.subject)}>
              <td>{message.from}</td>
              <td>{message.subject}</td>
              <td>{message.received}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      {/* Componente de Paginação no canto inferior direito */}
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      <Button
        variant="primary" 
        onClick={handleWriteMessage}
        style={{ alignSelf: "flex-end", marginTop: "10px" }} 
      >
        <FaEnvelope style={{ marginRight: '5px' }} /> Novo Email
      </Button>
    </MessageContainer>
  );
};

export default CaixaDeMensagensAdm;
