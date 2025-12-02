import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!username || !password || !email) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en el registro');
            }

            setSuccess('Registro exitoso! Redirigiendo...');

            // Guardar token y datos del usuario en el almacenamiento local
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            navigate('/room');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Crear Cuenta
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingresa tu nombre de usuario"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingresa tu correo electrónico"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-gray-600 text-xs">
                    &copy;2023 Talkie Town. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
};

export default RegisterScreen;