import { AppError } from '@shared/errors/AppError';
import "reflect-metadata"
import { inject, injectable } from 'tsyringe';
import { IClientRepository } from '../../repositories/IClientRepository';

interface IRequest {
  name: string;
}

@injectable()
export class FindClientUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository,
  ) {}

  async execute({ name }: IRequest) {
    const client = await this.clientRepository.findByName(name);

    if (!client) {
      throw new AppError("Client does not exists")
    }

    return client;
  }
}