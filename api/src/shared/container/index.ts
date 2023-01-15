import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/accounts/repositories/IUserRepository';
import { UserRepository } from '../../modules/accounts/infra/mongodb/repositories/UserRepository';
import { ApiUsersRepository } from '../../modules/users/infra/api/repositories/ApiUsersRepository';
import { IApiUsersRepository } from '../../modules/users/repositories/IApiUsersRepository';

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository,
);

container.registerSingleton<IApiUsersRepository>(
  "ApiUsersRepository",
  ApiUsersRepository,
);

