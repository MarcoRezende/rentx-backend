import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Category } from './category.entity';
import { Specification } from './specification.entity';

@Entity('cars')
export class Car {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  available: boolean;

  @Column()
  dailyRate: number;

  @Column()
  licensePlate: string;

  @Column()
  fineAmount: number;

  @Column()
  brand: string;

  // Relations

  /**
   * many cars can have one category.
   */
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    /**
     * column name in `specifications_cars` that
     * refers to the current table id.
     */
    joinColumns: [{ name: 'carId' }],
    /**
     * column name in `specifications_cars` that
     * refers to the specified entity' table id
     * in the `@ManyToMany`
     */
    inverseJoinColumns: [{ name: 'specificationId' }],
  })
  specifications: Specification[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}
