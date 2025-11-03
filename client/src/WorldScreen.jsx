// client/src/WorldScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WORLD_BACKGROUND_IMAGE = 'https://picsum.photos/1920/1080?random=1'; 
const CHARACTER_IMAGE = 'https://picsum.photos/100/150?random=2';

const WorldScreen = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    navigate('/'); 
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${WORLD_BACKGROUND_IMAGE})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div> 
      
      <div className="relative text-white z-10 p-6 bg-black bg-opacity-70 rounded-lg ac-box border-4 border-yellow-300">
        <h1 className="text-4xl font-bold mb-4 ac-title-text">
          ¡BIENVENIDO AL PUEBLO ALVVVV!
        </h1>
        <p className="mb-6 text-lg tracking-wider text-white">
          Esta es la pantalla del juego. ¡Aún no hay nada que hacer!
        </p>
        
        <div className="flex flex-col items-center mb-6">
          <img 
            src={CHARACTER_IMAGE} 
            alt="Personaje del juego" 
            className="w-24 h-36 border-4 border-white ac-box"
          />
          <p className="mt-2 font-bold text-yellow-300 ac-title-text">Player 1</p>
        </div>

        <button
          onClick={handleLogout}
          className="ac-button"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default WorldScreen;