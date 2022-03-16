import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/cars.repository.interface';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/rentals-repository.interface';
import { IDateProvider } from '@shared/container/providers/date/date.provider.interface';
import { AppError } from '@shared/errors/app-error';

interface IRequest {
  id: string;
  userId: string;
}

const MINIMUM_DAILY = 0;

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayJsProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, userId }: IRequest) {
    const rental = await this.rentalsRepository.findById(id, Rental);

    if (!rental) {
      throw new AppError('Rental does not exists');
    }

    const car = await this.carsRepository.findById(rental.carId);

    if (!car) {
      throw new AppError('Car not found');
    }

    const dateNow = this.dateProvider.now();

    // get rental time in days
    let daily = this.dateProvider.compareInDays(rental.startDate, dateNow);

    if (daily <= 0) {
      daily = MINIMUM_DAILY;
    }

    // get rental delay in days
    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expectedReturnDate
    );

    let total = 0;

    if (delay > 0) {
      total = delay * car.fineAmount;
    }

    total += daily * car.dailyRate;

    rental.endDate = this.dateProvider.now();
    rental.total = total;

    // updates the rental
    await this.rentalsRepository.create(rental);

    await this.carsRepository.updateCarAvailability(car.id, true);

    return rental;
  }
}
