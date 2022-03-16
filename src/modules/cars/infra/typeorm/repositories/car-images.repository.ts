import { getRepository } from 'typeorm';

import { ICarImagesRepository } from '@modules/cars/repositories/car-images.repository.interface';

import { CarImage } from '../entities/car-image.entity';

export class CarImagesRepository implements ICarImagesRepository {
  private repository = getRepository(CarImage);

  async create(carId: string, imageUrl: string): Promise<CarImage> {
    return this.repository.save({ ...new CarImage(), carId, imageUrl });
  }
}
