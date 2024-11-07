import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditarAlunoForm = ({ handleClose }) => {
  const { id } = useParams(); // Obtendo o ID do aluno da URL
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [matricula, setMatricula] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/v1/administrador/alunos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const alunoData = response.data;
        setNomeCompleto(alunoData.nomeCompleto);
        setEmail(alunoData.email);
        setCpf(alunoData.cpf);
        setDataNascimento(alunoData.dataNascimento.substring(0, 10)); // Formato da data
        setTelefone(alunoData.telefone);
        setEndereco(alunoData.endereco);
        setMatricula(alunoData.matricula);
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    };

    fetchAluno(); // Chama a função para buscar os dados do aluno
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const alunoData = {
      nomeCompleto,
      email,
      cpf,
      dataNascimento,
      telefone,
      endereco,
      matricula,
      // Não incluí a senha neste caso, pois não pode ser alterada
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/v1/administrador/alunos/${id}`,
        alunoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessageType("success");
        setMessage("Aluno atualizado com sucesso!");

        if (typeof handleClose === "function") handleClose();

        // Se for mudar de páginas ou limpar campos, faça aqui
      }
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
      setMessageType("error");

      if (err.response) {
        if (err.response.status === 400) {
          setMessage("Todos os campos obrigatórios devem ser preenchidos.");
        } else if (err.response.status === 401) {
          setMessage("Não autorizado. Verifique suas credenciais.");
        } else if (err.response.status === 500) {
          setMessage("Erro interno do servidor. Tente novamente mais tarde.");
        } else {
          setMessage(`Erro inesperado: ${err.response.statusText || "Verifique os dados e tente novamente."}`);
        }
      } else {
        setMessage(`Erro inesperado: ${err.message}`);
      }
    }
  };

  return (
    <div
      style={{
        marginTop: "70px",
        marginLeft: "315px",
        padding: "20px",
        maxWidth: "calc(100% - 320px)",
        height: "calc(100vh - 75px)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflowY: "auto",
        border: "2px solid blue",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Editar Aluno</h2>

      {message && (
        <div
          style={{
            color: messageType === "success" ? "green" : "red",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNomeAluno">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do aluno"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmailAluno">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite o email do aluno"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCpfAluno">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CPF do aluno"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDataNascimentoAluno">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formTelefoneAluno">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o telefone do aluno"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEnderecoAluno">
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o endereço do aluno"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formMatricula">
          <Form.Label>Matrícula</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a matrícula do aluno"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </Form.Group>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button
            as={Link}
            to="/adm-home/pessoas/gerenciar-aluno"
            variant="danger"
            onClick={handleClose}
            style={{ marginRight: "20px" }}
          >
            Voltar
          </Button>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditarAlunoForm;
