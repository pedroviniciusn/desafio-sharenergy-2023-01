import "reflect-metadata";
import { IClientDTO } from '@modules/clientsAccounts/dtos/IClientDTO';
import { IClientRepository } from '@modules/clientsAccounts/repositories/IClientRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetClientsUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository,
  ) {}

  async execute(): Promise<IClientDTO[]> {
    const clients = await this.clientRepository.find();
    
    if (clients.length == 0) {
      throw new AppError("There are no registered clients")
    }

    return clients;
  }
}