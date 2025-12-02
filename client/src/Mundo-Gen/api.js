const API_URL = 'http://localhost:5000';

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en el registro');
        }

        return data;
    } catch (error) {
        console.error('Error en registerUser:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en el inicio de sesión');
        }

        return data;
    } catch (error) {
        console.error('Error en loginUser:', error);
        throw error;
    }
};

export default {
    registerUser,
    loginUser,
};
