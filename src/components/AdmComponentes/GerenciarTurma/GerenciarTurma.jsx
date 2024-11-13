import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

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
      }
    };

    fetchTurmas(); 
    console.log(fetchTurmas());
  }, []);

  const columns = [
    {
      title: "Semestre",
      dataIndex: "semestre",
      key: "semestre",
      align: 'center',
      render: (semestre) => `${semestre}º`, 
      width: 100, 
    },
    {
      title: "Disciplina",
      dataIndex: "disciplina.nome",
      key: "disciplina.nome",
    },
    {
      title: "Professor",
      dataIndex: "professor.nomeCompleto",
      key: "professor.nomeCompleto",
    },
    {
      title: "Ano",
      dataIndex: "ano",
      key: "ano",
      align: 'center',
      width: 100, 
    },
    {
      title: "Ação",
      key: "acao",
      align: 'center',
      width: 100, 
      render: (_, turma) => (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Link to={`/adm-home/turmas/editar/${turma._id}`} style={{ marginRight: "10px" }}>
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

      setTurmas(turmas.filter((turma) => turma._id !== turmaIdToDelete));
      setShowModal(false); 
    } catch (error) {
      console.error("Erro ao excluir turma:", error);
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
        pagination={{ pageSize: 8 }} // Configurando a paginação
      />

      <div style={{ textAlign: "right", marginTop: "0px" }}>
        <Button
          variant="primary"
          as={Link}
          to="/adm-home/academico/gerenciar-turma/cadastro-turma"
          onClick={handleClose}
        >
          Adicionar Turma
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você tem certeza de que deseja excluir esta turma?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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
