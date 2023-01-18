import { apiBackend } from '../services/apiBackend';

interface ISessionResponse {
  token: string;
  user: {
    username: string;
    email: string;
  }
}

export async function session(username: string, password: string): Promise<void> {
  const response = await apiBackend.post("/session", {
    username: username,
    password: password,
  })
  .then(response => console.log(response))
  .catch(error => console.log(JSON.stringify(error)))

  return response;
}