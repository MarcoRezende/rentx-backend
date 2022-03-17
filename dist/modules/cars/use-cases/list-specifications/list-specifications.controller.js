"use strict";

exports.__esModule = true;
exports.ListSpecificationsController = void 0;

var _tsyringe = require("tsyringe");

var _listSpecifications = require("./list-specifications.use-case");

class ListSpecificationsController {
  async handle(_request, response) {
    const listSpecificationUseCase = _tsyringe.container.resolve(_listSpecifications.ListSpecificationsUseCase);

    const specification = await listSpecificationUseCase.execute();
    return response.json(specification);
  }

}

exports.ListSpecificationsController = ListSpecificationsController;