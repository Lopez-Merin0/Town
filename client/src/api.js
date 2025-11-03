const BASE_URL = 'http://localhost:3000/api';

/**
 * Función genérica para manejar peticiones al backend.
 * Asegura el envío correcto de JSON y maneja errores de forma robusta.
 */
async function request(url, options = {}) {
  // Configuración estándar para enviar JSON
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // Aseguramos que el cuerpo sea siempre una cadena JSON si existe
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, config);

    // --- MANEJO DE RESPUESTA CRÍTICO ---

    // 1. Si la respuesta es 200-299, intenta devolver el JSON.
    if (response.ok) {
      try {
        // Intenta devolver el JSON. Si no hay contenido (204), esto puede lanzar un error.
        const text = await response.text();
        return text ? JSON.parse(text) : {};
      } catch (e) {
        return {}; // Devuelve un objeto vacío en lugar de fallar
      }
    }

    // 2. Si la respuesta es de error (4xx, 5xx), intenta leer el cuerpo del error.
    let errorData = { message: 'Error desconocido del servidor' };
    const errorBodyText = await response.text();
    
    try {
      // Intenta parsear el cuerpo como JSON (típico de NestJS Validation errors)
      errorData = JSON.parse(errorBodyText);
    } catch (e) {
      // Si falla la lectura de JSON (tu error actual), usamos el texto plano como mensaje.
      errorData.message = `Error ${response.status}: ${response.statusText}. Respuesta: ${errorBodyText}`;
      if (response.status === 400) {
        errorData.message = errorData.message + '. Asegúrate de que los datos enviados cumplan con el formato JSON.';
      }
    }

    // Lanza un nuevo error usando el mensaje extraído
    throw new Error(errorData.message || errorData.error || 'Error en la petición');

  } catch (error) {
    // Esto atrapa errores de red (ej: Failed to fetch, servidor apagado)
    console.error('Error de red o desconocido:', error);
    throw new Error(error.message || 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
  }
}

// =========================================================================
// FUNCIONES ESPECÍFICAS DE AUTENTICACIÓN
// =========================================================================

export const signupUser = async (userData) => {
  return request('/auth/register', {
    method: 'POST',
    body: userData,
  });
};

export const loginUser = async (credentials) => {
  // credentials debería ser { email: '...', password: '...' }
  return request('/auth/login', {
    method: 'POST',
    body: credentials,
  });
};

// Exportar solo la función request si la necesitas para otras cosas,
// pero es mejor usar las funciones específicas como loginUser.
export default { signupUser, loginUser };
