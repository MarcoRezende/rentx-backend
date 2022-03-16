import { Specification } from '@modules/cars/infra/typeorm/entities/specification.entity';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../specifications.repository.interface';

export class SpecificationsInMemoryRepository
  implements ISpecificationsRepository
{
  specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification | undefined> {
    throw new Error('Method not implemented.');
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = {
      ...new Specification(),
      description,
      name,
    };

    this.specifications.push(specification);

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id as string)
    );
  }
}
