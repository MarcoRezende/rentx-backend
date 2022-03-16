import { CategoriesInMemoryRepository } from '@modules/cars/repositories/in-memory/categories.in-memory-repository';
import { AppError } from '@shared/errors/app-error';

import { CreateCategoryUseCase } from './create-category.use-case';

/**
 * there are two implementations of test in backend:
 * unit (covers a single flux), the one in here,
 * and integration (covers a whole flux)
 */

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesInMemoryRepository: CategoriesInMemoryRepository;

describe('Create category', () => {
  /**
   * before each test (it), the dependencies will
   * be instantiated again.
   */
  beforeEach(() => {
    categoriesInMemoryRepository = new CategoriesInMemoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesInMemoryRepository
    );
  });

  it('should be able to create a new category', async () => {
    const category = { name: 'foo', description: 'test' };

    await createCategoryUseCase.execute(category);

    expect(
      await categoriesInMemoryRepository.findByName(category.name)
    ).toHaveProperty('id');
  });

  it('should not be able to create a new category', async () => {
    const category = { name: 'foo', description: 'test' };
    await createCategoryUseCase.execute(category);

    expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError(`Category ${category.name} already exists`)
    );
  });
});
