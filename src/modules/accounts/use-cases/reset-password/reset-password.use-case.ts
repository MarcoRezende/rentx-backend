import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUsersTokensRepository } from '@modules/accounts/repositories/users-tokens-repository.interface';
import { IUsersRepository } from '@modules/accounts/repositories/users.repository.interface';
import { IDateProvider } from '@shared/container/providers/date/date.provider.interface';
import { AppError } from '@shared/errors/app-error';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ password, token }: IRequest) {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError('Token invalid!');
    }

    if (
      this.dateProvider.isBefore(userToken.expiresDate, this.dateProvider.now())
    ) {
      throw new AppError('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('User not found');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    // invalida o token recém utilizado
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
