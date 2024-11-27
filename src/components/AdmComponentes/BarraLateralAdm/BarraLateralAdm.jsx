import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Avatar from "react-avatar";
import {
  FaSignOutAlt,
  FaQuestionCircle,
  FaUser,
  FaHome,
  FaUsers,
  FaBook,
  FaUserCog,
  FaHeadset,
  FaEnvelope, 
} from "react-icons/fa";
import fotoPerfil from "../../../assets/coordenadora.jpeg";
import "../../../styles/index.css";
import axios from "axios";

const BarraLateralAdm = () => {
  const [administrador, setAdministrador] = useState({});
  const [openPessoas, setOpenPessoas] = useState(false);
  const [openDisciplinas, setOpenDisciplinas] = useState(false);

  const handleClickPessoas = () => {
    setOpenPessoas(!openPessoas);
  };

  const handleClickDisciplinas = () => {
    setOpenDisciplinas(!openDisciplinas);
  };

  useEffect(() => {
    const fetchAdministrador = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/administrador/perfil",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAdministrador(response.data);
      } catch (error) {
        console.error("Erro ao retornar dados do administrador:", error);
      }
    };

    fetchAdministrador();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
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
          alt={administrador.nomeCompleto || "Usuário"}
          src={fotoPerfil}
          size="135"
          round={true}
        />
        <h3
          style={{
            fontSize: "1.1rem",
            margin: "5px 0",
            fontWeight: "bold",
            color: "#f5f5f5",
          }}
        >
          {administrador.nomeCompleto || "Nome do Usuário"}
        </h3>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>
          CPF: {administrador.cpf || "00000000000"}
        </p>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>
          E-mail: {administrador.email || "email@exemplo.com"}
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
        <Link to="/administrador/faqadm" style={{ textDecoration: "none" }}>
          <FaQuestionCircle
            style={{
              color: "white",
              cursor: "pointer",
              marginRight: "35px",
            }}
            size={30}
          />
        </Link>

        <Link to="/administrador/perfiladm" style={{ textDecoration: "none" }}>
          <FaUser
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
          border: "none",
        }}
      >
        <ListGroupItem
          action
          as={Link}
          to="/administrador"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaHome style={{ marginRight: "10px" }} />
          Início
        </ListGroupItem>

        <ListGroupItem
          action
          onClick={handleClickPessoas}
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaUsers style={{ marginRight: "10px" }} />
          Pessoas
          <i
            className={`bi ${openPessoas ? "bi-chevron-up" : "bi-chevron-down"}`}
            style={{ float: "right" }}
          ></i>
        </ListGroupItem>

        <Collapse in={openPessoas}>
          <div>
            <ListGroupItem
              action
              as={Link}
              to="/administrador/pessoas/gerenciar-aluno"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
                margin: 0,
                border: "none",
              }}
            >
              <FaUserCog style={{ marginRight: "10px" }} />
              Gerenciar Alunos
            </ListGroupItem>

            <ListGroupItem
              action
              as={Link}
              to="/administrador/pessoas/gerenciar-professor"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
                border: "none",
              }}
            >
              <FaUserCog style={{ marginRight: "10px" }} />
              Gerenciar Professores
            </ListGroupItem>
          </div>
        </Collapse>

        <ListGroupItem
          action
          onClick={handleClickDisciplinas}
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaBook style={{ marginRight: "10px" }} />
          Acadêmico
          <i
            className={`bi ${openDisciplinas ? "bi-chevron-up" : "bi-chevron-down"}`}
            style={{ float: "right" }}
          ></i>
        </ListGroupItem>

        <Collapse in={openDisciplinas}>
          <div>
          <ListGroupItem
              action
              as={Link}
              to="/administrador/academico/gerenciar-curso"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
                margin: 0,
                border: "none",
              }}
            >
              <FaUserCog style={{ marginRight: "10px" }} />
              Gerenciar Cursos
            </ListGroupItem>
            <ListGroupItem
              action
              as={Link}
              to="/administrador/academico/gerenciar-disciplina"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
                border: "none",
              }}
            >
              <FaUserCog style={{ marginRight: "10px" }} />
              Gerenciar Disciplinas
            </ListGroupItem>
            <ListGroupItem
              action
              as={Link}
              to="/administrador/academico/gerenciar-turma"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
                margin: 0,
                border: "none",
              }}
            >
              <FaUserCog style={{ marginRight: "10px" }} />
              Gerenciar Turmas
            </ListGroupItem>
          </div>
        </Collapse>
        <ListGroupItem
          action
          as={Link}
          to="/administrador/caixa-de-mensagens"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaEnvelope style={{ marginRight: "10px" }} />
          Caixa de mensagens
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default BarraLateralAdm;
