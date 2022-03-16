import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/cars.repository.interface';

interface IRequest {
  categoryId?: string;
  brand?: string;
  name?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ categoryId, brand, name }: IRequest) {
    return this.carsRepository.findAvailable({ categoryId, brand, name });
  }
}
