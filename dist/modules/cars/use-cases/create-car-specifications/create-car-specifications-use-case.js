"use strict";

exports.__esModule = true;
exports.CreateCarSpecificationsUseCase = void 0;

var _tsyringe = require("tsyringe");

var _carsRepository = require("../../repositories/cars.repository.interface");

var _specificationsRepository = require("../../repositories/specifications.repository.interface");

var _appError = require("../../../../shared/errors/app-error");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateCarSpecificationsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SpecificationsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _carsRepository.ICarsRepository === "undefined" ? Object : _carsRepository.ICarsRepository, typeof _specificationsRepository.ISpecificationsRepository === "undefined" ? Object : _specificationsRepository.ISpecificationsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCarSpecificationsUseCase {
  constructor(carsRepository, specificationsRepository) {
    this.carsRepository = carsRepository;
    this.specificationsRepository = specificationsRepository;
  }

  async execute({
    carId,
    specificationsId
  }) {
    const car = await this.carsRepository.findById(carId);

    if (!car) {
      throw new _appError.AppError('Car does not exist!');
    } // it's common to find and reassign relations props


    const specifications = await this.specificationsRepository.findByIds(specificationsId);
    car.specifications = specifications;
    await this.carsRepository.create(car);
    return car;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateCarSpecificationsUseCase = CreateCarSpecificationsUseCase;