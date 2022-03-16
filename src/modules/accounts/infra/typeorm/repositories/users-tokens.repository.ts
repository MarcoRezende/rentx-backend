import { getRepository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/create-user-token.dto';
import { IUsersTokensRepository } from '@modules/accounts/repositories/users-tokens-repository.interface';

import { UserToken } from '../entities/user-token';

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository = getRepository(UserToken);

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const token = this.repository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    return this.repository.save(token);
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined> {
    return this.repository.findOne({ where: { userId, refreshToken } });
  }

  async deleteById(id: string): Promise<void> {
    this.repository.delete(id);
  }

  findByRefreshToken(refreshToken: string): Promise<UserToken | undefined> {
    return this.repository.findOne({ refreshToken });
  }
}
