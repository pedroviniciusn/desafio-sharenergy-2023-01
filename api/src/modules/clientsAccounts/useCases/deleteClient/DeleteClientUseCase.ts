import { inject, injectable, } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ClientRepository } from '../../infra/mongodb/repositories/ClientRepository';
import { IClientRepository } from '../../repositories/IClientRepository';

interface IRequest {
  id: string;
}

injectable()
export class DeleteClientUseCase {
  private clientRepository
  constructor(
    // @inject("ClientRepository")
    // private clientRepository: IClientRepository,
  ) {
    this.clientRepository = new ClientRepository();
  }
  
  async execute({ id }: IRequest) {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError("User not found");
    }

    await this.clientRepository.delete(id);
  }
}