"use strict";

exports.__esModule = true;
exports.ListRentalsController = void 0;

var _tsyringe = require("tsyringe");

var _listRentals = require("./list-rentals.use-case");

class ListRentalsController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const listRentalsUseCase = _tsyringe.container.resolve(_listRentals.ListRentalsUseCase);

    const rentals = await listRentalsUseCase.execute(id);
    return response.json(rentals);
  }

}

exports.ListRentalsController = ListRentalsController;