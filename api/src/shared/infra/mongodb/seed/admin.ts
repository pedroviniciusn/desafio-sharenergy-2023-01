import { hash } from 'bcryptjs';
import { User } from '../../../../modules/accounts/infra/mongodb/models/User';

import { UserRepository } from '../../../../modules/accounts/infra/mongodb/repositories/UserRepository';

export async function createAdmin() {
  const userRepository =  new UserRepository();
  const adminExists = await userRepository.findByEmail("desafiosharenergy@email.com");

  if(!adminExists) {
    const passwordHash = await hash("sh@r3n3rgy", 8)
  
    const userAdmin = new User({
      full_name: "Admin",
      email: "desafiosharenergy@email.com",
      username: "desafiosharenergy",
      password: passwordHash,
      age: 23,
      is_admin: true,
    });
  
    userAdmin.save();
  }
}

export { User };
