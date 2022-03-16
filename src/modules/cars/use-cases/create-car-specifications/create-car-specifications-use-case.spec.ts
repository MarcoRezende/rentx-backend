import { CarsInMemoryRepository } from '@modules/cars/repositories/in-memory/cars.in-memory-repository';
import { SpecificationsInMemoryRepository } from '@modules/cars/repositories/in-memory/specifications.in-memory-repository';
import { AppError } from '@shared/errors/app-error';

import { CreateCarSpecificationsUseCase } from './create-car-specifications-use-case';

let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;
let carsInMemoryRepository: CarsInMemoryRepository;
let specificationsInMemoryRepository: SpecificationsInMemoryRepository;

describe('Add specifications to car', () => {
  beforeEach(() => {
    specificationsInMemoryRepository = new SpecificationsInMemoryRepository();
    carsInMemoryRepository = new CarsInMemoryRepository();
    createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(
      carsInMemoryRepository,
      specificationsInMemoryRepository
    );
  });

  it('should not be able to add a specification to a non-existent car', async () => {
    await expect(
      createCarSpecificationsUseCase.execute({
        carId: '123',
        specificationsId: ['123'],
      })
    ).rejects.toEqual(new AppError('Car does not exist!'));
  });

  it('should be able to add a specification to a car', async () => {
    const car = await carsInMemoryRepository.create({
      name: 'New car',
      description: 'Car description',
      brand: 'Brand',
      dailyRate: 100,
      fineAmount: 50,
      licensePlate: '123-12345',
      categoryId: 'id',
    });

    const specification = await specificationsInMemoryRepository.create({
      name: 'Name',
      description: 'Description',
    });

    const cars = await createCarSpecificationsUseCase.execute({
      carId: car.id,
      specificationsId: [specification.id as string],
    });

    expect(cars).toHaveProperty('specifications');
    expect(cars.specifications.length).toBe(1);
  });
});
