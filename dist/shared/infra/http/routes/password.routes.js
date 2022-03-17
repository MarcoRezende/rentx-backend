"use strict";

exports.__esModule = true;
exports.passwordRouter = void 0;

var _express = require("express");

var _resetPassword = require("../../../../modules/accounts/use-cases/reset-password/reset-password.controller");

var _sendForgotPasswordMail = require("../../../../modules/accounts/use-cases/send-forgot-password-mail/send-forgot-password-mail.controller");

const passwordRouter = (0, _express.Router)();
exports.passwordRouter = passwordRouter;
const sendForgotPasswordMailController = new _sendForgotPasswordMail.SendForgotPasswordMailController();
const resetPasswordController = new _resetPassword.ResetPasswordController();
passwordRouter.post('/forgot', sendForgotPasswordMailController.handle);
passwordRouter.post('/reset', resetPasswordController.handle);