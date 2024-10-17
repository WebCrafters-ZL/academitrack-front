import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, ListGroup, ListGroupItem } from "react-bootstrap";
import Avatar from "react-avatar";
import fotoPerfil from "../../assets/professor.avif";

const BarraLateralAdm = () => {
  const [openDisciplinas, setOpenDisciplinas] = useState(false);

  const handleClickDisciplinas = () => {
    setOpenDisciplinas(!openDisciplinas);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "80px", 
        left: "0",
        width: "300px",
        height: "calc(100vh - 80px)", 
        backgroundColor: "#1976d2",
        color: "white",
        padding: "10px",
        zIndex: "999",
        overflowY: "auto", 
      }}
    >

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <Avatar
          alt="Nelson Firmino Arantes Figado"
          src={fotoPerfil}
          size="135"
          round={true}
        />
        <h3 style={{ fontSize: "1.1rem", margin: "5px 0" }}>Nelson Firmino Arantes Figado</h3>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>RP: 0000000058</p>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>
          Email: nelsinho.frutifero@fatec.sp.gov.br
        </p>
      </div>

      <hr style={{ backgroundColor: "white" }} />
      <h4 style={{ fontSize: "1rem", marginBottom: "10px" }}>Menu</h4>
      <ListGroup variant="flush">
        <ListGroupItem
          action
          as={Link}
          to="/inicio"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <i className="bi bi-house-door" style={{ marginRight: "10px" }}></i>
          Início
        </ListGroupItem>

        <ListGroupItem
          action
          onClick={handleClickDisciplinas}
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <i className="bi bi-book" style={{ marginRight: "10px" }}></i>
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
              style={{ backgroundColor: "transparent", color: "white", paddingLeft: "30px" }}
            >
              Matéria 1
            </ListGroupItem>
            <ListGroupItem
              action
              as={Link}
              to="/disciplinas/materia2"
              style={{ backgroundColor: "transparent", color: "white", paddingLeft: "30px" }}
            >
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
          <i className="bi bi-award" style={{ marginRight: "10px" }}></i>
          Notas
        </ListGroupItem>

        <ListGroupItem
          action
          as={Link}
          to="/faltas"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <i className="bi bi-exclamation-triangle" style={{ marginRight: "10px" }}></i>
          Faltas
        </ListGroupItem>

        <ListGroupItem
          action
          as={Link}
          to="/agenda-avaliacoes"
          style={{ backgroundColor: "transparent", color: "white" }}
        >
          <i className="bi bi-calendar-event" style={{ marginRight: "10px" }}></i>
          Agenda de avaliações
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default BarraLateralAdm;