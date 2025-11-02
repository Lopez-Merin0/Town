// client/src/api.js

const API_BASE_URL = 'http://localhost:3001/api/auth';

/**
 * Registra un nuevo usuario en el backend.
 * @param {string} username - Nombre de usuario.
 * @param {string} email - Correo electrónico.
 * @param {string} password - Contraseña.
 * @returns {Promise<{success: boolean, message?: string}>} Resultado de la operación.
 */
export const signupUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // El registro fue exitoso
      return { success: true, message: data.message };
    } else {
      // El registro falló (ej. usuario ya existe)
      return { success: false, message: data.message || 'Error en el registro.' };
    }
  } catch (error) {
    console.error('Error de red durante el registro:', error);
    return { success: false, message: 'No se pudo conectar con el servidor.' };
  }
};

/**
 * Inicia sesión de un usuario existente.
 * @param {string} email - Correo electrónico.
 * @param {string} password - Contraseña.
 * @returns {Promise<{success: boolean, message?: string, token?: string}>} Resultado de la operación.
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      // Login exitoso. Guardamos el token en el almacenamiento local.
      localStorage.setItem('authToken', data.token); 
      return { success: true, token: data.token };
    } else {
      // Login fallido
      return { success: false, message: data.message || 'Credenciales inválidas.' };
    }
  } catch (error) {
    console.error('Error de red durante el inicio de sesión:', error);
    return { success: false, message: 'No se pudo conectar con el servidor.' };
  }
};
