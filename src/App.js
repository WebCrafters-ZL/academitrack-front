import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify'; 

function App() {
  return (
    <Router>
      <ToastContainer // Adicione aqui o ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition="bounce"
      />
      <AppRoutes />
    </Router>
  );
}

export default App;
