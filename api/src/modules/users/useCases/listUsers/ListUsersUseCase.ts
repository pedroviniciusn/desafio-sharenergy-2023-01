import "reflect-metadata";
import {
  inject,
  injectable,
} from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IApiUsersRepository } from '../../repositories/IApiUsersRepository';

interface IRequest {
  page: string;
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject("ApiUsersRepository")
    private apiUsersRepository: IApiUsersRepository,
  ) {}

  async execute({ page }: IRequest) {
    if (Number(page) != 0 && Number(page) < 4) {
      const users = await this.apiUsersRepository.listAllUsers(String(page));
      return users;
    } else {
      throw new AppError("Page not found!")
    }
  }
}