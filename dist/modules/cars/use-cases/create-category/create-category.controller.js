"use strict";

exports.__esModule = true;
exports.CreateCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _createCategory = require("./create-category.use-case");

class CreateCategoryController {
  constructor() {}

  async handle(request, response) {
    const {
      name,
      description
    } = request.body;
    /**
     * após configuramos a classe como injetavel, precisamos
     * resolve-la.
     */

    const createCategoryUseCase = _tsyringe.container.resolve(_createCategory.CreateCategoryUseCase);

    await createCategoryUseCase.execute({
      name,
      description
    });
    return response.status(201).send();
  }

}

exports.CreateCategoryController = CreateCategoryController;