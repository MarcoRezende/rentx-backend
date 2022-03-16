import { BaseRepository } from '@core/repositories/base-repository';

import { CreateRentalDto } from '../dtos/create-rental.dto';
import { Rental } from '../infra/typeorm/entities/Rental';

export interface IRentalsRepository extends BaseRepository<Rental> {
  findOpenRentalByCar(carId: string): Promise<Rental | undefined>;

  findOpenRentalByUser(userId: string): Promise<Rental | undefined>;

  create(data: CreateRentalDto): Promise<Rental>;

  listByUser(userId: string): Promise<Rental[]>;
}
