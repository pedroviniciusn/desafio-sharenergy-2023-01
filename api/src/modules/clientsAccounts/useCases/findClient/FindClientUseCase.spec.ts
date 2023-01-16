import { ICreateClientDTO } from '@modules/clientsAccounts/dtos/ICreateClientDTO';
import { InMemoryClientRepository } from '@modules/clientsAccounts/repositories/in-memory/InMemoryClientRepository';
import { AppError } from '@shared/errors/AppError';
import { FindClientUseCase } from './FindClientUseCase';


let inMemoryClientRepository: InMemoryClientRepository;
let findClientUseCase: FindClientUseCase;

describe("Find Client", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    findClientUseCase = new FindClientUseCase(inMemoryClientRepository);
  });

  it("Should be able to find a client", async () => {
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

    const result = await findClientUseCase.execute({ name: client.name });
    
    expect(result).toEqual(
      expect.objectContaining({
        name: client.name,
        email: client.email,
        address: client.address,
        cpf: client.cpf,
        phone_number: client.phone_number,
      })
    );
  });

  it("Should not be able to find an nonexistent client", async () => {
    await expect(
      findClientUseCase.execute({ name: "Client Error"})
    ).rejects.toEqual(new AppError("Client not found"));
  });
});