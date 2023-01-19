import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetClientsUseCase } from './GetClientsUseCase';


export class GetClientsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getClientsUseCase = container.resolve(GetClientsUseCase);
    
    const clients = await getClientsUseCase.execute();

    return res.json(clients);
  }
}