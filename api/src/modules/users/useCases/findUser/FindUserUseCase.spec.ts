import { InMemoryApiUsersRepository } from '@modules/users/repositories/in-memory/InMemoryApiUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { FindUserUseCase } from './FindUserUseCase';


let inMemoryApiUsersRepository: InMemoryApiUsersRepository;
let findUsersUseCase: FindUserUseCase;

describe("Find User", () => {
  beforeEach(() => {
    inMemoryApiUsersRepository =  new InMemoryApiUsersRepository();
    findUsersUseCase = new FindUserUseCase(inMemoryApiUsersRepository);
  });

  it("Should be able to find user by name", async () => {
    const result = await findUsersUseCase.execute({
      data: "Miss Laura Woods",
    });

    expect(result.full_name).toEqual("Miss Laura Woods");
  });

  it("Should be able to find user by email", async () => {
    const result = await findUsersUseCase.execute({
      data: "laura.woods@example.com",
    });

    expect(result.email).toEqual("laura.woods@example.com");
  });

  it("Should be able to find user by username", async () => {
    const result = await findUsersUseCase.execute({
      data: "angryostrich988",
    });

    expect(result.username).toEqual("angryostrich988");
  });

  it("Should not be able to find user an nonexistent", async () => {
    await expect(
      findUsersUseCase.execute({
        data: "User error",
      })
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

});