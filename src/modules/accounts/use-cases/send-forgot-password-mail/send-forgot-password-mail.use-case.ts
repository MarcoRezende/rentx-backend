import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersTokensRepository } from '@modules/accounts/repositories/users-tokens-repository.interface';
import { IUsersRepository } from '@modules/accounts/repositories/users.repository.interface';
import { IDateProvider } from '@shared/container/providers/date/date.provider.interface';
import { IMailProvider } from '@shared/container/providers/mail/mail.provider.interface';
import { AppError } from '@shared/errors/app-error';

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgot-password.hbs'
    );

    if (!user) {
      throw new AppError('User does not exist!');
    }

    const token = uuidV4();

    const expiresDate = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      userId: <string>user.id,
      refreshToken: token,
      expiresDate,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath
    );
  }
}
