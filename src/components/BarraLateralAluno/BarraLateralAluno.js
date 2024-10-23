import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Avatar from "react-avatar";
import { FaSignOutAlt, FaQuestionCircle, FaHome, FaUsers, FaUser, FaUserGraduate, FaClipboardList } from "react-icons/fa"; 
import fotoPerfil from "../../assets/professor.avif";

const BarraLateralAluno = () => {
  const [openDisciplinas, setOpenDisciplinas] = useState(false);

  const handleClickDisciplinas = () => {
    setOpenDisciplinas(!openDisciplinas);
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
          Bigodvisk Ferreira
        </h3>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>RA: 3240616058</p>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>
          Email: bigodvisk.ferreira@fatec.sp.gov.br
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
            marginRight: "55px", 
          }}
          size={30}
        />

        <Button
          variant="danger"
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          // Pode adicionar o onClick lógico aqui depois
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
      <ListGroup variant="flush">
        <ListGroupItem
          action
          as={Link}
          to="/inicio"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaHome style={{ marginRight: "10px" }} />
          Início
        </ListGroupItem>

        <ListGroupItem
          action
          onClick={handleClickDisciplinas}
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaUsers style={{ marginRight: "10px" }} />
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
              }}
            >
              <FaUser style={{ marginRight: "10px" }} />
              Matéria 1
            </ListGroupItem>
            <ListGroupItem
              action
              as={Link}
              to="/disciplinas/materia2"
              style={{
                backgroundColor: "transparent",
                color: "white",
                paddingLeft: "30px",
              }}
            >
              <FaUserGraduate style={{ marginRight: "10px" }} />
              Matéria 2
            </ListGroupItem>
          </div>
        </Collapse>

        <ListGroupItem
          action
          as={Link}
          to="/notas"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <FaClipboardList style={{ marginRight: "10px" }} />
          Notas
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default BarraLateralAluno;
