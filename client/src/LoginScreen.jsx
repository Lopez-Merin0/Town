import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api'; 
// Eliminamos la importación del componente 'world' ya que no se usa en el LoginScreen
// import world from './WorldScreen'; 

// Usaremos api.loginUser, ya que exportaste por default el objeto
const { loginUser } = api; 

const LOGIN_BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1620242274955-fc42c75a462b?fit=crop&w=1400&h=800&q=80'; 

// Función para guardar el token en localStorage (o tu método de almacenamiento preferido)
const saveAuthData = (token) => {
    try {
        localStorage.setItem('userToken', token);
        console.log('Token guardado exitosamente.');
    } catch (e) {
        console.error('Error al guardar el token en localStorage:', e);
    }
};

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

    try {
        // Pasamos un objeto con las propiedades { email, password }
        const credentials = { email, password };
        const result = await loginUser(credentials);
        
        // 🚨 CAMBIO CLAVE: Guardar el token en localStorage ANTES de redirigir.
        // Asumiendo que 'result' tiene un campo 'token' o que 'result' es el token.
        // Adaptar esta línea según lo que devuelva tu 'loginUser'
        const tokenToSave = result.token || result; // Usa 'result.token' si es un objeto, o 'result' si es solo el token.
        if (tokenToSave) {
            saveAuthData(tokenToSave);
        }

        // 1. Mostrar mensaje de éxito
        setMessage('¡Inicio de sesión exitoso! Redirigiendo al pueblo...');
        
        setTimeout(() => {
            // ✅ CORRECCIÓN FINAL: Navegar a la ruta '/world' (cadena de texto)
          navigate('/world'); 
        }, 1500);

    } catch (error) {
        // Capturamos y mostramos el error (incluyendo mensajes del backend 400/401)
        setMessage(error.message || 'Error desconocido en el inicio de sesión.');
    } finally {
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
