import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteClientUseCase } from './DeleteClientUseCase';


export class DeleteClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteClientUseCase = container.resolve(DeleteClientUseCase);

    await deleteClientUseCase.execute({ id });

    return res.status(200).json({
      message: "Success",
    });
  }
}