import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { secretToken } from '@config/auth';

import { AppError } from '../../../errors/app-error';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, secretToken) as IPayload;

    request.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
