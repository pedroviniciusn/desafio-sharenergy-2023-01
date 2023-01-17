import "reflect-metadata";
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IApiUsersRepository } from '../../repositories/IApiUsersRepository';

interface IRequest {
  data: string;
}

@injectable()
export class FindUserUseCase {
  constructor(
    @inject("ApiUsersRepository")
    private apiUsersRepository: IApiUsersRepository,
  ) {}

  async execute({ data }: IRequest) {
    const user = await this.apiUsersRepository.findUser(data);
    
    if (!user) {
      throw new AppError("User does not exists!")
    }

    return user;
  }
}