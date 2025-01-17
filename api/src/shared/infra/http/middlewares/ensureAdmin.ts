import {
  Request,
  Response,
  NextFunction,
} from 'express';

import { UserRepository } from '../../../../modules/accounts/infra/mongodb/repositories/UserRepository';

import { AppError } from '../../../errors/AppError';

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.user;

  const userRepository = new UserRepository();

  const user = await userRepository.findById(id);

  if (user.is_admin === false) {
    throw new AppError('User is not Admin');
  }

  next();
}