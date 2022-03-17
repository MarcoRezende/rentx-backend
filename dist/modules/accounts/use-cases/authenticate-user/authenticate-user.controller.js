"use strict";

exports.__esModule = true;
exports.AuthenticateUserController = void 0;

var _tsyringe = require("tsyringe");

var _authenticateUser = require("./authenticate-user.use-case");

class AuthenticateUserController {
  async handle(request, response) {
    const {
      email,
      password
    } = request.body;

    const authenticateUserUseCase = _tsyringe.container.resolve(_authenticateUser.AuthenticateUserUseCase);

    const session = await authenticateUserUseCase.execute({
      email,
      password
    });
    return response.status(200).json(session);
  }

}

exports.AuthenticateUserController = AuthenticateUserController;