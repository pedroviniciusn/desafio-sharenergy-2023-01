import { User } from '../../../../../shared/infra/mongodb/seed/admin';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUser } from '../../../dtos/IUser';
import { IUserRepository } from '../../../repositories/IUserRepository';


export class UserRepository implements IUserRepository {
  private repository;

  constructor() {
    this.repository = User;
  }
  
  create(data: ICreateUserDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async findById(id: string): Promise<IUser> {
    return await this.repository.findOne(id);
  }
  
  async findByUsername(username: string): Promise<IUser> {
    return await this.repository.findOne({
      username: username,
    });
  }
  
  async findByEmail(email: string): Promise<IUser> {
    return await this.repository.findOne({
      email: email,
    });
  }
}