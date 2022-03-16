import { getRepository } from 'typeorm';

import { BaseRepository } from '@core/repositories/base-repository';
import { CreateRentalDto } from '@modules/rentals/dtos/create-rental.dto';
import { IRentalsRepository } from '@modules/rentals/repositories/rentals-repository.interface';

import { Rental } from '../entities/Rental';

export class RentalsRepository
  extends BaseRepository<Rental>
  implements IRentalsRepository
{
  private repository = getRepository(Rental);

  async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    return this.repository.findOne({
      where: {
        carId,
        endDate: null,
      },
    });
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    return this.repository.findOne({
      where: {
        userId,
        endDate: null,
      },
    });
  }

  async create({
    id,
    userId,
    carId,
    expectedReturnDate,
    endDate,
    total,
  }: CreateRentalDto): Promise<Rental> {
    const rental = this.repository.create({
      id,
      userId,
      carId,
      expectedReturnDate,
      endDate,
      total,
    });

    return await this.repository.save(rental);
  }

  listByUser(userId: string): Promise<Rental[]> {
    return this.repository.find({
      where: { userId },
      relations: ['car'],
    });
  }
}
