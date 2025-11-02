import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './api';

const LOGIN_BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1620242274955-fc42c75a462b?fit=crop&w=1400&h=800&q=80'; 

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await loginUser(email, password);

    if (result.success) {
      setMessage('¡Inicio de sesión exitoso! Redirigiendo al pueblo...');
      setTimeout(() => {
        setLoading(false);
        navigate('/world'); 
      }, 1500);
    } else {
      setMessage(result.message || 'Error en el inicio de sesión.');
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-8"
      style={{ backgroundImage: `url(${LOGIN_BACKGROUND_IMAGE})` }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative z-10 p-6 md:p-10 max-w-sm md:max-w-md w-full text-center ac-box">
        
        <h1 className="ac-title-text mb-8 text-4xl sm:text-5xl">
          Iniciar Sesión
        </h1>
        
        {message && (
          <p className={`mb-6 text-base font-semibold p-3 rounded-xl transition duration-300
            ${message.includes('exitoso') 
              ? 'bg-ac-blue-light text-green-800 border border-green-800'
              : 'bg-ac-pink text-red-800 border border-red-800'
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="ac-input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              className="ac-input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="ac-button w-full mt-6" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <button 
          onClick={() => navigate('/register')} 
          className="mt-6 text-base font-semibold text-ac-brown hover:text-ac-green-dark hover:underline transition duration-200"
        >
          ¿No tienes cuenta? Regístrate aquí 
        </button>
        <button 
          onClick={() => navigate('/')} 
          className="mt-2 text-sm text-gray-500 hover:underline"
        >
          Volver a la Principal
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;