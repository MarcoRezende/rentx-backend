import { Router } from 'express';

import { ResetPasswordController } from '@modules/accounts/use-cases/reset-password/reset-password.controller';
import { SendForgotPasswordMailController } from '@modules/accounts/use-cases/send-forgot-password-mail/send-forgot-password-mail.controller';

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', sendForgotPasswordMailController.handle);
passwordRouter.post('/reset', resetPasswordController.handle);

export { passwordRouter };
