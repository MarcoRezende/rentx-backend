"use strict";

exports.__esModule = true;
exports.CreateRentalController = void 0;

var _tsyringe = require("tsyringe");

var _createRental = require("./create-rental.use-case");

class CreateRentalController {
  async handle(request, response) {
    const {
      carId,
      expectedReturnDate
    } = request.body;
    const userId = request.user.id;

    const createRentalUseCase = _tsyringe.container.resolve(_createRental.CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      userId,
      carId,
      expectedReturnDate
    });
    return response.status(201).json(rental);
  }

}

exports.CreateRentalController = CreateRentalController;