import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationsUseCase } from './list-specifications.use-case';

export class ListSpecificationsController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(
      ListSpecificationsUseCase
    );

    const specification = await listSpecificationUseCase.execute();

    return response.json(specification);
  }
}
