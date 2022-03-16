import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './devolution-rental.use-case';

export class DevolutionRentalController {
  async handle(request: Request, response: Response) {
    const { id: rentalId } = request.params;
    const { id: userId } = request.user;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id: rentalId,
      userId,
    });

    return response.status(200).json(rental);
  }
}
