import React from "react";
import { List, ListItem, ListItemText, Box, Divider, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import '../BarraLateral/BarraLateral.scss';
import fotoPerfil from '../../assets/nicolas-cage-perfil.jpg';

const BarraLateral = () => {
  return (
    <Box className="barraLateral">
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
          <ListItem button className="lista-item" component={Link} to="/aluno">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button className="lista-item" component={Link} to="/perfil">
            <ListItemText primary="Perfil" />
          </ListItem>
          <ListItem button className="lista-item" component={Link} to="/cursos">
            <ListItemText primary="Cursos" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default BarraLateral;
