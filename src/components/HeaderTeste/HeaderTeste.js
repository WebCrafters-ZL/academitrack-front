import React from "react";
import { Button } from 'react-bootstrap';
import { FaSignOutAlt } from "react-icons/fa";

const HeaderTeste = () => {
  return (
    <header style={{ 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      height: '80px', 
      backgroundColor: '#1976d2', 
      zIndex: 1000, 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0 20px', 
      boxSizing: 'border-box'
    }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: 0 
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '50px', color: 'black' }}>Academi</span>
          <span style={{ fontWeight: 'bold', fontSize: '50px',  color: '#f5f5f5', marginLeft: '2px' }}>Track</span>
        </h1>
      </div>
      <div className="logout" style={{ marginRight: '20px' }}>
        <Button 
          style={{ 
            backgroundColor: '#f44336', 
            color: '#ffffff', 
            border: 'none', 
            padding: '8px 12px', 
            borderRadius: '4px', 
            display: 'flex', 
            alignItems: 'center', 
            fontWeight: 'bold'
          }}
          onClick={() => alert('Você saiu!')}
        >
          <FaSignOutAlt style={{ marginRight: '8px' }} /> Sair
        </Button>
      </div>
    </header>
  );
};

export default HeaderTeste;
