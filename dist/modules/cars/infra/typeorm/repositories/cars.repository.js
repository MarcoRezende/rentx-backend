"use strict";

exports.__esModule = true;
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _car = require("../entities/car.entity");

class CarsRepository {
  constructor() {
    this.repository = (0, _typeorm.getRepository)(_car.Car);
  }

  async create({
    name,
    description,
    brand,
    dailyRate,
    fineAmount,
    licensePlate,
    categoryId,
    id,
    specifications
  }) {
    const car = this.repository.create({
      name,
      description,
      brand,
      dailyRate,
      fineAmount,
      licensePlate,
      categoryId,
      id,
      specifications
    });
    return this.repository.save(car);
  }

  async findByLicensePlate(licensePlate) {
    return this.repository.findOne({
      licensePlate
    });
  }

  async findAvailable(filters) {
    const buildQuery = () => {
      const builtFilters = {
        filters: {}
      };
      const queries = [];

      for (const [filter, value] of Object.entries(filters)) {
        if (value) {
          queries.push(`"${filter}" = :${filter}`);
          Object.assign(builtFilters.filters, {
            [filter]: value
          });
        }
      }

      return { ...builtFilters,
        query: queries.join(' AND ')
      };
    };

    const meta = buildQuery();
    return this.repository.createQueryBuilder('cars').where(meta.query, meta.filters).getMany();
  }

  async findById(carId) {
    return await this.repository.findOne(carId);
  }

  async updateCarAvailability(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where('id = :id', {
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;