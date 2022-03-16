import { container } from 'tsyringe';

import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/users-tokens.repository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/users-tokens-repository.interface';
import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/car-images.repository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/cars.repository';
import { ICarImagesRepository } from '@modules/cars/repositories/car-images.repository.interface';
import { ICarsRepository } from '@modules/cars/repositories/cars.repository.interface';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/rentals.repository';
import { IRentalsRepository } from '@modules/rentals/repositories/rentals-repository.interface';

import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/users.repository';
import { IUsersRepository } from '../../modules/accounts/repositories/users.repository.interface';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/categories.repository';
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/specifications.repository';
import { ICategoriesRepository } from '../../modules/cars/repositories/categories.repository.interface';
import { ISpecificationsRepository } from '../../modules/cars/repositories/specifications.repository.interface';

import './providers';

/**
 * o tsyringe nos ajudará a gerenciar as instancias (de forma única)
 * das classes, injetando-as quando necessária.
 */

/**
 * o primeiro parâmetro do container é o nickname da
 * classe, e o segundo a classe a ser injetada.
 */
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<ICarImagesRepository>(
  'CarImagesRepository',
  CarImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);
