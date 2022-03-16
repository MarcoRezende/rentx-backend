import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/car.entity';
import { ICarsRepository } from '@modules/cars/repositories/cars.repository.interface';
import { ISpecificationsRepository } from '@modules/cars/repositories/specifications.repository.interface';
import { AppError } from '@shared/errors/app-error';

interface IRequest {
  carId: string;
  specificationsId: string[];
}

@injectable()
export class CreateCarSpecificationsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ carId, specificationsId }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(carId);

    if (!car) {
      throw new AppError('Car does not exist!');
    }

    // it's common to find and reassign relations props
    const specifications = await this.specificationsRepository.findByIds(
      specificationsId
    );

    car.specifications = specifications;

    await this.carsRepository.create(car);

    return car;
  }
}
