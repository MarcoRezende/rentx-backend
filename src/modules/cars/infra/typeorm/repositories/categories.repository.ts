import { getRepository, Repository } from 'typeorm';

import { ICategoriesRepository } from '../../../repositories/categories.repository.interface';
import { Category } from '../entities/category.entity';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository implements ICategoriesRepository {
  /**
   * repositório privado para que apenas os métodos assinados
   * na interface possam ser acessados.
   */
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    // essa é a forma de salvar/criar uma nova linha no DB
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string) {
    /**
     * short syntax para findOne({ where: { name } })
     */
    return this.repository.findOne({ name });
  }
}

export { CategoriesRepository };
