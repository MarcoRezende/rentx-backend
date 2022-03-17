"use strict";

exports.__esModule = true;
exports.RentalsInMemoryRepository = void 0;

var _baseInMemoryRepository = require("../../../../@core/repositories/base-in-memory-repository");

var _Rental = require("../../infra/typeorm/entities/Rental");

class RentalsInMemoryRepository extends _baseInMemoryRepository.BaseInMemoryRepository {
  constructor(...args) {
    super(...args);
    this.rentals = [];
  }

  async findOpenRentalByCar(carId) {
    return this.rentals.find(rental => rental.carId === carId && !rental.endDate);
  }

  async findOpenRentalByUser(userId) {
    return this.rentals.find(rental => rental.userId === userId && !rental.endDate);
  }

  async create({
    userId,
    carId,
    expectedReturnDate
  }) {
    const rental = new _Rental.Rental();
    Object.assign(rental, {
      expectedReturnDate,
      userId,
      carId,
      startDate: new Date()
    });
    this.rentals.push(rental);
    return rental;
  }

  async findById(id) {
    return this.rentals.find(rental => id === rental.id);
  }

  async listByUser(userId) {
    return this.rentals.filter(rental => rental.userId === userId);
  }

}

exports.RentalsInMemoryRepository = RentalsInMemoryRepository;