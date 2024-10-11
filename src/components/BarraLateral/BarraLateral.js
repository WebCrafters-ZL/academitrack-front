import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Avatar,
  ListItemButton,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";
import fotoPerfil from "../../assets/nicolas-cage-perfil.jpg";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import GradeIcon from "@mui/icons-material/Grade";
import EventIcon from "@mui/icons-material/Event";
import WarningIcon from "@mui/icons-material/Warning";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./BarraLateral.scss";

const BarraLateral = () => {
  const [openDisciplinas, setOpenDisciplinas] = useState(false);

  const handleClickDisciplinas = () => {
    setOpenDisciplinas(!openDisciplinas);
  };

  return (
    <Box className="barra-lateral">
      <Box className="info-aluno">
        <Avatar
          alt="Caio Cesar Silva Pena"
          src={fotoPerfil}
          className="foto-aluno"
        />
        <h3>NICOLAS CAGE</h3>
        <p>RA: 1121352324505</p>
        <p>Ciclo: 3</p>
        <p>PP: 30.30% | PR: 7.43</p>
        <p>Email: nicolas.cagezinho@fatec.sp.gov.br</p>
      </Box>
      <Divider className="custom-divider" />

      <Box className="menu-aluno">
        <h4>Menu</h4>
        <List>
          <ListItem button component={Link} to="/inicio">
            <ListItemIcon className="custom-icon">
              <HomeIcon />
            </ListItemIcon>
            <ListItemText className="custom-icon" primary="Início" />
          </ListItem>

          <ListItem button onClick={handleClickDisciplinas}>
            <ListItemIcon className="custom-icon">
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Disciplinas" />
            {openDisciplinas ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openDisciplinas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/disciplinas/materia1">
                <ListItemText className="custom-icon" primary="Matéria 1" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/disciplinas/materia2">
                <ListItemText className="custom-icon" primary="Matéria 2" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button component={Link} to="/notas">
            <ListItemIcon className="custom-icon">
              <GradeIcon />
            </ListItemIcon>
            <ListItemText className="custom-icon" primary="Notas" />
          </ListItem>

          <ListItem button component={Link} to="/faltas">
            <ListItemIcon className="custom-icon">
              <WarningIcon />
            </ListItemIcon>
            <ListItemText className="custom-icon" primary="Faltas" />
          </ListItem>

          <ListItem button component={Link} to="/agenda-avaliacoes">
            <ListItemIcon className="custom-icon">
              <EventIcon />
            </ListItemIcon>
            <ListItemText  className="custom-icon"primary="Agenda de avaliações" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default BarraLateral;
