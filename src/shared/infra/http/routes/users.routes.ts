import { Router } from 'express';
import multer from 'multer';

import { UserProfileController } from '@modules/accounts/use-cases/user-profile/user-profile.controller';

import uploadConfig from '../../../../config/upload';
import { CreateUserController } from '../../../../modules/accounts/use-cases/create-user/create-user.controller';
import { SaveAvatarController } from '../../../../modules/accounts/use-cases/save-avatar/save-avatar.controller';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';

const usersRouter = Router();

const createUserController = new CreateUserController();
const saveAvatarController = new SaveAvatarController();
const userProfileController = new UserProfileController();

const uploadAvatar = multer(uploadConfig);

usersRouter.post('/', createUserController.handle);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatarFile'),
  saveAvatarController.handle
);

usersRouter.get('/me', ensureAuthenticated, userProfileController.handle);

export { usersRouter };
