import {
  inject,
  injectable,
} from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';

import {
  IUserRepository,
} from '../../repositories/IUserRepository';

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
    if (Number(page) != 0 && Number(page) < 4) {
      const users = await this.userRepository.listAllUsers(page);
      return users;
    } else {
      throw new AppError("Page not found!")
    }
  }
}