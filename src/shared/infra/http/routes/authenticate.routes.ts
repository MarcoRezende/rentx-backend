import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/use-cases/authenticate-user/authenticate-user.controller';
import { RefreshTokenUseController } from '@modules/accounts/use-cases/refresh-token/refresh-token.use.controller';

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenUseController = new RefreshTokenUseController();

authenticateRouter.post('/sessions', authenticateUserController.handle);

authenticateRouter.post('/refresh-token', refreshTokenUseController.handle);

export { authenticateRouter };
