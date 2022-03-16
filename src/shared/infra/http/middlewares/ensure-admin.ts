import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/users.repository';
import { AppError } from '@shared/errors/app-error';

export async function ensureAdmin(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(request.user?.id);

  if (!user?.isAdmin) {
    throw new AppError("User isn't an admin");
  }

  return next();
}
