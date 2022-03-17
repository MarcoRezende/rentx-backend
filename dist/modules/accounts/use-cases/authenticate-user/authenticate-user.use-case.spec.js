"use strict";

var _usersInMemoryTokensRepository = require("../../repositories/in-memory/users-in-memory-tokens-repository.interface");

var _dayjs = require("../../../../shared/container/providers/date/implementations/dayjs.provider");

var _appError = require("../../../../shared/errors/app-error");

var _users = require("../../repositories/in-memory/users.in-memory-repository");

var _createUser = require("../create-user/create-user.use-case");

var _authenticateUser = require("./authenticate-user.use-case");

let authenticateUserUseCase;
let createUserUseCase;
let usersInMemoryRepository;
let usersTokensInMemoryRepository;
let dateProvider;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersInMemoryRepository = new _users.UsersInMemoryRepository();
    usersTokensInMemoryRepository = new _usersInMemoryTokensRepository.UsersTokensInMemoryRepository();
    dateProvider = new _dayjs.DayJsProvider();
    authenticateUserUseCase = new _authenticateUser.AuthenticateUserUseCase(usersInMemoryRepository, usersTokensInMemoryRepository, dateProvider);
    createUserUseCase = new _createUser.CreateUserUseCase(usersInMemoryRepository);
  });
  it('should be able to authenticate an user', async () => {
    const user = {
      driverLicense: '123',
      name: 'Test User',
      email: 'test@example.com',
      password: '123123'
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty('token');
  });
  it('should not able to authenticate an nonexisting user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'nonexisting@example.com',
      password: '123123'
    })).rejects.toEqual(new _appError.AppError('Password or email incorrect', 401));
  });
  it('should not be able to authenticate with incorrect password', async () => {
    const user = {
      driverLicense: '123',
      name: 'Test User',
      email: 'test@example.com',
      password: '123123'
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: 'incorrect'
    })).rejects.toEqual(new _appError.AppError('Password or email incorrect', 401));
  });
});