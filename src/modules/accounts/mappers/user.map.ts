import { instanceToInstance } from 'class-transformer';

import { IUserResponseDto } from '../dtos/user-response.dto';

export class UserMap {
  static toDto({
    driverLicense,
    email,
    id,
    name,
    avatarUrl,
    userAvatarUrl,
  }: IUserResponseDto) {
    return instanceToInstance({
      driverLicense,
      email,
      avatarUrl,
      id,
      name,
      userAvatarUrl,
    });
  }
}
