import { UpdateResult } from 'typeorm';

import { ICreateUserDTO } from '../dtos/create-user.dto';
import { User } from '../infra/typeorm/entities/user.entity';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  saveAvatar(userId: string, fileName: string): Promise<UpdateResult>;
}
