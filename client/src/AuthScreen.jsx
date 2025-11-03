import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthScreen = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative w-full min-h-screen flex items-center justify-center p-4 sm:p-8"
    >
      <div className="relative z-10 w-full max-w-lg mx-auto p-8 kawaii-layout-bg text-center">
        <div className="mb-8">
          <h1 className="kawaii-header text-5xl sm:text-6xl">
            Talkie Town!
          </h1>
          <p className="kawaii-subheader">
            Aprende inglés, una misión a la vez
          </p>
        </div>

        <div className="kawaii-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-6 text-kawaii-text-dark">
            Acceso al Pueblo
          </h2>

          <div className="flex flex-col items-center space-y-4">
            <button 
              onClick={() => navigate('/login')} 
              className="kawaii-button max-w-xs w-full text-lg py-3"
            >
              Iniciar Sesión
            </button>

            <button 
              onClick={() => navigate('/register')} 
              className="kawaii-button max-w-xs w-full text-lg py-3"
            >
              Registrarse
            </button>
          </div>
        </div>

        <p className="kawaii-subheader">
          Un pequeño proyecto de estrellitas
        </p>

      </div>
    </div>
  );
};

export default AuthScreen;