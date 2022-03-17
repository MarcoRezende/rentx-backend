"use strict";

var _cars = require("../../repositories/in-memory/cars.in-memory-repository");

var _specifications = require("../../repositories/in-memory/specifications.in-memory-repository");

var _appError = require("../../../../shared/errors/app-error");

var _createCarSpecificationsUseCase = require("./create-car-specifications-use-case");

let createCarSpecificationsUseCase;
let carsInMemoryRepository;
let specificationsInMemoryRepository;
describe('Add specifications to car', () => {
  beforeEach(() => {
    specificationsInMemoryRepository = new _specifications.SpecificationsInMemoryRepository();
    carsInMemoryRepository = new _cars.CarsInMemoryRepository();
    createCarSpecificationsUseCase = new _createCarSpecificationsUseCase.CreateCarSpecificationsUseCase(carsInMemoryRepository, specificationsInMemoryRepository);
  });
  it('should not be able to add a specification to a non-existent car', async () => {
    await expect(createCarSpecificationsUseCase.execute({
      carId: '123',
      specificationsId: ['123']
    })).rejects.toEqual(new _appError.AppError('Car does not exist!'));
  });
  it('should be able to add a specification to a car', async () => {
    const car = await carsInMemoryRepository.create({
      name: 'New car',
      description: 'Car description',
      brand: 'Brand',
      dailyRate: 100,
      fineAmount: 50,
      licensePlate: '123-12345',
      categoryId: 'id'
    });
    const specification = await specificationsInMemoryRepository.create({
      name: 'Name',
      description: 'Description'
    });
    const cars = await createCarSpecificationsUseCase.execute({
      carId: car.id,
      specificationsId: [specification.id]
    });
    expect(cars).toHaveProperty('specifications');
    expect(cars.specifications.length).toBe(1);
  });
});