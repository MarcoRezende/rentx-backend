"use strict";

exports.__esModule = true;
exports.CreateCategoryUseCase = void 0;

var _tsyringe = require("tsyringe");

var _appError = require("../../../../shared/errors/app-error");

var _categoriesRepository = require("../../repositories/categories.repository.interface");

var _dec, _dec2, _dec3, _dec4, _class;

/** torna a classe injetavel */
let CreateCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _categoriesRepository.ICategoriesRepository === "undefined" ? Object : _categoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({
    name,
    description
  }) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new _appError.AppError(`Category ${name} already exists`);
    }

    await this.categoriesRepository.create({
      name,
      description
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateCategoryUseCase = CreateCategoryUseCase;