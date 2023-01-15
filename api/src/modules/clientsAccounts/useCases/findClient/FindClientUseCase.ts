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

    return client;
  }
}