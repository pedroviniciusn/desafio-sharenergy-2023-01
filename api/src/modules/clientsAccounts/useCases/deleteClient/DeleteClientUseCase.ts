import "reflect-metadata"

import { inject, injectable, } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IClientRepository } from '../../repositories/IClientRepository';

interface IRequest {
  id: string;
}

@injectable()
export class DeleteClientUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository,
  ) {}
  
  async execute({ id }: IRequest) {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError("Client not found");
    }

    await this.clientRepository.delete(id);
  }
}