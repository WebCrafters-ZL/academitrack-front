import { Container} from "react-bootstrap";


const HomeAdm = () => {

  return (
    <Container fluid style={{ 
      marginTop: "70px", 
      marginLeft: "315px", 
      padding: "20px",
      maxWidth: "calc(100% - 320px)", 
      height: `calc(100vh - 75px)`, 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px",
      overflowY: "auto",
      border: "2px solid blue"
    }}>
      
    </Container>
  );
};

export default HomeAdm;
