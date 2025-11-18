// rutas principales del proyecto TENER CUIDADOOOs
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import GameAudio from './GameAudio';

import WorldScreen from './WorldScreen';
import AuthScreen from './AuthScreen';
import LoginScreen from './LoginScreen';
import FirstMinigame from './FirstMinigame';
import SecondMinigame from './SecondMinigame';
import ThirdMiniGame from './ThirdMinigame';
import RegisterScreen from './RegisterScreen';

import { MinigameProgressProvider } from './contexts/MinigameProgressContext';

const App = () => {
  const [isMusicEnabled, setIsMusicEnabled] = useState(
    () => {
      const savedState = localStorage.getItem('isMusicEnabled');
      return savedState !== null ? JSON.parse(savedState) : true;
    }
  );

  useEffect(() => {
    localStorage.setItem('isMusicEnabled', JSON.stringify(isMusicEnabled));
  }, [isMusicEnabled]);


  const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null;
  };

  const toggleMusic = () => {
    setIsMusicEnabled(prev => !prev);
  };

  const getUserName = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        return parsedData.username || 'Usuario';
      } catch {
        return 'Usuario';
      }
    }
    return 'Usuario';
  };

  return (
    <MinigameProgressProvider>
      <Router>
        <GameAudio
          isMusicEnabled={isMusicEnabled}
          musicVolume={0.3}
        />

        <button
          onClick={toggleMusic}
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            padding: '10px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
          title={isMusicEnabled ? "Silenciar Música" : "Activar Música"}
        >
          {isMusicEnabled ? '🔊' : '🔇'}
        </button>

        <Routes>
          <Route path="/" element={<AuthScreen />} />

          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route path="/primer mini juego" element={<FirstMinigame userName={getUserName()} />} />
          <Route path="/segundo mini juego" element={<SecondMinigame />} />
          <Route path="/tercer mini juego" element={<ThirdMiniGame />} />

          <Route
            path="/world"
            element={
              isAuthenticated() ? <WorldScreen /> : <Navigate to="/" />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </MinigameProgressProvider>
  );
};

export default App;