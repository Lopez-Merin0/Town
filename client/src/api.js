// peticiones al back
const BASE_URL = 'http://localhost:3000/api';

async function request(url, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, config);

    // funcionamiento principal de la respuesta 
    if (response.ok) {
      try {
        const text = await response.text();
        return text ? JSON.parse(text) : {}; 
      } catch (e) {
        return {}; 
      }
    }

    let errorData = { message: 'Error desconocido del servidor' };
    const errorBodyText = await response.text();
    
    try {
      errorData = JSON.parse(errorBodyText);
    } catch (e) {
      errorData.message = `Error ${response.status}: ${response.statusText}. Respuesta: ${errorBodyText}`;
      if (response.status === 400) {
        errorData.message += '. Asegúrate de que los datos enviados tengan el formato correcto.';
      }
    }

    throw new Error(errorData.message || errorData.error || 'Error en la petición');

  } catch (error) {
    console.error('Error de red o desconocido:', error);
    throw new Error(error.message || 'No se pudo conectar con el servidor. Verifica que esté corriendo.');
  }
}

// funciones de autenticarse

export const signupUser = async (userData) => {
  return request('/auth/register', {
    method: 'POST',
    body: userData,
  });
};

export const loginUser = async (credentials) => {
  return request('/auth/login', {
    method: 'POST',
    body: credentials,
  });
};

export default { signupUser, loginUser };
