import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './list-available-cars.use-case';

export class ListAvailableCarsController {
  async handle(request: Request, response: Response) {
    const { categoryId, brand, name } = request.query as {
      [key: string]: string;
    };

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      categoryId,
      brand,
      name,
    });

    response.status(200).json(cars);
  }
}
