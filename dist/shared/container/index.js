"use strict";

var _tsyringe = require("tsyringe");

var _usersTokens = require("../../modules/accounts/infra/typeorm/repositories/users-tokens.repository");

var _carImages = require("../../modules/cars/infra/typeorm/repositories/car-images.repository");

var _cars = require("../../modules/cars/infra/typeorm/repositories/cars.repository");

var _rentals = require("../../modules/rentals/infra/typeorm/repositories/rentals.repository");

var _users = require("../../modules/accounts/infra/typeorm/repositories/users.repository");

var _categories = require("../../modules/cars/infra/typeorm/repositories/categories.repository");

var _specifications = require("../../modules/cars/infra/typeorm/repositories/specifications.repository");

require("./providers");

/**
 * o tsyringe nos ajudará a gerenciar as instancias (de forma única)
 * das classes, injetando-as quando necessária.
 */

/**
 * o primeiro parâmetro do container é o nickname da
 * classe, e o segundo a classe a ser injetada.
 */
_tsyringe.container.registerSingleton('CategoriesRepository', _categories.CategoriesRepository);

_tsyringe.container.registerSingleton('SpecificationsRepository', _specifications.SpecificationsRepository);

_tsyringe.container.registerSingleton('CarsRepository', _cars.CarsRepository);

_tsyringe.container.registerSingleton('UsersRepository', _users.UsersRepository);

_tsyringe.container.registerSingleton('CarImagesRepository', _carImages.CarImagesRepository);

_tsyringe.container.registerSingleton('RentalsRepository', _rentals.RentalsRepository);

_tsyringe.container.registerSingleton('UsersTokensRepository', _usersTokens.UsersTokensRepository);