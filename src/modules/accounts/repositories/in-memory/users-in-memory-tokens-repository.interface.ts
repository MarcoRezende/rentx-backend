import { ICreateUserTokenDTO } from '@modules/accounts/dtos/create-user-token.dto';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/user-token';

import { IUsersTokensRepository } from '../users-tokens-repository.interface';

export class UsersTokensInMemoryRepository implements IUsersTokensRepository {
  usersTokens: UserToken[] = [];

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expiresDate,
      refreshToken,
      userId,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined> {
    return this.usersTokens.find(
      (userToken) =>
        userToken.userId === userId && userToken.refreshToken === refreshToken
    );
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((userToken) => userToken.id === id);

    if (userToken) {
      this.usersTokens.slice(this.usersTokens.indexOf(userToken));
    }
  }

  async findByRefreshToken(token: string): Promise<UserToken | undefined> {
    return this.usersTokens.find((userToken) => userToken.refreshToken);
  }
}
