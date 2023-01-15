import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateClientUseCase } from './UpdateClientUseCase';

export class UpdateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const {
      name,
      email,
      address,
      cpf,
      phone_number,
    } = req.body;

    const updateClientUseCase = container.resolve(UpdateClientUseCase);

    const clientUpdated = await updateClientUseCase.execute({
      id,
      name,
      email,
      address,
      cpf,
      phone_number,
    });

    return res.status(200).json(clientUpdated)
  }
}