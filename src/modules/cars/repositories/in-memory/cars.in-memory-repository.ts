import { ICreateCarDto } from '@modules/cars/dtos/create-car.dto';
import { IFilterAvailableCarsDto } from '@modules/cars/dtos/list-available-cars';
import { Car } from '@modules/cars/infra/typeorm/entities/car.entity';

import { ICarsRepository } from '../cars.repository.interface';

export class CarsInMemoryRepository implements ICarsRepository {
  public cars: Car[] = [];

  async create({
    name,
    description,
    brand,
    dailyRate,
    fineAmount,
    licensePlate,
    categoryId,
  }: ICreateCarDto): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      dailyRate,
      fineAmount,
      licensePlate,
      categoryId,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }

  async findAvailable({
    categoryId,
    brand,
    name,
  }: IFilterAvailableCarsDto): Promise<Car[]> {
    return this.cars.filter(
      (car) =>
        car.available ||
        car.categoryId === categoryId ||
        car.brand === brand ||
        car.name === name
    );
  }

  async findById(carId: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.id === carId);
  }

  async updateCarAvailability(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[carIndex].available = available;
  }
}
