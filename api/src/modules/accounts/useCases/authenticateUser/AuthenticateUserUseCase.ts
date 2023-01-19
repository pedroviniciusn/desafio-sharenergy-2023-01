import "reflect-metadata";

import {
  sign,
} from 'jsonwebtoken';

import {
  compare,
} from 'bcryptjs';

import {
  inject,
  injectable,
} from 'tsyringe';

import {
  AppError,
} from '../../../../shared/errors/AppError';

import {
  IUserRepository,
} from '../../repositories/IUserRepository';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: {
    username: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({
    username,
    password,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "56ebb4604b372d83bb869862c65c9fbd", {
      subject: user.id,
      expiresIn: '30m',
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}
