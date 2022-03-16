import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import {
  expiresInRefreshToken,
  expiresInToken,
  expiresRefreshTokenDays,
  secretRefreshToken,
  secretToken,
} from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/users-tokens-repository.interface';
import { IUsersRepository } from '@modules/accounts/repositories/users.repository.interface';
import { IDateProvider } from '@shared/container/providers/date/date.provider.interface';
import { AppError } from '@shared/errors/app-error';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
  };
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Password or email incorrect', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Password or email incorrect', 401);
    }

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresRefreshTokenDays
    );

    await this.usersTokensRepository.create({
      expiresDate: refreshTokenExpiresDate,
      refreshToken,
      userId: <string>user.id,
    });

    return {
      token,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
