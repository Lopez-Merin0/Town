import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthScreen = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative w-full min-h-screen flex items-center justify-center p-4 sm:p-8"
      // El fondo se maneja en index.css
    >
      {/* Contenedor principal: usa la clase kawaii-layout-bg para el estilo texturizado, redondeado y con sombra */}
      <div className="relative z-10 w-full max-w-lg mx-auto p-8 kawaii-layout-bg text-center">
        
        {/* Encabezado principal */}
        <div className="mb-8">
          <h1 className="kawaii-header text-5xl sm:text-6xl">
            Talkie Town!
          </h1>
          <p className="kawaii-subheader">
            ¡Elige tu aventura en el pueblo! ♪( ´▽｀)
          </p>
        </div>

        {/* Panel de contenido principal, usando kawaii-panel */}
        <div className="kawaii-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-6 text-kawaii-text-dark">
            Ingresar o Unirte
          </h2>

          {/* Este contenedor centra los botones y limita su ancho máximo */}
          <div className="flex flex-col items-center space-y-4">
            {/* Botón Iniciar Sesión: max-w-xs (máx. 12rem) para que no sean tan largos */}
            <button 
              onClick={() => navigate('/login')} 
              className="kawaii-button max-w-xs w-full text-lg py-3"
            >
              Iniciar Sesión
            </button>

            {/* Botón Registrarse */}
            <button 
              onClick={() => navigate('/register')} 
              className="kawaii-button max-w-xs w-full text-lg py-3"
              // Usamos el color pink como predeterminado para el registro
              style={{ backgroundColor: 'var(--kawaii-accent-pink)' }} 
            >
              Registrarse
            </button>
          </div>
        </div>

        <p className="mt-8 text-sm text-kawaii-text-medium">
          Diseño inspirado en la comunidad.
        </p>

      </div>
    </div>
  );
};

export default AuthScreen;