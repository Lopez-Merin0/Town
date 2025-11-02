import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from './api';

const REGISTER_BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1620242274955-fc42c75a462b?fit=crop&w=1400&h=800&q=80'; 

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }
    
    const result = await signupUser(username, email, password);

    if (result.success) {
      setMessage('¡Registro exitoso! Por favor, inicia sesión.');
      // Después del registro exitoso, navegamos a la pantalla de login
      setTimeout(() => {
        setLoading(false);
        navigate('/login'); 
      }, 2000);
    } else {
      setMessage(result.message || 'Error en el registro.');
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-8"
      style={{ backgroundImage: `url(${REGISTER_BACKGROUND_IMAGE})` }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative z-10 p-6 md:p-10 max-w-sm md:max-w-md w-full text-center ac-box">
        
        <h1 className="ac-title-text mb-8 text-4xl sm:text-5xl">
          Únete al Pueblo
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

        <form onSubmit={handleRegister} className="space-y-4">
          
          <div>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="ac-input w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
          
          <div>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="ac-input w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="ac-button w-full mt-6" disabled={loading}>
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>

        <button 
          onClick={() => navigate('/login')} 
          className="mt-6 text-base font-semibold text-ac-brown hover:text-ac-green-dark hover:underline transition duration-200"
        >
        ¿Ya tienes cuenta? Inicia Sesión
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

export default RegisterScreen;