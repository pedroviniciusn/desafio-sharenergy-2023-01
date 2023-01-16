import { ICreateClientDTO } from '@modules/clientsAccounts/dtos/ICreateClientDTO';
import { InMemoryClientRepository } from '@modules/clientsAccounts/repositories/in-memory/InMemoryClientRepository';
import { AppError } from '@shared/errors/AppError';
import { userInfo } from 'os';
import { CreateClientUseCase } from './CreateClientUseCase';


let inMemoryClientRepository: InMemoryClientRepository;
let createClientUseCase: CreateClientUseCase;

describe("Create Client", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    createClientUseCase = new CreateClientUseCase(inMemoryClientRepository);
  });

  it("Should be able to create a client", async () => {
    const client: ICreateClientDTO = {
      name: "Client test",
      email: "client@test.com",
      address: "street test",
      cpf: 12345678900,
      phone_number: 85900000011,
    };

    await createClientUseCase.execute({
      name: client.name,
      email: client.email,
      address: client.address,
      cpf: client.cpf,
      phone_number: client.phone_number, 
    });

    const clientCreated = await inMemoryClientRepository.findByEmail(client.email);

    expect(clientCreated).toHaveProperty("id");
  });

  it("Should not be able to create a client if email already exists", async () => {
    const client: ICreateClientDTO = {
      name: "Client test two",
      email: "client@testtwo.com",
      address: "street test",
      cpf: 12345678900,
      phone_number: 85900000011,
    };

    await createClientUseCase.execute({
      name: client.name,
      email: client.email,
      address: client.address,
      cpf: client.cpf,
      phone_number: client.phone_number, 
    });

    await inMemoryClientRepository.findByEmail(client.email);

    await expect(
      createClientUseCase.execute({
        name: "test",
        email: client.email,
        address: "street IV",
        cpf: 14725836989,
        phone_number: 41976645502, 
      })
    ).rejects.toEqual(new AppError("User already exists!"));
  });
})
