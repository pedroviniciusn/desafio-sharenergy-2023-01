import { ICreateClientDTO } from '@modules/clientsAccounts/dtos/ICreateClientDTO';
import { InMemoryClientRepository } from '@modules/clientsAccounts/repositories/in-memory/InMemoryClientRepository';
import { AppError } from '@shared/errors/AppError';
import { UpdateClientUseCase } from './UpdateClientUseCase';

let inMemoryClientRepository: InMemoryClientRepository;
let updateClientUseCase: UpdateClientUseCase;

describe("Update Client", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    updateClientUseCase = new UpdateClientUseCase(inMemoryClientRepository);
  });

  it("should be able to update client", async () => {
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

    const clientCreated = await inMemoryClientRepository.findByEmail(client.email);
    
    const clientUpdated = await updateClientUseCase.execute({
      id: clientCreated.id,
      name: "New Name",
    });

    expect(clientUpdated.name).toEqual("New Name");
  });

  it("Should not be able to update an nonexistent client", async () => {
    await expect(
      updateClientUseCase.execute({
        id: "anfonafnlkfnafl",
        name: "Error"
      })
    ).rejects.toEqual(new AppError("User not found"));
  });
});