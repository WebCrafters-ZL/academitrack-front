import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const CadastroAlunoForm = ({ handleClose }) => {
  // Definição da função para gerar senha aleatória
  const gerarSenhaAleatoria = (tamanho) => {
    const caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let senha = "";
    for (let i = 0; i < tamanho; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      senha += caracteres[indice];
    }
    return senha;
  };

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [curso, setCurso] = useState("");
  const [periodo, setPeriodo] = useState("1");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState(gerarSenhaAleatoria(8));
  const [error, setError] = useState("");

  const dataMatricula = new Date().toISOString().split("T")[0];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Verifica se o campo de email não está vazio e gera a senha
    if (e.target.value) {
      const novaSenha = gerarSenhaAleatoria(8); // Gera uma nova senha com 8 caracteres
      setSenha(novaSenha);
    } else {
      setSenha(""); // Limpa a senha se o email for removido
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const alunoData = {
      nomeCompleto,
      email,
      senha,
      matricula,
      cpf,
      dataNascimento,
      telefone,
      curso,
      periodo,
      dataMatricula,
    };

    try {
      // Obter o token do localStorage
      const token = localStorage.getItem("token");

      // Substitua esta URL pela URL correta para o seu back-end
      const response = await axios.post(
        "http://localhost:3000/api/v1/administrador/alunos",
        alunoData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Inclui o token na header da requisição
          },
        }
      );

      console.log(response.data); // Aqui você pode adicionar lógica após o cadastro
      handleClose(); // Fecha o formulário após o sucesso
    } catch (err) {
      console.error(err);
      setError(
        "Erro ao cadastrar aluno. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <div
      style={{
        marginTop: "70px",
        marginLeft: "315px",
        padding: "20px",
        maxWidth: "calc(100% - 320px)",
        height: `calc(100vh - 75px)`,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflowY: "auto",
        border: "2px solid blue",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Cadastro de Aluno</h2>

      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNomeAluno">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do aluno"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmailAluno">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite o email do aluno"
            value={email}
            onChange={handleEmailChange} // Usando a função que gera a senha ao preencher o email
            required
          />
        </Form.Group>

        <Form.Group
          controlId="formSenhaAluno"
          style={{ display: "none" }} 
        >
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="text"
            placeholder="Senha gerada"
            value={senha} 
            disabled 
          />
        </Form.Group>

        <Form.Group controlId="formMatricula">
          <Form.Label>Matrícula</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a matrícula do aluno"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCpfAluno">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CPF do aluno"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDataNascimentoAluno">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTelefoneAluno">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o telefone do aluno"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCursoAluno">
          <Form.Label>Curso</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o curso do aluno"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPeriodoAluno">
          <Form.Label>Período</Form.Label>
          <Form.Control
            as="select"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="1">Manhã</option>
            <option value="2">Tarde</option>
            <option value="3">Noite</option>
          </Form.Control>
        </Form.Group>

        {/* Campo oculto para dataMatricula */}
        <input type="hidden" value={new Date().toISOString().split("T")[0]} />

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button
            variant="danger"
            onClick={handleClose}
            style={{ marginRight: "20px" }}
          >
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CadastroAlunoForm;
