import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <Router>
     
      <AppRoutes />
    </Router>
  );
}

export default App;
