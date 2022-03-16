import { BaseInMemoryRepository } from '@core/repositories/base-in-memory-repository';
import { CreateRentalDto } from '@modules/rentals/dtos/create-rental.dto';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../rentals-repository.interface';

export class RentalsInMemoryRepository
  extends BaseInMemoryRepository<Rental>
  implements IRentalsRepository
{
  public rentals: Rental[] = [];

  async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      (rental) => rental.carId === carId && !rental.endDate
    );
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      (rental) => rental.userId === userId && !rental.endDate
    );
  }

  async create({
    userId,
    carId,
    expectedReturnDate,
  }: CreateRentalDto): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      expectedReturnDate,
      userId,
      carId,
      startDate: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.rentals.find((rental) => id === rental.id);
  }

  async listByUser(userId: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.userId === userId);
  }
}
