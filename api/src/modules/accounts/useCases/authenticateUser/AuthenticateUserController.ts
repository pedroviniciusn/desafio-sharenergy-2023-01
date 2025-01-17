import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      username,
      password,
    } = req.body;

    const authenticateUserUseCase =  container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({ username, password });

    return res.status(200).json(token);
  }
}