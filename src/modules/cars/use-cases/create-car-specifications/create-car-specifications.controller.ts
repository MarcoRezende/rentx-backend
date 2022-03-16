import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationsUseCase } from './create-car-specifications-use-case';

export class CreateCarSpecificationsController {
  async handle(request: Request, response: Response) {
    const { id: carId } = request.params;
    const { specificationsId } = request.body;

    const createCarSpecificationsUseCase = container.resolve(
      CreateCarSpecificationsUseCase
    );

    const car = await createCarSpecificationsUseCase.execute({
      carId,
      specificationsId,
    });

    return response.json(car);
  }
}
