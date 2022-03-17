"use strict";

var _usersInMemoryTokensRepository = require("../../repositories/in-memory/users-in-memory-tokens-repository.interface");

var _users = require("../../repositories/in-memory/users.in-memory-repository");

var _dayjs = require("../../../../shared/container/providers/date/implementations/dayjs.provider");

var _mail = require("../../../../shared/container/providers/mail/in-memory/mail.in-memory-provider");

var _appError = require("../../../../shared/errors/app-error");

var _sendForgotPasswordMail = require("./send-forgot-password-mail.use-case");

let sendForgotPasswordMailUseCase;
let usersInMemoryRepository;
let usersTokensInMemoryRepository;
let dateProvider;
let mailProvider;
describe('Send forgot password mail', () => {
  beforeEach(() => {
    usersInMemoryRepository = new _users.UsersInMemoryRepository();
    usersTokensInMemoryRepository = new _usersInMemoryTokensRepository.UsersTokensInMemoryRepository();
    dateProvider = new _dayjs.DayJsProvider();
    mailProvider = new _mail.MailInMemoryProvider();
    sendForgotPasswordMailUseCase = new _sendForgotPasswordMail.SendForgotPasswordMailUseCase(usersInMemoryRepository, usersTokensInMemoryRepository, dateProvider, mailProvider);
  });
  it('should be able to send forgot password email', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await usersInMemoryRepository.create({
      driverLicense: '53774',
      email: 'test@example.com',
      name: 'Beatrice McDaniel',
      password: '123'
    });
    await sendForgotPasswordMailUseCase.execute('test@example.com');
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to send an email if user does not exist', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('tisnaful@vaafo.sg')).rejects.toEqual(new _appError.AppError('User does not exist!'));
  });
  it('should be able to create a user token', async () => {
    const createToken = jest.spyOn(usersTokensInMemoryRepository, 'create');
    await usersInMemoryRepository.create({
      driverLicense: '53774',
      email: 'test@example.com',
      name: 'Beatrice McDaniel',
      password: '123'
    });
    await sendForgotPasswordMailUseCase.execute('test@example.com');
    expect(createToken).toHaveBeenCalled();
  });
});