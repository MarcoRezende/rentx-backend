import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from './create-rental.use-case';

export class CreateRentalController {
  async handle(request: Request, response: Response) {
    const { carId, expectedReturnDate } = request.body;
    const userId = request.user.id;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      userId,
      carId,
      expectedReturnDate,
    });

    return response.status(201).json(rental);
  }
}
