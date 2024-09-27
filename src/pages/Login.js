import React from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Grid2,
} from "@mui/material";

const Login = () => {
  const enviarFormulario = (event) => {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    const dadosLogin = {
      email: dados.get('email'),
      senha: dados.get('password'),
    };
    console.log(dadosLogin);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={enviarFormulario} noValidate sx={{ mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField 
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          />
          <Button 
          type="submit"
          fullWidth
          variant="contained"
          sx= {{mt: 3, mb: 2}}
          >
            Entrar
          </Button>
          <Grid2 container>
            <Grid2 item>
            <a href="#">Não lembra a senha? Recuperara senha</a>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
