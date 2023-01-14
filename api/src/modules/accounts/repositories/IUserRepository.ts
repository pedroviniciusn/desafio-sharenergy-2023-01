import { IUser } from '../dtos/IUser';

export interface IUserRepository {
  findById(id: string): Promise<IUser>;
  findByUsername(username: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  listAllUsers(page: string): Promise<IUser[]>;
  findUser(data: string): Promise<IUser | null>;
}