export interface IUser {
  full_name: string;
  email: string;
  password?: string;
  username: string;
  is_admin: boolean;
  age: number;
  avatar?: string;
}