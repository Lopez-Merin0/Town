// rutas principales del proyecto NO MOVERLE POR EL MOMENTOOO

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WorldScreen from './WorldScreen'; 
import AuthScreen from './AuthScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const App = () => {
  // Verifica si el usuario tiene un token guardado 
  const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        
        <Route 
          path="/world" 
          element={
            isAuthenticated() ? <WorldScreen /> : <Navigate to="/" />
          } 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
