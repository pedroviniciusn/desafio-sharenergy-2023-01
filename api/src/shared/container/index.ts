import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/accounts/repositories/IUserRepository';
import { UserRepository } from '../../modules/accounts/infra/mongodb/repositories/UserRepository';
import { ApiUsersRepository } from '../../modules/users/infra/api/repositories/ApiUsersRepository';
import { IApiUsersRepository } from '../../modules/users/repositories/IApiUsersRepository';
import { IClientRepository } from '../../modules/clientsAccounts/repositories/IClientRepository';
import { ClientRepository } from '../../modules/clientsAccounts/infra/mongodb/repositories/ClientRepository';

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository,
);

container.registerSingleton<IClientRepository>(
  "ClientRepository",
  ClientRepository,
);

container.registerSingleton<IApiUsersRepository>(
  "ApiUsersRepository",
  ApiUsersRepository,
);


