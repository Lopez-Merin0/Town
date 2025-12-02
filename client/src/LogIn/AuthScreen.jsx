import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="relative z-10 w-full max-w-lg mx-auto p-4 sm:p-6 kawaii-layout-bg text-center">
        <div className="mb-6">
          <h1 className="kawaii-header text-4xl sm:text-5xl">
            Talkie Town!
          </h1>
          <p className="kawaii-subheader text-base">
            Practica una misión a la vez
          </p>
        </div>

        <div className="kawaii-panel p-4 sm:p-6">
          <h2 className="text-lg font-bold mb-4 text-kawaii-text-dark">
            Acceso al Pueblo
          </h2>

          <div className="flex flex-col items-center space-y-3">
            <button 
              onClick={() => navigate('/login')} 
              className="kawaii-button max-w-xs w-full text-base py-2"
            >
              Iniciar Sesión
            </button>

            <button 
              onClick={() => navigate('/register')} 
              className="kawaii-button max-w-xs w-full text-base py-2"
            >
              Registrarse
            </button>
          </div>
        </div>

        <p className="kawaii-subheader text-sm mt-4">
          Un pequeño proyecto de estrellitas
        </p>

      </div>
    </div>
  );
};

export default AuthScreen;