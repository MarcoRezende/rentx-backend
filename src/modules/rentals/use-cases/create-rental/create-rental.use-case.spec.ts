import dayjs from 'dayjs';

import { CarsInMemoryRepository } from '@modules/cars/repositories/in-memory/cars.in-memory-repository';
import { RentalsInMemoryRepository } from '@modules/rentals/repositories/in-memory/rentals.in-memory-repository';
import { DayJsProvider } from '@shared/container/providers/date/implementations/dayjs.provider';
import { AppError } from '@shared/errors/app-error';

import { CreateRentalUseCase } from './create-rental.use-case';

let createRentalUseCase: CreateRentalUseCase;
let rentalsInMemoryRepository: RentalsInMemoryRepository;
let carsInMemoryRepository: CarsInMemoryRepository;
let dateProvider: DayJsProvider;
let dayAdd24Hours: Date;

describe('Create rent', () => {
  dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    dateProvider = new DayJsProvider();
    rentalsInMemoryRepository = new RentalsInMemoryRepository();
    carsInMemoryRepository = new CarsInMemoryRepository();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsInMemoryRepository,
      dateProvider,
      carsInMemoryRepository
    );
  });

  it('should be able to create a rent', async () => {
    const car = await carsInMemoryRepository.create({
      brand: 'brand',
      description: 'description',
      dailyRate: 10,
      fineAmount: 5,
      licensePlate: '123',
      name: 'Ferrari',
      categoryId: '1234',
    });

    const rental = await createRentalUseCase.execute({
      userId: 'userId',
      carId: car.id,
      expectedReturnDate: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('should not allow a user to rent a unavailable car', async () => {
    await rentalsInMemoryRepository.create({
      carId: '123',
      expectedReturnDate: dayAdd24Hours,
      userId: 'userId',
    });
    await expect(
      createRentalUseCase.execute({
        userId: 'userId2',
        carId: '123',
        expectedReturnDate: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('should not be able to rent a car when the user has open rent', async () => {
    await rentalsInMemoryRepository.create({
      carId: '123',
      expectedReturnDate: dayAdd24Hours,
      userId: 'userId',
    });

    await expect(
      createRentalUseCase.execute({
        userId: 'userId',
        carId: 'carId2',
        expectedReturnDate: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError("There's an open rental for the requesting user")
    );
  });

  it("should not be able to rent a car when return date isn't within required minimum hours", async () => {
    await expect(
      createRentalUseCase.execute({
        userId: 'userId',
        carId: 'carId',
        expectedReturnDate: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return date'));
  });
});
