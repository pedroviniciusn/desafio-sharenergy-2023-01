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


interface IClientsProps {
  name: string
  email: string;
  phone_number: number;
  address: string;
  cpf: number;
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

export async function getClients() {
  try {
    const token = getToken()
    const response = await apiBackend.get("/clients", {
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

export async function createClient({
  name,
  email,
  address,
  cpf,
  phone_number,
}: IClientsProps) {
  try {
    const token = getToken()
    const response = await apiBackend.post("/clients", {
      name: name,
      email: email,
      address: address,
      cpf: cpf,
      phone_number: phone_number,
    }, {
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

export async function findClient(username: string) {
  try {
    const token = getToken()
    const response = await apiBackend.get(`/clients/${username}`, {
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