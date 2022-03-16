import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/create-user.dto';
import { AppError } from '@shared/errors/app-error';

import { IUsersRepository } from '../../repositories/users.repository.interface';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password, driverLicense }: ICreateUserDTO) {
    const emailAlreadyTaken = await this.usersRepository.findByEmail(email);

    if (emailAlreadyTaken) {
      throw new AppError('Email already taken');
    }

    /**
     * como não podemos deixar a senha exposta no
     * banco de dados, precisamos criptografa-la.
     *
     * essa lib nos permite fazer isso, usando um de
     * seus métodos, onde o primeiro argumento é a
     * senha, e o segundo é a força do salt (uma string adicionada
     * ao começo da senha criptografada)
     */
    const hashedPassword = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driverLicense,
    });
  }
}
