import { inject, injectable } from 'tsyringe';

import { Category } from '../../infra/typeorm/entities/category.entity';
import { ICategoriesRepository } from '../../repositories/categories.repository.interface';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}
