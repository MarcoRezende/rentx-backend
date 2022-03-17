"use strict";

exports.__esModule = true;
exports.DevolutionRentalController = void 0;

var _tsyringe = require("tsyringe");

var _devolutionRental = require("./devolution-rental.use-case");

class DevolutionRentalController {
  async handle(request, response) {
    const {
      id: rentalId
    } = request.params;
    const {
      id: userId
    } = request.user;

    const devolutionRentalUseCase = _tsyringe.container.resolve(_devolutionRental.DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id: rentalId,
      userId
    });
    return response.status(200).json(rental);
  }

}

exports.DevolutionRentalController = DevolutionRentalController;