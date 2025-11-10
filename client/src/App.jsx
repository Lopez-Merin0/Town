// rutas principales del proyecto NO MOVERLE POR EL MOMENTOOO

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WorldScreen from './WorldScreen';
import AuthScreen from './AuthScreen';
import LoginScreen from './LoginScreen';
import FirstMinigame from './FirstMinigame'; 
import SecondMinigame from './SecondMinigame'; 
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
        <Route path="/minigame" element={<FirstMinigame />} />
        <Route path="/minigame2" element={<SecondMinigame />} />

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
