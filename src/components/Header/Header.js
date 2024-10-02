import React from "react";
import { Button, Box, Typography } from "@mui/material";
import './Header.scss';

const Header = () => {
  return (
    <Box className="header">
      <div className="logo">
        <Typography component="h1" variant="h3" className="login-title">
          <span className="academi-bold">Academi</span>
          <span className="track-bold">Track</span>
        </Typography>
      </div>
      <div className="logout">
        <Button variant="contained" color="secondary">
          Sair
        </Button>
      </div>
    </Box>
  );
};

export default Header;
