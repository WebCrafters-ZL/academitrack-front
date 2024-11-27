import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import "../../../styles/index.css"; // Custom styles

const FeedbackSuporteProfessor = () => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feedback.trim() === "") {
      setError(true);
      return;
    }

    setIsSubmitted(true);
    setError(false);

    try {
      // Simulação de envio de feedback (aqui pode ser com axios para o backend)
      // await axios.post("/api/feedback", { feedback });

      setFeedback(""); // Reset após envio bem-sucedido
    } catch (error) {
      setError(true);
      console.error("Erro ao enviar feedback:", error);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-end align-items-center min-vh-100"
      style={{ paddingRight: "25%" }}
    >
      <Row className="w-100 justify-content-end">
        <Col xs={12} md={8} lg={6} className="bg-light p-4 rounded-4 shadow-lg">
          <h2 className="text-center mb-4 text-primary font-weight-bold">Feedback e Suporte - Professor</h2>

          {/* Mensagens de sucesso e erro */}
          {isSubmitted && !error && (
            <Alert variant="success" className="mb-4 p-3 rounded-3">
              Seu feedback foi enviado com sucesso! Agradecemos pela sua colaboração.
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mb-4 p-3 rounded-3">
              Ocorreu um erro ao enviar seu feedback. Por favor, tente novamente.
            </Alert>
          )}

          {/* Formulário de feedback */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="feedback">
              <Form.Label className="mb-3">Descreva seu problema ou sugestão:</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={feedback}
                onChange={handleChange}
                placeholder="Escreva aqui..."
                required
                className="rounded-3"
                style={{
                  borderColor: "#007bff",
                  boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)",
                  transition: "box-shadow 0.3s ease-in-out",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0 4px 12px rgba(0, 123, 255, 0.4)") }
                onBlur={(e) => (e.target.style.boxShadow = "0 4px 8px rgba(0, 123, 255, 0.2)") }
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="primary"
                type="submit"
                className="w-75 py-3"
                style={{
                  fontSize: "18px",
                  borderRadius: "50px",
                  padding: "10px 30px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Enviar Feedback <FaPaperPlane style={{ marginLeft: "10px" }} />
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedbackSuporteProfessor;
