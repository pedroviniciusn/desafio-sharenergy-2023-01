import { apiBackend } from '../services/apiBackend';
import { getToken } from '../services/auth';

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
    const token = getToken()
    const response = await apiBackend.get(`/users/${page}`, {
      headers: {
        'Authorization': `Basic ${token}` 
      }
    })
    .then(response =>  response.data)
    
    return response;
  } catch (error: any) {
    return error.response;
  }
} 

export async function findUser(data: string) {
  try {
    const token = getToken()
    const response = await apiBackend.post("/users", {
      data: data
    }, {
      headers: {
        'Authorization': `Basic ${token}` 
      }
    })
    .then(response =>  response.data)
    
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}