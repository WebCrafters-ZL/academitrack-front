import React, { useState } from "react";
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
  FaCode,
  FaCalculator,
  FaClipboardCheck,
  FaDatabase,
  FaCogs,
  FaBook,
  FaTable,
  FaCalendar,
  FaTimes,
} from "react-icons/fa";
import fotoPerfil from "../../../assets/aluno.jpeg";
import '../../../styles/index.css';
import axios from "axios";

const BarraLateralAluno = () => {
  const [openDisciplinas, setOpenDisciplinas] = useState(false);

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
          Bigodvisk Ferreira Alcaçuz
        </h3>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>RA: 3240616058</p>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>Período: Manhã</p>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>
          Email: bigodvisk.alcacuz@fatec.sp.gov.br
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
        <FaQuestionCircle
          style={{
            color: "white",
            cursor: "pointer",
            marginRight: "35px",
          }}
          size={30}
        />

        <FaUser
          style={{
            color: "white",
            cursor: "pointer",
            marginRight: "35px",
          }}
          size={30}
        />

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
          to="/aluno-home"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaHome style={{ marginRight: "10px" }} />
          Início
        </ListGroupItem>

        <ListGroupItem
          action
          as={Link}
          to="/aluno-home"
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
            <ListGroupItem
              action
              as={Link}
              to="/disciplinas/materia2"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
                margin: 0,
                border: "none",
              }}
            >
              <FaCode style={{ marginRight: "10px" }} />
              Técnicas de Programação II
            </ListGroupItem>
            <ListGroupItem
              action
              as={Link}
              to="/disciplinas/materia3"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
                margin: 0,
                border: "none",
              }}
            >
              <FaCalculator style={{ marginRight: "10px" }} />
              Algebra Linear
            </ListGroupItem>
            <ListGroupItem
              action
              as={Link}
              to="/disciplinas/materia3"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
                margin: 0,
                border: "none",
              }}
            >
              <FaClipboardCheck style={{ marginRight: "10px" }} />
              Gestão Ágil de Projetos
            </ListGroupItem>
            <ListGroupItem
              action
              as={Link}
              to="/disciplinas/materia3"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
                margin: 0,
                border: "none",
              }}
            >
              <FaDatabase style={{ marginRight: "10px" }} />
              Banco de Dados - Não Relacional
            </ListGroupItem>
            <ListGroupItem
              action
              as={Link}
              to="/disciplinas/materia3"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
                margin: 0,
                border: "none",
              }}
            >
              <FaCogs style={{ marginRight: "10px" }} />
              Engenharia de Software II
            </ListGroupItem>
          </div>
        </Collapse>

        <ListGroupItem
          action
          as={Link}
          to="/aluno-home/notas"
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
          <FaTimes style={{ marginRight: "10px" }} />
          Faltas
        </ListGroupItem>

        <ListGroupItem
          action
          as={Link}
          to="/notas"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaCalendar style={{ marginRight: "10px" }} />
          Calendario Academico
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default BarraLateralAluno;
