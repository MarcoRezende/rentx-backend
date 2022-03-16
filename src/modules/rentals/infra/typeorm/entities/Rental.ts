import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Car } from '@modules/cars/infra/typeorm/entities/car.entity';

@Entity('rentals')
export class Rental {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'carID' })
  car: Car;

  @Column()
  carId: string;

  @Column()
  userId: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  expectedReturnDate: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    this.id = uuidV4();
  }
}
