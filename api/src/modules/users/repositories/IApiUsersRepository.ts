import { IUserDTO } from '../dtos/IUserDTO';


export interface IApiUsersRepository {
  listAllUsers(page: string): Promise<IUserDTO[]>;
  findUser(data: string): Promise<IUserDTO | null>;
}