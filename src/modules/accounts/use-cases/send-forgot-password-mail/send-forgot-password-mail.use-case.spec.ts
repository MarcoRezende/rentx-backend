import { UsersTokensInMemoryRepository } from '@modules/accounts/repositories/in-memory/users-in-memory-tokens-repository.interface';
import { UsersInMemoryRepository } from '@modules/accounts/repositories/in-memory/users.in-memory-repository';
import { DayJsProvider } from '@shared/container/providers/date/implementations/dayjs.provider';
import { MailInMemoryProvider } from '@shared/container/providers/mail/in-memory/mail.in-memory-provider';
import { AppError } from '@shared/errors/app-error';

import { SendForgotPasswordMailUseCase } from './send-forgot-password-mail.use-case';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersInMemoryRepository: UsersInMemoryRepository;
let usersTokensInMemoryRepository: UsersTokensInMemoryRepository;
let dateProvider: DayJsProvider;
let mailProvider: MailInMemoryProvider;

describe('Send forgot password mail', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    usersTokensInMemoryRepository = new UsersTokensInMemoryRepository();
    dateProvider = new DayJsProvider();
    mailProvider = new MailInMemoryProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersInMemoryRepository,
      usersTokensInMemoryRepository,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send forgot password email', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersInMemoryRepository.create({
      driverLicense: '53774',
      email: 'test@example.com',
      name: 'Beatrice McDaniel',
      password: '123',
    });

    await sendForgotPasswordMailUseCase.execute('test@example.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exist', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('tisnaful@vaafo.sg')
    ).rejects.toEqual(new AppError('User does not exist!'));
  });

  it('should be able to create a user token', async () => {
    const createToken = jest.spyOn(usersTokensInMemoryRepository, 'create');

    await usersInMemoryRepository.create({
      driverLicense: '53774',
      email: 'test@example.com',
      name: 'Beatrice McDaniel',
      password: '123',
    });

    await sendForgotPasswordMailUseCase.execute('test@example.com');

    expect(createToken).toHaveBeenCalled();
  });
});
