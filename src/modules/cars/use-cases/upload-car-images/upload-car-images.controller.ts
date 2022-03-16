import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from './upload-car-images.use-case';

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: carId } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const imagesUrl = images?.map((image) => image.filename);

    uploadCarImagesUseCase.execute({
      carId,
      imagesUrl,
    });

    return response.status(201).send();
  }
}
