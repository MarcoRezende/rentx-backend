"use strict";

exports.__esModule = true;
exports.CreateCarController = void 0;

var _tsyringe = require("tsyringe");

var _createCar = require("./create-car.use-case");

class CreateCarController {
  async handle(request, response) {
    const {
      name,
      description,
      brand,
      dailyRate,
      fineAmount,
      licensePlate,
      categoryId
    } = request.body;

    const createCarUseCase = _tsyringe.container.resolve(_createCar.CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      description,
      brand,
      dailyRate,
      fineAmount,
      licensePlate,
      categoryId
    });
    return response.status(201).json(car);
  }

}

exports.CreateCarController = CreateCarController;