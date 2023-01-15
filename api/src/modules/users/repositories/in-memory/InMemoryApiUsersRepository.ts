import { IUserDTO } from '../../dtos/IUserDTO';
import { listUsersForPage, listAllUsers } from '../../infra/api/data/apiUsers';
import { IApiUsersRepository } from '../IApiUsersRepository';


export class InMemoryApiUsersRepository implements IApiUsersRepository {
  async listAllUsers(page: string): Promise<IUserDTO[]> {
    const users = await listUsersForPage(page);

    return users;
  }

  async findUser(data: string): Promise<IUserDTO | null> {
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