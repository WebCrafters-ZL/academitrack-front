import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";

const CadastroAlunoForm = ({ handleClose }) => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Remover a formatação do CPF e telefone
    const cleanCpf = cpf.replace(/[^\d]/g, ""); // Remove tudo que não é dígito
    const cleanTelefone = telefone.replace(/[^\d]/g, ""); // Remove tudo que não é dígito
  
    const alunoData = {
      nomeCompleto,
      email,
      senha,
      matricula,
      cpf: cleanCpf, // Enviando apenas números limpos
      dataNascimento,
      telefone: cleanTelefone, // Enviando apenas números limpos
      endereco,
    };
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/administrador/alunos",
        alunoData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envio do token na requisição
          },
        }
      );
  
      if (response.status === 201) {
        // Exibe uma notificação de sucesso
        toast.success(response.data.message || "Aluno cadastrado com sucesso!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: "bounce",
        });
  
        // Fechar o formulário se a função handleClose estiver disponível
        if (typeof handleClose === "function") handleClose();
  
        // Limpa os campos do formulário
        setNomeCompleto("");
        setEmail("");
        setCpf("");
        setDataNascimento("");
        setTelefone("");
        setEndereco("");
        setMatricula("");
        setSenha("");
      }
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
  
      // Exibe mensagens de erro com Toastify
      if (err.response) {
        if (err.response.status === 400) {
          toast.warn("Todos os campos obrigatórios devem ser preenchidos.", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: "bounce",
          });
        } else if (err.response.status === 401) {
          toast.error("Não autorizado. Verifique suas credenciais.", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: "bounce",
          });
        } else if (err.response.status === 500) {
          toast.error("Erro interno do servidor. Tente novamente mais tarde.", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: "bounce",
          });
        } else {
          toast.error(`Erro inesperado: ${err.response.statusText || "Verifique os dados e tente novamente."}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: "bounce",
          });
        }
      } else {
        toast.error(`Erro inesperado: ${err.message}`, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: "bounce",
        });
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
      <ToastContainer /> {/* Adiciona o contêiner de notificações */}
      
      <h2 style={{ textAlign: "center" }}>Cadastro de Aluno</h2>
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSenhaAluno">
          <Form.Label>Senha</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type={senhaVisivel ? "text" : "password"}
              placeholder="Digite a senha do aluno"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{ paddingRight: "40px" }}
            />
            <button
              type="button"
              onClick={toggleSenhaVisivel}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                opacity: 0.6,
                color: "black",
              }}
            >
              {senhaVisivel ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
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

export default CadastroAlunoForm;
