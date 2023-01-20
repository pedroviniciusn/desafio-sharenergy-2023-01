import { randomDogAPI } from '../services/randomDog';

interface IResponseProps {
  fileSizeBytes: number,
  url: string;
}

export async function randomDog(): Promise<IResponseProps> {
  try {
    const response = await randomDogAPI.get("/woof.json")
    .then(response =>  response.data)
    
    return response;
  } catch (error: any) {
    return error.response;
  }
}