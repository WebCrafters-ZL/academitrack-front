/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Grid2,
} from "@mui/material";
import '../styles/Login.scss';  

const Login = () => {
  const enviarFormulario = (event) => {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    const dadosLogin = {
      email: dados.get("email"),
      senha: dados.get("password"),
    };
    console.log(dadosLogin);
  };

  return (
    <div className="login-background"> 
      <Container component="main" maxWidth="xs">
        <Box className="login-container">
          <Typography component="h1" variant="h3" className="login-title">
            Academi<span style={{ color: "#1976d2" }}>Track</span>
          </Typography>
          <Box
            component="form"
            onSubmit={enviarFormulario}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              aria-label="Campo de email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              aria-label="Campo de senha"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-button" 
            >
              Entrar
            </Button>
            <Grid2 container>
              <Grid2 item>
                <a
                  href="#"
                  style={{
                    textDecoration: 'none',
                    color: '#1976d2',
                  }}
                  aria-label="Link para recuperar senha"
                >
                  Esqueci minha senha.
                </a>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
