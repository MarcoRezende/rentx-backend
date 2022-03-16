import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import {
  expiresInRefreshToken,
  expiresInToken,
  expiresRefreshTokenDays,
  secretRefreshToken,
  secretToken,
} from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/users-tokens-repository.interface';
import { IDateProvider } from '@shared/container/providers/date/date.provider.interface';
import { AppError } from '@shared/errors/app-error';

interface IPayload {
  email: string;
  sub: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub: userId } = verify(
      token,
      secretRefreshToken
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: userId,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresRefreshTokenDays
    );

    await this.usersTokensRepository.create({
      expiresDate: refreshTokenExpiresDate,
      refreshToken,
      userId,
    });

    const newToken = sign({}, secretToken, {
      subject: userId,
      expiresIn: expiresInToken,
    });

    return {
      token: newToken,
      refreshToken,
    };
  }
}
