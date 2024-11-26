import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Avatar from "react-avatar";
import {
  FaSignOutAlt,
  FaQuestionCircle,
  FaHome,
  FaUser,
  FaClipboardList,
  FaLaptopCode,
  FaClipboardCheck,
  FaCogs,
  FaBook,
  FaTable,
  FaCalendar,
  FaHeadset, // Ícone para Suporte
} from "react-icons/fa";
import fotoPerfil from "../../../assets/aluno.jpeg";
import "../../../styles/index.css";
import axios from "axios";

const BarraLateralAluno = () => {
  const [aluno, setAluno] = useState({});
  const [openDisciplinas, setOpenDisciplinas] = useState(false);
  

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token não encontrado");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/v1/aluno/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAluno(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchAluno();
  }, []);

  const handleClickDisciplinas = () => {
    setOpenDisciplinas(!openDisciplinas);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Envia o token se estiver utilizando JWT
          },
        }
      );
      localStorage.removeItem("token"); // Remover token após logout
      // Redirecionar para a página de login ou inicial
      window.location.href = "/"; // Certifique-se de ajustar o caminho se necessário
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
      // Aqui você poderia exibir uma mensagem de erro para o usuário
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0px",
        left: "0",
        width: "300px",
        height: "100vh",
        backgroundColor: "#1976d2",
        color: "white",
        padding: "10px",
        zIndex: "999",
        overflowY: "auto",
      }}
    >
      <div
        className="logo"
        style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
      >
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            margin: 0,
          }}
        >
          <span
            style={{ fontWeight: "bold", fontSize: "40px", color: "black" }}
          >
            Academi
          </span>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "40px",
              color: "#f5f5f5",
              marginLeft: "2px",
            }}
          >
            Track
          </span>
        </h1>
      </div>
      <hr
        style={{
          backgroundColor: "white",
          height: "3px",
          width: "80%",
          margin: "20px auto",
          border: "none",
        }}
      />
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <Avatar
          alt="Nelson Firmino Arantes Figado"
          src={fotoPerfil}
          size="135"
          round={true}
        />
        <h3 style={{ fontSize: "1.1rem", margin: "5px 0" }}>
          {aluno.nomeCompleto || "Carregando..."}
        </h3>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>
          RA: {aluno.matricula || "Carregando..."}
        </p>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>
          Email: {aluno.email || "Carregando..."}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <Link to="/aluno/faqaluno" style={{ textDecoration: "none" }}>
          <FaQuestionCircle
            style={{
              color: "white",
              cursor: "pointer",
              marginRight: "35px",
            }}
            size={30}
          />
        </Link>

        <Link to="/aluno/perfilaluno" style={{ textDecoration: "none" }}>
          <FaUser
            style={{
              color: "white",
              cursor: "pointer",
              marginRight: "35px",
            }}
            size={30}
          />
        </Link>

        <Link to="/aluno/feedback-suporte" style={{ textDecoration: "none" }}>
          <FaHeadset
            style={{
              color: "white",
              cursor: "pointer",
              marginRight: "35px",
            }}
            size={30}
          />
        </Link>

        <Button
          variant="danger"
          size="sm"
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          <FaSignOutAlt style={{ marginRight: "8px" }} /> Sair
        </Button>
      </div>

      <hr
        style={{
          backgroundColor: "white",
          height: "3px",
          width: "80%",
          margin: "20px auto",
          border: "none",
        }}
      />
      <h4 style={{ fontSize: "1rem", marginBottom: "10px" }}>Menu</h4>
      <ListGroup
        variant="flush"
        className="custom-list-group"
        style={{
          maxHeight: "450px",
          overflowY: "auto",
          backgroundColor: "transparent",
        }}
      >
        <ListGroupItem
          action
          as={Link}
          to="/aluno"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaHome style={{ marginRight: "10px" }} />
          Início
        </ListGroupItem>

        <ListGroupItem
          action
          as={Link}
          to="/aluno"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaTable style={{ marginRight: "10px" }} />
          Grade
        </ListGroupItem>

        <ListGroupItem
          action
          onClick={handleClickDisciplinas}
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaBook style={{ marginRight: "10px" }} />
          Disciplinas
          <i
            className={`bi ${
              openDisciplinas ? "bi-chevron-up" : "bi-chevron-down"
            }`}
            style={{ float: "right" }}
          ></i>
        </ListGroupItem>

        <Collapse in={openDisciplinas}>
          <div>
            <ListGroupItem
              action
              as={Link}
              to="/disciplinas/materia1"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
                margin: 0,
                border: "none",
              }}
            >
              <FaLaptopCode style={{ marginRight: "10px" }} />
              Desenvolvimento web III
            </ListGroupItem>
            {/* Adicione outras disciplinas conforme necessário */}
          </div>
        </Collapse>

        <ListGroupItem
          action
          as={Link}
          to="/aluno/notas"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaClipboardList style={{ marginRight: "10px" }} />
          Notas
        </ListGroupItem>

        <ListGroupItem
          action
          as={Link}
          to="/notas"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaClipboardCheck style={{ marginRight: "10px" }} />
          Faltas
        </ListGroupItem>

        <ListGroupItem
          action
          as={Link}
          to="/aluno/tarefas"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaCogs style={{ marginRight: "10px" }} />
          Tarefas
        </ListGroupItem>

        <ListGroupItem
          action
          as={Link}
          to="/aluno/calendario"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaCalendar style={{ marginRight: "10px" }} />
          Calendário
        </ListGroupItem>

        <ListGroupItem
          action
          as={Link}
          to="/aluno/configuracoes"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaCogs style={{ marginRight: "10px" }} />
          Configurações
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default BarraLateralAluno;
