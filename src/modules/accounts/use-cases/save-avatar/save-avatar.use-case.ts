import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@shared/container/providers/storage/storage.provider.interface';
import { AppError } from '@shared/errors/app-error';

import { UsersRepository } from '../../infra/typeorm/repositories/users.repository';

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
export class SaveAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ userId, avatarFile }: IRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user?.id) {
      throw new AppError('User not found');
    }

    if (user.avatarUrl) {
      await this.storageProvider.delete(avatarFile, 'avatar');
    }

    await this.storageProvider.save(avatarFile, 'avatar');

    user.avatarUrl = avatarFile;

    this.usersRepository.saveAvatar(user.id, avatarFile);
  }
}
