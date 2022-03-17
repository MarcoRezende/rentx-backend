"use strict";

var _categories = require("../../repositories/in-memory/categories.in-memory-repository");

var _appError = require("../../../../shared/errors/app-error");

var _createCategory = require("./create-category.use-case");

/**
 * there are two implementations of test in backend:
 * unit (covers a single flux), the one in here,
 * and integration (covers a whole flux)
 */
let createCategoryUseCase;
let categoriesInMemoryRepository;
describe('Create category', () => {
  /**
   * before each test (it), the dependencies will
   * be instantiated again.
   */
  beforeEach(() => {
    categoriesInMemoryRepository = new _categories.CategoriesInMemoryRepository();
    createCategoryUseCase = new _createCategory.CreateCategoryUseCase(categoriesInMemoryRepository);
  });
  it('should be able to create a new category', async () => {
    const category = {
      name: 'foo',
      description: 'test'
    };
    await createCategoryUseCase.execute(category);
    expect(await categoriesInMemoryRepository.findByName(category.name)).toHaveProperty('id');
  });
  it('should not be able to create a new category', async () => {
    const category = {
      name: 'foo',
      description: 'test'
    };
    await createCategoryUseCase.execute(category);
    expect(createCategoryUseCase.execute(category)).rejects.toEqual(new _appError.AppError(`Category ${category.name} already exists`));
  });
});