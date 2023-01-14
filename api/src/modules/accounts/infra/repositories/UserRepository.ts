import { User } from '../../../../shared/infra/mongodb/seed/admin';
import { IUser } from '../../dtos/IUser';
import { IUserRepository } from '../../repositories/IUserRepository';
import { listAllUsers, listUsersForPage } from '../api/apiUsers';


export class UserRepository implements IUserRepository {
  private repository;

  constructor() {
    this.repository = User;
  }
  
  async findById(id: string): Promise<IUser> {
    return await this.repository.findOne({
      _id: id 
    });
  }
  
  async findByUsername(username: string): Promise<IUser> {
    return await this.repository.findOne({
      _username: username
    });
  }
  
  async findByEmail(email: string): Promise<IUser> {
    return await this.repository.findOne({
      _email: email
    });
  }

  async listAllUsers(page: string): Promise<IUser[]> {
    const users = await listUsersForPage(page);

    return users;
  }

  async findUser(data: string): Promise<IUser | null> {
    const users = await listAllUsers();

    const user = users.filter((user) => {
      if (
        data.toLowerCase() === user.full_name.toLowerCase() ||
        data.toLowerCase() === user.email.toLowerCase() || 
        data.toLowerCase() === user.username.toLowerCase()
      ) {
        return user;
      }

      return null;
    })
 
    return user[0];
  }
}