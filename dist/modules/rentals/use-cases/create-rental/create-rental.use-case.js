"use strict";

exports.__esModule = true;
exports.CreateRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _carsRepository = require("../../../cars/repositories/cars.repository.interface");

var _rentalsRepository = require("../../repositories/rentals-repository.interface");

var _dateProvider = require("../../../../shared/container/providers/date/date.provider.interface");

var _appError = require("../../../../shared/errors/app-error");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

const MINIMUM_HOURS = 24;
let CreateRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RentalsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DayJsProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _rentalsRepository.IRentalsRepository === "undefined" ? Object : _rentalsRepository.IRentalsRepository, typeof _dateProvider.IDateProvider === "undefined" ? Object : _dateProvider.IDateProvider, typeof _carsRepository.ICarsRepository === "undefined" ? Object : _carsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateRentalUseCase {
  constructor(rentalsRepository, dateProvider, carsRepository) {
    this.rentalsRepository = rentalsRepository;
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepository;
  }

  async execute({
    userId,
    carId,
    expectedReturnDate
  }) {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(carId);

    if (carUnavailable) {
      throw new _appError.AppError('Car is unavailable');
    }

    const userHasOpenRental = await this.rentalsRepository.findOpenRentalByUser(userId);

    if (userHasOpenRental) {
      throw new _appError.AppError("There's an open rental for the requesting user");
    }

    const diff = this.dateProvider.compareInHours(this.dateProvider.now(), expectedReturnDate);

    if (diff < MINIMUM_HOURS) {
      throw new _appError.AppError('Invalid return date');
    }

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate
    });
    await this.carsRepository.updateCarAvailability(carId, false);
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateRentalUseCase = CreateRentalUseCase;