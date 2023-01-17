import { InMemoryApiUsersRepository } from '@modules/users/repositories/in-memory/InMemoryApiUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { ListUsersUseCase } from './ListUsersUseCase';


let inMemoryApiUsersRepository: InMemoryApiUsersRepository;
let listUsersUseCase: ListUsersUseCase;

describe("List Users", () => {
  beforeEach(() => {
    inMemoryApiUsersRepository =  new InMemoryApiUsersRepository();
    listUsersUseCase = new ListUsersUseCase(inMemoryApiUsersRepository);
  });

  it("Should be able to list users from page 1", async () => {
    const result = await listUsersUseCase.execute({
      page: "1",
    });

    expect(result.length).toEqual(10);
  });

  it("Should be able to list users from page 2", async () => {
    const result = await listUsersUseCase.execute({
      page: "2",
    });

    expect(result.length).toEqual(10);
  });

  it("Should be able to list users from page 3", async () => {
    const result = await listUsersUseCase.execute({
      page: "3",
    });

    expect(result.length).toEqual(10);
  });

  it("Should not be able to list users from page an nonexistent", async () => {
    await expect(
      listUsersUseCase.execute({
        page: "4",
      })
    ).rejects.toEqual(new AppError("Page not found!"));
  });
});