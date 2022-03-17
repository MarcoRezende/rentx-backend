"use strict";

exports.__esModule = true;
exports.CreateUserUseCase = void 0;

var _bcrypt = require("bcrypt");

var _tsyringe = require("tsyringe");

var _appError = require("../../../../shared/errors/app-error");

var _usersRepository = require("../../repositories/users.repository.interface");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _usersRepository.IUsersRepository === "undefined" ? Object : _usersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    email,
    password,
    driverLicense
  }) {
    const emailAlreadyTaken = await this.usersRepository.findByEmail(email);

    if (emailAlreadyTaken) {
      throw new _appError.AppError('Email already taken');
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


    const hashedPassword = await (0, _bcrypt.hash)(password, 8);
    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driverLicense
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;