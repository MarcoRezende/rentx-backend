import { Specification } from '../infra/typeorm/entities/specification.entity';

export interface ICreateCarDto {
  id?: string;
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  specifications?: Specification[];
}
