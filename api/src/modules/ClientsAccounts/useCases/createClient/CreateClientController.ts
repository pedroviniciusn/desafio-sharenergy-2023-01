import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateClientUseCase } from './CreateClientUseCase';


export class CreateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      address,
      cpf,
      phone_number,
    } = req.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);

    await createClientUseCase.execute({
      name,
      email,
      address,
      cpf,
      phone_number,
    });

    return res.status(200).json({
      message: "Created"
    });
  }
}