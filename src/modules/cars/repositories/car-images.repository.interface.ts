import { CarImage } from '../infra/typeorm/entities/car-image.entity';

export interface ICarImagesRepository {
  create(carId: string, imageUrl: string): Promise<CarImage>;
}
