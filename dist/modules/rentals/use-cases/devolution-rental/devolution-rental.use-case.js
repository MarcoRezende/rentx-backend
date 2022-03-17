"use strict";

exports.__esModule = true;
exports.DevolutionRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _carsRepository = require("../../../cars/repositories/cars.repository.interface");

var _Rental = require("../../infra/typeorm/entities/Rental");

var _rentalsRepository = require("../../repositories/rentals-repository.interface");

var _dateProvider = require("../../../../shared/container/providers/date/date.provider.interface");

var _appError = require("../../../../shared/errors/app-error");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

const MINIMUM_DAILY = 0;
let DevolutionRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RentalsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DayJsProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _rentalsRepository.IRentalsRepository === "undefined" ? Object : _rentalsRepository.IRentalsRepository, typeof _carsRepository.ICarsRepository === "undefined" ? Object : _carsRepository.ICarsRepository, typeof _dateProvider.IDateProvider === "undefined" ? Object : _dateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DevolutionRentalUseCase {
  constructor(rentalsRepository, carsRepository, dateProvider) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    id,
    userId
  }) {
    const rental = await this.rentalsRepository.findById(id, _Rental.Rental);

    if (!rental) {
      throw new _appError.AppError('Rental does not exists');
    }

    const car = await this.carsRepository.findById(rental.carId);

    if (!car) {
      throw new _appError.AppError('Car not found');
    }

    const dateNow = this.dateProvider.now(); // get rental time in days

    let daily = this.dateProvider.compareInDays(rental.startDate, dateNow);

    if (daily <= 0) {
      daily = MINIMUM_DAILY;
    } // get rental delay in days


    const delay = this.dateProvider.compareInDays(dateNow, rental.expectedReturnDate);
    let total = 0;

    if (delay > 0) {
      total = delay * car.fineAmount;
    }

    total += daily * car.dailyRate;
    rental.endDate = this.dateProvider.now();
    rental.total = total; // updates the rental

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateCarAvailability(car.id, true);
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;