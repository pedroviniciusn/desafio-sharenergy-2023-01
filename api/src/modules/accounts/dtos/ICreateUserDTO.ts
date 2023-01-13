export interface ICreateUserDTO {
  full_name: string;
  email: string;
  password: string;
  username: string;
  is_admin?: boolean;
  age: number;
}