import { inject, injectable } from 'tsyringe';

import { IUserResponseDto } from '@modules/accounts/dtos/user-response.dto';
import { UserMap } from '@modules/accounts/mappers/user.map';
import { IUsersRepository } from '@modules/accounts/repositories/users.repository.interface';

@injectable()
export class UserProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDto | undefined> {
    const user = await this.usersRepository.findById(id);

    return user ? UserMap.toDto(user) : undefined;
  }
}
