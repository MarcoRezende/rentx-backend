import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsUseCase } from './list-rentals.use-case';

export class ListRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listRentalsUseCase = container.resolve(ListRentalsUseCase);

    const rentals = await listRentalsUseCase.execute(id);

    return response.json(rentals);
  }
}
