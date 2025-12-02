import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        // Aquí iría la lógica de autenticación, por ejemplo, una llamada a la API
        // Simulando una autenticación exitosa después de 1 segundo
        setTimeout(() => {
            const data = { token: 'dummy-token', user: { username } };

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            navigate('/room');
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Iniciar Sesión
                </h2>

                {error && (
                    <div className="mb-4 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingresa tu usuario"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <a href="/register" className="text-blue-500 hover:text-blue-700">
                            Regístrate aquí
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;