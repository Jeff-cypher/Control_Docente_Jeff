import React, { useState } from 'react';

interface LoginProps {
  onLoginExitoso: (nombreUsuario: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginExitoso }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (usuario === 'admin' && password === '1234') {
      onLoginExitoso('Administrador VDS');
    } else {
      setError('Usuario o contraseña incorrectos (Usa: admin / 1234)');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      // Fondo degradado sutil con los colores institucionales
      background: 'linear-gradient(135deg, #0056b3 0%, #28a745 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '420px', 
        padding: '40px', 
        background: '#fff', 
        borderRadius: '12px', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        borderTop: '6px solid #ffc107' // Detalle superior en amarillo institucional
      }}>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h2 style={{ color: '#0056b3', margin: '0 0 8px 0', fontSize: '26px' }}>Colegio Valle del Saber</h2>
          <p style={{ color: '#28a745', margin: 0, fontWeight: 'bold', fontSize: '14px' }}>Sistema de Control Docente</p>
        </div>

        {error && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px', borderLeft: '4px solid #dc3545' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#333', fontWeight: 'bold' }}>Usuario:</label>
            <input 
              type="text" 
              value={usuario} 
              onChange={(e) => setUsuario(e.target.value)} 
              placeholder="Ej. admin"
              required 
              style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#333', fontWeight: 'bold' }}>Contraseña:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Ej. 1234"
              required 
              style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              background: '#28a745', // Botón principal en verde institucional
              color: '#fff', 
              padding: '12px', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'background 0.2s'
            }}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};