import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
export class FindUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(data: string) {
    const user = await this.userRepository.findUser(data);
    
    if (!user) {
      throw new AppError("User does not exists!")
    }

    return user;
  }
}