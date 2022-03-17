"use strict";

exports.__esModule = true;
exports.ImportCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _appError = require("../../../../shared/errors/app-error");

var _importCategory = require("./import-category.use-case");

class ImportCategoryController {
  async handle(request, response) {
    const {
      file
    } = request;
    if (!file) throw new _appError.AppError('No file provided');

    const importCategoryUseCase = _tsyringe.container.resolve(_importCategory.ImportCategoryUseCase);

    const categories = await importCategoryUseCase.execute(file);
    return response.json(categories);
  }

}

exports.ImportCategoryController = ImportCategoryController;