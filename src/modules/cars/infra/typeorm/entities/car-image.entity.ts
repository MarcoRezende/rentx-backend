import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('car_image')
export class CarImage {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  carId: string;

  @Column()
  imageUrl: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
