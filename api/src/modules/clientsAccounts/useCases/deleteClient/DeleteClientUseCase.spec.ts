import { ICreateClientDTO } from '@modules/clientsAccounts/dtos/ICreateClientDTO';
import { InMemoryClientRepository } from '@modules/clientsAccounts/repositories/in-memory/InMemoryClientRepository';
import { AppError } from '@shared/errors/AppError';
import { DeleteClientUseCase } from './DeleteClientUseCase';

let inMemoryClientRepository: InMemoryClientRepository;
let deleteClientUseCase: DeleteClientUseCase;

describe("Delete Client", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    deleteClientUseCase = new DeleteClientUseCase(inMemoryClientRepository);
  });

  it("Should be able to delete a client", async () => {
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
    
    await deleteClientUseCase.execute({ id: clientCreated.id });

    const clientDeleted = await inMemoryClientRepository.findByEmail(client.email);

    expect(clientDeleted).toEqual(undefined);
  });

  it("Should not be able to delete an nonexistent client", async () => {
    await expect(
      deleteClientUseCase.execute({ id: "asdnhuoajdioa"})
    ).rejects.toEqual(new AppError("Client not found"));
  });
});