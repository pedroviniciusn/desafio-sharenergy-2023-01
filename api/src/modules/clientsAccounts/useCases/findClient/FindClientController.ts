import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindClientUseCase } from './FindClientUseCase';


export class FindClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;

    const findClientUseCase = container.resolve(FindClientUseCase);

    const client = await findClientUseCase.execute({
      name: name.toString(),
    });

    return res.json(client);
  }
}