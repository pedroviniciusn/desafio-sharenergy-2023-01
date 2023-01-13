import { IUser } from '../dtos/IUser';

export interface IUserRepository {
  findById(id: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
}