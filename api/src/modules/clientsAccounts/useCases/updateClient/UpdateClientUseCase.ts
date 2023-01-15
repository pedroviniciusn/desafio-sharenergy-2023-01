import { autoInjectable, inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IClientRepository } from '../../repositories/IClientRepository';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  phone_number?: number;
  address?: string;
  cpf?: number;
}

@injectable()
export class UpdateClientUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository,
  ) {}
  
  async execute({
    id,
    name,
    email,
    address,
    cpf,
    phone_number,
  }: IRequest) {
    const userExists = await this.clientRepository.findById(id);

    if (!userExists) {
      throw new AppError("User not found");
    }

    const userUpdated = await this.clientRepository.update({
      id,
      name,
      email,
      address,
      cpf,
      phone_number,
    });

    return userUpdated;
  }
}