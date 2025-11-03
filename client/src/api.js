// NO MOVERLE NADA PORQUE LUEGO NO GUARDAA
const BASE_URL = 'http://localhost:3000/api';

async function request(url, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config = {
    method: options.method || 'GET',
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    body: options.body && !(options.body instanceof FormData)
      ? JSON.stringify(options.body)
      : options.body,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, config);
    const rawText = await response.text();
    const contentType = response.headers.get('content-type') || '';

    if (response.ok) {
      if (!rawText) return {};
      if (contentType.includes('application/json')) {
        try {
          return JSON.parse(rawText);
        } catch (e) {
          console.warn('Respuesta JSON inválida recibida del servidor:', rawText);
          return rawText; 
        }
      }
      return rawText; 
    }

    let errorMessage = `Error ${response.status} ${response.statusText}`;
    if (contentType.includes('application/json')) {
      try {
        const parsed = JSON.parse(rawText);
        errorMessage = parsed.message || parsed.error || JSON.stringify(parsed);
      } catch (e) {
        errorMessage = `${errorMessage}. Body: ${rawText}`;
      }
    } else {
      errorMessage = `${errorMessage}. Body: ${rawText}`;
    }

    if (response.status === 400) {
      errorMessage += ' — Revisa los campos enviados y su formato.';
    }

    throw new Error(errorMessage);
  } catch (error) {
    console.error('Error de red o desconocido:', error);
    throw new Error(error.message || 'No se pudo conectar con el servidor. Verifica que esté corriendo.');
  }
}

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
