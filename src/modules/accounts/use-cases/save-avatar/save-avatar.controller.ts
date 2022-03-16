import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { SaveAvatarUseCase } from './save-avatar.use-case';

export class SaveAvatarController {
  async handle(request: Request, response: Response) {
    const {
      user: { id: userId },
    } = request;

    const avatarFile = request.file?.filename;

    if (!avatarFile) {
      throw new AppError('File required');
    }

    const saveAvatarUseCase = container.resolve(SaveAvatarUseCase);

    await saveAvatarUseCase.execute({ userId, avatarFile });

    response.status(204).send();
  }
}
