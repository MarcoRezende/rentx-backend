"use strict";

exports.__esModule = true;
exports.CreateSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _createSpecification = require("./create-specification.use-case");

class CreateSpecificationController {
  async handle(request, response) {
    const {
      name,
      description
    } = request.body;

    const createSpecificationUseCase = _tsyringe.container.resolve(_createSpecification.CreateSpecificationUseCase);

    try {
      const specification = await createSpecificationUseCase.execute({
        name,
        description
      });
      return response.status(201).json(specification);
    } catch (err) {
      return response.status(409).json(err);
    }
  }

}

exports.CreateSpecificationController = CreateSpecificationController;