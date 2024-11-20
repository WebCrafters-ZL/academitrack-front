import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const EditarAlunoForm = ({ handleClose }) => {
  const { id } = useParams(); 
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [matricula, setMatricula] = useState("");

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/v1/administrador/alunos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
        Store.addNotification({
          title: "Erro",
          message: "Erro ao buscar dados do aluno.",
          type: "danger",
          insert: "bottom",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 4000,
            onScreen: true,
          },
        });
      }
    };

    fetchAluno();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const alunoData = {
      nomeCompleto,
      email,
      cpf: cpf.replace(/[^\d]/g, ""), // Limpar CPF,
      dataNascimento,
      telefone: telefone.replace(/[^\d]/g, ""), // Limpar telefone
      endereco,
      matricula,
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
        Store.addNotification({
          title: "Sucesso!",
          message: "Aluno atualizado com sucesso!",
          type: "success",
          insert: "bottom",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 4000,
            onScreen: true,
          },
        });

        if (typeof handleClose === "function") handleClose();
      }
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);

      let errorMessage = "Erro ao atualizar o aluno. Tente novamente.";
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Todos os campos obrigatórios devem ser preenchidos.";
        } else if (err.response.status === 401) {
          errorMessage = "Não autorizado. Verifique suas credenciais.";
        } else if (err.response.status === 500) {
          errorMessage =
            "Erro interno do servidor. Tente novamente mais tarde.";
        } else {
          errorMessage = `Erro inesperado: ${
            err.response.statusText || "Verifique os dados e tente novamente."
          }`;
        }
      } else {
        errorMessage = `Erro inesperado: ${err.message}`;
      }

      Store.addNotification({
        title: "Erro",
        message: errorMessage,
        type: "danger",
        insert: "bottom",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true,
        },
      });
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

      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10000,
        }}
      >
        <ReactNotifications />
      </div>

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
          <InputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          >
            {() => (
              <Form.Control placeholder="Digite o CPF do aluno" required />
            )}
          </InputMask>
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
          <InputMask
            mask="(99) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          >
            {() => (
              <Form.Control placeholder="Digite o telefone do aluno" required />
            )}
          </InputMask>
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
            to="/administrador/pessoas/gerenciar-aluno"
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
