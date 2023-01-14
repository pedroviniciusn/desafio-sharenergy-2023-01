import { autoInjectable, inject, injectable } from 'tsyringe';
import { UserRepository } from '../../infra/repositories/UserRepository';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  page: string;
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({ page }: IRequest) {
    const users = await this.userRepository.listAllUsers(page);

    return users;
  }
}