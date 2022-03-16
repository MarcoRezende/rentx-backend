import { getRepository, Repository, UpdateResult } from 'typeorm';

import { ICreateUserDTO } from '../../../dtos/create-user.dto';
import { IUsersRepository } from '../../../repositories/users.repository.interface';
import { User } from '../entities/user.entity';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driverLicense,
    avatarUrl,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driverLicense,
      avatarUrl,
      id,
    });

    await this.repository.save(user);
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  saveAvatar(userId: string, fileName: string): Promise<UpdateResult> {
    return this.repository.update(userId, { avatarUrl: fileName });
  }
}
