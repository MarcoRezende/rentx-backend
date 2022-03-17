"use strict";

exports.__esModule = true;
exports.CreateUserController = void 0;

var _tsyringe = require("tsyringe");

var _createUser = require("./create-user.use-case");

class CreateUserController {
  async handle(request, response) {
    const {
      name,
      email,
      password,
      driverLicense
    } = request.body;

    const createUserUseCase = _tsyringe.container.resolve(_createUser.CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      driverLicense
    });
    return response.status(201).send();
  }

}

exports.CreateUserController = CreateUserController;