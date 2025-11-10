// rutas principales del proyecto TENER CUIDADOOOs
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WorldScreen from './WorldScreen';
import AuthScreen from './AuthScreen';
import LoginScreen from './LoginScreen';
import FirstMinigame from './FirstMinigame'; 
import SecondMinigame from './SecondMinigame'; 
import ThirdMiniGame from './ThirdMinigame';
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
        <Route path="/minigame3" element={<ThirdMiniGame />} />

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
