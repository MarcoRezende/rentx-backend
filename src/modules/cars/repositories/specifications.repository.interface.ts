import { Specification } from '../infra/typeorm/entities/specification.entity';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification | undefined>;
  list(): Promise<Specification[]>;
  create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
