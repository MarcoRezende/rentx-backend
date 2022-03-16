import { Category } from '../../infra/typeorm/entities/category.entity';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../categories.repository.interface';

/**
 * to be able to test our business rules, we need to
 * create a fake/in-memory repository, since unit test
 * should not be aware/connect with the database.
 */

export class CategoriesInMemoryRepository implements ICategoriesRepository {
  public categories: Category[] = [];

  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find((category) => category.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      description,
      name,
    });

    this.categories.push(category);
  }
}
