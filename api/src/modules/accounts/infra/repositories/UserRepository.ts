import { User } from '../../../../shared/infra/mongodb/seed/admin';
import { IUser } from '../../dtos/IUser';
import { IUserRepository } from '../../repositories/IUserRepository';


export class UserRepository implements IUserRepository {
  private repository

  constructor() {
    this.repository = User;
  }

  async findById(id: string): Promise<IUser> {
    return await this.repository.find({
      _id: id 
    });
  }

}