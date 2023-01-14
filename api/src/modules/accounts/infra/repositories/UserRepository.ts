import { User } from '../../../../shared/infra/mongodb/seed/admin';
import { IUser } from '../../dtos/IUser';
import { IUserRepository } from '../../repositories/IUserRepository';


export class UserRepository implements IUserRepository {
  private repository;
  private users: IUser[] = [];
  private usersPage: IUser[] = [];

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
    this.usersPage = [];
  
    const users = await fetch(`https://randomuser.me/api/?page=${page}&results=10&?seed=foobar&inc=picture,name,email,login,dob`)
      .then(response => response.json())
      .then(data => {
        return data.results
      });

      for(let i = 0; i < users.length; i++) {
        const user = <IUser> { 
          full_name: Object.values(users[i].name).join(" "),
          email: users[i].email,
          username: users[i].login.username,
          age: users[i].dob.age,
          picture: users[i].picture.medium,
        }
        this.usersPage.push(user);
        this.users.push(user);
      }

      return this.usersPage;
  }
}