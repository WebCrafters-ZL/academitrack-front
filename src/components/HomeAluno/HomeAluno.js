import React from "react";
import './HomeAluno.scss';
import { Card, CardContent, Typography, Grid2 } from '@mui/material';

const HomeAluno = () => {
  return (
    <div className="pagina-aluno">
      <div className="conteudo-aluno">
        <Grid2 container spacing={0} className="cards-aluno"> {/* Alterado spacing para 0 */}
          <Grid2 item xs={12} sm={4}> 
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}> {/* Flexbox para garantir o preenchimento */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">Card 1</Typography>
                <Typography variant="body2">Conteúdo do primeiro card</Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item xs={12} sm={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">Card 2</Typography>
                <Typography variant="body2">Conteúdo do segundo card</Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item xs={12} sm={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">Card 3</Typography>
                <Typography variant="body2">Conteúdo do terceiro card</Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>

        <h1>Bem-vindo à página Home de Aluno, Nelson!</h1>
        <p>Aqui ficarão as informações principais do Aluno Nelson</p>
      </div>
    </div>
  );
};

export default HomeAluno;
