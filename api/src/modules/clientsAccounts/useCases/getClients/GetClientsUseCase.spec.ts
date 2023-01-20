import { ICreateClientDTO } from '@modules/clientsAccounts/dtos/ICreateClientDTO';
import { InMemoryClientRepository } from '@modules/clientsAccounts/repositories/in-memory/InMemoryClientRepository';
import { GetClientsUseCase } from './GetClientsUseCase';

let inMemoryClientRepository: InMemoryClientRepository;
let getClientsUseCase: GetClientsUseCase;

describe("Get All Clients", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    getClientsUseCase = new GetClientsUseCase(inMemoryClientRepository);
  });

  it("Should be able to get all clients", async () => {
    const client: ICreateClientDTO = {
      name: "Client test",
      email: "client@test.com",
      address: "street test",
      cpf: 12345678900,
      phone_number: 85900000011,
    };

    inMemoryClientRepository.create({
      name: client.name,
      email: client.email,
      address: client.address,
      cpf: client.cpf,
      phone_number: client.phone_number, 
    });

    const result = await getClientsUseCase.execute();

    expect(result.length).toEqual(1);
  })
})