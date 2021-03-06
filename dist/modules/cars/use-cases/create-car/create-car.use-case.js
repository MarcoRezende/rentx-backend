"use strict";

exports.__esModule = true;
exports.CreateCarUseCase = void 0;

var _tsyringe = require("tsyringe");

var _carsRepository = require("../../repositories/cars.repository.interface");

var _appError = require("../../../../shared/errors/app-error");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateCarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _carsRepository.ICarsRepository === "undefined" ? Object : _carsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCarUseCase {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute({
    name,
    description,
    brand,
    dailyRate,
    fineAmount,
    licensePlate,
    categoryId
  }) {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(licensePlate);

    if (carAlreadyExists) {
      throw new _appError.AppError('Car already exists');
    }

    return this.carsRepository.create({
      name,
      description,
      brand,
      dailyRate,
      fineAmount,
      licensePlate,
      categoryId
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateCarUseCase = CreateCarUseCase;