"use strict";

exports.__esModule = true;
exports.ListCategoriesController = void 0;

var _tsyringe = require("tsyringe");

var _listCategories = require("./list-categories.use-case");

class ListCategoriesController {
  async handle(_request, response) {
    const listCategoriesUseCase = _tsyringe.container.resolve(_listCategories.ListCategoriesUseCase);

    const categories = await listCategoriesUseCase.execute();
    return response.json(categories);
  }

}

exports.ListCategoriesController = ListCategoriesController;