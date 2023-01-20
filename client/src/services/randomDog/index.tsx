import axios from 'axios';

export const randomDogAPI = axios.create({
  baseURL: "https://random.dog",
})