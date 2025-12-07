// rutas principales del proyecto TENER CUIDADOOOs
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import GameAudio from './GameAudio';
import WorldScreen from './WorldScreen';
import AuthScreen from '../LogIn/AuthScreen';
import LoginScreen from '../LogIn/LoginScreen';
import FirstMinigame from '../Primer-Game/FirstMinigame';
import SecondMinigame from '../Segundo-Game/SecondMinigame';
import ThirdMiniGame from '../Tercer-Game/ThirdMinigame';
import RegisterScreen from '../LogIn/RegisterScreen';
import Room from './Room';

import { MinigameProgressProvider } from '../contexts/MinigameProgressContext';
import { Minigame2ProgressProvider } from '../contexts/Minigame2ProgressContext';
import { Minigame3ProgressProvider } from '../contexts/Minigame3ProgressContext';
import { GlobalProgressProvider } from '../contexts/GlobalProgressContext';

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

  const [musicVolume, setMusicVolume] = useState(
    () => {
      const savedVolume = localStorage.getItem('musicVolume');
      return savedVolume !== null ? parseFloat(savedVolume) : 0.3;
    }
  );

  const [showVolumePanel, setShowVolumePanel] = useState(false);

  useEffect(() => {
    localStorage.setItem('musicVolume', musicVolume.toString());
  }, [musicVolume]);

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
    <GlobalProgressProvider>
      <MinigameProgressProvider>
        <Minigame2ProgressProvider>
          <Minigame3ProgressProvider>
            <Router>
              <GameAudio
                isMusicEnabled={isMusicEnabled}
                musicVolume={musicVolume}
              />

              <button
                onClick={() => setShowVolumePanel(prev => !prev)}
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
              {showVolumePanel && (
                <div
                  style={{
                    position: 'fixed',
                    top: 60,
                    right: 10,
                    zIndex: 9999,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '10px',
                    padding: '10px',
                    border: '2px solid #ff69b4',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      color: '#333',
                    }}
                  >
                    Volumen: {Math.round(musicVolume * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={musicVolume}
                    onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                    style={{
                      width: '100px',
                      cursor: 'pointer',
                    }}
                  />
                  <button
                    onClick={toggleMusic}
                    style={{
                      marginTop: '10px',
                      width: '100%',
                      padding: '5px',
                      backgroundColor: isMusicEnabled ? '#ff69b4' : '#ccc',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    {isMusicEnabled ? 'Silenciar' : 'Activar'}
                  </button>
                </div>
              )}

              <Routes>
                <Route path="/" element={<AuthScreen />} />

                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />

                <Route path="/primer mini juego" element={<FirstMinigame userName={getUserName()} />} />
                <Route path="/segundo mini juego" element={<SecondMinigame userName={getUserName()} />} />
                <Route path="/tercer mini juego" element={<ThirdMiniGame />} />

                <Route
                  path="/room"
                  element={
                    isAuthenticated() ? <Room /> : <Navigate to="/" />
                  }
                />

                <Route
                  path="/world"
                  element={
                    isAuthenticated() ? <WorldScreen /> : <Navigate to="/" />
                  }
                />

                <Route path="*" element={isAuthenticated() ? <Navigate to="/room" /> : <Navigate to="/" />} />
              </Routes>
            </Router>
          </Minigame3ProgressProvider>
        </Minigame2ProgressProvider>
      </MinigameProgressProvider>
    </GlobalProgressProvider>
  );
};

export default App;