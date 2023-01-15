import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUsersUseCase } from './ListUsersUseCase';


export class ListUsersController {
  async handle(req: Request, res: Response) {
    const { page } = req.params;
    
    const listUsersUseCase = container.resolve(ListUsersUseCase);
    
    const users = await listUsersUseCase.execute({ page });

    res.json(users);
  }
}