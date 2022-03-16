import { ICreateUserDTO } from '../../dtos/create-user.dto';
import { User } from '../../infra/typeorm/entities/user.entity';
import { IUsersRepository } from '../users.repository.interface';

export class UsersInMemoryRepository implements IUsersRepository {
  public users: User[] = [];

  async create({
    driverLicense,
    email,
    password,
    name,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driverLicense,
      email,
      password,
      name,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async saveAvatar(userId: string, fileName: string): Promise<any> {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    this.users[userIndex] = { ...this.users[userIndex], avatarUrl: fileName };
  }
}
