import { inject, injectable } from 'tsyringe';

import { ICarImagesRepository } from '@modules/cars/repositories/car-images.repository.interface';
import { IStorageProvider } from '@shared/container/providers/storage/storage.provider.interface';

interface IRequest {
  carId: string;
  imagesUrl: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ carId, imagesUrl }: IRequest): Promise<void> {
    imagesUrl.map(async (image) => {
      await this.carImagesRepository.create(carId, image);
      await this.storageProvider.save(image, 'cars');
    });
  }
}
