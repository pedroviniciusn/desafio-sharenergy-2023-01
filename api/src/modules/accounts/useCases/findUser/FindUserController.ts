import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindUserUseCase } from './FindUserUseCase';


export class FindUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      data
    } = req.body;

    const findUserUseCase = container.resolve(FindUserUseCase);

    const user = await findUserUseCase.execute(data);
    
    return res.json(user);
  }
}