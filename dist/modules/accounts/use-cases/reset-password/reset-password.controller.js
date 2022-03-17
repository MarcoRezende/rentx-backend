"use strict";

exports.__esModule = true;
exports.ResetPasswordController = void 0;

var _tsyringe = require("tsyringe");

var _resetPassword = require("./reset-password.use-case");

class ResetPasswordController {
  async handle(request, response) {
    const {
      token
    } = request.query;
    const {
      password
    } = request.body;

    const resetPasswordUseCase = _tsyringe.container.resolve(_resetPassword.ResetPasswordUseCase);

    await resetPasswordUseCase.execute({
      token: String(token),
      password
    });
    return response.send();
  }

}

exports.ResetPasswordController = ResetPasswordController;