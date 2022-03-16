import { CategoriesRepository } from '../../infra/typeorm/repositories/categories.repository';
import { ListCategoriesController } from './list-categories.controller';
import { ListCategoriesUseCase } from './list-categories.use-case';

export default (): ListCategoriesController => {
  const categoriesRepository = new CategoriesRepository();
  const list-categoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
  const list-categoriesController = new ListCategoriesController(
    list-categoriesUseCase
  );

  return list-categoriesController;
};
