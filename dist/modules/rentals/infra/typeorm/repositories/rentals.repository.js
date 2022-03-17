"use strict";

exports.__esModule = true;
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _baseRepository = require("@core/repositories/base-repository");

var _Rental = require("../entities/Rental");

class RentalsRepository extends _baseRepository.BaseRepository {
  constructor(...args) {
    super(...args);
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async findOpenRentalByCar(carId) {
    return this.repository.findOne({
      where: {
        carId,
        endDate: null
      }
    });
  }

  async findOpenRentalByUser(userId) {
    return this.repository.findOne({
      where: {
        userId,
        endDate: null
      }
    });
  }

  async create({
    id,
    userId,
    carId,
    expectedReturnDate,
    endDate,
    total
  }) {
    const rental = this.repository.create({
      id,
      userId,
      carId,
      expectedReturnDate,
      endDate,
      total
    });
    return await this.repository.save(rental);
  }

  listByUser(userId) {
    return this.repository.find({
      where: {
        userId
      },
      relations: ['car']
    });
  }

}

exports.RentalsRepository = RentalsRepository;