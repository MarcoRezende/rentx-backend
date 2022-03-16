import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/infra/typeorm/entities/specification.entity';
import { AppError } from '@shared/errors/app-error';

import { ISpecificationsRepository } from '../../repositories/specifications.repository.interface';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const categoryAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError(`Specification ${name} already exists`);
    }

    return this.specificationsRepository.create({
      name,
      description,
    });
  }
}
