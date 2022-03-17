"use strict";

var _cars = require("../../repositories/in-memory/cars.in-memory-repository");

var _listAvailableCars = require("./list-available-cars.use-case");

let listCarsUseCase;
let carsInMemoryRepository;
describe('List cars', () => {
  beforeEach(() => {
    carsInMemoryRepository = new _cars.CarsInMemoryRepository();
    listCarsUseCase = new _listAvailableCars.ListAvailableCarsUseCase(carsInMemoryRepository);
  });
  it('should be able to list all available cars', async () => {
    const car = await carsInMemoryRepository.create({
      name: 'New car',
      description: 'Car description',
      brand: 'Brand',
      dailyRate: 100,
      fineAmount: 50,
      licensePlate: '123-12345',
      categoryId: 'id'
    });
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by name', async () => {
    const car = await carsInMemoryRepository.create({
      name: 'New car',
      description: 'Car description',
      brand: 'Brand',
      dailyRate: 100,
      fineAmount: 50,
      licensePlate: '123-12345',
      categoryId: 'id'
    });
    const cars = await listCarsUseCase.execute({
      name: car.name
    });
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by brand', async () => {
    const car = await carsInMemoryRepository.create({
      name: 'New car',
      description: 'Car description',
      brand: 'Brand',
      dailyRate: 100,
      fineAmount: 50,
      licensePlate: '123-12345',
      categoryId: 'id'
    });
    const cars = await listCarsUseCase.execute({
      name: car.brand
    });
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by category id', async () => {
    const car = await carsInMemoryRepository.create({
      name: 'New car',
      description: 'Car description',
      brand: 'Brand',
      dailyRate: 100,
      fineAmount: 50,
      licensePlate: '123-12345',
      categoryId: 'id'
    });
    const cars = await listCarsUseCase.execute({
      name: car.categoryId
    });
    expect(cars).toEqual([car]);
  });
});