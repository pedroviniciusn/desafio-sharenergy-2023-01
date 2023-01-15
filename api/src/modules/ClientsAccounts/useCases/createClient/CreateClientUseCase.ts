import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IClientRepository } from '../../repositories/IClientRepository';

interface IRequest {
  name: string;
  email: string;
  phone_number: number;
  address: string;
  cpf: number;
}

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository,
  ) {}
  async execute({
    name,
    email,
    address,
    cpf,
    phone_number,
  }: IRequest) {
    const userExists = await this.clientRepository.findByEmail(email);

    if (userExists) {
      throw new AppError("User already exists!");
    }

    await this.clientRepository.create({
      name,
      email,
      address,
      cpf,
      phone_number
    });
  }
}