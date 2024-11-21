import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Avatar from "react-avatar";
import axios from "axios";
import fotoPerfil from "../../../assets/coordenadora.jpeg";

const PerfilAdm = () => {
  const [administrador, setAdministrador] = useState({});

  useEffect(() => {
    const fetchAdministrador = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/administrador/perfil",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAdministrador(response.data);
      } catch (error) {
        console.error("Erro ao retornar dados do administrador:", error);
      }
    };

    fetchAdministrador();
  }, []);

  return (
    <Container
      fluid
      style={{
        marginTop: "70px",
        marginLeft: "315px",
        padding: "20px",
        maxWidth: "calc(100% - 320px)",
        height: `calc(100vh - 75px)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8}>
          <Card className="shadow-lg" style={{ borderRadius: "15px" }}>
            <Card.Body>
              <div className="d-flex flex-column align-items-center">
                {/* Foto de Perfil */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Avatar
                    alt={administrador.nomeCompleto || "Usuário"}
                    src={fotoPerfil}
                    size="130"
                    round={true}
                    style={{
                      border: "5px solid #f0f0f0",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>

                {/* Nome do Administrador */}
                <h3 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
                  {administrador.nomeCompleto || "Nome do Usuário"}
                </h3>
                <p style={{ color: "#888", fontSize: "1rem" }}>
                  {administrador.cargo || "Cargo não informado"}
                </p>

                {/* Informações do Perfil */}
                <div className="w-100">
                  <hr />
                  <p><strong>CPF:</strong> {administrador.cpf || "00000000000"}</p>
                  <p><strong>E-mail:</strong> {administrador.email || "email@exemplo.com"}</p>
                  <p><strong>Telefone:</strong> {administrador.telefone || "Não informado"}</p>
                  <p><strong>Endereço:</strong> {administrador.endereco || "Endereço não informado"}</p>
                </div>

                {/* Botão de Editar Perfil */}
                <div className="w-100 text-center mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    style={{
                      padding: "10px 30px",
                      borderRadius: "30px",
                      fontWeight: "bold",
                    }}
                    onClick={() => alert("Funcionalidade de Editar Perfil não implementada ainda!")}
                  >
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PerfilAdm;
