import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUser } from '../dtos/IUser';

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findById(id: string): Promise<IUser[]>;
  findByUsername(username: string): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser[]>;
}