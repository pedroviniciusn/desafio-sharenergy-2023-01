import { apiBackend } from '../services/apiBackend';

interface ISessionResponse {
  token: string;
  user: {
    username: string;
    email: string;
  }
}

interface ISessionResponseError {
  message: string;
}

export async function session(username: string, password: string): Promise<ISessionResponse | ISessionResponseError> {
  try {
    const response = await apiBackend.post("/session", {
      username: username,
      password: password,
    })
    .then(response =>  response.data)
    
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function listUsersByPage(page: string) {
  try {
    const response = await apiBackend.get(`/users/${page}`)
    .then(response =>  response.data)
    
    return response;
  } catch (error: any) {
    return error.response.data;
  }
} 