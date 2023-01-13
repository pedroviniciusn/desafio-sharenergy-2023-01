import { User } from '../../../../shared/infra/mongodb/seed/admin';
import { IUser } from '../../dtos/IUser';
import { IUserRepository } from '../../repositories/IUserRepository';


export class UserRepository implements IUserRepository {
  private repository

  constructor() {
    this.repository = User;
  }
  
  async findById(id: string): Promise<IUser> {
    return await this.repository.findOne({
      _id: id 
    });
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.repository.findOne({
      _email: email
    })
  }

}