import { UsersTokensInMemoryRepository } from '@modules/accounts/repositories/in-memory/users-in-memory-tokens-repository.interface';
import { DayJsProvider } from '@shared/container/providers/date/implementations/dayjs.provider';
import { AppError } from '@shared/errors/app-error';

import { UsersInMemoryRepository } from '../../repositories/in-memory/users.in-memory-repository';
import { CreateUserUseCase } from '../create-user/create-user.use-case';
import { ICreateUserDTO } from './../../dtos/create-user.dto';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersInMemoryRepository: UsersInMemoryRepository;
let usersTokensInMemoryRepository: UsersTokensInMemoryRepository;
let dateProvider: DayJsProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    usersTokensInMemoryRepository = new UsersTokensInMemoryRepository();
    dateProvider = new DayJsProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersInMemoryRepository,
      usersTokensInMemoryRepository,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersInMemoryRepository);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driverLicense: '123',
      name: 'Test User',
      email: 'test@example.com',
      password: '123123',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not able to authenticate an nonexisting user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'nonexisting@example.com',
        password: '123123',
      })
    ).rejects.toEqual(new AppError('Password or email incorrect', 401));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driverLicense: '123',
      name: 'Test User',
      email: 'test@example.com',
      password: '123123',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect',
      })
    ).rejects.toEqual(new AppError('Password or email incorrect', 401));
  });
});
