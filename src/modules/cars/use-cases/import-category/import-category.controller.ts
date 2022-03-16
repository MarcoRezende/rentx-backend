import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { ImportCategoryUseCase } from './import-category.use-case';

export class ImportCategoryController {
  async handle(request: Request, response: Response) {
    const { file } = request;

    if (!file) throw new AppError('No file provided');

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    const categories = await importCategoryUseCase.execute(file);

    return response.json(categories);
  }
}
