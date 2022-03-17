"use strict";

exports.__esModule = true;
exports.CreateCarSpecificationsController = void 0;

var _tsyringe = require("tsyringe");

var _createCarSpecificationsUseCase = require("./create-car-specifications-use-case");

class CreateCarSpecificationsController {
  async handle(request, response) {
    const {
      id: carId
    } = request.params;
    const {
      specificationsId
    } = request.body;

    const createCarSpecificationsUseCase = _tsyringe.container.resolve(_createCarSpecificationsUseCase.CreateCarSpecificationsUseCase);

    const car = await createCarSpecificationsUseCase.execute({
      carId,
      specificationsId
    });
    return response.json(car);
  }

}

exports.CreateCarSpecificationsController = CreateCarSpecificationsController;