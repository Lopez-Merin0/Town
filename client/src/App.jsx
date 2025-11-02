// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importa tus nuevos componentes de pantalla
import WorldScreen from './WorldScreen'; 
import AuthScreen from './AuthScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const App = () => {
  // Función para verificar si hay un token JWT en localStorage
  const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null;
  };

  return (
    <Router>
      <Routes>
        {/* Ruta Principal: Muestra la pantalla con los botones (Login/Register) */}
        <Route path="/" element={<AuthScreen />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        
        {/* Ruta para el juego: Protegida por la autenticación (JWT) */}
        <Route 
          path="/world" 
          element={
            // Si no está autenticado, redirige a la pantalla principal
            isAuthenticated() ? <WorldScreen /> : <Navigate to="/" />
          } 
        />
        
        {/* Manejo de rutas no encontradas: redirige a la principal */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;