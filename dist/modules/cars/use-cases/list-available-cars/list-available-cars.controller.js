"use strict";

exports.__esModule = true;
exports.ListAvailableCarsController = void 0;

var _tsyringe = require("tsyringe");

var _listAvailableCars = require("./list-available-cars.use-case");

class ListAvailableCarsController {
  async handle(request, response) {
    const {
      categoryId,
      brand,
      name
    } = request.query;

    const listAvailableCarsUseCase = _tsyringe.container.resolve(_listAvailableCars.ListAvailableCarsUseCase);

    const cars = await listAvailableCarsUseCase.execute({
      categoryId,
      brand,
      name
    });
    response.status(200).json(cars);
  }

}

exports.ListAvailableCarsController = ListAvailableCarsController;