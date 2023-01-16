import { hash } from 'bcryptjs';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { InMemoryUserRepository } from '@modules/accounts/repositories/in-memory/InMemoryUserRepository';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { AppError } from '@shared/errors/AppError';


let inMemoryUserRepository: InMemoryUserRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUserRepository);
  });

  it("Should be able to Authenticate an user", async () => {
    const passwordHhash = await hash("test", 8);

    const user: ICreateUserDTO = {
      full_name: "User test",
      username: "user",
      email: "user@test.com",
      password: passwordHhash,
      is_admin: false,
      age: 20,
    };

    inMemoryUserRepository.create(user);

    const result = await authenticateUserUseCase.execute({
      username: user.username,
      password: "test",
    });

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty('user');
  });

  it("Should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        username: "user error",
        password: "error",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect", 401));
  });
});