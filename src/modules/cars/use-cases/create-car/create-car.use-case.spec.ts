import { CarsInMemoryRepository } from '@modules/cars/repositories/in-memory/cars.in-memory-repository';
import { AppError } from '@shared/errors/app-error';

import { CreateCarUseCase } from './create-car.use-case';

let createCarUseCase: CreateCarUseCase;
let carsInMemoryRepository: CarsInMemoryRepository;

describe('Create car', () => {
  beforeEach(() => {
    carsInMemoryRepository = new CarsInMemoryRepository();
    createCarUseCase = new CreateCarUseCase(carsInMemoryRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'New car',
      description: 'Car description',
      brand: 'Brand',
      dailyRate: 100,
      fineAmount: 50,
      licensePlate: '123-123',
      categoryId: 'categoryId',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with duplicated plate license', async () => {
    await createCarUseCase.execute({
      name: 'New car',
      description: 'Car description',
      brand: 'Brand',
      dailyRate: 100,
      fineAmount: 50,
      licensePlate: '123-123',
      categoryId: 'categoryId',
    });

    await expect(
      createCarUseCase.execute({
        name: 'New car 2',
        description: 'Car description',
        brand: 'Brand',
        dailyRate: 100,
        fineAmount: 50,
        licensePlate: '123-123',
        categoryId: 'categoryId',
      })
    ).rejects.toEqual(new AppError('Car already exists'));
  });

  it('should be able to create a new car with available as true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'New car',
      description: 'Car description',
      brand: 'Brand',
      dailyRate: 100,
      fineAmount: 50,
      licensePlate: '123-123',
      categoryId: 'categoryId',
    });

    expect(car.available).toBe(true);
  });
});
