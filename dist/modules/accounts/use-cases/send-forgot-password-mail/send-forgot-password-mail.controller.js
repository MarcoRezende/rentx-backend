"use strict";

exports.__esModule = true;
exports.SendForgotPasswordMailController = void 0;

var _tsyringe = require("tsyringe");

var _sendForgotPasswordMail = require("./send-forgot-password-mail.use-case");

class SendForgotPasswordMailController {
  async handle(request, response) {
    const {
      email
    } = request.body;

    const sendForgotPasswordMailUseCase = _tsyringe.container.resolve(_sendForgotPasswordMail.SendForgotPasswordMailUseCase);

    await sendForgotPasswordMailUseCase.execute(email);
    return response.send();
  }

}

exports.SendForgotPasswordMailController = SendForgotPasswordMailController;