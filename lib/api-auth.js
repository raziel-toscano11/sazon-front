import { API_IP } from "../env";

export async function apiLogin(credentials) {
  const response = await fetch(`${API_IP}/api/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Error al iniciar sesión');
  }

  return result; // Devuelve el resultado si todo sale bien
}
