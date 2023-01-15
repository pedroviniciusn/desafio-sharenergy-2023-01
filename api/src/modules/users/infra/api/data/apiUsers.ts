import { IUserDTO } from '../../../dtos/IUserDTO';


export async function listUsersForPage(page: string): Promise<IUserDTO[]> {
  let usersPage: IUserDTO[] = [];

  const users = await fetch(`https://randomuser.me/api/?page=${page}&results=10&seed=abc&?nat=br&inc=picture,name,email,login,dob`)
      .then(response => response.json())
      .then(data => {
        return data.results
      });

      for(let i = 0; i < users.length; i++) {
        const user = <IUserDTO> { 
          full_name: Object.values(users[i].name).join(" "),
          email: users[i].email,
          username: users[i].login.username,
          age: users[i].dob.age,
          picture: users[i].picture.medium,
        }

        usersPage.push(user);
      }

      return usersPage;
}

export async function listAllUsers(): Promise<IUserDTO[]> {
  let usersArr: IUserDTO[] = [];
  let pages = 3;

  for(let j = 1; j < pages; j++) {
    const users = await fetch(`https://randomuser.me/api/?page=${j}&results=10&seed=abc&?nat=br&inc=picture,name,email,login,dob`)
    .then(response => response.json())
    .then(data => {
      return data.results
    });

    for(let i = 0; i < users.length; i++) {
      const user = <IUserDTO> { 
        full_name: Object.values(users[i].name).join(" "),
        email: users[i].email,
        username: users[i].login.username,
        age: users[i].dob.age,
        picture: users[i].picture.medium,
      }
  
      usersArr.push(user);
    }
  }

  return usersArr;
}