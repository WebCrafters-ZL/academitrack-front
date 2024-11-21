import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const GerenciarCurso = ({ handleClose }) => {
  const [cursos, setCursos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cursoIdToDelete, setCursoIdToDelete] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/administrador/cursos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCursos(response.data);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
        Store.addNotification({
          title: "Erro",
          message: "Erro ao buscar cursos.",
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

    fetchCursos();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/v1/administrador/cursos/${cursoIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Atualiza o estado para remover o curso deletado
      setCursos(cursos.filter((curso) => curso._id !== cursoIdToDelete));
      setShowModal(false);

      // Notificação de sucesso
      Store.addNotification({
        title: "Sucesso!",
        message: "Curso excluído com sucesso!",
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
    } catch (error) {
      console.error("Erro ao excluir curso:", error);

      // Notificação de erro
      Store.addNotification({
        title: "Erro",
        message: "Erro ao excluir curso.",
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

  const confirmDelete = (id) => {
    setCursoIdToDelete(id);
    setShowModal(true);
  };

  const filteredCursos = cursos.filter((curso) => {
    const nomeStr = curso.nome?.toLowerCase() || "";
    const codigoStr = curso.codigo?.toString() || "";
    const categoriaStr = curso.categoria?.toLowerCase() || "";
    return (
      nomeStr.includes(searchText.toLowerCase()) ||
      codigoStr.includes(searchText) ||
      categoriaStr.includes(searchText.toLowerCase())
    );
  });

  const columns = [
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      width: 100, 
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
    },
    {
      title: "Carga Horária",
      dataIndex: "cargaHoraria",
      key: "cargaHoraria",
      align: "center",
      width: 100,
    },
    {
      title: "Ação",
      key: "acao",
      align: "center",
      width: 50,
      render: (_, curso) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            to={`/administrador/academico/gerenciar-curso/editar-curso/${curso._id}`}
            style={{ marginRight: "10px" }}
          >
            <FontAwesomeIcon icon={faPen} style={{ color: "blue" }} />
          </Link>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => confirmDelete(curso._id)}
          />
        </div>
      ),
    },
  ];


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
      <h2 style={{ textAlign: "center" }}>Gerenciar Cursos</h2>

      <Input
        placeholder="Pesquisar cursos..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "16px", width: "300px", alignSelf: "center" }}
      />

      <Table
        dataSource={filteredCursos.map((curso) => ({
          ...curso,
          key: curso._id,
        }))}
        columns={columns}
        pagination={{
          pageSize: 8,
          showTotal: (total, range) =>
            `${range[0]} a ${range[1]} de ${total} cursos`,
        }}
      />

      <div style={{ textAlign: "right", marginTop: "0px" }}>
        <Button
          variant="primary"
          as={Link}
          to="/administrador/academico/gerenciar-curso/cadastrar-curso"
          onClick={handleClose}
        >
          Adicionar Curso
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            borderBottom: "none",
          }}
        >
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", padding: "2rem" }}>
          <FontAwesomeIcon
            icon={faTrash}
            size="3x"
            color="#ff5252"
            style={{ marginBottom: "1rem" }}
          />
          <p style={{ fontWeight: 500, fontSize: "1.1rem" }}>
            Tem certeza de que deseja excluir este curso?
          </p>
          <p style={{ color: "gray", fontSize: "0.9rem" }}>
            Essa ação não poderá ser desfeita.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", borderTop: "none" }}>
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
            style={{ marginRight: "1rem" }}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GerenciarCurso;
