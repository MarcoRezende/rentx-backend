import { getRepository } from 'typeorm';

import { ICreateCarDto } from '@modules/cars/dtos/create-car.dto';
import { IFilterAvailableCarsDto } from '@modules/cars/dtos/list-available-cars';
import { ICarsRepository } from '@modules/cars/repositories/cars.repository.interface';

import { Car } from '../entities/car.entity';

interface BuiltFilters {
  query: string;
  filters: { [key: string]: any };
}

export class CarsRepository implements ICarsRepository {
  public repository = getRepository(Car);

  async create({
    name,
    description,
    brand,
    dailyRate,
    fineAmount,
    licensePlate,
    categoryId,
    id,
    specifications,
  }: ICreateCarDto): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      dailyRate,
      fineAmount,
      licensePlate,
      categoryId,
      id,
      specifications,
    });

    return this.repository.save(car);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.repository.findOne({ licensePlate });
  }

  async findAvailable(filters: IFilterAvailableCarsDto): Promise<Car[]> {
    const buildQuery = (): BuiltFilters => {
      const builtFilters: BuiltFilters = { filters: {} } as BuiltFilters;
      const queries: string[] = [];

      for (const [filter, value] of Object.entries(filters)) {
        if (value) {
          queries.push(`"${filter}" = :${filter}`);

          Object.assign(builtFilters.filters, {
            [filter]: value,
          });
        }
      }

      return {
        ...builtFilters,
        query: queries.join(' AND '),
      };
    };

    const meta = buildQuery();

    return this.repository
      .createQueryBuilder('cars')
      .where(meta.query, meta.filters)
      .getMany();
  }

  async findById(carId: string): Promise<Car | undefined> {
    return await this.repository.findOne(carId);
  }

  async updateCarAvailability(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id', { id })
      .execute();
  }
}
