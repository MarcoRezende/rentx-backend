import { ICreateUserTokenDTO } from '../dtos/create-user-token.dto';
import { UserToken } from '../infra/typeorm/entities/user-token';

export interface IUsersTokensRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken>;

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(token: string): Promise<UserToken | undefined>;
}
