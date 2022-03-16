import { ICreateCarDto } from '../dtos/create-car.dto';
import { IFilterAvailableCarsDto } from '../dtos/list-available-cars';
import { Car } from '../infra/typeorm/entities/car.entity';

export interface ICarsRepository {
  create({
    name,
    description,
    brand,
    dailyRate,
    fineAmount,
    licensePlate,
    categoryId,
    specifications,
    id,
  }: ICreateCarDto): Promise<Car>;

  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;

  findAvailable(filters: IFilterAvailableCarsDto): Promise<Car[]>;

  findById(carId: string): Promise<Car | undefined>;

  updateCarAvailability(id: string, available: boolean): Promise<void>;
}
