import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/cars.repository.interface';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/rentals-repository.interface';
import { IDateProvider } from '@shared/container/providers/date/date.provider.interface';
import { AppError } from '@shared/errors/app-error';

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

const MINIMUM_HOURS = 24;

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayJsProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      carId
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const userHasOpenRental = await this.rentalsRepository.findOpenRentalByUser(
      userId
    );

    if (userHasOpenRental) {
      throw new AppError("There's an open rental for the requesting user");
    }

    const diff = this.dateProvider.compareInHours(
      this.dateProvider.now(),
      expectedReturnDate
    );

    if (diff < MINIMUM_HOURS) {
      throw new AppError('Invalid return date');
    }

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    await this.carsRepository.updateCarAvailability(carId, false);

    return rental;
  }
}
