/**
 * usando este arquivo como exemplo, podemos dizer que os uses cases
 * tem a a mesma responsabilidade do service, de regra de negócio,
 * porém com o setup extra (controller).
 *
 * cada use case deve possuir uma unica responsabilidade, ou seja,
 * um controller e "service".
 *
 * no que se refere a otimização e sedimentar o código,
 * é uma otima opção.
 */

import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { ICategoriesRepository } from '../../repositories/categories.repository.interface';

interface IRequest {
  name: string;
  description: string;
}

/** torna a classe injetavel */
@injectable()
export class CreateCategoryUseCase {
  constructor(
    /**
     * ao resolver (`resolve`), é instanciada automaticamente
     * pelo tsyringe
     */
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError(`Category ${name} already exists`);
    }

    await this.categoriesRepository.create({
      name,
      description,
    });
  }
}
