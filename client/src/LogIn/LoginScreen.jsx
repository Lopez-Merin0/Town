import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Mundo-Gen/api'; 

const { loginUser } = api; 

//para lo del token
const saveAuthData = (token, userData) => {
    try {
        localStorage.setItem('userToken', token);
        localStorage.setItem('authToken', token);
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('Datos de usuario guardados:', userData);
        } else {
            console.warn('No se recibieron datos de usuario para guardar');
        }
        console.log('Token guardado exitosamente:', token);
    } catch (e) {
        console.error('Error al guardar en localStorage:', e);
    }
};

// Función para cargar el progreso del usuario desde el servidor
const loadUserProgress = async (userId, token) => {
    try {
        console.log('Cargando progreso del usuario:', userId);
        
        const response = await fetch(`http://localhost:5000/api/progress/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Progreso recibido del servidor:', result);

            // Limpiar progreso anterior
            localStorage.removeItem('minigameProgress');
            localStorage.removeItem('minigame2Progress');
            localStorage.removeItem('minigame3Progress');

            // Cargar progreso del usuario actual
            if (result.data) {
                if (result.data.minigame1Progress) {
                    localStorage.setItem('minigameProgress', JSON.stringify(result.data.minigame1Progress));
                }
                if (result.data.minigame2Progress) {
                    localStorage.setItem('minigame2Progress', JSON.stringify(result.data.minigame2Progress));
                }
                if (result.data.minigame3Progress) {
                    localStorage.setItem('minigame3Progress', JSON.stringify(result.data.minigame3Progress));
                }
                console.log('✅ Progreso del usuario cargado exitosamente');
            } else {
                console.log('Usuario sin progreso guardado, comenzando desde cero');
            }
        } else {
            console.warn('No se pudo cargar el progreso, el usuario comenzará desde cero');
        }
    } catch (error) {
        console.error('Error al cargar progreso del usuario:', error);
        console.log('El usuario comenzará sin progreso guardado');
    }
};

const LoginScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({}); 

    const ErrorMessage = ({ error }) =>
        error ? (
            <p className="text-red-600 text-xs mt-1 font-semibold text-left mx-auto w-3/4">{error}</p>
        ) : null;

    // el dto esta en server
    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!email.trim()) {
            newErrors.email = 'El campo de email no puede estar vacío'; // IsNotEmpty
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'El campo de email debe ser una dirección de correo válida'; // IsEmail
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'El campo de contraseña no puede estar vacío'; // IsNotEmpty
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres'; // MinLength(6)
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setMessage('');
        setErrors({});

        if (!validateForm()) return; 

        setLoading(true);

        try {
            const credentials = { email, password };
            console.log('Enviando credenciales:', credentials);
            
            const result = await loginUser(credentials);
            console.log('Resultado completo del login:', result);
            
            const responseData = result.data || result;
            const tokenToSave = responseData.access_token || responseData.token || result.access_token || result.token;
            console.log('Token extraído:', tokenToSave);
            
            const userData = responseData.user || responseData.data || result.user || {
                id: responseData.userId || responseData.id,
                email: responseData.email || email,
                username: responseData.username
            };
            console.log('Datos de usuario extraídos:', userData);
            
            if (tokenToSave && userData && (userData.id || userData._id)) {
                saveAuthData(tokenToSave, userData);
                
                const savedToken = localStorage.getItem('authToken');
                const savedUserData = localStorage.getItem('userData');
                
                if (!savedToken || !savedUserData) {
                    throw new Error('Error al guardar los datos de autenticación');
                }

                // Cargar progreso del usuario desde el servidor
                await loadUserProgress(userData.id || userData._id, tokenToSave);
                
                // Limpiar la marca de progreso cargado para forzar recarga
                sessionStorage.removeItem('progressLoaded');
                
                setMessage('¡Inicio de sesión exitoso! Redirigiendo...');
                
                setTimeout(() => {
                    navigate('/world');
                }, 500);
                
            } else {
                console.error('Datos incompletos del servidor:', { tokenToSave, userData });
                throw new Error('No se recibieron datos completos del servidor');
            }

        } catch (error) {
            console.error('Error completo en login:', error);
            
            // Verificar si es un error de conexión
            if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
                setMessage('No se puede conectar al servidor. Asegúrate de que el backend esté corriendo en http://localhost:5000');
            } else {
                const errorMsg = error.message || 'Error desconocido en el inicio de sesión.';
                setMessage(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div className="relative z-10 w-full max-w-lg mx-auto p-8 kawaii-layout-bg text-center">
                
                <div className="mb-8">
                    <h1 className="kawaii-header text-5xl sm:text-6xl">Iniciar Sesión</h1>
                </div>

                <div className="kawaii-panel p-6 sm:p-8">
                    <h2 className="text-xl font-bold mb-6 text-[var(--kawaii-text-dark)]">Bienvenido de vuelta</h2>

                    {message && (
                        <p className={`mb-6 text-base font-semibold p-3 rounded-xl transition duration-300 border 
                            ${message.toLowerCase().includes('exitoso') 
                                ? 'bg-green-100 border-green-600 text-green-800'
                                : 'bg-red-100 border-red-600 text-red-800'
                            }`}
                        >
                            {message}
                        </p>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="space-y-4 mb-8">
                            
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
                                    placeholder="Contraseña"
                                    className="kawaii-input w-3/4 mx-auto"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <ErrorMessage error={errors.password} />
                            </div>
                            
                        </div>
                        
                        <button type="submit" className="kawaii-button w-full text-lg py-3" disabled={loading}>
                            {loading ? 'Cargando...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="flex justify-center items-center space-x-4 mt-6">
                        <button 
                            onClick={() => navigate('/register')} 
                            className="kawaii-link-button"
                        >
                            ¿No tienes cuenta? <br />
                            Regístrate aquí
                        </button>
                        <button 
                            onClick={() => navigate('/')} 
                            className="kawaii-link-button text-sm"
                        >
                            Volver a la <br />
                            Pantalla principal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;