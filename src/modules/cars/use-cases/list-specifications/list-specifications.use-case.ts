import { inject, injectable } from 'tsyringe';

import { Specification } from '../../infra/typeorm/entities/specification.entity';
import { ISpecificationsRepository } from '../../repositories/specifications.repository.interface';

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list();
  }
}
