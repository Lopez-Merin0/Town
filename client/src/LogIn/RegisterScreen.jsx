import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Mundo-Gen/api';

const { registerUser } = api; // Cambiado de signupUser a registerUser

const RegisterScreen = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = 'El nombre de usuario no puede estar vacío';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'El campo de email no puede estar vacío';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El email debe ser una dirección de correo válida';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'El campo de contraseña no puede estar vacío';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage('');
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = { email, username, password };
      console.log('Enviando datos de registro:', userData);
      
      const result = await registerUser(userData); // Usando registerUser
      console.log('Resultado del registro:', result);
      
      setMessage('¡Registro exitoso! Redirigiendo al inicio de sesión...');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
    } catch (error) {
      console.error('Error completo en registro:', error);
      
      // Verificar si es un error de conexión
      if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
        setMessage('No se puede conectar al servidor. Asegúrate de que el backend esté corriendo en http://localhost:5000');
      } else {
        const errorMsg = error.message || 'Error desconocido en el registro.';
        setMessage(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const ErrorMessage = ({ error }) =>
    error ? (
      <p className="text-red-600 text-xs mt-1 font-semibold text-left mx-auto w-3/4">{error}</p>
    ) : null;

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="relative z-10 w-full max-w-lg mx-auto p-8 kawaii-layout-bg text-center">
        <div className="mb-8">
          <h1 className="kawaii-header text-5xl sm:text-6xl">Únete al Pueblo</h1>
        </div>

        <div className="kawaii-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-6 text-[var(--kawaii-text-dark)]">¡Regístrate para aprender!</h2>

          {message && (
            <p
              className={`mb-6 text-base font-semibold p-3 rounded-xl transition duration-300 border ${message.toLowerCase().includes('exitoso')
                  ? 'bg-green-100 border-green-600 text-green-800'
                  : 'bg-red-100 border-red-600 text-red-800'
                }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleRegister}>
            <div className="space-y-4 mb-8">
              <div>
                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  className="kawaii-input w-3/4 mx-auto"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <ErrorMessage error={errors.username} />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="kawaii-input w-3/4 mx-auto"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <ErrorMessage error={errors.email} />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Contraseña (Mín. 6 caracteres)"
                  className="kawaii-input w-3/4 mx-auto"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <ErrorMessage error={errors.password} />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  className="kawaii-input w-3/4 mx-auto"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <ErrorMessage error={errors.confirmPassword} />
              </div>
            </div>

            <button type="submit" className="kawaii-button w-full text-lg py-3" disabled={loading}>
              {loading ? 'Cargando...' : 'Registrarse'}
            </button>
          </form>

          <div className="flex justify-center items-center space-x-4 mt-6">
            <button onClick={() => navigate('/login')} className="kawaii-link-button">
              ¿Ya tienes cuenta? <br />
              Inicia Sesión
            </button>

            <button onClick={() => navigate('/')} className="kawaii-link-button text-sm">
              Volver a la <br />
              Pantalla principal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
