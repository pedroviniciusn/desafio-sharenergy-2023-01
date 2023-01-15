import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUser } from '../../dtos/IUser';
import { User } from '../../infra/mongodb/models/User';
import { IUserRepository } from '../IUserRepository';


export class InMemoryUserRepository implements IUserRepository {
  users: IUser[] = [];

  async create({
    full_name,
    email,
    password,
    username,
    is_admin,
    age,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      full_name,
      email,
      password,
      username,
      is_admin,
      age,
    });

    this.users.push(user);
  }

  async findById(id: string): Promise<IUser[]> {
    return this.users.filter(user => user.id === id);
  }

  async findByUsername(username: string): Promise<IUser[]> {
    return this.users.filter(user => user.username === username);
  }

  async findByEmail(email: string): Promise<IUser[]> {
    return this.users.filter(user => user.email === email);
  }
}