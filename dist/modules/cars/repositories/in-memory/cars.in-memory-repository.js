"use strict";

exports.__esModule = true;
exports.CarsInMemoryRepository = void 0;

var _car = require("../../infra/typeorm/entities/car.entity");

class CarsInMemoryRepository {
  constructor() {
    this.cars = [];
  }

  async create({
    name,
    description,
    brand,
    dailyRate,
    fineAmount,
    licensePlate,
    categoryId
  }) {
    const car = new _car.Car();
    Object.assign(car, {
      name,
      description,
      brand,
      dailyRate,
      fineAmount,
      licensePlate,
      categoryId
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(licensePlate) {
    return this.cars.find(car => car.licensePlate === licensePlate);
  }

  async findAvailable({
    categoryId,
    brand,
    name
  }) {
    return this.cars.filter(car => car.available || car.categoryId === categoryId || car.brand === brand || car.name === name);
  }

  async findById(carId) {
    return this.cars.find(car => car.id === carId);
  }

  async updateCarAvailability(id, available) {
    const carIndex = this.cars.findIndex(car => car.id === id);
    this.cars[carIndex].available = available;
  }

}

exports.CarsInMemoryRepository = CarsInMemoryRepository;